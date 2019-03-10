import React, { Component } from 'react'

export default class MessagAppTitle extends Component {
  render() {
    const { title } = this.props
    return (
      <div
        dangerouslySetInnerHTML={{ __html: title }}
        style={{
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
