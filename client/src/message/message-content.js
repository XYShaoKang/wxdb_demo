import React, { Component } from 'react'
import { Avatar, Icon } from 'antd'
import moment from 'moment'
import MessageImage from './message-image'
import MessageEmoji from './message-emoji'
import MessageVoice from './message-voice'
import MessageQQMap from './message-qqmap'
import MessageApp from './message-app'
import MessageMicroVideo from './message-micro-video'
import MessageMpArticle from './message-mp-article'
import MessagNotice from './message-notice'
import MessageTransfer from './message-transfer'
import MessageHongbao from './message-hongbao'
import MessageRunLike from './message-run-like'
import MessageRun from './message-run'
import MessageQQemail from './message-qqemail'
import MessageNameCard from './message-name-card'

export default class MessageContent extends Component {
  createContent = (item, user) => {
    const { type, msgId, imgPath, content, isSend, talker, text } = item
    const username = user.conRemark ? user.conRemark : user.nickname

    if (type === 3 || type === 1048625) {
      const { openGallery } = this.props
      // 图片 或 gif 图片
      return (
        <MessageImage
          msgId={msgId}
          imgPath={imgPath}
          openGallery={openGallery}
        />
      )
    }
    if (type === 34) {
      // 语音
      return <MessageVoice msgId={msgId} />
    }
    if (type === 35) {
      // qq 邮箱消息
      return <MessageQQemail content={content} />
    }
    if (type === 42) {
      // 用户名片
      return <MessageNameCard content={content} />
    }
    if (type === 43) {
      // 视频
      return <MessageMicroVideo msgId={msgId} />
    }
    if (type === 47) {
      // 表情
      return <MessageEmoji md5={imgPath} />
    }
    if (type === 48) {
      // 地图
      return <MessageQQMap content={content} />
    }
    if (type === 49) {
      // App 消息
      return <MessageApp content={content} imgPath={imgPath} msgId={msgId} />
    }
    if (type === 50) {
      // 语音视频通话
      return (
        <div
          style={{
            // width: 100,
            backgroundColor: '#fff',
            padding: '5px 10px',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Icon
            type='phone'
            style={{
              padding: '0 10px',
              order: isSend === 0 ? 0 : 1,
            }}
          />
          <div
            style={{
              padding: '0 10px',
            }}
          >
            {text.split('_')[2] === 'voice' ? '语音通话' : '视频通话'}
          </div>
        </div>
      )
    }
    if (type === 62) {
      // 小视频
      return <MessageMicroVideo msgId={msgId} />
    }
    if (type === 64) {
      // 群语音通话
      return (
        <div
          style={{
            color: '#fff',
            backgroundColor: '#ccc',
            padding: '2px 20px',
            borderRadius: 5,
          }}
        >
          {talker}
        </div>
      )
    }
    if (type === 10000) {
      // 系统信息
      return (
        <div
          style={{
            color: '#fff',
            backgroundColor: '#ccc',
            padding: '2px 20px',
            borderRadius: 5,
          }}
        >
          {text}
        </div>
      )
    }
    if (type === 16777265) {
      // 包含链接
      const href = content.appmsg.des
      return (
        <div
          style={{
            wordBreak: 'break-all',
            backgroundColor: '#fff',
            padding: '5px 10px',
            borderRadius: 10,
            cursor: 'pointer',
          }}
          onClick={() => {
            const w = window.open('about:blank')
            w.location.href = href
          }}
        >
          {href}
        </div>
      )
    }
    if (type === 268435505) {
      // 分享图片
      const { openGallery } = this.props
      return (
        <MessageImage
          msgId={msgId}
          imgPath={imgPath}
          openGallery={openGallery}
        />
      )
    }
    if (type === 285212721) {
      // 公众号消息
      return <MessageMpArticle content={content} />
    }
    if (type === 318767153) {
      // 通知消息
      return <MessagNotice content={content} />
    }
    if (type === 419430449) {
      // 转账
      return (
        <MessageTransfer
          content={content}
          isSend={isSend}
          username={username}
        />
      )
    }
    if (type === 436207665 || type === 469762097) {
      // 红包
      return <MessageHongbao content={content} />
    }
    if (type === 486539313) {
      // 公众号信息 视频
      return <MessageMpArticle content={content} />
    }
    if (type === 570425393) {
      // 微信群管理消息
      const { template, link_list } = content.sysmsg

      const tempStr = link_list.reduce((prev, { name, nickname }) => {
        return prev.replace(`$${name}$`, nickname)
      }, template)
      return (
        <div
          style={{
            color: '#fff',
            backgroundColor: '#ccc',
            padding: '2px 20px',
            borderRadius: 5,
          }}
        >
          {tempStr}
        </div>
      )
    }
    if (type === -1879048183) {
      // 微信运动别人点赞消息
      const {
        title,
        likeuserlist: { reserved1, reserved2 },
      } = content.appmsg.hardwareinfo
      const iconUrl = reserved1 || reserved2
      return <MessageRunLike title={title} iconUrl={iconUrl} />
    }
    if (type === -1879048185) {
      // 微信运动
      return <MessageRun content={content} />
    }
    if (type === -1879048186) {
      // 位置共享
      const locationSvg = () => (
        <div
          dangerouslySetInnerHTML={{
            __html: `<svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="512"><path d="M923.63904 424.82944c0-231.85792-184.29568-419.80544-411.64416-419.80544-227.34208 0-411.63904 187.94752-411.63904 419.80544 0 7.35872 0.7104 14.47168 1.08288 21.67552-0.33792 3.5584-1.08288 6.99008-1.08288 10.64192 0 258.38592 379.97952 551.06688 379.97952 551.06688s31.66336 24.21504 63.328 0c31.66336-24.24192 379.97952-292.68096 379.97952-551.06688 0-3.65184-0.74496-7.08352-1.08288-10.64192C922.92864 439.30112 923.63904 432.18816 923.63904 424.82944L923.63904 424.82944zM511.99488 586.336c-87.44832 0-158.31936-72.29312-158.31936-161.50656 0-89.15072 70.86976-161.4464 158.31936-161.4464 87.45344 0 158.32832 72.29568 158.32832 161.4464C670.3232 514.04288 599.44832 586.336 511.99488 586.336L511.99488 586.336zM511.99488 586.336" p-id="513"></path></svg>`,
          }}
        />
      )
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: '5px 20px',
          }}
        >
          <Icon
            component={locationSvg}
            style={{
              order: isSend === 0 ? 0 : 1,
              margin: '0 10px',
            }}
          />
          <div>{'我发起了位置共享'}</div>
        </div>
      )
    }

