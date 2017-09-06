import React from 'react'
import PropTypes from 'prop-types'
//import ReactDOM from 'react-dom'
import styles from './SelectEmployee.less'
import { Row,Col,Tree,Table,Modal,Button,message } from 'antd'
import {getOrg,queryList} from '../../services/employee'
import {getDinnerInfo} from '../../services/dinnerBook'
import {config,treeToArray } from '../../utils'
const {prefix} =config;
const TreeNode = Tree.TreeNode;
class SelectEmployee extends React.Component {
  state = {
    employeeList:[],
    orgTree:[],
    modalVisible:false,
    selectedRow:[],
  }
  componentWillMount(){
    getOrg().then(res=>{
      this.setState({orgTree:res.data});
    });
  }
  showModal = () => {
    this.setState({modalVisible: true});
  }
  
  handleOk = (e) => {
    //console.log(e);
    const { selectedRow} =this.state;
    if(selectedRow && selectedRow.length<1 ){
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
    const orgList=treeToArray(orgTree)
    const getOrgName=(value)=>{
      let n=orgList.filter(item=>String(item.id)===String(value));
      //console.log(orgList,...n,value);
      if(n && n[0]){
        return n[0].orgName;
      }
      return '';
    }
    const columns = [
      {
        title: '部门',
        key: 'orgId',
        render: (text, record) =>(record.postList&&record.postList[0]?getOrgName(record.postList[0].orgId):''),
        
      }, {
        title: '姓名',
        dataIndex: 'realName',
        key: 'realName',
      },
    ]
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        //console.log('selectedRows:',selectedRows[0]);
        let { selectedRow} =this.state;
        selectedRows.map(item=>{
          if(selectedRow.filter(k=>k.dinnerId===item.dinnerId).length<1){
            selectedRow.push(item)
          }
        })
        this.setState({selectedRow})
      },
      
    };
    const tableProps = {
      dataSource: employeeList,
      pagination:false,
      rowSelection,
      title:()=><h4>可添加人员</h4>
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
      //找员工
      queryList({orgId:selectedKeys[0],includeChildOrgId:true}).then(res=>{
        if(res && res.data){
          let fields=[];
          res.data.map((_data,index)=>{
            // if(_data.id)fields[`detailList[${index}].id`]=_data.id;
            fields[`detailList[${index}].dinnerId`]=_data.userId;
            fields[`detailList[${index}].dinnerName`]=_data.realName;
            fields[`detailList[${index}].deptId`]=_data.postList[0].orgId;
            fields[`detailList[${index}].deptName`]=getOrgName(_data.postList[0].orgId);
          })
          getDinnerInfo(fields).then(result=>{
            if(result && result.data){
              this.setState({employeeList:result.data.detailList})
            }
            if(result && !result.success){
              message.error(result.message);
            }
          });

        }
        if(res && !res.success){
          message.error(res.message);
        }
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
      <span style={{marginRight:'12px'}}>
        <Button type="primary"  size="large" onClick={e=>this.showModal()}>添加内部人员</Button>
        <Modal
          width={600}
          title='添加内部人员'
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


SelectEmployee.propTypes = {
  
}

export default SelectEmployee
