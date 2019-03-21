import React, { Component } from 'react'
import { Icon, Avatar, Modal, List } from 'antd'
import MessageAppFooter from './MessageAppFooter'
import MessagAppTitle from './MessagAppTitle'
import MessagAppDes from './MessagAppDes'
import MessageAppImage from './MessageAppImage'

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
        {appInfo && (
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
                      <div>{item.sourcename}</div>
                      <div>{item.sourcetime}</div>
                    </div>
                  }
                  description={item.datatitle}
                />
              </List.Item>
            )}
          />
        </Modal>
      </div>
    )
  }
}
