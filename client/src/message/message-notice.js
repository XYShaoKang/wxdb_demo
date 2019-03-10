import React, { Component } from 'react'
import { Card, Avatar, Button } from 'antd'

export default class MessagNotice extends Component {
  render() {
    let {
      msg: {
        appmsg: {
          // title: { data: title },
          mmreader: {
            category: {
              item: {
                title: { data: title },
                digest: { data: digest },
                url: { data: url },
                styles: { style },
              },
            },
          },
        },
      },
    } = this.props.content
    if (!(style.constructor === Array)) {
      style = [style]
    }
    let digests = style.reduce(
      (prev, { color: { data: color }, range: { data: range } }) => {
        const ranges = range.match(/\{([\d]+),([\d]+)\}/)
        const start = parseInt(ranges[1])
        const count = parseInt(ranges[2])
        const { str, end } = prev
        if (str === '') {
          prev.str = `${digest.substr(
            0,
            start,
          )}<span style="color:${color}">${digest.substr(start, count)}</span>`
        } else {
          prev.str += `${digest.substring(
            end,
            start,
          )}<span style="color:${color}">${digest.substr(start, count)}</span>`
        }
        prev.end = start + count
        return prev
      },
      { str: '', end: 0 },
    )
    digests = digests.str + digest.substring(digests.end, digest.length)

    return (
      <Card
        title={title}
        bordered={true}
        style={{
          width: '100%',
          color: '#000',
          cursor: 'pointer',
          borderRadius: 10,
          overflow: 'hidden',
        }}
        actions={[
          <a href={url} target='_blank'>
            详情
          </a>,
        ]}
        onClick={() => {
          const w = window.open('about:blank')
          w.location.href = url
        }}
      >
        <div
          dangerouslySetInnerHTML={{ __html: digests.replace(/\n/g, '<br/>') }}
        />
      </Card>
    )
  }
}
