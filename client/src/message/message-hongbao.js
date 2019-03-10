import React, { Component } from 'react'
import { Avatar } from 'antd'
import MessageHongbaoBase from './message-hongbao-base'

export default class MessageHongbao extends Component {
  render() {
    const { iconurl, sendertitle } = this.props.content.appmsg.wcpayinfo
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
