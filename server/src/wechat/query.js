import { from } from 'rxjs'
import { map, flatMap } from 'rxjs/operators'
import path from 'path'

/**
 * 查询函数
 *
 * @param {string} sql 需要查询的 sql 语句
 * @param {function(): Rx.Observable.<Database>} getDB 生产 DB 链接的函数
 * @returns {Rx.Observable.<Object>} 返回包含查询数据的 Observable
 */
function query$(sql, getDB) {
  const db$ = getDB()
  const query$ = db$.pipe(
    flatMap(db => {
      return from(
        new Promise(function(resolve, reject) {
          db.all(sql, function(err, data) {
            db.close()
            if (!data) {
              const dbName = path.parse(db.filename).name
              reject(
                new Error(
                  `数据库 ${dbName} 检索不到数据,请确认数据库文件和密码是否正确!`,
                ),
              )
            }
            resolve(data)
          })
        }),
      )
    }),
  )
  return query$
}

/**
 * 查询 DB 所有表名
 *
 * @param {function(): Rx.Observable.<Database>} getDB 生产 DB 链接的函数
 * @returns {Rx.Observable.<Object>} 返回包含所有表名的 Observable
 */
function getAllTableName$(getDB) {
  const sql = `SELECT * FROM sqlite_master WHERE type='table'`
  return query$(sql, getDB).pipe(
    flatMap(tables =>
      query$(
        tables.map(t => `Select count(*) from ${t.name}`).join(' union all '),
        getDB,
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
 * 获取表格前 1000 行数据
 *
 * @param {string} tName 表格名
 * @param {function(): Rx.Observable.<Database>} getDB 生产 DB 链接函数
 * @returns {Rx.Observable.<Object>} 返回包含前 1000 行数据的 Observable
 */
function getTable$(tName, getDB) {
  const sql = `SELECT * FROM ${tName} limit 1000`
  return query$(sql, getDB)
}

export { getAllTableName$, getTable$, query$ }
