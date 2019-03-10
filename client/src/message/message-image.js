import React, { Component } from 'react'

const MessageImage = ({ msgId, imgPath }) => {
  return (
    <img
      src={imgPath ? `/image?imgPath=${imgPath}` : `/image?msgId=${msgId}`}
      alt=''
      style={{ width: '100%', height: '100%' }}
    />
  )
}
export default MessageImage
