import React from 'react'
import { Icon } from 'antd'
import MessageAppFooter from './MessageAppFooter'
import MessagAppTitle from './MessagAppTitle'
import MessagAppDes from './MessagAppDes'
import MessageAppImage from './MessageAppImage'

const MessageAppArticle = ({ imgPath, appInfo, title, des, quoteUrl }) => {
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
        style={{ cursor: quoteUrl ? 'pointer' : 'default', padding: 10 }}
        onClick={() => {
          if (quoteUrl) {
            const w = window.open('about:blank')
            w.location.href = quoteUrl
          }
        }}
      >
        <MessagAppTitle title={title} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              padding: '0 10px 0 0',
            }}
          >
            <MessagAppDes des={des} />
          </div>
          <MessageAppImage imgPath={imgPath}>
            {!imgPath && <Icon type='link' />}
          </MessageAppImage>
        </div>
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

export default MessageAppArticle
