import React from 'react'
import { Icon } from 'antd'
import MessageAppFooter from './message-app-footer'
import MessagAppTitle from './message-app-title'
import MessagAppDes from './message-app-des'
import MessageAppImage from './message-app-image'

const MessageAppVideo = ({ imgPath, appInfo, title, des, quoteUrl }) => {
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
          cursor: 'pointer',
        }}
        onClick={() => {
          const w = window.open('about:blank')
          w.location.href = quoteUrl
        }}
      >
        <div
          style={{
            padding: '0 10px 0 0',
          }}
        >
          <MessagAppTitle title={title} />
          <MessagAppDes des={des} />
        </div>
        <MessageAppImage imgPath={imgPath}>
          <Icon type='video-camera' />
        </MessageAppImage>
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

export default MessageAppVideo
