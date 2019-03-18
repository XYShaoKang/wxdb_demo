import { createQuery$ } from './query'
import { map } from 'rxjs/operators'
import { formatMsg } from './format-msg'

function base$(sql) {
  return createQuery$('EnMicroMsg', sql)
    .pipe(
      map(messages => {
        return messages.map(formatMsg)
      }),
    )
    .toPromise()
}

function messages({ username, page, pageSize = 10, type, appType } = {}) {
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
function message({ msgSvrId } = {}) {
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

export { messages, message }
