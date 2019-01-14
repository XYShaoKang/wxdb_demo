const { concatAndroidDB } = require('./android')
const { concatPCDB } = require('./pc')
const { getAllTableName, getTable, query } = require('./query')
const { getAllDbs } = require('./dbs')

function getDB(dbName, platform) {
  return platform === 'android'
    ? () => concatAndroidDB(dbName)
    : () => concatPCDB(dbName)
}
module.exports = {
  getAllTableName: function(dbName, platform) {
    return getAllTableName(getDB(dbName, platform))
      .toPromise()
      .catch(err => {
        console.error(`错误:${err.message}`)
        return { err: { message: err.message } }
      })
  },
  getTable: function(dbName, tName, platform) {
    return getTable(tName, getDB(dbName, platform)).toPromise()
  },
  getAllDbs: function() {
    return getAllDbs().toPromise()
  },
  query: function(sql, dbName, platform) {
    return query(sql, getDB(dbName, platform)).toPromise()
  },
}
