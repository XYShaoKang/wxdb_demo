import { map, flatMap, tap } from 'rxjs/operators'

import { createQuery$ } from './query'
import { WECHAT_ID } from '../../../config'

function users({ page, pageSize = 10, messageType, appType, username } = {}) {
  const usernameFilter = username && `c.UserName = '${username}'`
  const userFilter = [usernameFilter].filter(t => t).join(' AND ')
  const sql = `
    SELECT  c.UserName as username,
            c.Alias as alias,
            c.Remark AS conRemark,
            c.NickName as nickname,
            r.DisplayNameList AS displayname,
            c.BigHeadImgUrl AS reserved1,
            c.SmallHeadImgUrl AS reserved2

    FROM    Session s
            LEFT JOIN
            Contact c ON s.strUsrName = c.UserName
            LEFT JOIN
            ChatRoom r ON c.UserName = r.ChatRoomName

    ${userFilter ? `Where ${userFilter}` : ''}
    ORDER   BY s.nOrder DESC
    ${page !== undefined ? `LIMIT ${page * pageSize},${pageSize}` : ''}`

  return createQuery$('MicroMsg', sql)
    .pipe(
      flatMap(userList => {
        const noImgUrlUsers = userList
          .filter(({ reserved2 }) => !reserved2)
          .map(({ username }) => `'${username}'`)
        const userImgSql = `
          SELECT  c.usrName AS username,
                  c.smallHeadImgUrl AS reserved2,
                  c.bigHeadImgUrl AS reserved1,
                  i.smallHeadBuf
          FROM    ContactHeadImgUrl c
          LEFT JOIN
                  ContactHeadImg1 i ON c.usrName = i.usrName
          WHERE   c.usrName IN (${noImgUrlUsers.join(',')});`

        return createQuery$('Misc', userImgSql).pipe(
          map(userImgs => {
            return userList.map(user => {
              const noImgUser = userImgs.find(
                ({ username }) => user.username === username,
              )
              return noImgUser ? { ...user, ...noImgUser } : user
            })
          }),
        )
      }),
    )
    .toPromise()
}
function user({ username } = {}) {
  return users({ username })
}
function me() {
  return users({ username: WECHAT_ID })
}

export { users, user, me }
