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

function voiceInfo$(msgId) {
  return createQuery$('android', 'WxFileIndex')(
    `
    select * from WxFileIndex2 where msgId = '${msgId}'
 `,
  )
}

module.exports = voiceInfo$
