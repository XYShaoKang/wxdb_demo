import React, { Component } from 'react'
import { List, Avatar, Icon, message, Spin } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import MessageContent from './message-content'

export default class Message extends Component {
  state = {
    isLodaing: true,
    messages: [],
    data: [],
    loading: false,
    hasMore: true,
  }

  // 滚动加载
  handleInfiniteOnLoad = index => {
    let { data, messages } = this.state
    this.setState({
      loading: true,
    })
    if (messages.length <= (index + 1) * 10) {
      message.warning('已加载所有信息')
      this.setState({
        hasMore: false,
        loading: false,
      })
      return
    }
    data = data.concat(messages.slice((index + 1) * 10, (index + 2) * 10))
    this.setState({
      data,
      loading: false,
    })
  }
  static getDerivedStateFromProps(nextProp, prevState) {
    if (nextProp.messages !== prevState.messages) {
      // const voices = nextProp.messages.filter(m => m.type === 34)
      return {
        messages: nextProp.messages,
        data: nextProp.messages.slice(0, 20),
        // data: voices,
        loading: false,
        hasMore: true,
      }
    }
    return null
  }
  render() {
    const { isLodaing, messages, user, me } = this.props
    return (
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={this.handleInfiniteOnLoad}
        hasMore={!this.state.loading && this.state.hasMore}
        useWindow={false}
      >
        <List
          size='small'
          bordered={true}
          loading={false}
          dataSource={this.state.data}
          renderItem={item => (
            <List.Item key={item.username}>
              <MessageContent message={item} user={user} me={me} />
            </List.Item>
          )}
        />
        {this.state.loading && this.state.hasMore && (
          <div className='demo-loading-container'>
            <Spin />
          </div>
        )}
      </InfiniteScroll>
    )
  }
}
