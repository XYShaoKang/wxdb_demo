import { query$ } from './query'
import getConnectDB from './get-connect-db'

function createQuery$(platform, dbName) {
  return sql => {
    return query$(sql, getConnectDB(platform, dbName))
  }
}

function wxappInfo$(username) {
  return createQuery$('android', 'AppBrandComm')(
    `select * from WxaAttributesTable where username = '${username}'`,
  )
}

export { wxappInfo$ }
