import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import styles from './List.less'
import classnames from 'classnames'


const List = ({ location, ...tableProps }) => {
  
  const columns = [
    {
      title: '字典名称',
      dataIndex: 'dicName',
      key: 'dicName',className:'q-left',
    }, {
      title: '字典值',
      dataIndex: 'dicValue',
      key: 'dicValue',
    }, {
      title: '类型',
      dataIndex: 'dicType',
      key: 'dicType',
    }, {
      title: '所属组',
      dataIndex: 'dicGroup',
      key: 'dicGroup',
    }, {
      title: '备注说明',
      dataIndex: 'remark',
      key: 'remark',
    },
  ]


  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true })}
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
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
