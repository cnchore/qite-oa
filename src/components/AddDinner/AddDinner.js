import React from 'react'
import PropTypes from 'prop-types'
//import ReactDOM from 'react-dom'
import styles from './AddDinner.less'
import { Input,Modal,Button,message } from 'antd'
import {config } from '../../utils'
const {prefix} =config;
class AddDinner extends React.Component {
  state = {
    modalVisible:false,
    deptId:-1,
    deptName:'外宾',
    dinnerName:'',
  }
  componentWillMount(){
    // const userInfo=JSON.parse(sessionStorage.getItem(`${prefix}userInfo`));
    // if(userInfo && userInfo.data && userInfo.data.employeeVo){
    //   this.setState({
    //     deptId:userInfo.data.employeeVo.postList[0].orgId,
    //     deptName:userInfo.data.employeeVo.postList[0].orgName,
    //   });
    // }
   
  }
  showModal = () => {
    this.setState({modalVisible: true});
  }
  
  handleOk = (e) => {
    //console.log(e);
    const { deptId,deptName,dinnerName } =this.state;
    if(!dinnerName){
      message.error('请输入用餐人姓名，再试');
      return;
    }
    this.setState({
      modalVisible: false,
    });
    if(this.props.callBack)this.props.callBack({deptId,deptName,dinnerName});
  }
  handleCancel = (e) => {
    //console.log(e);
    this.setState({
      modalVisible: false,
    });
  }
  handleChange=(e)=>{
    this.setState({
      dinnerName:e.target.value,
    })
  }
  render() {
    return (
      <span style={{marginRight:'12px'}}>
        <Button type="primary"  size="large" onClick={e=>this.showModal()}>添加外部人员</Button>
        <Modal
          width={300}
          title='添加外部用餐人员'
          visible={this.state.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input placeholder="输入用餐人姓名" onChange={this.handleChange} size="large" />
        </Modal>
      </span>
    );
  }
}


AddDinner.propTypes = {
  
}

export default AddDinner
