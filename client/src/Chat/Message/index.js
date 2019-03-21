import React, { Component } from 'react'
import { Layout } from 'antd'
import MessageList from './MessageList'

export default class Message extends Component {
  render() {
    const { user, me, typeKey } = this.props
    return (
      <div
        style={{
          overflow: 'hidden',
          height: '100%',
        }}
      >
        <div
          style={{
            position: 'fixed',
            zIndex: 1,
            padding: '5px 10px',
            backgroundColor: '#999',
            color: '#fff',
            width: '100%',
            height: 30,
            // lineHeight: '18px',
          }}
        >
          {user.conRemark || user.nickname || ''}
        </div>
        <div
          style={{
            overflowY: 'auto',
            height: '100%',
            marginTop: 30,
            paddingBottom: 30,
            backgroundColor: '#f0f0f0',
          }}
        >
          <MessageList user={user} me={me} typeKey={typeKey} />
        </div>
      </div>
    )
  }
}
