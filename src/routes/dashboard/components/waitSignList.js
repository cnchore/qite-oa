import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal} from 'antd'
// import { Link } from 'dva/router'
const confirm = Modal.confirm
const WaitSignList = ({ onEditItem,location, ...tableProps }) => {
  const handleSign=(taskId)=>{
    confirm({
      title:'你确定签收么？',
      onOk(){
        onEditItem && onEditItem({taskId});
      },
    })
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
      title: '操作',
      key: 'operation',
      fixed:'right',
      width: 80,
      render: (text, record) => <a onClick={e=>handleSign(record.taskId)}>签收</a>
     
    },
  ]
  return (
    <div>
      <Table
        {...tableProps}
        bordered
        scroll={{ x: 1050 }}
        columns={columns}
        simple
        rowKey={record => record.taskId}
      />
    </div>
  )
}

WaitSignList.propTypes = {
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default WaitSignList
