import R from 'ramda'

import { xmlToObj, decodeSemiXml, log } from '../utils'
import { formatContent } from './format-content'

function formatMsgContent(message) {
  const { type } = message
  if (type === 285212721 || type === 486539313) {
    message = {
      ...message,
      content: { appmsg: formatContent(message.content.appmsg) },
    }
  } else if (type === 570425393) {
    message = {
      ...message,
      content: {
        sysmsg: formatContent(
          message.content.sysmsg.sysmsgtemplate.content_template,
        ),
      },
    }
  } else if (type === 35) {
    message = {
      ...message,
      content: {
        pushmail: formatContent({
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
      content: { appmsg: formatContent(message.content.msg.appmsg) },
    }
  }
  return message.content
}
function formatMsg(message) {
  let { type, content, talker, isSend } = message

  // 群消息
  if (/@chatroom$/.test(talker)) {
    message.room = talker
    const contents = content.split('\n')
    if (type !== 10000 && isSend !== 1) {
      message.talker = talker = contents[0].split(':')[0]
      message.content = content = contents.slice(1).join('\n')
    }
  }

  // xml格式数据
  const appTypes = [
    -1879048186,
    -1879048185,
    -1879048183,
    570425393,
    469762097,
    436207665,
    419430449,
    318767153,
    268435505,
    16777265,
    1048625,
    48,
    49,
    42,
    35,
  ]

  // xml 数据格式化
  if (appTypes.includes(type)) {
    if (!/^</.test(content)) {
      content = content
        .split('\n')
        .slice(1)
        .join('\n')
    }

    const contentObj = xmlToObj(content)
    if (contentObj.msg) {
      const appmsg = contentObj.msg.appmsg
      if (appmsg && appmsg.recorditem && appmsg.recorditem.data) {
        appmsg.recorditem.data = xmlToObj(appmsg.recorditem.data)
      }
    }

    message.content = contentObj
  }

  // SEMI_XML 数据格式化
  if (type === 285212721 || type === 486539313) {
    message.content = decodeSemiXml(content)
  }

  // 格式化 content
  if (R.is(Object, message.content)) {
    message.content = formatMsgContent(message)
  }
  log(`${message.msgId}-android.json`, JSON.stringify(message, null, 2))
  return { ...message, createTime: new Date(message.createTime) }
}

export { formatMsgContent, formatMsg }
