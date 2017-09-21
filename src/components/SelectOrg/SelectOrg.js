import React from 'react'
import PropTypes from 'prop-types'
//import ReactDOM from 'react-dom'
import styles from './SelectOrg.less'
import { Row,Col,Tree,Table,Modal,Button,message } from 'antd'
import {getOrg} from '../../services/employee'
import {config } from '../../utils'
const {prefix} =config;
const TreeNode = Tree.TreeNode;
class SelectOrg extends React.Component {
  state = {
    orgTree:[],
    modalVisible:false,
    checkedKeys:this.props.checkedKeys || [],
    checkedKeyNames:[],
  }
  componentWillMount(){
    
  }
  showModal = () => {
    getOrg().then(res=>{
      //console.log('onSelect:',res.data)
      this.setState({orgTree:res.data,modalVisible: true});
    });
  }
  
  handleOk = (e) => {
    //console.log(e);
    const { checkedKeys,checkedKeyNames} =this.state;
    if(checkedKeys.length<1){
      message.error('请选择一部门后，再试');
      return;
    }
    this.setState({
      modalVisible: false,
    });
    if(this.props.callBack)this.props.callBack({checkedKeys,checkedKeyNames});
  }
  handleCancel = (e) => {
    //console.log(e);
    this.setState({
      modalVisible: false,
    });
  }
  render() {
    const { orgTree,checkedKeys } = this.state;
    
    const loop = data => data.map((item) => {
      if (item.children && item.children[0]) {
        return <TreeNode title={item.orgName} key={item.id}>{loop(item.children)}</TreeNode>;
      }
      return <TreeNode title={item.orgName} key={item.id} />;
    });
    //console.log(orgTree);
    const treeNodes = loop(orgTree);
    const onSelect = (selectedKeys, info) => {
      console.log('onSelect:',selectedKeys[0],info.selectedNodes[0].props.title);
    }
    const onCheck = (checkedKeys, info) => {
      let checkedKeyNames=info.checkedNodes.map(f=>f.props.title);
      // console.log('onCheck', checkedKeys, checkedKeyNames);
      this.setState({checkedKeys,checkedKeyNames})
    }
    
    const content=(
          <Tree 
            onCheck={onCheck}
            
            checkedKeys={checkedKeys}
            checkable
            showLine 
            defaultExpandAll>
            {treeNodes}
          </Tree>
    )
    //按钮；标题
    let _span=<Button  onClick={e=>this.showModal()}>选择部门</Button>,
      _title='选择部门';
    return (
      <span style={{marginLeft:'8px'}}>
      { _span }
      <Modal
        width={400}
        title={_title}
        visible={this.state.modalVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        wrapClassName={styles['q-modal']}
      >
        {content}
      </Modal>
      </span>
    );
  }
}


SelectOrg.propTypes = {
  type:PropTypes.string,
  checkedKeys:PropTypes.array,
}

export default SelectOrg
