import React, { Component } from 'react'
import { Howl, Howler } from 'howler'
import { Button, Icon, Avatar, Card, Tooltip, Modal, List } from 'antd'
import fetch from 'node-fetch'
import MessageAppFooter from './message-app-footer'
import MessagAppTitle from './message-app-title'
import MessagAppDes from './message-app-des'
import MessageAppImage from './message-app-image'

export default class MessageAppRecord extends Component {
  constructor(props) {
    super(props)
    this.state = { visible: false }
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleOk = e => {
    this.setState({
      visible: false,
    })
  }

  handleCancel = e => {
    this.setState({
      visible: false,
    })
  }
  render() {
    const { imgPath, appInfo, title, des, quoteUrl, datalist } = this.props
    const msgSvrId = datalist[0]._attributes.datasourceid
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
          onClick={this.showModal}
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
        {appInfo?.appName && (
          <MessageAppFooter
            appWatermarkUrl={appInfo.appWatermarkUrl}
            appName={appInfo.appName}
          />
        )}
        <Modal
          title='Basic Modal'
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <List
            size='small'
            bordered
            dataSource={datalist}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src='#' />}
                  title={
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>{item.sourcename.data}</div>
                      <div>{item.sourcetime.data}</div>
                    </div>
                  }
                  description={item.datatitle?.data}
                />
              </List.Item>
            )}
          />
        </Modal>
      </div>
    )
  }
}
