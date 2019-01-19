const { of, from, zip } = require('rxjs')
const {
  concat,
  map,
  flatMap,
  concatAll,
  zipAll,
  tap,
  concatMap,
  filter,
  combineAll,
  combineLatest,
  catchError,
} = require('rxjs/operators')
const { getAllDbs$ } = require('./dbs')
const { getAllTableName$, query$ } = require('./query')
const getConnectDB = require('./get-connect-db')

function createQuery$(platform, dbName) {
  return sql => {
    return query$(sql, getConnectDB(platform, dbName))
  }
}

function searchInTable$(text, platform, dbName, tName) {
  const queryTable = createQuery$(platform, dbName)
  return queryTable(`PRAGMA  table_info([${tName}])`).pipe(
    flatMap(columns =>
      queryTable(
        `select * from ${tName} where ${columns
          .map(({ name }) => ` ${name} like '%${text}%'`)
          .join(' or ')}`,
      ),
    ),
  )
}

function searchInDB$(text, platform, dbName) {
  return getAllTableName$(getConnectDB(platform, dbName)).pipe(
    concatMap(tableNames =>
      from(tableNames).pipe(
        filter(({ count }) => count > 0),

        map(({ tableName }) =>
          searchInTable$(text, platform, dbName, tableName).pipe(
            map(data => ({ tableName, data })),
          ),
        ),
        combineAll(),
        map(data => data.filter(d => d.data.length > 0)),
      ),
    ),
  )
}
function searchInAllDB$(text, platform, dbs) {
  return getAllDbs$().pipe(
    concatMap(dbs => {
      return from(
        dbs.filter(({ platform: p }) => !platform || p === platform),
      ).pipe(
        map(({ fileName: dbName, platform }) =>
          searchInDB$(text, platform, dbName).pipe(
            map(data => data.map(d => ({ dbName, ...d }))),
            catchError(err => {
              console.error('searchInAllDB$', err)
              return of([])
            }),
          ),
        ),
        combineAll(),
        map(data => data.reduce((a, b) => a.concat(b))),
      )
    }),
  )
}
module.exports = {
  searchInTable$,
  searchInDB$,
  searchInAllDB$,
}
