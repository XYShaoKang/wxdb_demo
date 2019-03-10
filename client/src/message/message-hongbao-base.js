import React, { Component } from 'react'
import { Button, Icon, Avatar, Card, Tooltip, List } from 'antd'

export default class MessageHongbaoBase extends Component {
  render() {
    const {
      backgroundColor,
      icon,
      result,
      feedesc,
      appName,
      color,
    } = this.props
    return (
      <div
        style={{
          width: 200,
          borderRadius: 10,
          // border: '1px solid #000',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            backgroundColor: backgroundColor,
            padding: 10,
            color: color,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {icon}
          <div
            style={{
              marginLeft: 10,
            }}
          >
            <div>{result}</div>
            <div>{feedesc}</div>
          </div>
        </div>
        <div
          style={{
            padding: ' 2px 0px 2px 10px',
            fontSize: 12,
            backgroundColor: '#fff',
            borderTop:'1px solid #aaa'
          }}
        >
          {appName}
        </div>
      </div>
    )
  }
}