    return (
      <div
        dangerouslySetInnerHTML={{
          __html: text.replace(/\n/g, '<br />'),
        }}
        style={{
          // border: '1px solid #000',
          padding: 10,
          borderRadius: 5,
          backgroundColor: '#fff',
        }}
      />
    )
  }
  render() {
    const { message, user, me } = this.props
    const { type } = message
    const isSys = type === 10000 || type === 570425393 || type === 64
    const left = !(message.isSend === 1)
    const name = left
      ? user.conRemark
        ? user.conRemark
        : user.nickname
      : me.nickname
    const avatarSrc = left ? user.reserved1 : me.value
    const time = moment(message.createTime).format('YYYY-MM-DD HH:mm:ss')
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: left ? 'flex-start' : 'flex-end',
          width: '100%',
        }}
        onClick={() => {
          console.log(message)
        }}
      >
        <div style={{ width: '100%' }}>
          {!isSys && (
            <div
              style={{
                display: 'flex',
                justifyContent: left ? 'flex-start' : 'flex-end',
                alignItems: 'center',
                width: 500,
              }}
            >
              <Avatar
                src={avatarSrc}
                style={{
                  order: left ? 0 : 1,
                }}
              />
              <div
                style={{
                  margin: '10px 20px',
                }}
              >
                {/* <p style={{ margin: 0 }}>{name}</p> */}
                <p style={{ margin: 0 }}>{time}</p>
              </div>
            </div>
          )}
          <div
            style={{
              paddingLeft: 50,
              paddingRight: 50,
              width: isSys ? '100%' : 500,
              // textAlign: left ? 'left' : 'right',
              display: 'flex',
              justifyContent: isSys
                ? 'center'
                : left
                ? 'flex-start'
                : 'flex-end',
              overflow: 'hidden',
            }}
          >
            {this.createContent(message, user)}
          </div>
        </div>
      </div>
    )
  }
}
