import React, { Component } from 'react'
import { Tooltip } from 'antd'
import { Player } from 'video-react'

export default class MessageMicroVideo extends Component {
  state = {
    showVideo: false,
  }
  render() {
    const { msgId } = this.props
    const { showVideo } = this.state

    return (
      <div
        onClick={() => {
          this.setState({ showVideo: true })
        }}
        style={{ width: '100%' }}
      >
        {showVideo ? (
          <Player>
            <source src={`/file?msgId=${msgId}&type=1`} />
          </Player>
        ) : (
          <img src={`/file?msgId=${msgId}&type=2`} alt='' />
        )}
      </div>
    )
  }
}
