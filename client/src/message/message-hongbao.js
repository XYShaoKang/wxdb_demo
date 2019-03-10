import React, { Component } from 'react'
import { Button, Icon, Avatar, Card, Tooltip, List } from 'antd'
import MessageHongbaoBase from './message-hongbao-base'

export default class MessageHongbao extends Component {
  render() {
    const { content } = this.props
    const {
      iconurl: { data: iconurl },
      sendertitle: { data: sendertitle },
    } = content.msg.appmsg.wcpayinfo
    let backgroundColor = '#f60'
    return (
      <MessageHongbaoBase
        backgroundColor={backgroundColor}
        icon={<Avatar src={`/image?url=${iconurl}`} shape='square' />}
        result={sendertitle}
        feedesc={''}
        appName={'微信红包'}
        color={'#fff'}
      />
    )
  }
}
