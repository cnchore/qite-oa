import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Button } from 'antd'
// import styles from './List.less'
// import classnames from 'classnames'
//import { DropOption } from '../../components'
import { Link } from 'dva/router'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, location,onlyview, ...tableProps }) => {
  const handleMenuClick = (record, t) => {
    if (t === 1) {
      onEditItem(record)
    } else if (t=== 2) {
      confirm({
        title: '你确定删除这条维修/保养记录么?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }
  //tableProps={...tableProps,dataSource:[]}
  let columns = [
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
   
    }, {
      title: '开始时间',
      dataIndex: 'maintainDateStart',
      key: 'maintainDateStart',
    }, {
      title: '结束时间',
      dataIndex: 'maintainDateEnd',
      key: 'maintainDateEnd',
    }, {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    }, {
      title: '操作',
      key: 'operation',
      fixed:'right',
      width: 200,
      render: (text, record) => {
          return  (<span>
              <a onClick={e=>handleMenuClick(record,1)} >编辑</a>
              <a onClick={e=>handleMenuClick(record,2)} style={{marginLeft:'8px'}}>删除</a>
            </span>)
      },
    },
  ]
  if(onlyview){
    delete columns[4]
  }

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
