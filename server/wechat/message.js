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

function messages$(username) {
  return createQuery$('android', 'EnMicroMsg')(
    `select cast(msgSvrId as TEXT) as msgSvrId,msgId,type,isSend,createTime,talker,content,imgPath from message where talker = '${username}' order by createTime desc`,
  )
}

module.exports = messages$
