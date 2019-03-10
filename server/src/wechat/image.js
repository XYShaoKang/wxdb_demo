import { query$ } from './query'
import { getConnectDB } from './get-connect-db'

function createQuery$(platform, dbName) {
  return sql => {
    return query$(sql, getConnectDB(platform, dbName))
  }
}

function image$(msgId) {
  return createQuery$('android', 'WxFileIndex')(
    `select * from WxFileIndex2 where msgId = '${msgId}'`,
  )
}

export { image$ }
