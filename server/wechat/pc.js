const path = require('path')
var sqlite3 = require('@journeyapps/sqlcipher').verbose()
const { hash } = require('./hash')
const { of, from, zip } = require('rxjs')
const { map, flatMap } = require('rxjs/operators')
const { PC_PATH, PC_PASSWORD } = require('../config')

const password$ = of(PC_PASSWORD)

/**
 * 返回 PC DB 链接
 *
 * @param {string} dbName 要链接的 DB 名
 * @returns {Observable<Database>} 返回包含 Database 的 Observable
 */
function connectDB$(dbName) {
  const dbPath$ = of(path.join(PC_PATH, `${dbName}.db`))
  const key$ = zip(password$, dbPath$).pipe(
    flatMap(([password, dbPath]) => from(hash(password, dbPath))),
  )
  const db$ = zip(
    key$,
    dbPath$.pipe(map(dbPath => new sqlite3.Database(dbPath))),
  ).pipe(
    map(([key, db]) => {
      db.run(`PRAGMA key = "x'${key}'"`)
      db.run("PRAGMA cipher_page_size = '4096'")
      return db
    }),
  )
  return db$
}
module.exports = {
  connectPCDB$: connectDB$,
}
