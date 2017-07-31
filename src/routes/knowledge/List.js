import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Button,Tag } from 'antd'
import { Link } from 'dva/router'

const confirm = Modal.confirm

const List = ({ onItemChange, onEditItem, location, ...tableProps }) => {
  const {orgList} = tableProps
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: `你确定${record.state===0||record.state===2?'发布':'下线'}这条知识项么?`,
        onOk () {
          onItemChange(record.id,(record.state===0||record.state===2?'发布':'下线'))
        },
      })
    }
  }
  const getOrgName=(value)=>{
    let n=orgList.filter(item=>String(item.id)===String(value));
    //console.log(orgList,...n,value);
    if(n && n[0]){
      return n[0].orgName;
    }
    return '';
  }
  //tableProps={...tableProps,dataSource:[]}
  const isMyKnowledge=location.query && location.query.isMyKnowledge || false;
  const columns = isMyKnowledge?
  [
    {
      title: '知识主题',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '发布人',
      dataIndex: 'publisher',
      key: 'publisher',
    }, {
      title: '发布时间',
      dataIndex: 'publishTime',
      key: 'publishTime',
    }, {
      title: '操作',
      key: 'operation',
      fixed:'right',
      width: 80,
      render: (text, record) => <Link to={`knowledge/${record.id}?noComment=true`}>查看</Link>
    },
  ]:[
    {
      title: '知识主题',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '发布人',
      dataIndex: 'publisher',
      key: 'publisher',
    }, {
      title: '发布时间',
      dataIndex: 'publishTime',
      key: 'publishTime',
    }, {
      title: '知识点对象',
      dataIndex: 'toId',
      key: 'toId',
      render:(text)=>getOrgName(text),
    }, {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render:(text)=><Tag color={text===0?'':text===1?'#2db7f5':'#f50'}>{text===0?'未发布':text===1?'已发布':'已下线'}</Tag>
    }, {
      title: '操作',
      key: 'operation',
      fixed:'right',
      width: 150,
      render: (text, record) => {
        return  <div>
            <Link to={`knowledge/${record.id}`}>查看</Link>
            <a onClick={e=>handleMenuClick(record,{key:'1'})} style={{marginLeft:'8px',marginRight:'8px'}}>编辑</a>
            <a onClick={e=>handleMenuClick(record,{key:'2'})}>{record.state===0||record.state===2?'发布':'下线'}</a>
          </div>
      },
    },
  ]


  return (
    <div>
      <Table
        {...tableProps}
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
  onDeleteItem: PropTypes.func,
  onItemChange: PropTypes.func,
  location: PropTypes.object,
}

export default List
