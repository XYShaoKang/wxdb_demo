const { getAllTableName$, query$ } = require('./query')
const getConnectDB = require('./get-connect-db')
const {
  concat,
  map,
  flatMap,
  concatAll,
  zipAll,
  tap,
  concatMap,
  filter,
  combineAll,
  combineLatest,
  catchError,
} = require('rxjs/operators')

function createQuery$(platform, dbName) {
  return sql => {
    return query$(sql, getConnectDB(platform, dbName))
  }
}

// 查询所有已知微信号`SELECT r.username,r.alias,r.nickname,c.displayname,i.reserved1 FROM rcontact r LEFT JOIN chatroom c  ON r.username=c.chatroomname LEFT JOIN img_flag i where r.username=i.username`
// 查询有聊天记录的微信号 `SELECT r.username,r.alias,r.nickname,c.displayname,i.reserved1 FROM rcontact r LEFT JOIN chatroom c  ON r.username=c.chatroomname LEFT JOIN img_flag i ON r.username=i.username WHERE r.username IN (SELECT talker FROM message WHERE talker NOT LIKE 'gh_%' GROUP BY talker )`
function users$() {
  return createQuery$('android', 'EnMicroMsg')(
    `
    SELECT 
        r.username,
        r.alias,
        r.conRemark,
        r.nickname,
        c.displayname,
        i.reserved1
    FROM rcontact r
        LEFT JOIN
        chatroom c ON r.username = c.chatroomname
        LEFT JOIN
        img_flag i ON r.username = i.username
    WHERE r.username IN (
            SELECT talker
              FROM message
            GROUP BY talker
        )
    AND r.username NOT LIKE 'gh_%'
    AND r.username NOT LIKE '%@chatroom'
    `,
  ).pipe(map(users => users.map(user => ({ ...user }))))
}

module.exports = users$
