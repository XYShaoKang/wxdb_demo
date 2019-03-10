import React, { Component } from 'react'
import { Howl, Howler } from 'howler'
import { Button, Icon, Avatar, Card, Tooltip } from 'antd'
import fetch from 'node-fetch'
import MessageAppFooter from './message-app-footer'
import MessagAppTitle from './message-app-title'
import MessagAppDes from './message-app-des'

export default class MessageAppWeapp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wxappInfo: {},
    }
  }
  componentDidMount() {
    const { wxappUsername } = this.props
    fetch(`/wxappInfo?username=${encodeURIComponent(wxappUsername)}`)
      .then(res => res.json())
      .then(([wxappInfo]) => {
        wxappInfo && this.setState({ wxappInfo })
      })
  }
  render() {
    const {
      imgPath,
      appInfo,
      title,
      des,
      quoteUrl,
      weappiconurl,
      sourcedisplayname,
    } = this.props
    const { smallHeadURL, nickname } = this.state.wxappInfo
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
          {smallHeadURL && (
            <div>
              <Avatar
                src={`/proxy?url=${encodeURIComponent(smallHeadURL)}`}
                style={{
                  transform: 'scale(0.7)',
                }}
              />
              {nickname}
            </div>
          )}
          <div>
            <MessagAppTitle title={title} />
            <div
              style={{
                backgroundImage: imgPath && `url("/image?imgPath=${imgPath}")`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                flexShrink: 0,
                width: '100%',
                height: 210,
              }}
            />
          </div>
        </div>
        <div
          style={{
            padding: '0 0 0 10px',
            borderTop: '1px solid #aaa',
          }}
        >
          小程序
        </div>
      </div>
    )
  }
}
