import React from 'react';
import PropTypes from 'prop-types';
//import ReactDOM from 'react-dom';
import { Input,Modal,Button,message,Select } from 'antd';

const Option=Select.Option;
class ChangeState extends React.Component {
  state = {
    modalVisible:false,
    logisticsState:null,
    remark:''
  }
  componentWillMount(){
    
  }
  showModal = () => {
    this.setState({modalVisible: true});
  }
  
  handleOk = (e) => {
    // return
    const { id } =this.props.data;
    const { logisticsState,remark } =this.state;
    // console.log('ok:',id,logisticsState,remark);
    if(String(logisticsState)==='-1' && !remark){
      message.error('请在备注中，说明异常情况！');
      return;
    }else{
      this.setState({
        modalVisible: false,
      });
      if(this.props.callBack)this.props.callBack({id,logisticsState,remark});
    }
  }
  handleCancel = (e) => {
    //console.log(e);
    this.setState({
      modalVisible: false,
    });
  }
  handleChange=(value)=>{
    // console.log('value:',value)
    this.setState({
      logisticsState:value
    })
  }
  handleInput=(e)=>{
    // console.log('value:',e.target.value);
    this.setState({remark:e.target.value});
  }
  render() {
    return (
      <span>
        <a onClick={e=>this.showModal()}>修改物流状态</a>
        <Modal
          width={300}
          title='修改物流状态'
          visible={this.state.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Select placeholder="物流状态" onChange={this.handleChange}
            allowClear style={{width:'100%',marginBottom:'12px'}}  >
            <Option value="-1">运输异常</Option>
            <Option value="0">运输途中</Option>
            <Option value="1">已完成</Option>
          </Select>

          <Input placeholder="备注说明" size="large" type="textarea" 
            autosize={{ minRows: 2, maxRows: 6 }} 
            onChange={this.handleInput} />
        </Modal>
      </span>
    );
  }
}


ChangeState.propTypes = {
  
}

export default ChangeState
