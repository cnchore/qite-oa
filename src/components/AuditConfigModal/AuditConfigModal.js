import React from 'react'
import PropTypes from 'prop-types'
// import ReactDOM from 'react-dom'
import styles from './AuditConfigModal.less'
import { Table,Modal,message,Tooltip,Input } from 'antd'
import {query,saveUserAudit,getList} from '../../services/auditConfig'
// import {config,treeToArray } from '../../utils'
// const {prefix} =config;
const Search = Input.Search;
class AuditConfigModal extends React.Component {
  state = {
    list:[],
    modalVisible:false,
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
          // selectedRowKeys:_list[0]?_list.filter(f=>String(f.isUserAudit)==='true').map(r=>r.id):[]
        });
      }else{
        message.error(res.message);
      }
    })
  }
  showModal = () => {
    let userId=this.props.userId,
        isOnlyUserAudit=true;
    getList({userId,isOnlyUserAudit}).then(res=>{
      if(res.success){
        let selectedRowKeys=res.data?res.data.map(f=>f.id):[];
        this.setState({selectedRowKeys});
        this.queryList();
      }else{
        message.error(res.message);
      }
    })
  }
  
  handleOk = (e) => {
    //console.log(e);
    const { selectedRowKeys} =this.state;
    // if(selectedRow && selectedRow.length<1 ){
    //   message.error('请选择一个角色后，再试');
    //   return;
    // }
    let userId=this.props.userId;
    saveUserAudit({userId,auditIds:selectedRowKeys.join()}).then(res=>{
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
    const { list,selectedRowKeys,pagination } = this.state;
    const {userId} =this.props;
    const self=this;
    const renderTips=(text)=>{
     return text && text.length>120?
      <Tooltip title={text}>{text.substr(0,117)}...</Tooltip>
      :<span>{text && text}</span>
    }

    const columns = [
      {
        title: '审批角色名称',
        key: 'auditName',
        dataIndex: 'auditName',
        width:120,
        // render:(text)=>renderTips(text),
      }, {
        title: '应用的流程',
        dataIndex: 'remark',
        key: 'remark',
        // render:(text)=>renderTips(text),
      },
    ]
    const rowSelection = {
      onSelect: (record, selected, selectedRows) => {
        // console.log('selected:',selected,record);
        let {selectedRowKeys} = this.state;
        if(selected){
          selectedRowKeys=[...selectedRowKeys,record.id];
        }else{
          selectedRowKeys=selectedRowKeys.filter(f=>String(f)!==String(record.id));
        }
        this.setState({selectedRowKeys});
      },
      onSelectAll:(selected, selectedRows, changeRows)=>{
        let {selectedRowKeys} = this.state;
        if(selected){
          selectedRowKeys=[...selectedRowKeys,...selectedRows.map(m=>m.id)];
        }else{
          selectedRows.forEach(item=>{
            selectedRowKeys=selectedRowKeys.filter(f=>String(f)!==String(item.id));
          })
        }
        this.setState({selectedRowKeys});
      },
      selectedRowKeys,
    };
    const tableProps = {
      dataSource: list,
      pagination,
      rowSelection,
      onChange (page) {
        self.queryList('',page.current,page.pageSize);
      },
      onRowClick(record){
        // console.log(record,b,c);
        if(record && record.id){
          self.setState({
            selectedRowKeys:[...selectedRowKeys,record.id]
          })
        }
      },
    }
    
    
    return (
      <span style={{marginLeft:'8px'}}>
        <a  onClick={e=>this.showModal()}>审批角色绑定</a>
        <Modal
          style={{ top: 20 }}
          width={1020}
          title='审批角色绑定'
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
              ()=><Search addonBefore="应用的流程：" placeholder="输入应用的流程" size="large" 
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
