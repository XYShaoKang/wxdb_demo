const { getAllTableName$, query$ } = require('./query')
const getConnectDB = require('./get-connect-db')

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

module.exports = appInfo$
