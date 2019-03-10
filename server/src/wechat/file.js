import { query$ } from './query'
import { getConnectDB } from './get-connect-db'

function createQuery$(platform, dbName) {
  return sql => {
    return query$(sql, getConnectDB(platform, dbName))
  }
}

function file$(msgId, type) {
  const sql = `
    SELECT *
      FROM WxFileIndex2
    WHERE msgId = '${msgId}'
    ${type ? ` AND msgSubType = ${type}` : ''}
  `
  return createQuery$('android', 'WxFileIndex')(sql)
}

export { file$ }
