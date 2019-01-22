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
  }
  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => {
        this.setState(state => ({
          userList: users,
          data: users.slice(0, 20),
        }))
        this.props.selectUser(users[0])
      })
  }
  handleInfiniteOnLoad = index => {
    let { data, userList } = this.state
    this.setState({
      loading: true,
    })
    if (userList.length <= (index + 1) * 10) {
      message.warning('已加载所有好友')
      this.setState({
        hasMore: false,
        loading: false,
      })
      return
    }
    data = data.concat(userList.slice((index + 1) * 10, (index + 2) * 10))
    this.setState({
      data,
      loading: false,
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
      >
        <List
          size='small'
          style={{ width: '100%' }}
          bordered={true}
          dataSource={data}
          renderItem={item => (
            <List.Item key={item.username} onClick={e => selectUser(item)}>
              <List.Item.Meta
                avatar={<Avatar src={item.reserved1} size='small' />}
                title={
                  <a>
                    {item.conRemark
                      ? `${item.conRemark} - [${item.nickname}]`
                      : item.nickname}
                  </a>
                }
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
