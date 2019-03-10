import React from 'react'
import { Card, List } from 'antd'

const { Meta } = Card

const MessageMpArticle = ({
  content: {
    appmsg: {
      mmreader: { items },
    },
  },
}) => {
  const [item, ...data] = items
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
              item.cover
            }") center center / cover no-repeat`,
            display: 'flex',
            alignItems: 'flex-end',
            cursor: 'pointer',
          }}
          onClick={() => {
            const w = window.open('about:blank')
            w.location.href = item.url
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
              {item.title}
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
                  w.location.href = item.url
                }}
              >
                <div>{item.title}</div>
                <img
                  src={`/image?url=${item.cover}`}
                  alt={item.digest}
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
          title={item.title}
          description={item.digest}
        />
      )}
    </Card>
  )
}

export default MessageMpArticle
