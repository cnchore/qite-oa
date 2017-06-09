import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import { DropOption } from '../../components'
import { Link } from 'dva/router'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem,onAddChild, location, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    switch(e.key){
      case '1':
        onAddChild(record.id)
        break;
      case '2':
        onEditItem(record);
        break;
      case '3':
        confirm({
          title: '你确定删除该机构么?',
          onOk () {
            onDeleteItem(record.id)
          },
        })
        break;

    }
    
  }
  const menuOptions=[{ 
    key: '1', name: '添加下级' 
  }, { 
    key: '2', name: '编辑' 
  }, { 
    key: '3', name: '删除' 
  }]
  const columns = [
    {
      title: '机构名称',
      dataIndex: 'name',
      key: 'name',className:'q-left',
    }, {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '负责人',
      dataIndex: 'leader',
      key: 'leader',
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    }, {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    }, {
      title: '操作',
      key: 'operation',
      fixed:'right',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} 
        menuOptions={menuOptions} />
      },
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
  onAddChild:PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
