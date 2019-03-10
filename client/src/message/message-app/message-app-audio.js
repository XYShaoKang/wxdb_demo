import React, { Component } from 'react'
import { Howl } from 'howler'
import { Icon } from 'antd'
import MessageAppFooter from './message-app-footer'
import MessageAppImage from './message-app-image'

export default class MessageAppAudio extends Component {
  constructor(props) {
    super(props)

    this.state = {
      audioSrc: props.src,
      play: false,
    }
  }
  onPlay = e => {
    e.stopPropagation()
    const { play, audioSrc } = this.state
    if (!this.sound) {
      this.sound = new Howl({
        src: [`/proxy?url=${encodeURIComponent(audioSrc)}`],
        format: 'webm',
      })
    }
    if (play) {
      this.sound.pause()
    } else {
      this.sound.play()
    }
    this.setState({ play: !play })
  }
  render() {
    const { imgPath, appInfo, title, des, quoteUrl } = this.props
    const { play } = this.state
    return (
      <div
        style={{
          fontSize: 12,
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
          <div>
            <div>{title}</div>
            <div>{des}</div>
          </div>
          <MessageAppImage imgPath={imgPath} onClick={this.onPlay}>
            <Icon type={play ? 'pause-circle' : 'play-circle'} />
          </MessageAppImage>
        </div>
        {appInfo && (
          <MessageAppFooter
            appWatermarkUrl={appInfo.appWatermarkUrl}
            appName={appInfo.appName}
          />
        )}
      </div>
    )
  }
}
