import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Button,Tag } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import { DropOption } from '../../components'
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
  const columns = [
    {
      title: '知识主题',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <Link to={`knowledge/${record.id}`}>{text}</Link>,
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
      width: 100,
      render: (text, record) => {
        //  return  (<Button size="small" icon="edit" type="ghost" onClick={e=>onEditItem(record)} >编辑</Button>)
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} 
        menuOptions={[{ key: '1', name: '编辑' },{ key: '2', name: record.state===0||record.state===2?'发布':'下线' }]} />
      },
    },
  ]


  return (
    <div>
      <Table
        {...tableProps}
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
  onDeleteItem: PropTypes.func,
  onItemChange: PropTypes.func,
  location: PropTypes.object,
}

export default List
