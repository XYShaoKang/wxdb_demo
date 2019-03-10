import { query$ } from './query'
import { getConnectDB } from './get-connect-db'

function createQuery$(platform, dbName) {
  return sql => {
    return query$(sql, getConnectDB(platform, dbName))
  }
}

function appInfo$(appId) {
  return createQuery$('android', 'EnMicroMsg')(
    `select * from AppInfo where appId = '${appId}'`,
  )
}

export { appInfo$ }
