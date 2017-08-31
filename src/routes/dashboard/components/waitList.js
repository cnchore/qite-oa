import React from 'react'
import PropTypes from 'prop-types'
import { Table} from 'antd'
import { Link } from 'dva/router'
import {getWaitAction} from '../../../utils'
const WaitList = ({ location, ...tableProps }) => {
  
  const columns = [
    {
      title: '紧急程度',
      dataIndex: 'urgency',
      key: 'urgency',
      render:(text)=><span style={{ color: text?'#f00':'' }} >{text?'紧急':'一般'}</span>
    },
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
      render: (text, record) => getWaitAction(record),
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
