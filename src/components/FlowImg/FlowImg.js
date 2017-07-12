import React from 'react'
import PropTypes from 'prop-types'
import styles from './FlowImg.less'
import { Icon,Row,Col } from 'antd'
//import classNames from 'classnames';

class FlowImg extends React.Component {
  
  render () {

    return (
     
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} className='qite-list-title'>
              <Icon type="fork" />处理流程
          </Col>
          <Col span={24} className={styles['q-flow-container']}>
            <img src={this.props.path || '' } alt="处理流程图" />
          </Col>
          
        </Row>
        
    )
  }
}


FlowImg.propTypes = {
  
}

export default FlowImg
