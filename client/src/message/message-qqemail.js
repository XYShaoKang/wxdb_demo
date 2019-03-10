import React from 'react'

const MessageQQemail = ({
  content: {
    pushmail: { waplink, sender, subject, digest },
  },
}) => {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        width: '100%',
        color: '#000',
        cursor: 'pointer',
      }}
      onClick={() => {
        const w = window.open('about:blank')
        w.location.href = waplink
      }}
    >
      <h2>{sender}</h2>
      <div>{subject}</div>
      <div
        style={{
          color: '#999',
        }}
      >
        {digest}
      </div>
    </div>
  )
}

export default MessageQQemail
