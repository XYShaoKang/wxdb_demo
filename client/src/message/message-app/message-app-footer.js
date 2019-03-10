import React, { Component } from 'react'
import { Avatar } from 'antd'

export default class MessageAppFooter extends Component {
  render() {
    const { appWatermarkUrl, appName } = this.props
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderTop: '1px solid #aaa',
          // transform: 'scale(0.5) translate(-24px)',
        }}
      >
        <Avatar
          src={appWatermarkUrl}
          style={{
            transform: 'scale(0.5)',
          }}
        />
        <div
          style={{
            // marginLeft: 5,
            color: '#aaa',
          }}
        >
          {appName}
        </div>
      </div>
    )
  }
}
