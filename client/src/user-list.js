import React, { Component, Fragment } from 'react'
import { List, message, Avatar, Spin } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import { withApollo } from 'react-apollo'

import USERS_QUERY from '../schema/USER_QUERY.graphql'
import './user-list.css'

class UserList extends Component {
  state = {
    users: [],
    loading: false,
    hasMore: true,
    page: 0,
    pageSize: 20,
    dataEnd: false,
  }
  handleInfiniteOnLoad = async () => {
    let { dataEnd } = this.state
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

    this._loadUserData()
  }
  componentDidUpdate(prevProps) {
    if (this.props.typeKey !== prevProps.typeKey) {
      this.setState({
        users: [],
        loading: false,
        hasMore: true,
        page: 0,
        pageSize: 20,
        dataEnd: false,
      })
    }
  }
  _loadUserData = async () => {
    let { page, pageSize } = this.state
    const { typeKey } = this.props

    const {
      data: { users },
    } = await this.props.client.query({
      query: USERS_QUERY,
      variables: { page, pageSize, type: typeKey },
    })

    this.setState(state => ({
      users: state.users.concat(users),
      page: page + 1,
      loading: false,
      dataEnd: !(users.length === pageSize),
    }))
  }
  render() {
    const { selectUser } = this.props
    const { users, loading, hasMore } = this.state
    return (
      <InfiniteScroll
        initialLoad={true}
        pageStart={0}
        loadMore={this.handleInfiniteOnLoad}
        hasMore={!loading && hasMore}
        useWindow={false}
        style={{
          position: 'relative',
        }}
      >
        <List
          size='small'
          style={{ width: '100%' }}
          bordered={true}
          dataSource={users}
          renderItem={user => (
            <List.Item key={user.username}>
              <List.Item.Meta
                style={{ cursor: 'pointer' }}
                avatar={
                  <Avatar
                    src={`/image?url=${encodeURIComponent(
                      user.reserved1 || user.reserved2 || '',
                    )}`}
                    size='small'
                  />
                }
                title={
                  <a>
                    {user.conRemark
                      ? `${user.conRemark} - [${user.nickname}]`
                      : user.nickname}
                  </a>
                }
                onClick={e => selectUser(user)}
              />
            </List.Item>
          )}
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

export default withApollo(UserList)
