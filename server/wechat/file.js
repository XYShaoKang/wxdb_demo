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

function file$(msgId, type) {
  const sql = `
    SELECT *
      FROM WxFileIndex2
    WHERE msgId = '${msgId}'
    ${type ? ` AND msgSubType = ${type}` : ''}
  `
  return createQuery$('android', 'WxFileIndex')(sql)
}

module.exports = file$
