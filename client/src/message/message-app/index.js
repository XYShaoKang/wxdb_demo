import React, { Component } from 'react'
import { Card, Avatar, Tooltip } from 'antd'
import MessageAppAudio from './message-app-audio'
import MessageAppVideo from './message-app-video'
import MessageAppArticle from './message-app-article'
import MessageAppFile from './message-app-file'
import MessageAppRecord from './message-app-record'
import MessageAppWeapp from './message-app-weapp'

export default class MessageApp extends Component {
  state = {
    appInfo: {},
  }
  componentDidMount() {
    const {
      _attributes: { appid },
    } = this.props.content.msg.appmsg
    if (appid) {
      fetch(`/appInfo?appId=${appid}`)
        .then(res => res.json())
        .then(([appInfo]) => {
          this.setState({ appInfo })
        })
    }
  }
  render() {
    const { imgPath, msgId } = this.props
    const {
      type: { data: type },
      title: { data: title },
      des: { data: des },
      url: { data: quoteUrl },
    } = this.props.content.msg.appmsg
    const { appInfo = {} } = this.state
    let content = <div>{type}</div>
    if (true) {
      content = (
        <Card
          title={<Tooltip title={title}>{title}</Tooltip>}
          // extra={<a href='#'>More</a>}
          style={{ width: 200 }}
          size='small'
          type='inner'
          hoverable={true}
          actions={
            appInfo?.appName && [
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
    }
    if (type === '3') {
      const audioUrl = this.props.content.msg.appmsg.dataurl.data
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
    } else if (type === '4') {
      content = (
        <MessageAppVideo
          quoteUrl={quoteUrl}
          imgPath={imgPath}
          appInfo={appInfo}
          title={title}
          des={des}
        />
      )
    } else if (type === '5' || type === '7') {
      content = (
        <MessageAppArticle
          quoteUrl={quoteUrl}
          imgPath={imgPath}
          appInfo={appInfo}
          title={title}
          des={des}
        />
      )
    } else if (type === '6') {
      const {
        totallen: { data: size },
        fileext: { data: fileext },
      } = this.props.content.msg.appmsg.appattach
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
    } else if (type === '19') {
      const datalist = this.props.content.msg.appmsg.recorditem.data.recordinfo
        .datalist.dataitem
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
    } else if (type === '33' || type === '36') {
      const weappiconurl = this.props.content.msg.appmsg.weappinfo.weappiconurl
        .data

      const wxappUsername = this.props.content.msg.appmsg.weappinfo.username
        .data
      const sourcedisplayname = this.props.content.msg.appmsg.sourcedisplayname
        ?.data
      content = (
        <MessageAppWeapp
          quoteUrl={quoteUrl}
          imgPath={imgPath}
          appInfo={appInfo}
          title={title}
          des={des}
          weappiconurl={weappiconurl}
          sourcedisplayname={sourcedisplayname}
          wxappUsername={wxappUsername}
        />
      )
    }
    return content
  }
}
