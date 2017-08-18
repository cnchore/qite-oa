import React from 'react'
import PropTypes from 'prop-types'
//import ReactDOM from 'react-dom'
import styles from './SelectUser.less'
import { Row,Col,Tree,Table,Modal,Button,message } from 'antd'
import {getOrg,queryList} from '../../services/employee'
import {config } from '../../utils'
const {prefix} =config;
const TreeNode = Tree.TreeNode;
class SelectUser extends React.Component {
  state = {
    employeeList:[],
    orgTree:[],
    modalVisible:false,
    selectedRow:{},
    mobilePhone: -1,
  }
  componentWillMount(){
    const userInfo=JSON.parse(sessionStorage.getItem(`${prefix}userInfo`));
    if(userInfo && userInfo.data && userInfo.data.userName){
      this.setState({mobilePhone:userInfo.data.userName})
      // console.log(userInfo.data.id)
    }
  }
  showModal = () => {
    getOrg().then(res=>{
      //console.log('onSelect:',res.data)
      this.setState({orgTree:res.data,modalVisible: true});
    });
  }
  handleCallBackNull=()=>{
    if(this.props.callBack)this.props.callBack({userId:-1});
  }
  handleOk = (e) => {
    //console.log(e);
    const { selectedRow} =this.state;
    if(selectedRow && !selectedRow.userId ){
      message.error('请选择一个人后，再试');
      return;
    }
    this.setState({
      modalVisible: false,
    });
    if(this.props.callBack)this.props.callBack(selectedRow);
  }
  handleCancel = (e) => {
    //console.log(e);
    this.setState({
      modalVisible: false,
    });
  }
  render() {
    const { employeeList,orgTree } = this.state;
    const {type} = this.props;
    const columns = [
      {
        title: '姓名',
        dataIndex: 'realName',
        key: 'realName',
      }, {
        title: '账号',
        dataIndex: 'mobilePhone',
        key: 'mobilePhone',
      },
    ]
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        //console.log('selectedRows:',selectedRows[0]);
        
        let { selectedRow} =this.state;
        selectedRow.userId=selectedRows[0].userId;
        selectedRow.userName=selectedRows[0].userName;
        selectedRow.realName=selectedRows[0].realName;
        this.setState({selectedRow})
      },
      getCheckboxProps: record => ({
        disabled: record.mobilePhone === this.state.mobilePhone, 
      }),
      type:'radio',
    };
    const tableProps = {
      dataSource: employeeList,
      pagination:false,
      rowSelection,
      title:()=><h4>可选人员</h4>
    }
    const loop = data => data.map((item) => {
      if (item.children && item.children[0]) {
        return <TreeNode title={item.orgName} key={item.id}>{loop(item.children)}</TreeNode>;
      }
      return <TreeNode title={item.orgName} key={item.id} />;
    });
    //console.log(orgTree);
    const treeNodes = loop(orgTree);
    const onSelect = (selectedKeys, info) => {
      let { selectedRow} =this.state;
      selectedRow.orgId=selectedKeys[0];
      selectedRow.orgName=info.selectedNodes[0].props.title;
      //console.log('onSelect:',selectedKeys[0],info.selectedNodes[0].props.title);
      queryList({orgId:selectedKeys[0]}).then(res=>{
        this.setState({employeeList:res.data,selectedRow})
      })
    }

    
    const content=(
      <Row gutter={24} style={{width:'580px'}}>
        <Col className={styles.tree} span={12}>
           <h4>组织机构</h4>
          <Tree onSelect={onSelect} showLine defaultExpandAll>
            {treeNodes}
          </Tree>
        </Col>
        <Col span={12}>
          <Table
            {...tableProps}
            bordered
            columns={columns}
            simple
            rowKey={record => record.id}
          />
        </Col>
      </Row>
    )
    return (
      <span style={{marginLeft:'8px'}}>
      { type && type==='button'?<span>
        <Button size="large" type="primary" onClick={e=>this.handleCallBackNull()}>提交</Button>
        <Button size="large" type="primary" style={{marginLeft:'8px'}} onClick={e=>this.showModal()}>指定审批人</Button>
      </span>
      :type && type==='selectAgent'?
      <Button style={{marginLeft:'8px'}} onClick={e=>this.showModal()}>选择代理人</Button>
      :
      <span>
        <a onClick={e=>this.handleCallBackNull()}>提交</a>
        <a style={{marginLeft:'8px'}} onClick={e=>this.showModal()}>指定审批人</a>
      </span>
      }
      <Modal
        width={600}
        title={type && type!=='selectAgent'?"选择审批人":'选择任务代理人'}
        visible={this.state.modalVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        {content}
      </Modal>
      </span>
    );
  }
}


SelectUser.propTypes = {
  type:PropTypes.string,
}

export default SelectUser
