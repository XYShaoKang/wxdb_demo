import React, { Component } from 'react'
import { Howl, Howler } from 'howler'
import { Button, Icon, Avatar, Card, Tooltip } from 'antd'
import fetch from 'node-fetch'
import MessageAppFooter from './message-app-footer'
import MessagAppTitle from './message-app-title'
import MessagAppDes from './message-app-des'
import MessageAppImage from './message-app-image'

export default class MessageAppArticle extends Component {
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
          style={{ cursor: quoteUrl ? 'pointer' : 'default', padding: 10 }}
          onClick={() => {
            if (quoteUrl) {
              const w = window.open('about:blank')
              w.location.href = quoteUrl
            }
          }}
        >
          <MessagAppTitle title={title} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                padding: '0 10px 0 0',
              }}
            >
              <MessagAppDes des={des} />
            </div>
            <MessageAppImage imgPath={imgPath}>
              {!imgPath && <Icon type='link' />}
            </MessageAppImage>
          </div>
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
