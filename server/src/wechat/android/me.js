import { createQuery } from './query'

function me() {
  const sql = `
    SELECT r.username,
        r.alias,
        r.conRemark,
        r.nickname,
        s.value
    FROM rcontact r
        LEFT JOIN
        (
            SELECT value
              FROM userinfo2
            WHERE sid = 'USERINFO_SELFINFO_SMALLIMGURL_STRING'
        )
        AS s
    WHERE r.username IN (
            SELECT value
              FROM userinfo
            WHERE id = 2
        );`
  return createQuery('EnMicroMsg', sql)
}

export { me }
