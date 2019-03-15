import { query$ } from './query'
import { getConnectDB } from './get-connect-db'
import { map } from 'rxjs/operators'
import { xmlToObj, decodeSemiXml } from './util'

function createQuery$(platform, dbName) {
  return sql => {
    return query$(sql, getConnectDB(platform, dbName))
  }
}

function base$(sql) {
  return createQuery$('android', 'EnMicroMsg')(sql).pipe(
    map(messages => {
      return messages.map(message => {
        let { type, content, talker, isSend } = message

        // 群消息
        if (/@chatroom$/.test(talker)) {
          message.room = talker
          const contents = content.split('\n')
          // console.log(contents[0],'\n',contents.slice(1).join('\n'))
          if (type !== 10000 && isSend !== 1) {
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

        return { ...message, createTime: new Date(message.createTime) }
      })
    }),
  )
}

function messages$({ username, page, pageSize = 10, type, appType } = {}) {
  const tatleFilter = username && `talker = '${username}'`
  const messageTypeFilter = type && `type = ${type}`
  const appTypeFilter = appType && `content like '%<type>${appType}</type>%'`
  const messageFilter = [tatleFilter, messageTypeFilter, appTypeFilter]
    .filter(t => t)
    .join(' AND ')
  const sql = `
  SELECT CAST (msgSvrId AS TEXT) AS msgSvrId,
    msgId,
    type,
    isSend,
    createTime,
    talker,
    content,
    imgPath
  FROM message
  ${messageFilter ? `WHERE ${messageFilter}` : ''}
  ORDER BY createTime DESC
  ${page !== undefined ? `LIMIT ${page * pageSize},${pageSize}` : ''}
  `
  return base$(sql)
}
function message$({ msgSvrId } = {}) {
  const sql = `
  SELECT CAST (msgSvrId AS TEXT) AS msgSvrId,
    msgId,
    type,
    isSend,
    createTime,
    talker,
    content,
    imgPath
  FROM message
  WHERE msgSvrId = '${msgSvrId}'
  `
  return base$(sql)
}

export { messages$, message$ }
