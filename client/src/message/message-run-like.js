import React, { Component } from 'react'
import { Button, Icon, Avatar, Card, Tooltip, List } from 'antd'

export default class MessageRunLike extends Component {
  state = {
    user: {},
  }
  componentDidMount() {
    const { displayusername } = this.props

    fetch(`/user?username=${displayusername}`)
      .then(res => res.json())
      .then(([user]) => {
        this.setState({ user })
      })
  }
  render() {
    const { title, bordered } = this.props
    const { user } = this.state
    const iconUrl = user.reserved1 || user.reserved2
    return (
      <div
        style={{
          border: bordered ? bordered : '',
          width: 250,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
          borderRadius: 5,
          backgroundColor: '#fff',
        }}
      >
        {iconUrl && (
          <Avatar
            src={`/image?url=${iconUrl}`}
            style={{
              margin: '0 10px 0 0',
              flexShrink: 0,
            }}
          />
        )}
        <div
          style={{
            width: '100%',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </div>
        <Icon
          type='right'
          style={{
            flexShrink: 0,
          }}
        />
      </div>
    )
  }
}
