import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Button } from 'antd'
// import styles from './List.less'
// import classnames from 'classnames'
//import { DropOption } from '../../components'
import { Link } from 'dva/router'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, location, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '你确定删除这辆公务车么?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }
  //tableProps={...tableProps,dataSource:[]}
  const columns = [
    {
      title: '品牌',
      dataIndex: 'carBrand',
      key: 'carBrand',
   
    }, {
      title: '车牌号',
      dataIndex: 'carNum',
      key: 'carNum',
    }, {
      title: '户主',
      dataIndex: 'carOwner',
      key: 'carOwner',
    }, {
      title: '是否可申请',
      dataIndex: 'isAppliable',
      key: 'isAppliable',
      render:(text)=>text?'是':'否'
    }, {
      title: '操作',
      key: 'operation',
      fixed:'right',
      width: 200,
      render: (text, record) => {
          return  (<span>
              <a onClick={e=>onEditItem(record)} >编辑</a>
              <Link to={`/car/${record.id}`} style={{marginLeft:'8px'}}>维保管理</Link>
              <Link to={`/car/${record.id}?onlyview=true`} style={{marginLeft:'8px'}}>查看</Link>
            </span>)
      },
    },
  ]


  return (
    <div>
      <Table
        {...tableProps}
        bordered
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
