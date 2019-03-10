import React, { Component } from 'react'
import { Button, Icon, Avatar, Card, Tooltip, List } from 'antd'
import MessageHongbaoBase from './message-hongbao-base'

export default class MessageNameCard extends Component {
  state = {
    nickname: '',
    iconUrl: '',
    ismp: false,
  }
  componentDidMount() {
    const {
      nickname,
      bigheadimgurl,
      smallheadimgurl,
      brandIconUrl,
      username,
    } = this.props.content.msg._attributes
    // this.setState({ nickname, brandIconUrl })
    const url = brandIconUrl || bigheadimgurl || smallheadimgurl || ''
    const ismp = /^gh_/.test(username)
    if (url === '') {
      console.log(username)
      fetch(`/user?username=${username}`)
        .then(res => res.json())
        .then(([{ reserved1, reserved2 } = {}]) => {
          this.setState({
            ismp,
            nickname,
            iconUrl: reserved1 || reserved2 || '',
          })
        })
    } else {
      this.setState({ ismp, nickname, iconUrl: url })
    }
  }

  render() {
    const { nickname, iconUrl, ismp } = this.state
    let backgroundColor = '#fff'
    return (
      nickname && (
        <MessageHongbaoBase
          backgroundColor={backgroundColor}
          icon={<Avatar src={`/image?url=${iconUrl}`} shape='square' />}
          result={nickname}
          feedesc={''}
          appName={ismp ? '公众号名片' : '个人名片'}
          color={'#000'}
        />
      )
    )
  }
}
