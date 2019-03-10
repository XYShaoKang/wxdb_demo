import React from 'react'

const MessageImage = ({ msgId, imgPath, openGallery }) => {
  return (
    <div>
      <img
        src={`/image?imgPath=${imgPath}`}
        alt=''
        style={{
          maxHeight: '150px',
        }}
        onClick={() => openGallery(msgId)}
      />
    </div>
  )
}
export default MessageImage
