import { createQuery } from './query'

function image(msgId) {
  return createQuery(
    'WxFileIndex',
    `select * from WxFileIndex2 where msgId = '${msgId}'`,
  )
}

export { image }
