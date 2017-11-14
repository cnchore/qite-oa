import React from 'react'
import PropTypes from 'prop-types'
// import ReactDOM from 'react-dom'
import styles from './AuditConfigModal.less'
import { Table,Modal,message,Tooltip,Input } from 'antd'
import {query,saveUserAudit} from '../../services/auditConfig'
// import {config,treeToArray } from '../../utils'
// const {prefix} =config;
const Search = Input.Search;
class AuditConfigModal extends React.Component {
  state = {
    list:[],
    modalVisible:false,
    selectedRow:[],
    selectedRowKeys:[],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
  }
  queryList=(remarkLike='',page=1,rows=10)=>{
    let userId=this.props.userId;
    query({userId,remarkLike,page,rows}).then(res=>{
      if(res.success){
        let _list=res.data.rowsObject;
        this.setState({
          list:_list,
          pagination: {
            ...this.state.pagination,
            current: page,
            pageSize: rows,
            total: res.data.total,
          },
          modalVisible: true,
          selectedRowKeys:_list[0]?_list.filter(f=>String(f.isUserAudit)==='true').map(r=>r.id):[]
        });
      }else{
        message.error(res.message);
      }
    })
  }
  showModal = () => {
    this.queryList();
  }
  
  handleOk = (e) => {
    //console.log(e);
    const { selectedRow} =this.state;
    if(selectedRow && selectedRow.length<1 ){
      message.error('请选择一个角色后，再试');
      return;
    }
    let userId=this.props.userId;
    saveUserAudit({userId,auditIds:selectedRow.map(f=>f.id).join()}).then(res=>{
      if(res.success){
        message.success('[审批角色绑定]成功！')
        this.setState({
          modalVisible: false,
        });
      }else{
        message.error(res.message)
      }
    })
    // if(this.props.callBack)this.props.callBack(selectedRow);
  }
  handleCancel = (e) => {
    //console.log(e);
    this.setState({
      modalVisible: false,
    });
  }
  handleSearch=(value)=>{
    this.queryList(value);
  }
  render() {
    const { list,selectedRowKeys,pagination,selectedRow } = this.state;
    const {userId} =this.props;
    const self=this;
    const renderTips=(text)=>{
     return text && text.length>120?
      <Tooltip title={text}>{text.substr(0,117)}...</Tooltip>
      :<span>{text && text}</span>
    }

    const columns = [
      {
        title: '角色名称',
        key: 'auditName',
        dataIndex: 'auditName',
        width:120,
        // render:(text)=>renderTips(text),
      }, {
        title: '角色描述',
        dataIndex: 'remark',
        key: 'remark',
        // render:(text)=>renderTips(text),
      },
    ]
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRow:selectedRows,
          selectedRowKeys:selectedRows.map(item=>item.id)
        })
      },
      onSelectAll:(selected, selectedRows, changeRows)=>{
        this.setState({
          selectedRowKeys:selectedRows.map(item=>item.id),
          selectedRow:selectedRows,
        })
      },
      selectedRowKeys,
    };
    const tableProps = {
      dataSource: list,
      pagination,
      rowSelection,
      onChange (page) {
        self.queryList('',page.current,page.pageSize).bind(self);
      },
      onRowClick(record){
        if(record && record.id){
          self.setState({
            selectedRow:[...selectedRow,record],
            selectedRowKeys:[...selectedRowKeys,record.id]
          })
        }
      },
    }
    
    
    return (
      <span style={{marginLeft:'8px'}}>
        <a  onClick={e=>this.showModal()}>审批角色绑定</a>
        <Modal
          width={800}
          title='用户绑定审批角色'
          visible={this.state.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Table
            {...tableProps}
            bordered
            columns={columns}
            simple
            rowKey={record => record.id}
            title={
              ()=><Search addonBefore="角色描述：" placeholder="输入角色描述" size="large" 
              style={{width:400}}
              onSearch={value=>this.handleSearch(value)} />
            }
          />
        </Modal>
      </span>
    );
  }
}


AuditConfigModal.propTypes = {
  
}

export default AuditConfigModal
