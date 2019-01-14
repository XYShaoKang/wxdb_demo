import React, { Component } from 'react'
import fetch from 'node-fetch'
import { Layout, Menu, Icon, Badge, Table, Spin, Button } from 'antd'
import './table.css'

const { Sider, Content } = Layout

export default class Tables extends Component {
  state = {
    tables: [],
    select: 0,
    tableData: [],
    columns: [],
    loading: true,
  }
  componentDidMount() {
    const { fileName: dbName, platform } = this.props.db
    fetch(`/tables/${platform}/${dbName}`)
      .then(res => res.json())
      .then(data => {
        if (data.err) {
          this.props.back(data)
        } else {
          this.setState(state => ({ tables: data }))
          this.handleSelect({
            key: data.filter(t => t.count > 0)[0].tableName,
          })
        }
      })
  }
  handleClick = e => {
    // console.log(e)
  }
  handleSelect = ({ key: tName }) => {
    const { fileName: dbName, platform } = this.props.db
    this.setState({ loading: true })
    fetch(`/table/${platform}/${dbName}/${tName}`)
      .then(res => res.json())
      .then(data => {
        this.setState(state => ({
          tableData: data,
          columns: data[0]
            ? Object.keys(data[0]).map(k => ({
                title: k,
                dataIndex: k,
                width: 20,
              }))
            : [],
          loading: false,
        }))
      })
  }
  handleTableChange = e => {
    // console.log('tableChange', e)
  }
  render() {
    const { tables, tableData, loading } = this.state
    const tempTables = tables.filter(t => t.count > 0)
    return (
      <div>
        {tempTables[0] ? (
          <Layout>
            <Sider
              style={{
                height: '100vh',
                overflowY: 'scroll',
                overflowX: 'hidden',
              }}
              theme='light'
            >
              <Button
                type='primary'
                onClick={this.props.back}
                style={{ marginBottom: 16 }}
              >
                <Icon type='arrow-left' />
              </Button>
              {
                <Menu
                  onClick={this.handleClick}
                  style={{ width: 200 }}
                  defaultSelectedKeys={[tempTables[0].tableName]}
                  mode='inline'
                  onSelect={this.handleSelect}
                >
                  {tempTables.map((t, i) => (
                    <Menu.Item key={t.tableName}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          width: '95%',
                        }}
                      >
                        <div
                          style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {t.tableName}
                        </div>
                        <Badge count={t.count} />
                      </div>
                    </Menu.Item>
                  ))}
                </Menu>
              }
            </Sider>
            <Layout>
              <Content>
                {tableData.length > 0 && (
                  <Table
                    columns={this.state.columns}
                    rowKey={(_, i) => i}
                    dataSource={this.state.tableData}
                    scroll={{ x: 500 }}
                    size='small'
                    pagination={{
                      defaultPageSize: 10,
                    }}
                    onChange={this.handleTableChange}
                    loading={loading}
                  />
                )}
              </Content>
            </Layout>
          </Layout>
        ) : (
          <Spin />
        )}
      </div>
    )
  }
}
