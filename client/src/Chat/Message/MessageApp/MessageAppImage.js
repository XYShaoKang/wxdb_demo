import React from 'react'
import { Avatar } from 'antd'

const MessageAppImage = ({ imgPath, children, onClick }) => {
  return (
    <Avatar
      style={{
        backgroundImage: imgPath && `url("/image?imgPath=${imgPath}")`,
        backgroundSize: '100% 100%',
        width: 40,
        flexShrink: 0,
      }}
      size='large'
      shape='square'
      onClick={onClick}
    >
      {children}
    </Avatar>
  )
}

export default MessageAppImage
