import React from 'react'
import { DataTable } from '../../../components'
import { Table, Row, Col, Card, Select } from 'antd'
import { getFamliy } from '../../../utils'

class DataTablePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = { 
      filterCase: {gender: '',},
      selectedRowKeys:[13,131,1311]
    }
  }

  handleSelectChange = (gender) => {
    this.setState({
      filterCase: {
        gender,
      },
    })
  }
  
  render () {
    const { filterCase,selectedRowKeys } = this.state
    const staticDataTableProps = {
      dataSource: [{ key: '1', name: 'John Brown', age: 24, address: 'New York' }, { key: '2', name: 'Jim Green', age: 23, address: 'London' }],
      columns: [{ title: 'name', dataIndex: 'name' }, { title: 'Age', dataIndex: 'age' }, { title: 'Address', dataIndex: 'address' }],
      pagination: false,
    }

    const fetchDataTableProps = {
      fetch: {
        url: 'https://randomuser.me/api',
        data: {
          results: 10,
          testPrams: 'test',
        },
        dataKey: 'results',
      },
      columns: [
        { title: 'Name', dataIndex: 'name', render: (text) => `${text.first} ${text.last}` },
        { title: 'Phone', dataIndex: 'phone' },
        { title: 'Gender', dataIndex: 'gender' },
      ],
      rowKey: 'registered',
    }

    const caseChangeDataTableProps = {
      fetch: {
        url: 'https://randomuser.me/api',
        data: {
          results: 10,
          testPrams: 'test',
          ...filterCase,
        },
        dataKey: 'results',
      },
      columns: [
        { title: 'Name', dataIndex: 'name', render: (text) => `${text.first} ${text.last}` },
        { title: 'Phone', dataIndex: 'phone' },
        { title: 'Gender', dataIndex: 'gender' },
      ],
      rowKey: 'registered',
    }
    const data = [{
        key: 1,
        name: 'John Brown sr.',
        age: 60,
        address: 'New York No. 1 Lake Park',
        children: [{
          key: 11,
          name: 'John Brown',
          age: 42,
          address: 'New York No. 2 Lake Park',
        }, {
          key: 12,
          name: 'John Brown jr.',
          age: 30,
          address: 'New York No. 3 Lake Park',
          children: [{
            key: 121,
            name: 'Jimmy Brown',
            age: 16,
            address: 'New York No. 3 Lake Park',
          }],
        }, {
          key: 13,
          name: 'Jim Green sr.',
          age: 72,
          address: 'London No. 1 Lake Park',
          children: [{
            key: 131,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park',
            children: [{
              key: 1311,
              name: 'Jim Green jr.',
              age: 25,
              address: 'London No. 3 Lake Park',
            }, {
              key: 1312,
              name: 'Jimmy Green sr.',
              age: 18,
              address: 'London No. 4 Lake Park',
            }],
          }],
        },{
          key: 14,
          name: 'Susan sr.',
          age: 72,
          address: 'London No. 1 Lake Park'
        }],
      }, {
        key: 2,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      }];
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys: selectedRowKeys });
        
        console.log('onChange:',`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
        let list=selectedRows.map((item)=>item.key);
        this.setState({ selectedRowKeys:list});
        //let _list=getFamliy(data,record.key)
        //console.log('getFamliy:',record.key,_list);
        console.log('onSelect:',record, selected, selectedRows,'list:',list);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        this.setState({ selectedRowKeys: selectedRows.map((item)=>item.key) });
        console.log('onSelectAll:',selected, selectedRows, changeRows);
      },
    };
    const treeTableProps={
      columns:[{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '40%',className:'q-left'
      }, {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: '30%',
      }, {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      }],
      defaultExpandAllRows:true,
      rowSelection:rowSelection,
      dataSource:data,
      Pagination:{showSizeChanger:true,showQuickJumper:true}
    }
    return (<div className="content-inner">
      <Row gutter={32}>
        <Col lg={12} md={24}>
          <Card title="默认">
            <DataTable pagination={false} />
          </Card>
        </Col>
        <Col lg={12} md={24}>
          <Card title="静态数据">
            <DataTable
              {...staticDataTableProps}
            />
          </Card>
        </Col>
        <Col lg={12} md={24}>
          <Card title="远程数据">
            <DataTable
              {...fetchDataTableProps}
            />
          </Card>
        </Col>
        <Col lg={12} md={24}>
          <Card title="参数变化">
            <Select placeholder="Please select gender" allowClear onChange={this.handleSelectChange} style={{ width: 200, marginBottom: 16 }}>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
            <DataTable
              {...caseChangeDataTableProps}
            />
          </Card>
        </Col>
        <Col lg={24} md={24}>
          <Card title="树形表格">
            
            <Table
              {...treeTableProps}
            />
          </Card>
        </Col>
      </Row>
      <h2 style={{ margin: '16px 0' }}>Props</h2>
      <Row>
        <Col lg={24} md={24}>
          <Table
            rowKey={(record, key) => key}
            pagination={{showSizeChanger:true,showQuickJumper:true}}
            bordered
            scroll={{ x: 800 }}
            columns={[
              {
                title: '参数',
                dataIndex: 'props',
              },
              {
                title: '说明',
                dataIndex: 'desciption',
              },
              {
                title: '类型',
                dataIndex: 'type',
              },
              {
                title: '默认值',
                dataIndex: 'default',
              },
            ]}
            dataSource={[
              {
                props: 'fetch',
                desciption: '远程获取数据的参数',
                type: 'Object',
                default: '后面有空加上',
              }]}
          />
        </Col>
      </Row>
    </div>)
  }
}


export default DataTablePage
