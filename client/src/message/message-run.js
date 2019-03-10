import React, { Component } from 'react'
import { Button, Icon, Avatar, Card, Tooltip, List } from 'antd'
import MessageRunLike from './message-run-like'

export default class MessageRun extends Component {
  render() {
    const {
      tipdisplay: { data: tipdisplay },
      fontcolor: { data: fontcolor },
      championusername: { data: championusername },
      rankinfo: {
        rank: {
          rankdisplay: { data: rankdisplay },
          ranktitle: { data: ranktitle },
        },
        score: {
          scoredisplay: { data: scoredisplay },
          scoretitle: { data: scoretitle },
        },
      },
    } = this.props.content.msg.appmsg.hardwareinfo.messagenodeinfo
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
        <MessageRunLike title={tipdisplay} displayusername={championusername} />
      </div>
    )
  }
}
