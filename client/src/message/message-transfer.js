import React, { Component } from 'react'
import { Button, Icon, Avatar, Card, Tooltip, List } from 'antd'
import MessageHongbaoBase from './message-hongbao-base'

export default class MessageTransfer extends Component {
  render() {
    const { content, isSend, username } = this.props
    const {
      paysubtype: { data: paysubtype },
      feedesc: { data: feedesc },
    } = content.msg.appmsg.wcpayinfo
    let result = ''
    let backgroundColor = '#fa7'
    if (paysubtype === '1') {
      result = isSend === 0 ? `转账给你` : `转账给${username}`
      backgroundColor = '#f60'
    } else if (paysubtype === '3') {
      result = `已收钱`
    } else if (paysubtype === '4') {
      result = `以退还`
    }
    return (
      <MessageHongbaoBase
        backgroundColor={backgroundColor}
        icon={
          <Icon
            type={paysubtype === '1' ? 'swap' : 'check'}
            style={{
              width: 35,
              height: 35,
              fontSize: 20,
              border: '2px solid #fff',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}
          />
        }
        color={'#fff'}
        result={result}
        feedesc={feedesc}
        appName={'微信转账'}
      />
    )
    return <div />
  }
}
