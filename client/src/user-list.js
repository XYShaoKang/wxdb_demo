import React, { Component } from 'react'
import { List, Avatar, Icon } from 'antd'

export default class UserList extends Component {
  state = {
    userList: [],
    showUser: [],
    isLodaing: true,
  }
  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => {
        console.log(users)
        this.setState(state => ({ userList: users, isLodaing: false }))
      })
  }
  render() {
    const { userList, isLodaing } = this.state
    const { selectUser } = this.props
    return (
      <List
        // itemLayout='vertical'
        size='small'
        // pagination={{
        //   onChange: page => {
        //     console.log(page)
        //   },
        //   pageSize: 10,
        // }}
        style={{ width: '100%' }}
        bordered={true}
        loading={isLodaing}
        dataSource={userList}
        renderItem={item => (
          <List.Item key={item.username} onClick={() => selectUser(item)}>
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
    )
  }
}
