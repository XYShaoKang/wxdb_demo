const { query$ } = require('./query')
const getConnectDB = require('./get-connect-db')
const { map } = require('rxjs/operators')
const { xmlToObj, decodeSemiXml } = require('./util')

function createQuery$(platform, dbName) {
  return sql => {
    return query$(sql, getConnectDB(platform, dbName))
  }
}

function messages$({ username, page, pageSize = 10, type } = {}) {
  return createQuery$('android', 'EnMicroMsg')(
    `SELECT CAST (msgSvrId AS TEXT) AS msgSvrId,
        msgId,
        type,
        isSend,
        createTime,
        talker,
        content,
        imgPath
    FROM message
    WHERE talker = '${username}'
    ${type ? `AND type = ${type}` : ''}
    -- AND content like '%<type>19</type>%'
    ORDER BY createTime DESC
    ${page ? `LIMIT ${page * pageSize},${pageSize}` : ''}`,
  ).pipe(
    map(messages => {
      return messages.map(message => {
        let { type, content, talker } = message

        // 群消息
        if (/@chatroom$/.test(talker)) {
          message.room = talker
          const contents = content.split('\n')
          // console.log(contents[0],'\n',contents.slice(1).join('\n'))
          if (type !== 10000) {
            message.talker = talker = contents[0].split(':')[0]
            message.content = content = contents.slice(1).join('\n')
          }
        }

        // xml格式数据
        const appTypes = [
          -1879048186,
          -1879048185,
          -1879048183,
          570425393,
          469762097,
          436207665,
          419430449,
          318767153,
          268435505,
          16777265,
          1048625,
          48,
          49,
          42,
          35,
        ]

        // xml 数据格式化
        if (appTypes.includes(type)) {
          if (!/^</.test(content)) {
            content = content
              .split('\n')
              .slice(1)
              .join('\n')
          }

          const contentObj = xmlToObj(content)
          if (contentObj.msg) {
            const appmsg = contentObj.msg.appmsg
            if (appmsg && appmsg.recorditem && appmsg.recorditem.data) {
              appmsg.recorditem.data = xmlToObj(appmsg.recorditem.data)
            }
          }

          message.content = contentObj
        }

        // 原始 xml 数据格式化
        if (type === 285212721 || type === 486539313) {
          message.content = decodeSemiXml(content)
        }

        return message
      })
    }),
  )
}

module.exports = messages$
