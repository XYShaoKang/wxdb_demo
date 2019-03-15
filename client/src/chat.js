import React, { Component } from 'react'
import { Query } from 'react-apollo'

import ME_QUERY from '../schema/ME_QUERY.graphql'
import UserList from './user-list'
import Message from './message'

export default class Chat extends Component {
  state = {
    user: '',
    messages: [],
    currentUser: null,
    me: {},
  }
  selectUser = user => {
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
            <Query query={ME_QUERY}>
              {({ loading, error, data: { me }, subscribeToMore }) => {
                if (loading) return <div>Fetching</div>
                if (error) return <div>Error</div>
                return (
                  <Message
                    key={currentUser}
                    user={currentUser}
                    me={me}
                    typeKey={typeKey}
                  />
                )
              }}
            </Query>
          )}
        </div>
      </div>
    )
  }
}
