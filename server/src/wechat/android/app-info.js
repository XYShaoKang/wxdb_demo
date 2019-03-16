import { createQuery } from './query'

function appInfo(appId) {
  return createQuery(
    'EnMicroMsg',
    `select * from AppInfo where appId = '${appId}'`,
  )
}

export { appInfo }
