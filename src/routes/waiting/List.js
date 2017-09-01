import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Button,Tag } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import { DropOption,SelectUser } from '../../components'
import { Link } from 'dva/router'
import { getWaitAction } from '../../utils'
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
        <Link to={`/waiting/${record.taskId}?busiCode=${record.busiCode}&busiId=${record.busiId}`} style={{marginRight:'8px'}}>查看</Link>
        {getWaitAction(record,location.pathname)}
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
