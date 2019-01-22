import React, { Component } from 'react'
import { Card, Avatar } from 'antd'
import moment from 'moment'
import MessageImage from './message-image'
import MessageEmoji from './message-emoji'

const createContent = item => {
  if (item.type === 3) {
    return <MessageImage msgId={item.msgId} />
  }
  if (item.type === 47) {
    return <MessageEmoji md5={item.imgPath} />
  }
  return item.content
}
export default class MessageRight extends Component {
  render() {
    const { message, user, me } = this.props
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
      >
        <div style={{ width: 300 }}>
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: left ? 'flex-start' : 'flex-end',
                alignItems: 'center',
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
                  margin: 20,
                  marginTop: 0,
                }}
              >
                <p style={{ margin: 0 }}>{name}</p>
                <p style={{ margin: 0 }}>{time}</p>
              </div>
            </div>
          </div>
          <p
            style={{
              paddingLeft: 50,
              paddingRight: 50,
              textAlign: left ? 'left' : 'right',
            }}
          >
            {createContent(message)}
          </p>
        </div>
      </div>
    )
  }
}
