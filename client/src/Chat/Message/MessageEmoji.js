import React, { Component } from 'react'

export default class MessageEmoji extends Component {
  state = {
    imgSrc: '',
  }
  componentDidMount() {
    fetch(`/emoji?md5=${this.props.md5}`)
      .then(res => res.json())
      .then(data => this.setState({ imgSrc: data[0].cdnUrl }))
  }
  render() {
    const { imgSrc } = this.state
    return (
      imgSrc && (
        <img
          src={`/proxy?url=${encodeURIComponent(this.state.imgSrc)}`}
          alt=''
          style={{ width: 100, height: 100 }}
        />
      )
    )
  }
}
