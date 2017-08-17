import React from 'react'
import PropTypes from 'prop-types'
import styles from './TaskNodeList.less'
import { Icon,Row,Col } from 'antd'

class TaskNodeList extends React.Component {
  
  render () {

    const { data } = this.props
    const _length=data && data.length || 0;
    const nodeInfo=_length && data[_length-1];

    return (
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} className='qite-list-title'>
             <Icon type="rocket" />当前环节
             <div className={styles['nodeInfo']}>
              -->{ nodeInfo && nodeInfo.nodeName && nodeInfo.nodeName}，
              <span>处理人：</span>{ nodeInfo && nodeInfo.auditerName && nodeInfo.auditerName}，
              <span>接收时间：</span>{nodeInfo && nodeInfo.receiveTime && nodeInfo.receiveTime}
             </div>
          </Col>
        
        </Row>
    )
  }
}


TaskNodeList.propTypes = {
  
}

export default TaskNodeList
