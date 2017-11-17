import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Button,Tooltip } from 'antd'
// import styles from './List.less'
// import classnames from 'classnames'
//import { DropOption } from '../../components'
//import { Link } from 'dva/router'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, location, ...tableProps }) => {
  const handleDel = (id) => {
    confirm({
      title: '你确定删除这个审批角色么?',
      onOk () {
        onDeleteItem(id)
      },
    })
  }
  //tableProps={...tableProps,dataSource:[]}
  const columns = [
    {
      title: '审批角色名称',
      dataIndex: 'auditName',
      key: 'auditName',
   
    }, {
      title: '审批角色编码',
      dataIndex: 'auditCode',
      key: 'auditCode',
    }, {
      title: '应用的流程',
      dataIndex: 'remark',
      key: 'remark',
      render:(text)=>text&& text.length>20?
        <Tooltip title={text}>{text.substr(0,17)}...</Tooltip>:<span>{text && text}</span>
    }, {
      title: '是否用户已有审批角色',
      dataIndex: 'isUserAudit',
      key: 'isUserAudit',
      render:(text)=>Boolean(text)?'是':'否',
    }, {
      title: '操作',
      key: 'operation',
      fixed:'right',
      width: 100,
      render: (text, record) => {
          return  <span>
            <a onClick={e=>onEditItem(record)} >编辑</a>
            <a onClick={e=>handleDel(record.id)} style={{marginLeft:'8px'}}>删除</a>
          </span>
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
