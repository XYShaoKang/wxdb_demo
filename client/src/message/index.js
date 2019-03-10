import React, { Component } from 'react'
import {
  List,
  Avatar,
  Icon,
  message,
  Spin,
  Layout,
  Menu,
  Breadcrumb,
} from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import MessageContent from './message-content'
import MessageList from './message-list'

const { Header, Content, Footer } = Layout

export default class Message extends Component {
  state = {
    isLodaing: true,
    messages: [],
    loading: false,
    hasMore: true,
    page: 0,
    pageSize: 10,
    dataEnd: false,
  }

  render() {
    const { user, me, typeKey } = this.props
    const { messages, isLodaing, hasMore, loading } = this.state
    console.log(this.state)
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
