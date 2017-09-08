import React from 'react'
import PropTypes from 'prop-types'
import { Table,Button,Tag } from 'antd'
// import styles from './List.less'
// import classnames from 'classnames'
// import { DropOption,SelectUser } from '../../components'
import { Link } from 'dva/router'

// const confirm = Modal.confirm

const List = ({ onEditItem,location, ...tableProps }) => {

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
      title:'申请人',
      dataIndex:'applyName',
      key:'applyName',
    }, {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render:(text)=>getRecordState(text),
    }, {
      title: '是否全部入库',
      dataIndex: 'isAllIn',
      key: 'isAllIn',
      render:(text)=>text?'是':'否',
    }, {
      title: '操作',
      key: 'operation',
      fixed:'right',
      width: 250,
      render: (text, record) => {
        return record.state!==undefined?(<span>
          <Link to={`/storage/${record.id}`} style={{marginRight:'8px'}}>查看</Link>
          { (record.state===2 || record.state===4) && !record.isAllIn?<a onClick={e=>onEditItem(record)}>前往入库</a>:null}
          
        </span>):null
      },
    },
  ]


  return (
    <div>
      <Table
        {...tableProps}
        // className={classnames({ [styles.table]: true})}
        bordered
        scroll={{ x: 867 }}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    </div>
  )
}

List.propTypes = {
  onItemChange: PropTypes.func,
  location: PropTypes.object,
}

export default List
