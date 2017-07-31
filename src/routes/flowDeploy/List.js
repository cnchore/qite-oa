import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Button,Tag } from 'antd'
// import styles from './List.less'
// import classnames from 'classnames'
// import { DropOption } from '../../components'
import { Link } from 'dva/router'

const confirm = Modal.confirm

const List = ({ onSubmit,dicList, onEditItem, location, ...tableProps }) => {
  const { pdListProps }=tableProps
  const columns = [
    {
      title: '主键',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '流程名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '部署时间',
      dataIndex: 'deploymentTime',
      key: 'deploymentTime',
   
    }, {
      title: '操作',
      key: 'operation',
      render: (text, record) => {
        return  (<a onClick={e=>onEditItem(record)} >查看流程图</a>)
      },
    },
  ]
  const pdColumns = [
    {
      title: '主键',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '部署ID',
      dataIndex: 'deploymentId',
      key: 'deploymentId',
    }, {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '流程定义Key',
      dataIndex: 'key',
      key: 'key',
    }, {
      title: '版本',
      dataIndex: 'version',
      key: 'version',
    }, {
      title: '流程定义的规则文件名称',
      dataIndex: 'resourceName',
      key: 'resourceName',
    }, {
      title: '流程定义的规则图片名称',
      dataIndex: 'diagramResourceName',
      key: 'diagramResourceName',
    },
  ]

  return (
    <div>
      <Table
        {...tableProps}
        title={()=>(<h3>部署列表</h3>)}
        bordered
        scroll={{ x: 767 }}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
      <Table
        {...pdListProps}
        title={()=>(<h3>流程定义列表</h3>)}
        bordered
        scroll={{ x: 867 }}
        columns={pdColumns}
        simple
        rowKey={record => record.id}
      />
    </div>
  )
}

List.propTypes = {
  location: PropTypes.object,
}

export default List
