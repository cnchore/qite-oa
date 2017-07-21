import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Button,Tag } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import { Link } from 'dva/router'

const List = ({ location, ...tableProps }) => {
 
  const columns = [
    {
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
      title: '当前阶段',
      dataIndex: 'nodeName',
      key: 'nodeName',
    }, {
      title: '审核人',
      dataIndex: 'auditerName',
      key: 'auditerName',
    }, {
      title: '审核时间',
      dataIndex: 'auditTime',width:170,
      key: 'auditTime',
    }, {
      title: '操作',
      key: 'operation',
      fixed:'right',
      width: 250,
      render: (text, record) => <Link to={`/complete/${record.taskId}?procDefId=${record.procDefId}&procInstId=${record.procInstId}`}>查看</Link>,
    },
  ]


  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true})}
        bordered
        scroll={{ x: 1050 }}
        columns={columns}
        simple
        rowKey={record => record.taskId}
      />
    </div>
  )
}

List.propTypes = {
  location: PropTypes.object,
}

export default List
