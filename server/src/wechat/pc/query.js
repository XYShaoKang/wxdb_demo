import { from } from 'rxjs'
import { flatMap, tap } from 'rxjs/operators'
import path from 'path'

import { connectDB$ } from './connect-db'

/**
 * 查询函数
 *
 * @param {string} sql 需要查询的 sql 语句
 * @param {function(): Rx.Observable.<Database>} getDB 生产 DB 链接的函数
 * @returns {Rx.Observable.<Object>} 返回包含查询数据的 Observable
 */
function query$(dbName, sql) {
  const db$ = connectDB$(dbName)
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

function createQuery$(dbName, sql) {
  return query$(dbName, sql)
}
function createQuery(dbName, sql) {
  return createQuery$(dbName, sql).toPromise()
}

export { createQuery, createQuery$ }
