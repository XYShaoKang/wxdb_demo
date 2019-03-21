import React from 'react'
import { Avatar } from 'antd'

const MessageAppFooter = ({ appWatermarkUrl, appName }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        borderTop: '1px solid #aaa',
        // transform: 'scale(0.5) translate(-24px)',
      }}
    >
      <Avatar
        src={appWatermarkUrl}
        style={{
          transform: 'scale(0.5)',
        }}
      />
      <div
        style={{
          // marginLeft: 5,
          color: '#aaa',
        }}
      >
        {appName}
      </div>
    </div>
  )
}

export default MessageAppFooter
