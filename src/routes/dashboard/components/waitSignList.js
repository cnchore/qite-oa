import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Tooltip} from 'antd'
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
   // },{
   //    title: '原因',
   //    dataIndex: 'reason',width:120,
   //    key: 'reason',
   //    render:(text)=>text && text.length>15?
   //                  <Tooltip title={text}>{`${text.substr(0,12)}...`}</Tooltip>
   //                  :<span>{text && text}</span>
  return (
    <div>
      <Table
        {...tableProps}
        bordered
        scroll={{ x: 880 }}
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
