import React, { Component } from 'react'
import { List, message, Avatar, Spin } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import './user-list.css'

export default class UserList extends Component {
  state = {
    userList: [],
    data: [],
    loading: false,
    hasMore: true,
    page: 0,
    pageSize: 10,
    dataEnd: false,
  }
  handleInfiniteOnLoad = index => {
    let { page, pageSize, dataEnd } = this.state
    const { typeKey } = this.props
    this.setState({
      loading: true,
    })
    if (dataEnd) {
      message.warning('已加载所有好友')
      this.setState({
        hasMore: false,
        loading: false,
      })
      return
    }
    fetch(
      `/users?page=${page + 1}&pageSize=${pageSize}${
        typeKey !== 0 ? `&type=${typeKey}` : ''
      }`,
    )
      .then(res => res.json())
      .then(users => {
        this.setState(({ data, page }) => ({
          data: data.concat(users),
          loading: false,
          page: page + 1,
          dataEnd: !(users.length === pageSize),
        }))
      })
  }
  componentDidMount() {
    this._loadUserData()
  }
  componentDidUpdate(prevProps) {
    if (this.props.typeKey !== prevProps.typeKey) {
      this.setState(
        {
          userList: [],
          data: [],
          loading: false,
          hasMore: true,
          page: 0,
          pageSize: 10,
          dataEnd: false,
        },
        () => {
          this._loadUserData()
        },
      )
    }
  }
  _loadUserData() {
    const { page, pageSize } = this.state
    const { typeKey } = this.props
    fetch(
      `/users?page=${0}&pageSize=${20}${
        typeKey !== 0 ? `&type=${typeKey}` : ''
      }`,
    )
      .then(res => res.json())
      .then(users => {
        this.setState(state => ({
          data: users,
          page: 1,
          dataEnd: !(users.length === 20),
        }))
      })
  }
  render() {
    const { data } = this.state
    const { selectUser } = this.props
    return (
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={this.handleInfiniteOnLoad}
        hasMore={!this.state.loading && this.state.hasMore}
        useWindow={false}
        style={{
          position: 'relative',
        }}
      >
        <List
          size='small'
          style={{ width: '100%' }}
          bordered={true}
          dataSource={data}
          renderItem={item => (
            <List.Item key={item.username}>
              <List.Item.Meta
                style={{ cursor: 'pointer' }}
                avatar={
                  <Avatar
                    src={`/image?url=${encodeURIComponent(
                      item.reserved1 || item.reserved2 || '',
                    )}`}
                    size='small'
                  />
                }
                title={
                  <a>
                    {item.conRemark
                      ? `${item.conRemark} - [${item.nickname}]`
                      : item.nickname}
                  </a>
                }
                onClick={e => selectUser(item)}
                // description={JSON.stringify(item,null,2)}
              />
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
