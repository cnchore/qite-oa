import React from 'react'
import PropTypes from 'prop-types'
import styles from './TaskNodeList.less'
import { Icon,Row,Col } from 'antd'

class TaskNodeList extends React.Component {
  
  render () {
    const {data} =this.props;
    const nodeInfo=data?data.filter(f=>f.endTime===null):[];
    const _list=nodeInfo.map((item,index)=><div className={styles['nodeInfo']} key={`info${index}`}>
        -->{ item.nodeName}，
        <span>处理人：</span>{ item.auditerName}，
        <span>接收时间：</span>{item.receiveTime}
       </div>)
    return (
       <Row gutter={24} className={styles['q-detail']}>
        <Col span={24} className={styles['qite-list-title']}>
          <div> <Icon type="rocket" />当前环节</div>
          <div>
           {_list && _list}
          </div>
        </Col>
      </Row>
    )
    // const { data } = this.props
    // const _length=data && data.length-1 || 0;
    // const nodeInfo=data[_length];

    // return (
    //     <Row gutter={24} className={styles['q-detail']}>
    //       <Col span={24} className='qite-list-title'>
    //          <Icon type="rocket" />当前环节
    //          <div className={styles['nodeInfo']}>
    //           -->{ nodeInfo && nodeInfo.nodeName && nodeInfo.nodeName}，
    //           <span>处理人：</span>{ nodeInfo && nodeInfo.auditerName && nodeInfo.auditerName}，
    //           <span>接收时间：</span>{nodeInfo && nodeInfo.receiveTime && nodeInfo.receiveTime}
    //          </div>
    //       </Col>
        
    //     </Row>
    // )
  }
}


TaskNodeList.propTypes = {
  
}

export default TaskNodeList
