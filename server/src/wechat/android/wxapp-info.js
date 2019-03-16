import { createQuery } from './query'

function wxappInfo(username) {
  return createQuery(
    'AppBrandComm',
    `select * from WxaAttributesTable where username = '${username}'`,
  )
}

export { wxappInfo }
