import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Tooltip } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import { getRecordAction } from '../../components';
import {getRecordState,renderTooltips} from '../../utils';

const confirm = Modal.confirm

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
  const getDicType=(value,remark=null)=>{
    let n=dicList.filter(item=>String(item.id)===String(value));
    //console.log(orgList,...n,value);
    if(n && n[0]){
      let d=`${n[0].carBrand && n[0].carBrand}，${n[0].carNum&&n[0].carNum}`;
      return d.length>15?<Tooltip title={d}>{d.substr(0,15)}</Tooltip>:<span>{d}</span>;
    }
    return <span>无</span>;
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
      dataIndex: 'code',
      key: 'code',
    }, {
      title: '申请时间',
      dataIndex: 'createTime',width:170,
      key: 'createTime',
    }, {
      title: '车辆类型',width:250,
      dataIndex: 'carId',
      key: 'carId',
      render:(text,record)=>getDicType(text),
    }, {
      title: '用车事由',
      dataIndex: 'remark',
      key: 'remark',
      render:(text)=>renderTooltips(text,12),
    }, {
      title: '出车时间',width:170,
      key: 'useTime',
      dataIndex:'useTime',
    }, {
      title: '预计返回时间',width:170,
      dataIndex: 'returnTime',
      key: 'returnTime',
    
    }, {
      title: '状态',width:120,
      dataIndex: 'state',
      key: 'state',
      render:(text)=>getRecordState(text),
    }, {
      title: '操作',
      key: 'operation',
      fixed:'right',
      width: 250,
      render: (text, record)=>getRecordAction('useCar',record,onEditItem,handleSubmit,handleDel,onChange,true),
    },
  ]


  return (
    <div>
      <Table
        {...tableProps} onChange={onChange}
        className={classnames({ [styles.table]: true})}
        bordered
        scroll={{ x: 1550 }}
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
