import { query$ } from './query'
import { getConnectDB } from './get-connect-db'
import { map } from 'rxjs/operators'

function createQuery$(platform, dbName) {
  return sql => {
    return query$(sql, getConnectDB(platform, dbName))
  }
}

// 查询所有已知微信号`SELECT r.username,r.alias,r.nickname,c.displayname,i.reserved1 FROM rcontact r LEFT JOIN chatroom c  ON r.username=c.chatroomname LEFT JOIN img_flag i where r.username=i.username`
// 查询有聊天记录的微信号 `SELECT r.username,r.alias,r.nickname,c.displayname,i.reserved1 FROM rcontact r LEFT JOIN chatroom c  ON r.username=c.chatroomname LEFT JOIN img_flag i ON r.username=i.username WHERE r.username IN (SELECT talker FROM message WHERE talker NOT LIKE 'gh_%' GROUP BY talker )`
function users$({ page, pageSize = 10, type } = {}) {
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
   ${type ? `WHERE m.type = ${type}` : ''}
   -- r.username LIKE '%@chatroom'
   -- AND r.username NOT LIKE 'gh_%' 
   -- AND m.content like '%<type>19</type>%'
   GROUP BY m.talker
   ORDER BY m.createTime DESC
   ${page !== undefined ? `LIMIT ${page * pageSize},${pageSize}` : ''}`

  return createQuery$('android', 'EnMicroMsg')(sql).pipe(
    map(users => users.map(user => ({ ...user }))),
  )
}
function user$({ username } = {}) {
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

  return createQuery$('android', 'EnMicroMsg')(sql).pipe(
    map(users => users.map(user => ({ ...user }))),
  )
}

export { users$, user$ }
