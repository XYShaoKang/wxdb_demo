import React from 'react'
import { Avatar } from 'antd'
import MessageAppFooter from './MessageAppFooter'
import MessagAppTitle from './MessagAppTitle'
import MessagAppDes from './MessagAppDes'

const MessageAppFile = ({ appInfo, title, size, fileext }) => {
  return (
    <div
      style={{
        fontSize: 14,
        borderRadius: 10,
        width: 300,
        backgroundColor: '#fff',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: 10,
        }}
      >
        <div
          style={{
            padding: '0 10px 0 0',
          }}
        >
          <MessagAppTitle title={title} />
          <MessagAppDes des={size} />
        </div>
        <Avatar
          style={{
            backgroundImage: `url("/icon?ext=${fileext}")`,
            backgroundSize: '100% 100%',
            width: 40,
            flexShrink: 0,
            backgroundColor: '#fff',
          }}
          size='large'
          shape='square'
        />
      </div>
      {appInfo && (
        <MessageAppFooter
          appWatermarkUrl={appInfo.appWatermarkUrl}
          appName={appInfo.appName}
        />
      )}
    </div>
  )
}
export default MessageAppFile
