import React, { Component } from 'react'

export default class MessageQQemail extends Component {
  render() {
    const {
      content,
      waplink: { data: waplink },
    } = this.props.content.msg.pushmail
    const {
      sender: { data: sender },
      subject: { data: subject },
      digest: { data: digest },
    } = content
    return (
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: 5,
          padding: 10,
          width: '100%',
          color: '#000',
          cursor: 'pointer',
        }}
        onClick={() => {
          const w = window.open('about:blank')
          w.location.href = waplink
        }}
      >
        <h2>{sender}</h2>
        <div>{subject}</div>
        <div
          style={{
            color: '#999',
          }}
        >
          {digest}
        </div>
      </div>
    )
  }
}
