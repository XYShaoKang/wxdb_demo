import React, { Component } from 'react'

export default class MessageImage extends Component {
  state = {
    imgSrc: '',
  }
  componentDidMount() {
    fetch(`http://localhost:8080/emoji?md5=${this.props.md5}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ imgSrc: data[0].cdnUrl })
      })
  }
  render() {
    return <img src={`${this.state.imgSrc}`} alt='' style={{ width: '100%' }} />
  }
}
