import React, { Component } from 'react'

export default class MessagAppDes extends Component {
  render() {
    const { des } = this.props
    return (
      <div
        dangerouslySetInnerHTML={{ __html: des }}
        style={{
          color: '#aaa',
          fontSize: 12,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          wordBreak: 'break-all',
        }}
      />
    )
  }
}
