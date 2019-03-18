import { createQuery$ } from './query'
import { map } from 'rxjs/operators'

import { xmlToObj, decodeSemiXml, log } from '../utils'

function base$(sql) {
  return createQuery$('ChatMsg', sql)
    .pipe(
      map(messages => {
        return messages.map(message => {
          let { type, content, talker, isSend } = message

          // 群消息
          if (/@chatroom$/.test(talker)) {
            message.room = talker
            const contents = content.split('\n')
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
          console.log(JSON.stringify(message, null, 2))
          // 原始 xml 数据格式化
          if (type === 285212721 || type === 486539313) {
            message.content = decodeSemiXml(content)
          }
          log(`${message.msgId}-pc.json`, JSON.stringify(message, null, 2))
          return { ...message, createTime: new Date(message.createTime) }
        })
      }),
    )
    .toPromise()
}

function messages({ page, pageSize = 10, type, msgSvrId } = {}) {
  const typeFilter = type && `type = ${type}`
  const msgSvrIdFilter = msgSvrId && `MsgSvrID = '${msgSvrId}'`
  const messageFilter = [typeFilter, msgSvrIdFilter]
    .filter(t => t)
    .join(' AND ')
  const sql = `
    SELECT    localId AS msgId,
              MsgSvrID AS msgSvrId,
              type,
              sequence AS createTime,
              IsSender AS isSend,
              strTalker AS talker,
              strContent AS content
    FROM      ChatCRMsg
    ${messageFilter ? `WHERE ${messageFilter}` : ''}
    ORDER BY  sequence
    ${page !== undefined ? `LIMIT ${page * pageSize},${pageSize}` : ''};`
  return base$(sql)
}
function message({ msgSvrId } = {}) {
  return messages({ msgSvrId })
}

export { messages, message }
