import React, { Component } from 'react'
import { List, Avatar, Icon } from 'antd'

export default class Message extends Component {
  state = {
    isLodaing: true,
    messages: [],
  }
  render() {
    const { isLodaing, messages, user } = this.props
    console.log(messages)
    return (
      <div>
        <List
          // itemLayout='vertical'
          size='small'
          // pagination={{
          //   onChange: page => {
          //     console.log(page)
          //   },
          //   pageSize: 10,
          // }}
          // style={{ width: '80%' }}
          bordered={true}
          loading={false}
          dataSource={messages}
          renderItem={item => (
            <List.Item key={item.username}>
              <List.Item.Meta
                avatar={<Avatar src={item.reserved1} size='small' />}
                title={
                  <a href={user.username}>
                    {user.conRemark ? `${user.conRemark}` : user.nickname}
                  </a>
                }
                description={
                  <div
                    style={{
                      width: 500,
                      wordWrap: 'break-word',
                    }}
                  >
                    {item.content}
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
    )
  }
}
