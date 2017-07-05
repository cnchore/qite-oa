import React from 'react'
import PropTypes from 'prop-types'
//import ReactDOM from 'react-dom'
import styles from './EmployeeCell.less'
import { Row,Col,Tree,Table,Modal,Button } from 'antd'
import {getOrg,queryList} from '../../services/employee'

const TreeNode = Tree.TreeNode;


class EmployeeCell extends React.Component {
  state = {
    value: this.props.value,
    editable: this.props.editable || false,
    employeeList:[],
    orgTree:[],
    modalVisible:false,
    selectedRow:{},
  }
 
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.editable !== this.state.editable) {
      this.setState({ editable: nextProps.editable });
      if (nextProps.editable) {
        this.cacheValue = this.state.value;
      }
    }
    if (nextProps.status && nextProps.status !== this.props.status) {
      if (nextProps.status === 'save') {
        this.props.onChange(this.state.value,this.state.selectedRow);
      } else if (nextProps.status === 'cancel') {
        this.setState({ value: this.cacheValue});
        this.props.onChange(this.cacheValue,null);
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.editable !== this.state.editable ||
           nextState.value !== this.state.value || 
           nextState.modalVisible!==this.state.modalVisible ||
           nextState.employeeList!==this.state.employeeList ||
           nextState.selectedRow!==this.state.selectedRow;
  }

 
  showModal = () => {
    const {editable}=this.state;
    const self=this;
    if(editable){
      getOrg().then(res=>{
        //console.log('onSelect:',res.data)
        self.setState({orgTree:res.data,modalVisible: true});
      });
    }
  }
  handleOk = (e) => {
    //console.log(e);
    const { selectedRow} =this.state;
    this.setState({
      modalVisible: false,
      value:selectedRow.employeeName,
    });
  }
  handleCancel = (e) => {
    //console.log(e);
    this.setState({
      modalVisible: false,
    });
  }
  render() {
    const { value,editable,employeeList,orgTree } = this.state;
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
        selectedRow.employeeId=selectedRows[0].id;
        selectedRow.employeeName=selectedRows[0].realName;
        this.setState({selectedRow})
      },
      
      type:'radio',
    };
    const tableProps = {
      dataSource: employeeList,
      pagination:false,
      rowSelection,
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
           <h3>组织机构</h3>
          <Tree onSelect={onSelect} showLine>
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
      <div>
        {
          editable ?
            <div>
              <Row>
                <Col span={12}>
                  {value?value.toString():''}
                </Col>
                <Col span={12}>
                <a onClick={e=>this.showModal()}>选择</a>
                </Col>
              </Row>
              <Modal
                width={600}
                title="选择人员"
                visible={this.state.modalVisible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                {content}
              </Modal>

            </div>
            :
            <div className="editable-row-text">
              {value?value.toString():''}
            </div>
        }
      </div>
    );
  }
}


EmployeeCell.propTypes = {
  value: PropTypes.string,
  editable: PropTypes.bool,
  
}

export default EmployeeCell
