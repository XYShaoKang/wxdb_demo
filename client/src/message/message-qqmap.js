import React, { Component } from 'react'
import { Tooltip } from 'antd'

export default class MessageQQMap extends Component {
  render() {
    let { x, y, poiname, label } = this.props.content.msg.location._attributes
    const url = `https://apis.map.qq.com/ws/staticmap/v2/?center=${x},${y}&zoom=17&size=300*150&maptype=roadmap&markers=size:small|color:red|${x},${y}&key=BRCBZ-BTTHR-LRIWU-WARDD-OCZNE-CFFYE`
    if (poiname === '[位置]') {
      // poiname 为 [位置] 时,将 label 提升为 poiname,并设置 label 为空,不显示 label
      poiname = label
      label = ''
    }
    const href = `https://apis.map.qq.com/uri/v1/marker?marker=coord:${x},${y};title:${poiname};addr:${label}`
    return poiname ? (
      <div
        style={{
          backgroundColor: '#fff',
          width: 300,
          cursor: 'pointer',
        }}
        onClick={() => {
          const w = window.open('about:blank')
          w.location.href = href
        }}
      >
        {/* 位置名称 */}
        <div
          style={{
            fontWeight: 'bold',
            padding: '10px 10px 5px',
          }}
        >
          {poiname}
        </div>
        {/* 位置具体地址 */}
        {label && (
          <Tooltip content={<div>{label}</div>}>
            <div
              style={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                width: 200,
                fontSize: 12,
                padding: '0px 10px 5px',
              }}
            >
              {label}
            </div>
          </Tooltip>
        )}
        {/* 腾讯地图图片 */}
        <img
          src={`/proxy?url=${encodeURIComponent(url)}`}
          alt=''
          style={{ width: '100%' }}
        />
      </div>
    ) : (
      <div>获取位置失败</div>
    )
  }
}
