import React, { Component } from 'react'
import { Icon, Avatar } from 'antd'

export default class MessageAppImage extends Component {
  render() {
    const { imgPath, children, onClick } = this.props
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
}
