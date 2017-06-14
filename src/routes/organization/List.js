import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import styles from './List.less'
import classnames from 'classnames'


const List = ({ location, ...tableProps }) => {
  
  const columns = [
    {
      title: '机构名称',
      dataIndex: 'orgName',
      key: 'orgName',className:'q-left',
    }, {
      title: '机构编码',
      dataIndex: 'orgCode',
      key: 'orgCode',
    }, {
      title: '机构类型',
      dataIndex: 'orgTypeName',
      key: 'orgTypeName',
    
   
    },
  ]


  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true })}
        bordered
        scroll={{ x: 767 }}
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
