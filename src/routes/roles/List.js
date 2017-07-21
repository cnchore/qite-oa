import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Button } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
//import { DropOption } from '../../components'
//import { Link } from 'dva/router'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, location, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '你确定删除这个角色么?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }
  //tableProps={...tableProps,dataSource:[]}
  const columns = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
   
    }, {
      title: '角色编码',
      dataIndex: 'roleCode',
      key: 'roleCode',
    }, {
      title: '角色说明',
      dataIndex: 'remark',
      key: 'remark',
    
    }, {
      title: '操作',
      key: 'operation',
      fixed:'right',
      width: 100,
      render: (text, record) => {
          return  (<a onClick={e=>onEditItem(record)} >编辑</a>)
        //return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '编辑' }]} />
      },
    },
  ]


  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true})}
        bordered
        scroll={{ x: 767 }}
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
