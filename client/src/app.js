import React, { Component } from 'react'
import { Spin, message } from 'antd'
import Files from './files'
import fetch from 'node-fetch'
import Tables from './tables'

export default class App extends Component {
  state = {
    dbList: [],
    selectItem: '',
  }
  componentDidMount() {
    fetch('/dbs')
      .then(res => res.json())
      .then(dbs => {
        this.setState(state => ({ dbList: dbs }))
      })
  }
  selectFiles = item => {
    this.setState(state => ({ selectItem: item }))
  }
  back = ({ err }) => {
    this.setState({ selectItem: '' })
    if (err && err.message) {
      message.error(err.message)
    }
  }
  render() {
    const { dbList, selectItem } = this.state
    return (
      <div>
        {selectItem === '' ? (
          dbList.length > 0 ? (
            <Files list={dbList} select={this.selectFiles} />
          ) : (
            <Spin />
          )
        ) : (
          <Tables db={selectItem} back={this.back} />
        )}
      </div>
    )
  }
}
