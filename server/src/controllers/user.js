import { users, user, me } from '../wechat'

// 获取用户列表
const usersAsync = async (ctx, next) => {
  const { page, pageSize, type } = ctx.query

  const data = await users({ page, pageSize, type })
  ctx.response.body = data
}

// 获取用户信息
const userAsync = async (ctx, next) => {
  const { username } = ctx.query
  const data = await user({ username })
  ctx.response.body = data
}

// 获取本人的微信
const meAsync = async (ctx, next) => {
  const data = await me()
  ctx.response.body = data
}

export { usersAsync, userAsync, meAsync }
