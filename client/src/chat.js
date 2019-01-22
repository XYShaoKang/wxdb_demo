import React, { Component } from 'react'
import UserList from './user-list'
import Message from './message'

export default class Chat extends Component {
  state = {
    user: '',
    messages: [],
    me: {},
  }
  componentDidMount() {
    fetch('http://localhost:8080/me')
      .then(res => res.json())
      .then(me => {
        this.setState({ me: me[0] })
      })
  }
  selectUser = user => {
    fetch(`/message?username=${user.username}`)
      .then(res => res.json())
      .then(messages => {
        this.setState(state => ({ messages, user }))
      })
    // console.log(username)
  }
  render() {
    return (
      <div
        style={{
          display: 'flex',
          height: '100vh',
          width: '100%',
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
          <Message
            messages={this.state.messages}
            user={this.state.user}
            me={this.state.me}
          />
        </div>
      </div>
    )
  }
}
