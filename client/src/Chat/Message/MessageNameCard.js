import React from 'react'
import { Avatar } from 'antd'
import MessageHongbaoBase from './MessageHongbaoBase'

const MessageNameCard = ({
  content: {
    namecardmsg: {
      nickname,
      bigheadimgurl,
      smallheadimgurl,
      brandIconUrl,
      username,
      user,
    },
  },
}) => {
  const ismp = /^gh_/.test(username)
  const { reserved1, reserved2 } = user || {}
  const iconUrl =
    brandIconUrl ||
    bigheadimgurl ||
    smallheadimgurl ||
    reserved1 ||
    reserved2 ||
    ''
  const backgroundColor = '#fff'

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
export default MessageNameCard
