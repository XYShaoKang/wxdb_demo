import React, { Component } from 'react'
import { List, Card, Button } from 'antd'

export default class Files extends Component {
  render() {
    const { list, select } = this.props
    return (
      <div>
        <h2 style={{ width: 300, margin: 20, textAlign: 'center' }}>
          请选择要查看的数据库
        </h2>
        <Card title='PC' style={{ width: 300, margin: 20 }}>
          <List
            dataSource={list.filter(item => item.platform === 'pc')}
            renderItem={(item, index) => (
              <List.Item
                onClick={() => {
                  select(item)
                }}
              >
                <Button block> {item.fileName}</Button>
              </List.Item>
            )}
          />
        </Card>
        <Card title='ANDROID' style={{ width: 300, margin: 20 }}>
          <List
            dataSource={list.filter(item => item.platform === 'android')}
            renderItem={(item, index) => (
              <List.Item
                onClick={() => {
                  select(item)
                }}
              >
                <Button block> {item.fileName}</Button>
              </List.Item>
            )}
          />
        </Card>
      </div>
    )
  }
}
