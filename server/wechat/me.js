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

function me$() {
  return createQuery$('android', 'EnMicroMsg')(
    `
    SELECT r.username,
        r.alias,
        r.conRemark,
        r.nickname,
        s.value
    FROM rcontact r
        LEFT JOIN
        (
            SELECT value
              FROM userinfo2
            WHERE sid = 'USERINFO_SELFINFO_SMALLIMGURL_STRING'
        )
        AS s
    WHERE r.username IN (
            SELECT value
              FROM userinfo
            WHERE id = 2
        );
 `,
  )
}

module.exports = me$
