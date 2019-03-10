import React, { Component } from 'react'
import UserList from './user-list'
import Message from './message'

export default class Chat extends Component {
  state = {
    user: '',
    messages: [],
    currentUser: null,
    me: {},
  }
  componentDidMount() {
    fetch('/me')
      .then(res => res.json())
      .then(me => {
        this.setState({ me: me[0] })
      })
  }
  selectUser = user => {
    // fetch(`/message?username=${user.username}&page=0`)
    //   .then(res => res.json())
    //   .then(messages => {
    //     this.setState(state => ({ messages, user }))
    //   })
    // console.log(username)
    this.setState({ currentUser: user })
  }
  render() {
    const { currentUser, me } = this.state
    const { typeKey } = this.props
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
          <UserList selectUser={this.selectUser} typeKey={typeKey} />
        </div>
        <div
          style={{
            width: '100%',
          }}
        >
          {currentUser && (
            <Message
              key={currentUser}
              user={currentUser}
              me={me}
              typeKey={typeKey}
            />
          )}
        </div>
      </div>
    )
  }
}
