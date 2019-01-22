import React, { Component } from 'react'

const MessageImage = ({ msgId }) => (
  <img
    src={`http://localhost:8080/image?msgId=${msgId}`}
    alt=''
    style={{ width: '100%' }}
  />
)
export default MessageImage
