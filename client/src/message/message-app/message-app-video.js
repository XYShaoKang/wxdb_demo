import React, { Component } from 'react'
import { Howl, Howler } from 'howler'
import { Button, Icon, Avatar, Card, Tooltip } from 'antd'
import fetch from 'node-fetch'
import MessageAppFooter from './message-app-footer'
import MessagAppTitle from './message-app-title'
import MessagAppDes from './message-app-des'
import MessageAppImage from './message-app-image'

export default class MessageAppVideo extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { imgPath, appInfo, title, des, quoteUrl } = this.props
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
            cursor: 'pointer',
          }}
          onClick={() => {
            const w = window.open('about:blank')
            w.location.href = quoteUrl
          }}
        >
          <div
            style={{
              padding: '0 10px 0 0',
            }}
          >
            <MessagAppTitle title={title} />
            <MessagAppDes des={des} />
          </div>
          <MessageAppImage imgPath={imgPath}>
            <Icon type='video-camera' />
          </MessageAppImage>
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
