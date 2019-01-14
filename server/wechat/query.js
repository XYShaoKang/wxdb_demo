const { from } = require('rxjs')
const { map, flatMap, zipAll, tap } = require('rxjs/operators')
const path = require('path')

function query(sql, getDB) {
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
function getAllTableName(getDB) {
  const sql = `SELECT * FROM sqlite_master WHERE type='table'`
  return query(sql, getDB).pipe(
    flatMap(tables =>
      query(
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
function getTable(tName, getDB) {
  const sql = `SELECT * FROM ${tName} limit 1000`
  return query(sql, getDB)
}

module.exports = {
  getAllTableName,
  getTable,
  query,
}
