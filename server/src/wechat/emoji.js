import { query$ } from './query'
import { getConnectDB } from './get-connect-db'

function createQuery$(platform, dbName) {
  return sql => {
    return query$(sql, getConnectDB(platform, dbName))
  }
}

function emoji$(md5) {
  return createQuery$('android', 'EnMicroMsg')(
    `select * from EmojiInfo where md5 = '${md5}'`,
  )
}

export { emoji$ }
