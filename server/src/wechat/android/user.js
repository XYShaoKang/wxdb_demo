import { createQuery } from './query'

// 查询所有已知微信号 `SELECT r.username,r.alias,r.nickname,c.displayname,i.reserved1 FROM rcontact r LEFT JOIN chatroom c  ON r.username=c.chatroomname LEFT JOIN img_flag i where r.username=i.username`
// 查询有聊天记录的微信号 `SELECT r.username,r.alias,r.nickname,c.displayname,i.reserved1 FROM rcontact r LEFT JOIN chatroom c  ON r.username=c.chatroomname LEFT JOIN img_flag i ON r.username=i.username WHERE r.username IN (SELECT talker FROM message WHERE talker NOT LIKE 'gh_%' GROUP BY talker )`
function users({ page, pageSize = 10, messageType, appType } = {}) {
  const messageTypeFilter = messageType && `m.type = ${messageType}`
  const appTypeFilter = appType && `m.content like '%<type>${appType}</type>%'`
  const userFilter = [messageTypeFilter, appTypeFilter]
    .filter(t => t)
    .join(' AND ')
  const sql = `
  SELECT r.username,
         r.alias,
         r.conRemark,
         r.nickname,
         c.displayname,
         i.reserved1,
         i.reserved2
    FROM rcontact r
         LEFT JOIN
         chatroom c ON r.username = c.chatroomname
         LEFT JOIN
         img_flag i ON r.username = i.username
         LEFT JOIN
         message m ON r.username = m.talker
   ${userFilter ? `WHERE ${userFilter}` : ''}
   -- r.username LIKE '%@chatroom'
   -- AND r.username NOT LIKE 'gh_%' 
   GROUP BY m.talker
   ORDER BY m.createTime DESC
   ${page !== undefined ? `LIMIT ${page * pageSize},${pageSize}` : ''}`

  return createQuery('EnMicroMsg', sql)
}
function user({ username } = {}) {
  const sql = `
  SELECT r.username,
         r.alias,
         r.conRemark,
         r.nickname,
         c.displayname,
         i.reserved1,
         i.reserved2
    FROM rcontact r
         LEFT JOIN
         chatroom c ON r.username = c.chatroomname
         LEFT JOIN
         img_flag i ON r.username = i.username
   WHERE r.username = '${username}'`

  return createQuery('EnMicroMsg', sql)
}

export { users, user }
