import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Button,Tag } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import { Link } from 'dva/router'
import { DropOption,SelectUser } from '../../components'

const confirm = Modal.confirm

const List = ({ onSubmit,dicList, onEditItem,onDelete, location, ...tableProps }) => {
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
      case -1:
        return <Tag color='#f00'>退回修改</Tag>;
      case -2:
        return <Tag color='#108ee9'>待完善资料</Tag>;
      case 4:
        return <Tag color='#2db7f5'>审核通过并完善资料</Tag>;
    }
  }
  const getDicType=(value,remark=null)=>{
    let n=dicList.filter(item=>String(item.id)===String(value));
    //console.log(orgList,...n,value);
    if(n && n[0]){
      return n[0].orgName;
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
    }, {
      title: '申请时间',
      dataIndex: 'createTime',width:170,
      key: 'createTime',
    }, {
      title: '接收部门',width:120,
      dataIndex: 'orgId',
      key: 'orgId',
      render:(text,record)=>getDicType(text),
    }, {
      title: '文件编号',width:170,
      dataIndex: 'fileNum',
      key: 'fileNum',
    }, {
      title: '文件标题',width:170,
      key: 'title',
      dataIndex:'title',
    
    }, {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render:(text)=>getRecordState(text),
    }, {
      title: '操作',
      key: 'operation',
      fixed:'right',
      width: 180,
      render: (text, record) => {
        return record.state!==undefined?(<span>
          <Link to={`/notice/${record.id}`} style={{marginRight:'8px'}}>查看</Link>
          { record.state===0?<a onClick={e=>onEditItem(record)}>编辑</a>:null}
          { record.state===0?<SelectUser callBack={e=>handleSubmit(record,e)} />:null}
          { record.state===0?
            <a style={{marginLeft:'8px'}} onClick={e=>handleDel(record.id)}>删除</a>
            :null
          }
        </span>):null
      },
    },
  ]


  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true})}
        bordered
        scroll={{ x: 1100 }}
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
