import React from 'react'
import PropTypes from 'prop-types'
import { Table} from 'antd'
import { Link } from 'dva/router'

const WaitList = ({ location, ...tableProps }) => {
  const getAction=(record)=>{
    // let query={
    //   taskId:record.taskId,
    //   busiId:record.busiId,
    //   from:location.pathname
    // }
    let _url=`taskId=${record.taskId}&busiId=${record.busiId}&from=${location.pathname}&t=${Math.random()}`,
        text=record.state===-2?'返回完善资料':'退回修改';
    switch(record.state){
      case 1:
        return <Link to={`/waiting?homeTaskId=${record.taskId}&from=${location.pathname}&t=${Math.random()}`}>办理</Link>;
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
