import { createQuery } from './query'

function file(msgId, type) {
  const sql = `
    SELECT *
      FROM WxFileIndex2
    WHERE msgId = '${msgId}'
    ${type ? ` AND msgSubType = ${type}` : ''}
  `
  return createQuery('WxFileIndex', sql)
}

export { file }
