import path from 'path'
import sqlcipher from '@journeyapps/sqlcipher'
import { of, zip } from 'rxjs'
import { map } from 'rxjs/operators'
import { ANDROID_PATH, ANDROID_KEY } from '../../../config'

const sqlite3 = sqlcipher.verbose()
const key$ = of(ANDROID_KEY)

/**
 * 返回安卓 DB 链接
 *
 * @param {string} dbName 要链接的 DB 名
 * @returns {Observable<Database>} 返回包含 Database 的 Observable
 */
function connectDB$(dbName) {
  const dbPath$ = of(
    new sqlite3.Database(path.join(ANDROID_PATH, `${dbName}.db`)),
  )
  const db$ = zip(key$, dbPath$).pipe(
    map(([key, db]) => {
      db.serialize(function() {
        db.run(`PRAGMA key = '${key}'`)
        db.run("PRAGMA cipher_use_hmac = 'OFF'")
        db.run("PRAGMA kdf_iter = '4000'")
        db.run("PRAGMA cipher_page_size = '1024'")
      })
      return db
    }),
  )
  return db$
}

export { connectDB$ }
