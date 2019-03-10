import React from 'react'

const MessagAppDes = ({ des }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: des }}
      style={{
        color: '#aaa',
        fontSize: 12,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2,
        wordBreak: 'break-all',
      }}
    />
  )
}

export default MessagAppDes
