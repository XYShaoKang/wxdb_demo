import { messages, voiceInfo, appInfo, wxappInfo } from '../wechat'

// 获取聊天记录
const messageAsync = async (ctx, next) => {
  const { username, page, pageSize, type } = ctx.query
  const data = await messages({ username, page, pageSize, type })
  ctx.response.body = data
}

// 获取音频信息
const voiceInfoAsync = async (ctx, next) => {
  const { msgId } = ctx.query
  const data = await voiceInfo(msgId)
  ctx.response.body = data
}

// 获取 app 信息
const appInfoAsync = async (ctx, next) => {
  const { appId } = ctx.query
  const data = await appInfo(appId)
  ctx.response.body = data
}

// 获取 wxappInfo 信息
const wxappInfoAsync = async (ctx, next) => {
  const { username } = ctx.query
  const data = await wxappInfo(username)
  ctx.response.body = data
}

export { messageAsync, voiceInfoAsync, appInfoAsync, wxappInfoAsync }
