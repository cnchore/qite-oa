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
      case -2:
        return <Tag color='#108ee9'>待完善资料</Tag>;
      case 4:
        return <Tag color='#2db7f5'>审核通过并完善资料</Tag>;
    }
  }
  
  const getAction=(record)=>{
    let query={
      taskId:record.taskId,
      busiId:record.busiId,
      from:location.pathname
    }
    switch(record.state){
      case 1:
        return <a onClick={e=>onEditItem(record)}>办理</a>;
      case -1:
      case -2:
        switch(record.busiCode.substr(0,2)){
          case 'MC':
            return <Link to={`/missClock?taskId=${query.taskId}&busiId=${query.busiId}&from=${query.from}&t=${Math.random()}`}>{record.state===-2?'返回完善资料':'退回修改'}</Link>;
          case 'SC':
            return <Link to={`/salaryChange?taskId=${query.taskId}&busiId=${query.busiId}&from=${query.from}&t=${Math.random()}`}>{record.state===-2?'返回完善资料':'退回修改'}</Link>;
          case 'LE':
            return <Link to={`/leave?taskId=${query.taskId}&busiId=${query.busiId}&from=${query.from}&t=${Math.random()}`}>{record.state===-2?'返回完善资料':'退回修改'}</Link>;
          case 'OT':
            return <Link to={`/overtime?taskId=${query.taskId}&busiId=${query.busiId}&from=${query.from}&t=${Math.random()}`}>{record.state===-2?'返回完善资料':'退回修改'}</Link>;
          case 'TL':    
            return <Link to={`/travel?taskId=${query.taskId}&busiId=${query.busiId}&from=${query.from}&t=${Math.random()}`}>{record.state===-2?'返回完善资料':'退回修改'}</Link>;
          case 'TR':
            return <Link to={`/travelReimburse?taskId=${query.taskId}&busiId=${query.busiId}&from=${query.from}&t=${Math.random()}`}>{record.state===-2?'返回完善资料':'退回修改'}</Link>;
          case 'CT':  
            return <Link to={`/contract?taskId=${query.taskId}&busiId=${query.busiId}&from=${query.from}&t=${Math.random()}`}>{record.state===-2?'返回完善资料':'退回修改'}</Link>;
          case 'UC':
            return <Link to={`/useCar?taskId=${query.taskId}&busiId=${query.busiId}&from=${query.from}&t=${Math.random()}`}>{record.state===-2?'返回完善资料':'退回修改'}</Link>;
          case 'PA':
            return <Link to={`/purchaseApply?taskId=${query.taskId}&busiId=${query.busiId}&from=${query.from}&t=${Math.random()}`}>{record.state===-2?'返回完善资料':'退回修改'}</Link>;
          case 'PE':
            return <Link to={`/purchase?taskId=${query.taskId}&busiId=${query.busiId}&from=${query.from}&t=${Math.random()}`}>{record.state===-2?'返回完善资料':'退回修改'}</Link>;
          case 'PT':
            return <Link to={`/payment?taskId=${query.taskId}&busiId=${query.busiId}&from=${query.from}&t=${Math.random()}`}>{record.state===-2?'返回完善资料':'退回修改'}</Link>;
          case 'RT':
            return <Link to={`/recruit?taskId=${query.taskId}&busiId=${query.busiId}&from=${query.from}&t=${Math.random()}`}>{record.state===-2?'返回完善资料':'退回修改'}</Link>;
          case 'DN':
            return <Link to={`/dimission?taskId=${query.taskId}&busiId=${query.busiId}&from=${query.from}&t=${Math.random()}`}>{record.state===-2?'返回完善资料':'退回修改'}</Link>;
          case 'RR':
            return <Link to={`/regular?taskId=${query.taskId}&busiId=${query.busiId}&from=${query.from}&t=${Math.random()}`}>{record.state===-2?'返回完善资料':'退回修改'}</Link>;
          case 'RE':
            return <Link to={`/reimburse?taskId=${query.taskId}&busiId=${query.busiId}&from=${query.from}&t=${Math.random()}`}>{record.state===-2?'返回完善资料':'退回修改'}</Link>;
          case 'BD':
            return <Link to={`/budget?taskId=${query.taskId}&busiId=${query.busiId}&from=${query.from}&t=${Math.random()}`}>{record.state===-2?'返回完善资料':'退回修改'}</Link>;
          case 'NE':
            return <Link to={`/notice?taskId=${query.taskId}&busiId=${query.busiId}&from=${query.from}&t=${Math.random()}`}>{record.state===-2?'返回完善资料':'退回修改'}</Link>;
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
      width: 180,
      render: (text, record) => (<div>
        <Link to={`/waiting/${record.taskId}?procDefId=${record.procDefId}&procInstId=${record.procInstId}`} style={{marginRight:'8px'}}>查看</Link>
        {getAction(record)}
      </div>)
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
