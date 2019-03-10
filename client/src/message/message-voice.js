import React, { Component } from 'react'
import { Howl, Howler } from 'howler'
import { Button } from 'antd'

export default class MessageVoice extends Component {
  constructor(props) {
    super(props)

    this.state = {
      msgId: props.msgId,
      play: false,
    }
  }
  onPlay = () => {
    const { play, msgId } = this.state
    if (!this.sound) {
      this.sound = new Howl({
        src: [`/voice?msgId=${msgId}`],
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
    return (
      <Button
        type='primary'
        icon='sound'
        style={{ display: 'flex', width: 100 }}
        onClick={this.onPlay}
      />
    )
  }
}
