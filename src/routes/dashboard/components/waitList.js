import React from 'react'
import PropTypes from 'prop-types'
import { Table} from 'antd'
import { Link } from 'dva/router'

const WaitList = ({ location, ...tableProps }) => {
  const getAction=(record)=>{
    let query={
      taskId:record.taskId,
      busiId:record.busiId,
      from:location.pathname
    }
    switch(record.state){
      case 1:
        return <Link to={`/waiting?homeTaskId=${record.taskId}&from=${query.from}&t=${Math.random()}`}>办理</Link>;
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
      title: '申请时间',
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
      title: '办理时长',
      key: 'dotime',
      render:(text,record)=>{
        var start=record.applyTime? new Date(record.applyTime) :0,
            end=record.receiveTime? new Date(record.receiveTime) :0,
            t=parseFloat(end-start)/1000,
            h=Math.floor(t/3600),
            m=Math.floor((t%3600)/60),
            s=Math.ceil((t%3600)%60);
        return `${h}时${m}分${s}秒`
      },
    }, {
      title: '操作',
      key: 'operation',
      fixed:'right',
      width: 120,
      render: (text, record) => getAction(record),
    },
  ]


  return (
    <div>
      <Table
        {...tableProps}
        // className={classnames({ [styles.table]: true})}
        bordered
        scroll={{ x: 1180 }}
        columns={columns}
        simple
        size='small'
        rowKey={record => record.taskId}
      />
    </div>
  )
}

WaitList.propTypes = {
  location: PropTypes.object,
}

export default WaitList
