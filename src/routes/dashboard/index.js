import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card,Icon } from 'antd'
import { NumberCard, UserInfo,WaitList } from './components'
import styles from './index.less'
import { color } from '../../utils'
import { Link } from 'dva/router'

function Dashboard ({ dashboard,loading,location,dispatch }) {
  const { userInfo,waitData,messageData,noticeData,waitSignData } = dashboard
  // const numberCards = numbers.map((item, key) => <Col key={key} lg={6} md={12}>
  //   <NumberCard {...item} />
  // </Col>)
  const waitNum={
    icon: 'team',
    color: color.blue,
    title: '待办件',
    number: waitData && waitData.total || 0,
  }
  const waitSignNum={
    icon: 'message',
    color: color.purple,
    title: '待签收件',
    number: waitSignData && waitSignData.total || 0,
  }
  const waitProps={
    dataSource:waitData && waitData.list || [],
    loading:loading.effects['dashboard/query'],
    pagination:false,
    location,
  }
  const messageList=messageData && messageData.list && messageData.list[0] && messageData.list.map((item,index)=><p key={index} 
    className={styles.msgp}>
      <span className={styles.msgtitle}>{index+1}.{item.content}</span>
      <span className={styles.msgtime}>--{item.createTime}</span>
    </p>) || <span className={styles.msgtime}>暂无消息</span>;
  const noticeList =noticeData && noticeData.list && noticeData.list[0] && noticeData.list.map((item,index)=><p key={index}
    className={styles.msgp}
    >
      <span className={styles.msgtitle}>{index+1}.{item.title}</span>
      <span className={styles.msgtime}>--{item.postingTime}</span>
    </p>) || <span className={styles.msgtime}>暂无通知公告</span>;
  return (
    
    <Row gutter={24} >
      <Col lg={8} md={12}>
        <UserInfo {...userInfo}/>
      </Col> 
      <Col lg={8} md={12}>
        <NumberCard {...waitNum}/>
      </Col> 
      <Col lg={8} md={12}>
        <NumberCard {...waitSignNum}/>
      </Col>      
      <Col lg={16} md={24}>
        <Card bordered={false} className={styles.waitcard}
        title={<span><Icon type="dot-chart" /> 我的待办业务</span>} extra={<Link to='/waiting'>更多</Link>}
        bodyStyle={{height:364}}
        >
          <WaitList {...waitProps} />
        </Card>
      </Col>
      <Col lg={8} md={24}>
        <Card bordered={false} className={styles.msgcard} 
        title={<span><Icon type="message" /> 消息</span>} 
        bodyStyle={{
          height: 364,overflowY:'auto',
        }}>
          {messageList}
        </Card>
      </Col>
      <Col lg={16} md={24}>
        <Card bordered={false} className={styles.waitcard}
        title={<span><Icon type="dot-chart" /> 我的待签收</span>} extra={<Link to='/waitSign'>更多</Link>}
        bodyStyle={{height:364}}
        >
          <p>开发中...</p>
        </Card>
      </Col>
      <Col lg={8} md={24}>
        <Card bordered={false} className={styles.noticecard} 
        title={<span><Icon type="notification" /> 通知公告</span>} extra={<Link to='/notice'>更多</Link>}
        bodyStyle={{
          height: 364,overflowY:'auto',
        }}>
          {noticeList}
        </Card>
      </Col>
        
     

    </Row>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
}

export default connect(({ dashboard ,loading}) => ({ dashboard,loading }))(Dashboard)
