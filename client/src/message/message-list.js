import React, { Component } from 'react'
import { List, Avatar, Icon, message, Spin } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import MessageContent from './message-content'
import ColumnGroup from 'antd/lib/table/ColumnGroup'

export default class MessageList extends Component {
  state = {
    messages: [],
    loading: false,
    hasMore: true,
    page: 0,
    pageSize: 10,
    dataEnd: false,
  }
  // 滚动加载
  handleInfiniteOnLoad = index => {
    let { page, pageSize, dataEnd } = this.state
    const { user, typeKey } = this.props
    this.setState({
      loading: true,
    })
    if (dataEnd) {
      message.warning('已加载所有信息')
      this.setState({
        hasMore: false,
        loading: false,
      })
      return
    }
    fetch(
      `/message?username=${user.username}&page=${page +
        1}&pageSize=${pageSize}${typeKey !== 0 ? `&type=${typeKey}` : ''}`,
    )
      .then(res => res.json())
      .then(data => {
        this.setState(({ messages, page }) => ({
          messages: messages.concat(data),
          loading: false,
          page: page + 1,
          dataEnd: !(data.length === pageSize),
        }))
      })
  }

  componentDidMount() {
    this._loadMessageData()
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.user !== prevProps.user ||
      this.props.typeKey !== prevProps.typeKey
    ) {
      this.setState(
        {
          isLodaing: true,
          messages: [],
          loading: false,
          hasMore: true,
          page: 0,
          pageSize: 10,
          dataEnd: false,
        },
        () => {
          this._loadMessageData()
        },
      )
    }
  }
  _loadMessageData() {
    const { user, typeKey } = this.props
    let { page, pageSize } = this.state
    fetch(
      `/message?username=${user.username}&page=${page}&pageSize=${pageSize}${
        typeKey !== 0 ? `&type=${typeKey}` : ''
      }`,
    )
      .then(res => res.json())
      .then(messages => {
        this.setState(({ pageSize }) => ({
          messages,
          isLodaing: false,
          dataEnd: !(messages.length === pageSize),
        }))
      })
  }
  render() {
    const { user, me } = this.props
    const { messages, isLodaing, hasMore, loading } = this.state
    return (
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={this.handleInfiniteOnLoad}
        hasMore={!loading && hasMore}
        useWindow={false}
        style={{
          position: 'relative',
          // height: '100%',
        }}
      >
        <List
          size='small'
          bordered={true}
          loading={isLodaing}
          dataSource={messages}
          rowKey={item => item.msgId}
          renderItem={item => (
            <List.Item>
              <MessageContent message={item} user={user} me={me} />
            </List.Item>
          )}
          style={{
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            height: '100%',
          }}
        />
        {loading && hasMore && (
          <div className='demo-loading-container'>
            <Spin />
          </div>
        )}
      </InfiniteScroll>
    )
  }
}
