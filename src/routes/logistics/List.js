import React from 'react';
import PropTypes from 'prop-types';
import { Table, Modal,Button,Tooltip } from 'antd';
import styles from './List.less';
// import classnames from 'classnames';
//import { DropOption } from '../../components';
import { Link } from 'dva/router';
import ChangeState from './ChangeState';
const confirm = Modal.confirm;

const List = ({ onDeleteItem, onEditItem,onChangeItem, location, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === 1) {
      onEditItem(record);
    } else if (e.key === 2) {
      confirm({
        title: '你确定删除这条物流信息么?',
        onOk () {
          onDeleteItem(record.id);
        },
      })
    }
  }

  const tooltips=(text)=>text && text.length>14?<Tooltip title={text}>{text.substr(0,12)}...</Tooltip>:<span>{text && text}</span>;
  //tableProps={...tableProps,dataSource:[]}
  const columns = [
    {
      title: '客户姓名',
      dataIndex: 'clientName',
      key: 'clientName',
      render:(text)=>tooltips(text),
    }, {
      title: '客户电话',
      dataIndex: 'clientPhone',
      key: 'clientPhone',
      render:(text)=>tooltips(text),
    }, {
      title: '订单编号',
      dataIndex: 'orderCode',
      key: 'orderCode',
      render:(text)=>tooltips(text),
    }, {
      title: '物流名称',
      dataIndex: 'logistics',
      key: 'logistics',
      render:(text)=>tooltips(text),
    }, {
      title: '物流状态',
      dataIndex: 'logisticsState',
      key: 'logisticsState',
      render:(text)=>text===-1?'运输异常':text===1?'已完成':'运输途中',
    }, {
      title: '操作',
      key: 'operation',
      fixed:'right',
      width: 200,
      render: (text, record) => {
          return  (<span className={styles.action}>
              <a onClick={e=>handleMenuClick(record,{key:1})} >编辑</a>
              <ChangeState callBack={onChangeItem} data={record}/>
              <a onClick={e=>handleMenuClick(record,{key:2})} >删除</a>
              <Link to={`/logistics/${record.id}`}>查看</Link>
            </span>)
      },
    },
  ]


  return (
    <div>
      <Table
        {...tableProps}
        bordered
        columns={columns}
        simple
        scroll={{ x: 767 }}
        rowKey={record => record.id}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
