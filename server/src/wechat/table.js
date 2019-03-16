import { createQuery$ } from './utils'
import { flatMap, map } from 'rxjs/operators'

/**
 * 获取表格前 1000 行数据
 *
 * @param {string} tName 表格名
 * @param {function(): Rx.Observable.<Database>} getDB 生产 DB 链接函数
 * @returns {Rx.Observable.<Object>} 返回包含前 1000 行数据的 Observable
 */
function getTable$(query$, tName) {
  const sql = `SELECT * FROM ${tName} limit 1000`
  return query$(sql)
}

/**
 * 获取表格前 1000 行数据
 *
 * @param {string} dbName
 * @param {string} tName
 * @param {string} platform
 * @returns {Promise<Object>} 返回包含前 1000 行数据的 Promise
 */
function getTable(platform, dbName, tName) {
  const query$ = createQuery$(platform, dbName)
  return getTable$(query$, tName).toPromise()
}

/**
 * 查询 DB 所有表名
 *
 * @param {function(): Rx.Observable.<Database>} getDB 生产 DB 链接的函数
 * @returns {Rx.Observable.<Object>} 返回包含所有表名的 Observable
 */
function getAllTableName$(query$) {
  const sql = `SELECT * FROM sqlite_master WHERE type='table'`
  return query$(sql).pipe(
    flatMap(tables =>
      query$(
        tables.map(t => `Select count(*) from ${t.name}`).join(' union all '),
      ).pipe(
        map(counts =>
          counts.map((v, i) => ({
            tableName: tables[i].name,
            count: v['count(*)'],
          })),
        ),
      ),
    ),
  )
}

/**
 * 获取所有数据库中所有表格
 *
 * @param {string} dbName	需要获取的数据库名称
 * @param {sgring} platform	需要获取数据库的平台
 * @returns {Promise<Object>} 返回包含所有表格数据的 Promise
 */
function getAllTableName(dbName, platform) {
  const query$ = createQuery$(platform, dbName)
  return getAllTableName$(query$)
    .toPromise()
    .catch(err => {
      console.error(`错误:${err.message}`)
      return { err: { message: err.message } }
    })
}

export { getTable, getAllTableName$, getAllTableName }
