import Query from './Query'
import Mutation from './Mutation'
import { GraphQLDateTime } from 'graphql-iso-date'
import R from 'ramda'
import { promoteDataProp, formatMsg, promoteAttributes } from '../util'

export default {
  Query,
  Mutation,
  DateTime: GraphQLDateTime,
  Message: {
    __resolveType: message =>
      R.is(Object, message.content) ? 'XMLMessage' : 'TEXTMessage',
  },
  XMLContent: {
    __resolveType: content => {
      return {
        appmsg: 'APPContent',
        sysmsg: 'SYSContent',
        pushmail: 'MailContent',
        namecardmsg: 'NameCardContent',
        qqmapmsg: 'QQMapContent',
      }[
        R.pipe(
          R.keys,
          R.head,
        )(content)
      ]
    },
  },
  WcpayInfo: {
    __resolveType: content =>
      content.transferid ? 'TransferWcpayInfo' : 'HongbaoWcpayInfo',
  },
  HardwareInfo: {
    __resolveType: hardwareInfo =>
      hardwareInfo.likeuserlist ? 'LikeHardwareInfo' : 'RankHardwareInfo',
  },
  XMLMessage: {
    content: message => {
      const { type } = message
      // console.log(JSON.stringify(message.content, null, 2))
      if (type === 285212721 || type === 486539313) {
        message = {
          ...message,
          content: { appmsg: formatMsg(message.content.appmsg) },
        }
      } else if (type === 570425393) {
        message = {
          ...message,
          content: {
            sysmsg: formatMsg(
              message.content.sysmsg.sysmsgtemplate.content_template,
            ),
          },
        }
      } else if (type === 35) {
        message = {
          ...message,
          content: {
            pushmail: formatMsg({
              pushmail: message.content.msg.pushmail,
            }),
          },
        }
      } else if (type === 42) {
        message = {
          ...message,
          content: {
            namecardmsg: message.content.msg._attributes,
          },
        }
      } else if (type === 48) {
        message = {
          ...message,
          content: {
            qqmapmsg: message.content.msg.location._attributes,
          },
        }
      } else if (message.content.msg) {
        message = {
          ...message,
          content: { appmsg: formatMsg(message.content.msg.appmsg) },
        }
      }
      // console.log(JSON.stringify(message.content, null, 2))
      return message.content
    },
  },
  VoiceInfo: {
    msgtime: ({ msgtime }) => new Date(msgtime),
  },
  AppInfo: {
    modifyTime: ({ modifyTime }) => new Date(modifyTime),
    lvbuff: ({ lvbuff }) => lvbuff.toString(),
  },
  WxappInfo: {
    syncTimeSecond: ({ syncTimeSecond }) => new Date(syncTimeSecond * 1000),
    dynamicInfo: ({ dynamicInfo }) => JSON.parse(dynamicInfo),
    versionInfo: ({ versionInfo }) => JSON.parse(versionInfo),
    bindWxaInfo: ({ bindWxaInfo }) => JSON.parse(bindWxaInfo),
    appInfo: ({ appInfo }) => JSON.parse(appInfo),
  },
  NameCardMsg: {
    user: async ({ username }, __, { dataSources }) => {
      const user = (await dataSources.userAPI.user({ username }))[0]
      return user
    },
  },
  AppMsg: {
    appInfo: async ({ appid }, __, { dataSources }) => {
      const appInfo = (await dataSources.messageAPI.appInfo(appid))[0]
      return appInfo
    },
    recorditem: R.pipe(
      R.prop('recorditem'),
      R.when(
        R.pipe(
          R.is(Array),
          R.not,
        ),
        R.of,
      ),
    ),
  },
  Weappinfo: {
    wxappInfo: async ({ username }, __, { dataSources }) => {
      const wxappInfo = (await dataSources.messageAPI.wxappInfo(username))[0]
      return wxappInfo || {}
    },
  },
  Stryles: {
    style: R.pipe(
      R.prop('style'),
      R.when(
        R.pipe(
          R.is(Array),
          R.not,
        ),
        R.of,
      ),
    ),
  },
  SYSMsg: {
    link_list: R.pipe(
      R.prop('link_list'),
      R.when(
        R.pipe(
          R.is(Array),
          R.not,
        ),
        R.of,
      ),
    ),
  },
  LikeHardwareInfo: {
    likeuserlist: async (
      { likeuserlist, likeuserlist: { username } },
      __,
      { dataSources },
    ) => {
      const { reserved1, reserved2 } = (await dataSources.userAPI.user({
        username,
      }))[0]
      return { ...likeuserlist, reserved1, reserved2 }
    },
  },
  RankHardwareInfo: {
    championuser: async (
      { championusername: username },
      __,
      { dataSources },
    ) => {
      const user = (await dataSources.userAPI.user({
        username,
      }))[0]
      return user
    },
  },
  Appattach: {
    totallen: R.pipe(
      R.prop('totallen'),
      R.when(R.is(Array), R.head),
    ),
  },
}
