import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
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
          onSubmit(record,e)
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
  const getLeaveType=(value,remark=null)=>{
    let n=dicList.filter(item=>String(item.dicValue)===String(value));
    //console.log(orgList,...n,value);
    if(n && n[0]){
      return remark&&n[0].dicName==='其他'?remark:n[0].dicName;
    }
    return '';
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
    }, {
      title: '请假时间',
      dataIndex: 'leaveTimeStart',width:350,
      key: 'leaveTimeStart',
      render:(text,record)=>`${record.leaveTimeStart}至${record.leaveTimeEnd}`,
    }, {
      title: '请假时长',width:120,
      dataIndex: 'leaveHours',
      key: 'leaveHours',
    }, {
      title: '请假类型',width:120,
      dataIndex: 'type',
      key: 'type',
      render:(text,record)=>getLeaveType(text,record.typeRemark),
    }, {
      title: '任务代理人',
      dataIndex: 'agentUserName',
      key: 'agentUserName',
    }, {
      
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render:(text)=>getRecordState(text,1),
    }, {
      title: '操作',
      key: 'operation',
      fixed:'right',
      width: 250,
      render: (text, record)=>getRecordAction('leave',record,onEditItem,handleSubmit,handleDel,onChange,true),
    },
  ]
  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true})}
        bordered
        scroll={{ x: 1450 }}
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
