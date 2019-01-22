import React, { Component } from 'react'
import DB from './db'
import Chat from './chat'

export default class App extends Component {
  state = {
    showDB: false,
    showUser: true,
  }
  render() {
    const { showDB, showUser } = this.state
    return (
      <div
        style={{
          display: 'flex',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection:'column'
          }}
        >
          <button
            onClick={() => {
              this.setState({ showUser: false, showDB: true })
            }}
          >
            查看数据库
          </button>
          <button
            onClick={() => {
              this.setState({ showUser: true, showDB: false })
            }}
          >
            查看用户
          </button>
        </div>
        {showDB && <DB />}
        {showUser && <Chat />}
      </div>
    )
  }
}
