import { getConnectDB } from './get-connect-db'
import { getAllTableName$, getTable$, query$ } from './query'
import { getAllDbs$ } from './dbs'
import { searchInTable$, searchInDB$, searchInAllDB$ } from './search'
import { users$, user$ } from './user'
import { messages$, message$ } from './message'
import { image$ } from './image'
import { emoji$ } from './emoji'
import { me$ } from './me'
import { voiceInfo$ } from './voice'
import { appInfo$ } from './app-info'
import { wxappInfo$ } from './wxapp-info'
import { file$ } from './file'
import { voiceStream, fileMd5 } from './util'

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
const searchInTable = (...arg) => searchInTable$(...arg).toPromise()
const searchInDB = (...arg) => searchInDB$(...arg).toPromise()
const searchInAllDB = (...arg) => searchInAllDB$(...arg).toPromise()
const users = (...arg) => users$(...arg).toPromise()
const user = (...arg) => user$(...arg).toPromise()
const messages = (...arg) => messages$(...arg).toPromise()
const message = (...arg) => message$(...arg).toPromise()
const image = (...arg) => image$(...arg).toPromise()
const emoji = (...arg) => emoji$(...arg).toPromise()
const me = (...arg) => me$(...arg).toPromise()
const voiceInfo = (...arg) => voiceInfo$(...arg).toPromise()
const appInfo = (...arg) => appInfo$(...arg).toPromise()
const wxappInfo = (...arg) => wxappInfo$(...arg).toPromise()
const file = (...arg) => file$(...arg).toPromise()

export {
  getAllTableName,
  getTable,
  getAllDbs,
  query,
  voiceStream,
  fileMd5,
  searchInTable,
  searchInDB,
  searchInAllDB,
  users,
  user,
  messages,
  message,
  image,
  emoji,
  me,
  voiceInfo,
  appInfo,
  wxappInfo,
  file,
}
