import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal} from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import { getRecordAction } from '../../components';
import {getRecordState} from '../../utils';
const confirm = Modal.confirm;

const List = ({ onSubmit,dicList, onEditItem,onDelete,onChange,location, ...tableProps }) => {
 const handleSubmit = (record,e) => {
      confirm({
        title: `你确定提交申请么?`,
        onOk () {
          onSubmit(record,e);
        },
      })
  }
  const handleDel=(id)=>{
    confirm({
      title:'你确定要删除这条申请么？',
      onOk(){
        onDelete(id);
      }
    })
  }
  const columns = [
    {
      title: '申请单号',
      dataIndex: 'code',
      key: 'code',
    }, {
      title: '申请时间',
      dataIndex: 'createTime',width:170,
      key: 'createTime',
    },{
      title:'类型',
      dataIndex:'type',key:'type',
      render:(text)=>String(text)==='1'?'艾厨':String(text)==='2'?'艾臣':'',
    }, {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render:(text)=>getRecordState(text),
    }, {
      title: '操作',
      key: 'operation',
      fixed:'right',
      width: 250,
      render: (text, record)=>getRecordAction('sampleReplace',record,onEditItem,handleSubmit,handleDel,onChange),
    },
  ]


  return (
    <div>
      <Table
        {...tableProps} onChange={onChange}
        className={classnames({ [styles.table]: true})}
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
  onSubmit: PropTypes.func,
  onItemChange: PropTypes.func,
  location: PropTypes.object,
}

export default List
