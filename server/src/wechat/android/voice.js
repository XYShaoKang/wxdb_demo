import { createQuery } from './query'

function voiceInfo(msgId) {
  return createQuery(
    'WxFileIndex',
    `select * from WxFileIndex2 where msgId = '${msgId}'`,
  )
}

export { voiceInfo }
