import React from 'react'
import { Icon, Avatar } from 'antd'

const MessageRunLike = ({ title, iconUrl, bordered }) => {
  return (
    <div
      style={{
        border: bordered ? bordered : '',
        width: 250,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
      }}
    >
      {iconUrl && (
        <Avatar
          src={`/image?url=${iconUrl}`}
          style={{
            margin: '0 10px 0 0',
            flexShrink: 0,
          }}
        />
      )}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        {title}
      </div>
      <Icon
        type='right'
        style={{
          flexShrink: 0,
        }}
      />
    </div>
  )
}

export default MessageRunLike
