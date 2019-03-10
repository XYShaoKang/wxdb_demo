import React, { Component } from 'react'
import DB from './db'
import Chat from './chat'
import { Button, Menu, Dropdown, Icon, message } from 'antd'

const typeData = [
  { type: 0, typeName: '所有消息' },
  { type: 1, typeName: '文本信息' },
  { type: 3, typeName: '图片信息' },
  { type: 34, typeName: '语音信息' },
  { type: 35, typeName: 'qq 邮箱消息' },
  { type: 42, typeName: '用户名片' },
  { type: 43, typeName: '视频' },
  { type: 47, typeName: '表情' },
  { type: 48, typeName: '地图' },
  { type: 49, typeName: '富文本 小程序 文件 群聊邀请消息' },
  { type: 50, typeName: '语音/视频通话' },
  { type: 62, typeName: '小视频' },
  { type: 64, typeName: '群语音通话' },
  { type: 10000, typeName: '系统信息' },
  { type: 1048625, typeName: 'gif' },
  { type: 16777265, typeName: '包含链接' },
  { type: 268435505, typeName: '分享图片' },
  { type: 285212721, typeName: '公众号推送文章' },
  { type: 318767153, typeName: '通知 微信团队安全登陆提醒' },
  { type: 419430449, typeName: '微信转账' },
  { type: 436207665, typeName: '微信红包' },
  { type: 469762097, typeName: '红包' },
  { type: 486539313, typeName: '公众号视频' },
  { type: 570425393, typeName: '微信群邀请加入消息' },
  { type: -1879048183, typeName: '微信运动别人点赞消息' },
  { type: -1879048185, typeName: '微信运动' },
  { type: -1879048186, typeName: '位置共享' },
]
export default class App extends Component {
  state = {
    showDB: false,
    showUser: true,
    typeKey: 0,
  }
  handleMenuClick = ({ key }) => {
    this.setState({ typeKey: parseInt(key) })
  }
  render() {
    const { showDB, showUser, typeKey } = this.state
    return (
      <div
        style={{
          display: 'flex',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Button
            onClick={() => {
              this.setState({ showUser: false, showDB: true })
            }}
          >
            查看数据库
          </Button>
          <Button
            onClick={() => {
              this.setState({ showUser: true, showDB: false })
            }}
          >
            查看用户
          </Button>
          {showUser && (
            <Dropdown
              overlay={
                <Menu
                  onClick={this.handleMenuClick}
                  style={{
                    height: 500,
                    overflow: 'auto',
                    backgroundColor: '#fff',
                    border: '1px solid #e8e8e8',
                  }}
                >
                  {typeData.map(({ type, typeName }) => (
                    <Menu.Item
                      key={type}
                    >{`${typeName} - [${type}]`}</Menu.Item>
                  ))}
                </Menu>
              }
              trigger={['click']}
            >
              <Button>
                消息类型 <Icon type='down' />
              </Button>
            </Dropdown>
          )}
          <div>当前类型: {typeKey}</div>
        </div>
        {showDB && <DB />}
        {showUser && <Chat typeKey={typeKey} />}
      </div>
    )
  }
}
