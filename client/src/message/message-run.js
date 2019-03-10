import React from 'react'
import MessageRunLike from './message-run-like'

const MessageRun = ({
  content: {
    appmsg: {
      hardwareinfo: {
        tipdisplay,
        fontcolor,
        championuser,
        rankinfo: { rankdisplay, ranktitle, scoredisplay, scoretitle },
      },
    },
  },
}) => {
  const { reserved1, reserved2 } = championuser || {}
  const iconUrl = reserved1 || reserved2
  return (
    <div
      style={{
        borderRadius: 5,
        width: 260,
        backgroundColor: '#fff',
      }}
    >
      <div
        style={{
          color: fontcolor,
          display: 'flex',
          justifyContent: 'space-between',
          margin: 10,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 35,
              fontWeight: 500,
            }}
          >
            {rankdisplay}
          </div>
          <div>{ranktitle}</div>
        </div>
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <div
            style={{
              fontSize: 35,
              fontWeight: 500,
            }}
          >
            {scoredisplay}
          </div>
          <div>{scoretitle}</div>
        </div>
      </div>
      <hr
        style={{
          margin: '0 10px 0',
          borderTop: '1px solid #aaa',
        }}
      />
      <MessageRunLike title={tipdisplay} iconUrl={iconUrl} />
    </div>
  )
}

export default MessageRun
