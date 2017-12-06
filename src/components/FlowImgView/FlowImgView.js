import React from 'react'
import PropTypes from 'prop-types'
// import { Button } from 'antd'
//import classNames from 'classnames';
import ImgViewer from '../ImgViewer'
import {getDiagramByKey} from '../../services/workFlow'

class FlowImgView extends React.Component {
  state = {
    previewVisible:false,
    urlPath:'',
  }
  handlePreview=()=>{
    let urlPath=getDiagramByKey(this.props.code);
    this.setState({previewVisible:true,urlPath});

  }
  handleCancel=()=>{
    this.setState({previewVisible:false});
  }
  render () {
    const { previewVisible,urlPath }=this.state;
    const _imgs=[{src:urlPath,name:'流程图'}];

    return (
     
        <span>
          <a onClick={this.handlePreview}>预览流程图</a>
          {
          previewVisible?
            <ImgViewer 
              visible={previewVisible}
              onCancel={this.handleCancel}
              imgs={_imgs} />
            :null
          }
        </span>
        
    )
  }
}


FlowImgView.propTypes = {
  
}

export default FlowImgView
