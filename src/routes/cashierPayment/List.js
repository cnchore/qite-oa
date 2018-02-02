import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Button,Tag,Tooltip } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
// import { DropOption } from '../../components'
import { Link } from 'dva/router'

const confirm = Modal.confirm

const List = ({ onEditItem,location, ...tableProps }) => {
  const handleSign=(item)=>{
    confirm({
      title:'你是否确认已付款？',
      onOk(){
        onEditItem && onEditItem({
          busiCode:item.busiCode,
          busiId:item.busiId,
          userId:item.userId, 
          applier:item.applier,
        });
      },
    })
  }
  const getAction=(item)=>{
    if(!item){
      return null;
    }
    const code=item.busiCode && item.busiCode.substr(0,2) || '';
    let link;
    switch(code){
      case 'PT':
        link=<Link to={`/payment/${item.busiId}`} style={{marginRight:'8px'}}>查看</Link>;
        break;
      case 'BO':
        link=<Link to={`/borrow/${item.busiId}`} style={{marginRight:'8px'}}>查看</Link>;
        break;
      case 'RE':
        link=<Link to={`/reimburse/${item.busiId}`} style={{marginRight:'8px'}}>查看</Link>;
        break;
      case 'TR':
        link=<Link to={`/travelReimburse/${item.busiId}`} style={{marginRight:'8px'}}>查看</Link>;
        break;
    }
    return <div>
        {link}
        {!item.isPay?<a onClick={e=>handleSign(item)}>付款</a>:null}
      </div>
  }
  const columns = [
    {
      title: '序号',
      key: 'seq',
      render:(text,record,index)=><span>{index+1}</span>,
    },
    {
      title: '申请人',
      dataIndex: 'applier',
      key: 'applier',
    }, {
      title: '申请单号',
      dataIndex: 'busiCode',
      key: 'busiCode',
    }, {
      title: '说明',
      dataIndex: 'remark',width:250,
      key: 'remark',
      render:(text)=>text && text.length>15?<Tooltip title={text}>{text.substr(0,13)}...</Tooltip>:<span>{text}</span>
    }, {
      title: '合计金额',
      dataIndex: 'applyAmount',width:170,
      key: 'applyAmount',
    }, {
      title: '用款单位',
      dataIndex: 'useUnit',width:170,
      key: 'useUnit',
    }, {
      title: '是否已付款',
      dataIndex: 'isPay',
      key: 'isPay',
      render:(text,record)=><span style={{ color: text?'#f00':'' }} >{text?record.payTime:'否'}</span>
    }, {
      title: '操作',
      key: 'operation',
      fixed:'right',
      width: 150,
      render: (text, record) => getAction(record)
    },
  ]


  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true})}
        bordered
        scroll={{ x: 1150 }}
        columns={columns}
        simple
        rowKey={record => record.busiId}
      />
    </div>
  )
}

List.propTypes = {
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
