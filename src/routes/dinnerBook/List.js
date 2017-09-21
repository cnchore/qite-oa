import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Button,Tag } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import { Link } from 'dva/router'

const confirm = Modal.confirm

const List = ({ onSubmit,dicList, onEditItem, location, ...tableProps }) => {
 const handleSubmit = (record) => {
      confirm({
        title: record.state===1?'你确定取消报餐么？':`你确定提交报餐么?`,
        onOk () {
          onSubmit(record.id);
        },
      })
  }
  
  const getRecordState=(text)=>{
    //状态：0未提交  1已提交 2已取消
    switch(text){
      case 0:
        return <Tag color=''>未提交</Tag>;
      case 1:
        return <Tag color='#87d068'>已提交</Tag>;
      case 2:
        return <Tag color='#2db7f5'>已取消</Tag>;
     
    }
  }
  
  const columns = [
    {
      title: '报餐人',
      dataIndex: 'createrName',
      key: 'createrName',
    }, {
      title: '报餐时间',
      dataIndex: 'createTime',width:170,
      key: 'createTime',
    }, {
      title: '预约用餐时间',
      dataIndex: 'bookTime',
      key: 'bookTime',
    }, {
      title: '早餐总数',
      dataIndex: 'breakfastTotal',
      key: 'breakfastTotal',
    }, {
      title: '午餐总数',
      dataIndex: 'lunchTotal',
      key: 'lunchTotal',
    }, {
      title: '晚餐总数',
      dataIndex: 'supperTotal',
      key: 'supperTotal',
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
      render: (text, record) => {
        return record.state!==undefined?(<span>
          <Link to={`/dinnerBook/${record.id}`} style={{marginRight:'8px'}}>查看</Link>
          { record.state!==2 && record.bookTime && new Date(record.bookTime)>Date.now()?<a onClick={e=>onEditItem(record)}>编辑</a>:null}
         
          { record.state!==2 && record.bookTime && new Date(record.bookTime)>Date.now()?
            <a style={{marginLeft:'8px'}} onClick={e=>handleSubmit(record)}>{record.state===0?'提交':'取消'}</a>
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
        scroll={{ x: 1300 }}
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
