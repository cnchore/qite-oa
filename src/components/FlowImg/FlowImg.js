import React from 'react'
import PropTypes from 'prop-types'
import styles from './FlowImg.less'
import { Icon,Row,Col } from 'antd'
//import classNames from 'classnames';
import ImgViewer from '../ImgViewer'

class FlowImg extends React.Component {
  state = {
    previewVisible:false,
  }
  handlePreview=()=>{
    this.setState({
      previewVisible:true,
    });
  }
  handleCancel=()=>{
    this.setState({previewVisible:false});
  }
  render () {
    const { previewVisible }=this.state;
    const _imgs=[{src:this.props.path,name:'处理流程图'}];

    return (
     
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} className='qite-list-title'>
              <Icon type="fork" />处理流程
          </Col>
          <Col span={24} className={styles['q-flow-container']}>
            <img src={this.props.path || '' } alt="处理流程图"  onClick={e=>this.handlePreview()} />
          </Col>
          {
          previewVisible?
            <ImgViewer 
              visible={previewVisible}
              onCancel={this.handleCancel}
              imgs={_imgs} />
            :null
          }
        </Row>
        
    )
  }
}


FlowImg.propTypes = {
  
}

export default FlowImg
