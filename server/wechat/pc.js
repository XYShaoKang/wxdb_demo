const path = require('path')
var sqlite3 = require('@journeyapps/sqlcipher').verbose()
const { hash } = require('./hash')
const { of, from, zip } = require('rxjs')
const { map, flatMap } = require('rxjs/operators')
const { PC_PATH, PC_PASSWORD } = require('../config')

const password$ = of(PC_PASSWORD)

function concatDB(dbName) {
  const dbPath$ = of(path.join(PC_PATH, `${dbName}.db`))
  const key$ = zip(password$, dbPath$).pipe(
    flatMap(([password, dbPath]) => from(hash(password, dbPath))),
  )
  const query$ = zip(
    key$,
    dbPath$.pipe(map(dbPath => new sqlite3.Database(dbPath))),
  ).pipe(
    map(([key, db]) => {
      db.run(`PRAGMA key = "x'${key}'"`)
      db.run("PRAGMA cipher_page_size = '4096'")
      return db
    }),
  )
  return query$
}
module.exports = {
  concatPCDB: concatDB,
}
