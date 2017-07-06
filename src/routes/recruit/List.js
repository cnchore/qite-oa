import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Button,Tag } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import { DropOption } from '../../components'
import { Link } from 'dva/router'

const confirm = Modal.confirm

const List = ({ onSubmit,dicList, onEditItem, location, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: `你确定提交申请么?`,
        onOk () {
          onSubmit(record.id,'')
        },
      })
    }
  }
  const getRecordState=(text)=>{
    //状态：0新建  1审核中 2审核通过 3审核不通过
    switch(text){
      case 0:
        return <Tag color=''>新建</Tag>;
      case 1:
        return <Tag color='#87d068'>审核中</Tag>;
      case 2:
        return <Tag color='#2db7f5'>审核通过</Tag>;
      case 3:
        return <Tag color='#f50'>审核不通过</Tag>;
      
    }
  }
  const getDicType=(value,remark=null)=>{
    let n=dicList.filter(item=>String(item.dicValue)===String(value));
    //console.log(orgList,...n,value);
    if(n && n[0]){
      return remark&&n[0].dicName==='其他'?remark:n[0].dicName;
    }
    return '';
  }
  const getHours=(a,b)=>{
    if(!a||!b){
      return 0;
    }
    let timeA=new Date(a);
    let timeB=new Date(b);
    return ((timeB-timeA)/(3600*1000)).toFixed(2)
  }
  const columns = [
    {
      title: '申请单号',
      dataIndex: 'code',width:220,
      key: 'code',
      render: (text, record) => <Link to={`recruit/${record.id}`}>{text}</Link>,
    }, {
      title: '申请时间',
      dataIndex: 'createTime',width:170,
      key: 'createTime',
    }, {
      title: '招聘岗位',
      dataIndex: 'postName',width:120,
      key: 'postName',
    }, {
      title: '到岗时间',width:170,
      key: 'postTime',
      dataIndex:'postTime',
    
    }, {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render:(text)=>getRecordState(text),
    }, {
      title: '操作',
      key: 'operation',
      fixed:'right',
      width: 100,
      render: (text, record) => {
        //  return  (<Button size="small" icon="edit" type="ghost" onClick={e=>onEditItem(record)} >编辑</Button>)
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} 
        menuOptions={[{ key: '1', name: '编辑申请' },{ key: '2', name: '提交申请' }]} />
      },
    },
  ]


  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true})}
        bordered
        scroll={{ x: 820 }}
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
