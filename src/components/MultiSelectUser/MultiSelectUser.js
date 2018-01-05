import React from 'react'
import PropTypes from 'prop-types'
//import ReactDOM from 'react-dom'
import styles from './MultiSelectUser.less'
import { Row,Col,Tree,Table,Modal,Button,message } from 'antd'
import {getOrg,queryList} from '../../services/employee'
import {config } from '../../utils'
// const {prefix} =config;
const TreeNode = Tree.TreeNode;
class MultiSelectUser extends React.Component {
  state = {
    employeeList:[],
    orgTree:[],
    modalVisible:false,
    selectedRows:[],
    orgName:'',
  }
  componentWillMount(){
    // const userInfo=JSON.parse(sessionStorage.getItem(`${prefix}userInfo`));
    // if(userInfo && userInfo.data && userInfo.data.userName){
    //   this.setState({mobilePhone:userInfo.data.userName})
    //   // console.log(userInfo.data.id)
    // }
  }
  showModal = () => {
    getOrg().then(res=>{
      //console.log('onSelect:',res.data)
      this.setState({orgTree:res.data,modalVisible: true});
    });
  }
  
  handleOk = (e) => {
    //console.log(e);
    const { selectedRows,orgName} =this.state;
    if(!selectedRows.length ){
      message.error('请选择一个人后，再试');
      return;
    }
    this.setState({
      modalVisible: false,
    });
    if(this.props.callBack)this.props.callBack({selectedRows,orgName});
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
        this.setState({
          selectedRows:selectedRows.map(f=>{
            return {userId:f.userId,realName:f.realName};
          })
        })
      },
      
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
    const treeNodes = loop(orgTree || []);
    const onSelect = (selectedKeys, info) => {
      
      let orgName=info.selectedNodes[0].props.title;
      //console.log('onSelect:',selectedKeys[0],info.selectedNodes[0].props.title);
      queryList({orgId:selectedKeys[0]}).then(res=>{
        this.setState({employeeList:res.data,orgName})
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
        <Col span={12} className={styles.table}>
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
      <span >
        <a onClick={e=>this.showModal()}>选择加班人</a>
        <Modal
          style={{ top: 10 }}
          width={600}
          title="选择加班人"
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


MultiSelectUser.propTypes = {
  
}

export default MultiSelectUser
