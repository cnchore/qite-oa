import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card,Icon,Tabs } from 'antd'
import { NumberCard, UserInfo,WaitList,WaitSignList } from './components'
import styles from './index.less'
import { color,getTheme,classnames,getMsgType,getMsgAction } from '../../utils'
import { Link } from 'dva/router'
const TabPane=Tabs.TabPane;
function Dashboard ({ dashboard,loading,location,dispatch }) {
  const { userInfo,waitData,messageData,noticeData,waitSignData,knowledgeData} = dashboard
  const darkTheme=getTheme();
  // console.log('dashboard:',darkTheme)
  const waitNum={
    icon: 'iconfont icon-daibanjian',
    color:color.blue,
    bgcolor: 'light1',
    title: '待办件',
    number: waitData && waitData.total || 0,
    linkto:'/waiting',
    desc:'指定本人处理的业务',
   
  }
  const waitSignNum={
    icon: 'iconfont icon-daiqianshou',
    color:color.purple,
    bgcolor:'light2',
    title: '待签收件',
    number: waitSignData && waitSignData.total || 0,
    linkto:'/waitSign',
    desc:'未选择指定处理人，需手动签收本人应处理的业务',
   
  }
  const waitProps={
    dataSource:waitData && waitData.list || [],
    loading:loading.effects['dashboard/query'],
    pagination:false,
    location,
  }
  const waitSignProps={
    dataSource:waitSignData && waitSignData.list || [],
    pagination:false,
    location,
    darkTheme,
    loading:loading.effects['dashboard/getTaskWaitSignPage'],
    onEditItem (item) {
      dispatch({
        type: 'dashboard/signTask',
        payload: item,
      })
    },
  }
  
  
  const messageList=messageData && messageData.list && messageData.list[0] && messageData.list.map((item,index)=><p key={index} 
    className={styles.msgp}>
      <span className={styles.msgtitle}>{index+1}.{getMsgAction(item)}</span>
      <span className={styles.msgtime}>{item.createTime && item.createTime.substr(5).substr(0,11)}</span>
    </p>) || <span className={styles.msgtime}>暂无消息</span>;
  const noticeList =noticeData && noticeData.list && noticeData.list[0] && noticeData.list.map((item,index)=><p key={index}
    className={styles.msgp}
    >
      <Link to={ `/notice/${item.id}?noComment=true`} >
        <span className={styles.msgtitle}>{index+1}.{item.title}</span>
      </Link>
      <span className={styles.msgtime}>{item.postingTime}</span>
    </p>) || <span className={styles.msgtime}>暂无通知公告</span>;
  const knowledgeList =knowledgeData && knowledgeData.list && knowledgeData.list[0] && knowledgeData.list.map((item,index)=><p key={index}
    className={styles.msgp}
    >
      <Link to={ `/knowledge/${item.id}?noComment=true`} >
        <span className={styles.msgtitle}>{index+1}.{item.title}</span>
      </Link>
      <span className={styles.msgtime}>{item.publishTime}</span>
    </p>) || <span className={styles.msgtime}>暂无通知公告</span>;
  
  return (
    
    <Row gutter={24} >
      <Col lg={8} md={12} >
        <UserInfo {...userInfo} />
      </Col> 
      <Col lg={8} md={12}>
        <NumberCard {...waitNum}/>
      </Col> 
      <Col lg={8} md={12}>
        <NumberCard {...waitSignNum}/>
      </Col>
      <Col lg={16} md={24}>
        <Card bordered={false} className={classnames(styles.waitsign,{[styles.light]:darkTheme})}
        title={<span><i className="iconfont icon-wodedaiqianshou" /> 我的待签收</span>} extra={<Link to='/waitSign'>更多</Link>}
        bodyStyle={{height:364,}}
        >
          <WaitSignList {...waitSignProps} />
        </Card>
      </Col>      
     
      <Col lg={8} md={24}>
        <Card bordered={false} className={classnames(styles.msgcard,{[styles.light]:darkTheme})}
        title={<span><i className="iconfont icon-xiaoxi" /> 消息</span>} 
        bodyStyle={{
          height: 364,overflowY:'auto',
        }}>
          {messageList}
        </Card>
      </Col>
       <Col lg={16} md={24}>
        <Card bordered={false} className={classnames(styles.waitcard,{[styles.light]:darkTheme})}
        title={<span><i className="iconfont icon-wodedaibanyewu"/> 我的待办业务</span>} extra={<Link to='/waiting'>更多</Link>}
        bodyStyle={{height:364,}}
        >
          <WaitList {...waitProps} />
        </Card>
      </Col>
      <Col lg={8} md={24}>
        <Tabs defaultActiveKey="1" className={classnames(styles.tabpane,{[styles.light]:darkTheme})} >
          <TabPane tab={<span><i className="iconfont icon-tongzhigonggao"/>通知公告</span>} key="1">
            <Card bordered={false} className={styles.noticecard} 
            bodyStyle={{
              height: 326,overflowY:'auto',
            }}>
              {noticeList}
              {
                noticeData && noticeData.total>10?
                <Link to='/notice?isMyNotice=true' className={styles.floatRight}>更多</Link>
                :null
              }
            </Card>
          </TabPane>
          <TabPane tab={<span><i className="iconfont icon-zhishiku1"/>知识库</span>} key="2">
            <Card bordered={false} className={styles.noticecard} 
            bodyStyle={{
              height: 326,overflowY:'auto',
            }}>
              {knowledgeList}
              {
                knowledgeData && knowledgeData.total>10?
                <Link to='/knowledge?isMyKnowledge=true' className={styles.floatRight}>更多</Link>
                :null
              }
            </Card>
          </TabPane>
        </Tabs>
        
      </Col>
        
     

    </Row>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
}

export default connect(({ dashboard ,loading}) => ({ dashboard,loading }))(Dashboard)
