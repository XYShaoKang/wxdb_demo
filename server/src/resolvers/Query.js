const appInfos = async (_, __, { dataSources }) => {
  const user = await dataSources.messageAPI.message({
    username: 'filehelper',
    page: 0,
    pageSize: 10,
    type: 49,
  })
  console.log(JSON.stringify(await dataSources.userAPI.me(), null, 2))
  return []
}

const users = async (
  _,
  { page, pageSize, messageType, appType },
  { dataSources },
) => await dataSources.userAPI.users({ page, pageSize, messageType, appType })

const user = async (_, { username }, { dataSources }) =>
  (await dataSources.userAPI.user({ username }))[0]

const me = async (_, { username }, { dataSources }) =>
  (await dataSources.userAPI.me())[0]

// 获取聊天记录
const messages = async (
  _,
  { username, page, pageSize, type, appType },
  { dataSources },
) =>
  await dataSources.messageAPI.messages({
    username,
    page,
    pageSize,
    type,
    appType,
  })
// 获取聊天记录
const message = async (_, { msgSvrId }, { dataSources }) =>
  (await dataSources.messageAPI.message({
    msgSvrId,
  }))[0]

// 获取音频信息
const voiceInfo = async (_, { msgId }, { dataSources }) =>
  (await dataSources.messageAPI.voiceInfo(msgId))[0]

// 获取 app 信息
const appInfo = async (_, { appId }, { dataSources }) =>
  (await dataSources.messageAPI.appInfo(appId))[0]

// 获取 wxappInfo 信息
const wxappInfo = async (_, { username }, { dataSources }) =>
  (await dataSources.messageAPI.wxappInfo(username))[0]

export default {
  appInfos,
  users,
  user,
  me,
  messages,
  message,
  voiceInfo,
  appInfo,
  wxappInfo,
}
