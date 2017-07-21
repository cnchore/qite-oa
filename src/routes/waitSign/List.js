import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Button,Tag } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import { DropOption } from '../../components'
import { Link } from 'dva/router'

const confirm = Modal.confirm

const List = ({ onEditItem,location, ...tableProps }) => {
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
      width: 250,
      render: (text, record) => (<div>
        <Link to={`/waitSign/${record.taskId}?procDefId=${record.procDefId}&procInstId=${record.procInstId}`} style={{marginRight:'8px'}}>查看</Link>
        <a onClick={e=>handleSign(record.taskId)}>签收</a>
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
