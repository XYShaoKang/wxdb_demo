import React from 'react'
import { Card, Avatar, Tooltip } from 'antd'
import MessageAppAudio from './MessageAppAudio'
import MessageAppVideo from './MessageAppVideo'
import MessageAppArticle from './MessageAppArticle'
import MessageAppFile from './MessageAppFile'
import MessageAppRecord from './MessageAppRecord'
import MessageAppWeapp from './MessageAppWeapp'

const MessageApp = ({
  imgPath,
  msgId,
  content: {
    appmsg,
    appmsg: { appInfo, type, title, des, url: quoteUrl },
  },
}) => {
  let content = <div>{type}</div>

  content = (
    <Card
      title={<Tooltip title={title}>{title}</Tooltip>}
      // extra={<a href='#'>More</a>}
      style={{ width: 200 }}
      size='small'
      type='inner'
      hoverable={true}
      actions={
        appInfo && [
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Avatar src={appInfo.appWatermarkUrl} />
            <div
              style={{
                marginLeft: 5,
              }}
            >
              {appInfo.appName}
            </div>
          </div>,
        ]
      }
    >
      <p>{des}</p>
    </Card>
  )

  if (type === 3) {
    const { dataurl: audioUrl } = appmsg

    content = (
      <MessageAppAudio
        quoteUrl={quoteUrl}
        src={audioUrl}
        imgPath={imgPath}
        appInfo={appInfo}
        title={title}
        des={des}
      />
    )
  } else if (type === 4) {
    content = (
      <MessageAppVideo
        quoteUrl={quoteUrl}
        imgPath={imgPath}
        appInfo={appInfo}
        title={title}
        des={des}
      />
    )
  } else if (type === 5 || type === 7) {
    content = (
      <MessageAppArticle
        quoteUrl={quoteUrl}
        imgPath={imgPath}
        appInfo={appInfo}
        title={title}
        des={des}
      />
    )
  } else if (type === 6) {
    const { totallen: size, fileext } = appmsg.appattach
    content = (
      <MessageAppFile
        quoteUrl={quoteUrl}
        imgPath={imgPath}
        appInfo={appInfo}
        title={title}
        des={des}
        size={size}
        fileext={fileext}
        msgId={msgId}
      />
    )
  } else if (type === 19) {
    const datalist = appmsg.recorditem
    content = (
      <MessageAppRecord
        quoteUrl={quoteUrl}
        imgPath={imgPath}
        appInfo={appInfo}
        title={title}
        des={des}
        datalist={datalist}
      />
    )
  } else if (type === 33 || type === 36) {
    const { weappinfo, sourcedisplayname } = appmsg
    content = (
      <MessageAppWeapp
        quoteUrl={quoteUrl}
        imgPath={imgPath}
        appInfo={appInfo}
        title={title}
        des={des}
        weappinfo={weappinfo}
        sourcedisplayname={sourcedisplayname}
      />
    )
  }
  return content
}

export default MessageApp
