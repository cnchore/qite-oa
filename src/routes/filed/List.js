import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Button,Tag } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import { Link } from 'dva/router'
import ExportCsv from '../../utils/export-csv'
import Csv from '../../utils/csv'
const List = ({ location, ...tableProps }) => {
 
  const columns = [
    {
      title: '申请人',
      dataIndex: 'applyName',
      key: 'applyName',
    }, {
      title: '申请单号',
      dataIndex: 'busiCode',
      key: 'busiCode',
    }, {
      title: '流程名称',
      dataIndex: 'flowName',
      key: 'flowName',
    }, {
      title: '创建时间',
      dataIndex: 'applyTime',width:170,
      key: 'applyTime',
    
    }, {
      title: '办结人',
      dataIndex: 'auditerName',
      key: 'auditerName',
    }, {
      title: '办结时间',
      dataIndex: 'auditTime',width:170,
      key: 'auditTime',
    }, {
      title: '操作',
      key: 'operation',
      fixed:'right',
      width: 100,
      render: (text, record) => <Link to={`/filed/${record.taskId}?procDefId=${record.procDefId}&procInstId=${record.procInstId}`}>查看</Link>,
    },
  ]
  const handleExportCsv=()=>{
    let _columns=columns.slice(0,-1);
    let {dataSource}= tableProps;
    let csvData=Csv(_columns,dataSource,',',false);
    console.log(csvData)
    let filename='淇特办公归档数据'+Date.now()+'.csv';
    ExportCsv.download(filename,csvData);
  }
  const handleExportCsvAll=()=>{

  }
  const footer=()=><div>
    <a onClick={handleExportCsv} style={{marginRight:'8px'}}>导出本页到csv</a>
    <a onClick={handleExportCsvAll}>导出全部到csv</a>
  </div>

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true})}
        bordered
        scroll={{ x: 1150 }}
        columns={columns}
        simple
        rowKey={record => record.taskId}
        footer={footer}
      />
    </div>
  )
}

List.propTypes = {
  location: PropTypes.object,
}

export default List
