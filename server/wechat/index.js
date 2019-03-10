const getConnectDB = require('./get-connect-db')
const { getAllTableName$, getTable$, query$ } = require('./query')
const { getAllDbs$ } = require('./dbs')
const { searchInTable$, searchInDB$, searchInAllDB$ } = require('./search')
const { users$, user$ } = require('./user')
const message$ = require('./message')
const image$ = require('./image')
const emoji$ = require('./emoji')
const me$ = require('./me')
const voiceInfo$ = require('./voice')
const appInfo$ = require('./app-info')
const wxappInfo$ = require('./wxapp-info')
const file$ = require('./file')
const { voiceStream, fileMd5 } = require('./util')

/**
 * 获取所有数据库中所有表格
 *
 * @param {string} dbName	需要获取的数据库名称
 * @param {sgring} platform	需要获取数据库的平台
 * @returns {Promise<Object>} 返回包含所有表格数据的 Promise
 */
function getAllTableName(dbName, platform) {
  return getAllTableName$(getConnectDB(platform, dbName))
    .toPromise()
    .catch(err => {
      console.error(`错误:${err.message}`)
      return { err: { message: err.message } }
    })
}

/**
 * 获取表格前 1000 行数据
 *
 * @param {string} dbName
 * @param {string} tName
 * @param {string} platform
 * @returns {Promise<Object>} 返回包含前 1000 行数据的 Promise
 */
function getTable(dbName, tName, platform) {
  return getTable$(tName, getConnectDB(platform, dbName)).toPromise()
}

/**
 * 获取所有 DB 信息
 *
 * @returns {Promise<FileInfo>} 返回包含所有 DB 列表的 Observable
 */
function getAllDbs() {
  return getAllDbs$().toPromise()
}

/**
 * 查询数据
 *
 * @param {string} sql 需要查询的 sql 语句
 * @param {string} dbName 需要查询的 DB 名
 * @param {string} platform 需要查询的平台
 * @returns {Promise<Object>} 返回包含查询数据的 Promise
 */
function query(sql, dbName, platform) {
  return query$(sql, getConnectDB(platform, dbName)).toPromise()
}

module.exports = {
  getAllTableName,
  getTable,
  getAllDbs,
  query,
  voiceStream,
  searchInTable: (...arg) => searchInTable$(...arg).toPromise(),
  searchInDB: (...arg) => searchInDB$(...arg).toPromise(),
  searchInAllDB: (...arg) => searchInAllDB$(...arg).toPromise(),
  users: (...arg) => users$(...arg).toPromise(),
  user: (...arg) => user$(...arg).toPromise(),
  message: (...arg) => message$(...arg).toPromise(),
  image: (...arg) => image$(...arg).toPromise(),
  emoji: (...arg) => emoji$(...arg).toPromise(),
  me: (...arg) => me$(...arg).toPromise(),
  voiceInfo: (...arg) => voiceInfo$(...arg).toPromise(),
  appInfo: (...arg) => appInfo$(...arg).toPromise(),
  wxappInfo: (...arg) => wxappInfo$(...arg).toPromise(),
  file: (...arg) => file$(...arg).toPromise(),
  fileMd5,
}
