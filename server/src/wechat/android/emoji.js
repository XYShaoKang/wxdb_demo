import { createQuery } from './query'

function emoji(md5) {
  return createQuery(
    'EnMicroMsg',
    `select * from EmojiInfo where md5 = '${md5}'`,
  )
}

export { emoji }
