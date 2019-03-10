import React, { Component } from 'react'
import { List, message, Spin } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import MessageContent from './message-content'
import { withApollo } from 'react-apollo'

import Gallery from './Gallery'
import MESSAGE_QUERY from '../../schema/MESSAGE_QUERY.graphql'

const PAGE_SIZE = 20

class MessageList extends Component {
  state = {
    messages: [],
    images: [],
    loading: false,
    hasMore: true,
    page: 0,
    pageSize: PAGE_SIZE,
    dataEnd: false,
    showGallery: false,
    currentImage: 0,
  }
  // 滚动加载
  handleInfiniteOnLoad = async () => {
    let { dataEnd } = this.state
    this.setState({
      loading: true,
    })
    if (dataEnd) {
      message.warning('已加载所有信息')
      this.setState({
        hasMore: false,
        loading: false,
      })
      return
    }
    this._loadMessageData()
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.user !== prevProps.user ||
      this.props.typeKey !== prevProps.typeKey
    ) {
      this.setState({
        isLodaing: true,
        messages: [],
        images: [],
        loading: false,
        hasMore: true,
        page: 0,
        pageSize: PAGE_SIZE,
        dataEnd: false,
      })
    }
  }
  _loadMessageData = async () => {
    const { user, typeKey } = this.props
    const { page, pageSize } = this.state

    const {
      data: { messages },
    } = await this.props.client.query({
      query: MESSAGE_QUERY,
      variables: { username: user.username, page, pageSize, type: typeKey },
    })

    this.setState(state => {
      const allMessages = state.messages.concat(messages)
      return {
        messages: allMessages,
        images: allMessages.filter(
          m => m.type === 3 || m.type === 1048625 || m.type === 268435505,
        ),
        page: state.page + 1,
        loading: false,
        isLodaing: false,
        dataEnd: !(messages.length === pageSize),
      }
    })
  }
  openGallery = msgId => {
    const { images } = this.state
    this.setState({
      showGallery: true,
      currentImage: images.findIndex(i => i.msgId === msgId),
    })
  }
  closeGallery = () => {
    this.setState({
      showGallery: false,
      currentImage: 0,
    })
  }
  render() {
    const { user, me } = this.props
    const {
      messages,
      images,
      isLodaing,
      hasMore,
      loading,
      showGallery,
      currentImage,
    } = this.state
    return (
      <InfiniteScroll
        initialLoad={true}
        pageStart={0}
        loadMore={this.handleInfiniteOnLoad}
        hasMore={!loading && hasMore}
        useWindow={false}
        style={{
          position: 'relative',
          // height: '100%',
        }}
      >
        <List
          size='small'
          bordered={true}
          loading={isLodaing}
          dataSource={messages}
          rowKey={item => item.msgId}
          renderItem={item => (
            <List.Item>
              <MessageContent
                message={item}
                user={user}
                me={me}
                openGallery={this.openGallery}
              />
            </List.Item>
          )}
          style={{
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            height: '100%',
          }}
        />
        <Gallery
          images={images.map(m => ({
            src: `/image?msgId=${m.msgId}`,
            thumbnail: `/image?imgPath=${m.imgPath}`,
          }))}
          showThumbnails
          lightboxIsOpen={showGallery}
          currentImage={currentImage}
          closeGallery={this.closeGallery}
        />
        {loading && hasMore && (
          <div className='demo-loading-container'>
            <Spin />
          </div>
        )}
      </InfiniteScroll>
    )
  }
}

export default withApollo(MessageList)
