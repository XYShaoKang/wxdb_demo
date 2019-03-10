import React, { Component } from 'react'
import { Howl, Howler } from 'howler'
import { Button, Icon, Avatar, Card, Tooltip, List } from 'antd'

const { Meta } = Card

export default class MessageMpArticle extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { category } = this.props.content.appmsg.mmreader
    const {
      $count: { data: count },
      $type: { data: type },
      item,
    } = category
    const data = []
    for (let i = 1; i < parseInt(count); i++) {
      data.push(category[`item${i}`])
    }
    // console.log(category, data)
    return (
      <Card
        style={{ width: '100%', borderRadius: 10, overflow: 'hidden' }}
        bodyStyle={{
          padding: 10,
        }}
        cover={
          <div
            style={{
              height: 200,
              width: '100%',
              background: `url("/image?url=${
                item.cover.data
              }") center center / cover no-repeat`,
              display: 'flex',
              alignItems: 'flex-end',
              cursor: 'pointer',
            }}
            onClick={() => {
              const w = window.open('about:blank')
              w.location.href = item.url.data
            }}
          >
            {data.length > 0 && (
              <div
                style={{
                  margin: 10,
                  color: '#fff',
                  fontSize: 18,
                  fontWeight: 700,
                  textShadow: '#07f 2px 1px 2px',
                }}
              >
                {item.title.data}
              </div>
            )}
          </div>
        }
      >
        {data.length > 0 ? (
          <List
            size='small'
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    const w = window.open('about:blank')
                    w.location.href = item.url.data
                  }}
                >
                  <div>{item.title.data}</div>
                  <img
                    src={`/image?url=${item.cover.data}`}
                    alt={item.digest?.data}
                    style={{
                      width: 40,
                      height: 40,
                    }}
                  />
                </div>
              </List.Item>
            )}
          />
        ) : (
          <Meta
            style={{
              textAlign: 'center',
            }}
            title={item.title.data}
            description={item.digest?.data}
          />
        )}
      </Card>
    )
  }
}
