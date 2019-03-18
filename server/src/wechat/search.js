import { of, from } from 'rxjs'
import { map, flatMap, concatMap, combineAll, catchError } from 'rxjs/operators'
import { getAllDbs$ } from './dbs'
import { getAllTableName$ } from './table'
import { createQuery$ } from './utils'

function searchInTable$(query$, tName, text) {
  return query$(`PRAGMA  table_info([${tName}])`).pipe(
    flatMap(columns =>
      query$(
        `select * from ${tName} where ${columns
          .map(({ name }) => ` ${name} like '%${text}%'`)
          .join(' or ')}`,
      ),
    ),
    map(data => (data.length > 5 ? data.filter((_, i) => i < 5) : data)),
  )
}

function searchInDB$(platform, dbName, text) {
  const query$ = createQuery$(platform, dbName)
  return getAllTableName$(query$).pipe(
    concatMap(tables => {
      const tableNames = tables
        .filter(({ count }) => count > 0)
        .map(({ tableName }) => tableName)
      if (tableNames.length === 0) {
        return of([])
      }
      return from(tableNames).pipe(
        map(tableName =>
          searchInTable$(query$, tableName, text).pipe(
            map(data => ({ tableName, data })),
          ),
        ),
        combineAll(),
        map(data => data.filter(d => d.data.length > 0)),
      )
    }),
  )
}
function searchInAllDB$(platform, text) {
  return getAllDbs$().pipe(
    concatMap(dbs => {
      return from(
        dbs.filter(({ platform: p }) => !platform || p === platform),
      ).pipe(
        map(({ fileName: dbName, platform }) =>
          searchInDB$(platform, dbName, text).pipe(
            map(data => data.map(d => ({ dbName, ...d }))),
            catchError(err => {
              console.error('searchInAllDB$', err.message)
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

const searchInDB = (platform, dbName, text) =>
  searchInDB$(platform, dbName, text).toPromise()
const searchInAllDB = (platform, text) =>
  searchInAllDB$(platform, text).toPromise()
export { searchInDB$, searchInAllDB$, searchInDB, searchInAllDB }
