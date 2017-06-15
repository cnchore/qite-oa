import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import styles from './List.less'
import classnames from 'classnames'


const List = ({ location, ...tableProps }) => {
  
  const columns = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName',className:'q-left',
    }, {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render:(text)=>(text===1?'菜单':'操作'),
    
    }, {
      title: '菜单地址',
      dataIndex: 'src',
      key: 'src',
    }, {
      title: '说明',
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
