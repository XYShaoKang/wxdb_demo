import React from 'react'

const MessagAppTitle = ({ title }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: title }}
      style={{
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

export default MessagAppTitle
