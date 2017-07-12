import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Button,Tag } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import { DropOption,SelectUser } from '../../components'
import { Link } from 'dva/router'

const confirm = Modal.confirm

const List = ({ onEditItem,goBackEidt,location, ...tableProps }) => {
  
  const getRecordState=(text)=>{
    //状态：0新建  1审核中 2审核通过 3审核不通过 -1退回修改
    switch(text){
      case 0:
        return <Tag color=''>新建</Tag>;
      case 1:
        return <Tag color='#87d068'>审核中</Tag>;
      case 2:
        return <Tag color='#2db7f5'>审核通过</Tag>;
      case 3:
        return <Tag color='#f50'>审核不通过</Tag>;
      case -1:
        return <Tag color='#f00'>退回修改</Tag>;
      
    }
  }
  
  const getAction=(record)=>{
    let query={
      taskId:record.taskId,
      busiId:record.busiId,
      from:location.pathname
    }
    switch(record.state){
      case 0:
      case 1:
      case 2:
      case 3:
        return <a onClick={e=>onEditItem(record)}>办理</a>;
      case -1:
        switch(record.busiCode.substr(0,2)){
          case 'MC':
            return <Link to={`/missClock?taskId=${query.taskId}&busiId=${query.busiId}&from=${query.from}&t=${Math.random()}`}>退回修改</Link>;
          case 'SC':
            return <Link to={`/salaryChange?taskId=${query.taskId}&busiId=${query.busiId}&from=${query.from}&t=${Math.random()}`}>退回修改</Link>;
          
          default :
            return null;
        }
      default :
        return null
    }
  }
  const columns = [
    {
      title: '申请人',
      dataIndex: 'applyName',
      key: 'applyName',
    }, {
      title: '申请单号',
      dataIndex: 'busiCode',
      key: 'busiCode',
      render: (text, record) => <Link to={`/waiting/${record.taskId}?procDefId=${record.procDefId}&procInstId=${record.procInstId}`}>{text}</Link>,
    }, {
      title: '流程名称',
      dataIndex: 'flowName',
      key: 'flowName',
    }, {
      title: '创建时间',
      dataIndex: 'applyTime',width:170,
      key: 'applyTime',
    }, {
      title: '接收时间',
      dataIndex: 'receiveTime',width:170,
      key: 'receiveTime',
    }, {
      title: '当前阶段',
      dataIndex: 'nodeName',
      key: 'nodeName',
    }, {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render:(text)=>getRecordState(text),
    }, {
      title: '操作',
      key: 'operation',
      fixed:'right',
      width: 100,
      render: (text, record) => getAction(record),
    },
  ]


  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true})}
        bordered
        scroll={{ x: 1150 }}
        columns={columns}
        simple
        rowKey={record => record.taskId}
      />
    </div>
  )
}

List.propTypes = {
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
