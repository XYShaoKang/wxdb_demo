import React, { Component } from 'react'
import UserList from './user-list'
import Message from './message'

export default class Chat extends Component {
  state = {
    user: '',
    messages: [],
  }
  selectUser = user => {
    fetch(`/message?username=${user.username}`)
      .then(res => res.json())
      .then(messages => {
        console.log(messages)
        this.setState(state => ({ messages, user }))
      })
    // console.log(username)
  }
  render() {
    return (
      <div
        style={{
          display: 'flex',
          height: 500,
        }}
      >
        <div
          style={{
            overflowY: 'auto',
            width: 200,
            flexShrink: 0,
          }}
        >
          <UserList selectUser={this.selectUser} />
        </div>
        <div
          style={{
            overflowY: 'auto',
            width: '100%',
          }}
        >
          <Message messages={this.state.messages} user={this.state.user} />
        </div>
      </div>
    )
  }
}
