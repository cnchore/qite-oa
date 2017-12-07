import React from 'react'
import PropTypes from 'prop-types'
//import ReactDOM from 'react-dom'
import { Modal,message } from 'antd'
import {revokeApply} from '../../services/workFlow'
const confirm = Modal.confirm

class Revoke extends React.Component {
  
  handleOk = (e) => {
    const {callBack,busiId,busiCode} =this.props;
    confirm({
      title: `你确定撤回申请么?`,
      onOk () {
        revokeApply({busiId,busiCode}).then(res=>{
          if(res && res.success){
            message.success(res.message);
            callBack&&callBack();
          }
          if(res && !res.success){
             message.error(res.message);
          }
        });
      },
    })
  }
  render() {
    return (
      <a onClick={this.handleOk}>撤回申请</a>
    );
  }
}


Revoke.propTypes = {
  
}

export default Revoke
