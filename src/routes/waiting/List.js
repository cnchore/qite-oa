import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Button,Tag } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import { DropOption,SelectUser } from '../../components'
import { Link } from 'dva/router'

const confirm = Modal.confirm

const List = ({ onEditItem,goBackEidt,location, ...tableProps }) => {
  
  const getRecordState=(record)=>{
    //状态：0新建  1审核中 2审核通过 3审核不通过 -1退回修改

    switch(record.state){
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
        if(record.busiCode.substr(0,2)==='LE'){
          return <Tag color='#108ee9'>待销假</Tag>;
        }
        return <Tag color='#108ee9'>待完善资料</Tag>;
      case 4:
        if(record.busiCode.substr(0,2)==='LE'){
          return <Tag color='#108ee9'>已销假</Tag>;
        }
        return <Tag color='#2db7f5'>审核通过并完善资料</Tag>;
    }
  }
  
  const getAction=(record)=>{
    let _url=`taskId=${record.taskId}&busiId=${record.busiId}&from=${location.pathname}&t=${Math.random()}`,
        text=record.state===-2?'返回完善资料':'退回修改';
    switch(record.state){
      case 1:
        return <a onClick={e=>onEditItem(record)}>办理</a>;
      case -1:
      case -2:
        switch(record.busiCode.substr(0,2)){
          case 'MC':
            return <Link to={`/missClock?${_url}`}>{text}</Link>;
          case 'SC':
            return <Link to={`/salaryChange?${_url}`}>{text}</Link>;
          case 'LE':
            return <Link to={`/leave?${_url}`}>{record.state===-2?'销假':'退回修改'}</Link>;
          case 'OT':
            return <Link to={`/overtime?${_url}`}>{text}</Link>;
          case 'TL':    
            return <Link to={`/travel?${_url}`}>{text}</Link>;
          case 'TR':
            return <Link to={`/travelReimburse?${_url}`}>{text}</Link>;
          case 'CT':  
            return <Link to={`/contract?${_url}`}>{text}</Link>;
          case 'UC':
            return <Link to={`/useCar?${_url}`}>{text}</Link>;
          case 'PA':
            return <Link to={`/purchaseApply?${_url}`}>{text}</Link>;
          case 'PE':
            return <Link to={`/purchase?${_url}`}>{text}</Link>;
          case 'PT':
            return <Link to={`/payment?${_url}`}>{text}</Link>;
          case 'RT':
            return <Link to={`/recruit?${_url}`}>{text}</Link>;
          case 'DN':
            return <Link to={`/dimission?${_url}`}>{text}</Link>;
          case 'RR':
            return <Link to={`/regular?${_url}`}>{text}</Link>;
          case 'RE':
            return <Link to={`/reimburse?${_url}`}>{text}</Link>;
          case 'BD':
            return <Link to={`/budget?${_url}`}>{text}</Link>;
          case 'NE':
            return <Link to={`/notice?${_url}`}>{text}</Link>;
          case 'LW':
            return <Link to={`/legwork?${_url}`}>{text}</Link>;
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
      render:(text,record)=>getRecordState(record),
    }, {
      title: '操作',
      key: 'operation',
      fixed:'right',
      width: 250,
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
        // className={classnames({ [styles.table]: true})}
        bordered
        scroll={{ x: 1280 }}
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
