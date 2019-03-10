import React, { Component } from 'react'
import { Howl, Howler } from 'howler'
import { Button, Icon, Avatar, Card, Tooltip } from 'antd'
import fetch from 'node-fetch'
import MessageAppFooter from './message-app-footer'
import MessagAppTitle from './message-app-title'
import MessagAppDes from './message-app-des'

export default class MessageAppFile extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {
      imgPath,
      appInfo,
      title,
      des,
      quoteUrl,
      size,
      fileext,
      msgId,
    } = this.props
    return (
      <div
        style={{
          fontSize: 14,
          borderRadius: 10,
          width: 300,
          backgroundColor: '#fff',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: 10,
          }}
        >
          <div
            style={{
              padding: '0 10px 0 0',
            }}
          >
            <MessagAppTitle title={title} />
            <MessagAppDes des={size} />
          </div>
          <Avatar
            style={{
              backgroundImage: `url("/icon?ext=${fileext}")`,
              backgroundSize: '100% 100%',
              width: 40,
              flexShrink: 0,
              backgroundColor: '#fff',
            }}
            size='large'
            shape='square'
          />
        </div>
        {appInfo?.appName && (
          <MessageAppFooter
            appWatermarkUrl={appInfo.appWatermarkUrl}
            appName={appInfo.appName}
          />
        )}
      </div>
    )
  }
}
