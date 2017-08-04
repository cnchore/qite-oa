import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card,Icon,Tabs } from 'antd'
import { NumberCard, UserInfo,WaitList,WaitSignList } from './components'
import styles from './index.less'
import { color } from '../../utils'
import { Link } from 'dva/router'
const TabPane=Tabs.TabPane;
function Dashboard ({ dashboard,loading,location,dispatch }) {
  const { userInfo,waitData,messageData,noticeData,waitSignData,knowledgeData } = dashboard
  // const numberCards = numbers.map((item, key) => <Col key={key} lg={6} md={12}>
  //   <NumberCard {...item} />
  // </Col>)
  const waitNum={
    icon: 'team',
    color: color.blue,
    title: '待办件',
    number: waitData && waitData.total || 0,
    linkto:'/waiting',
    desc:'指定本人处理的业务',
  }
  const waitSignNum={
    icon: 'message',
    color: color.purple,
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
    loading:loading.effects['dashboard/getTaskWaitSignPage'],
    onEditItem (item) {
      dispatch({
        type: 'dashboard/signTask',
        payload: item,
      })
    },
  }
  const getAction=(item)=>{
    let codeStr=item.remark,
        id=codeStr&&codeStr.split('#')[1]||-1,
        codeType=codeStr.substr(0,2),
        content=item.content?item.content.replace('您提交的单号为','').replace(item.remark,'').replace('的',''):'';
    if(codeType&&id!==-1){
      switch(codeType){
        case 'MC':
          return <Link to={`/missClock/${id}`}>{content}</Link>
        case 'SC':
          return <Link to={`/salaryChange/${id}`}>{content}</Link>
        case 'LE':
          return <Link to={`/leave/${id}`}>{content}</Link>
        case 'OT':
          return <Link to={`/overTime/${id}`}>{content}</Link>
        case 'TL':
          return <Link to={`/travel/${id}`}>{content}</Link>
        case 'DN':
          return <Link to={`/dimission/${id}`}>{content}</Link>
        case 'RR':
          return <Link to={`/regular/${id}`}>{content}</Link>
        case 'TR':
          return <Link to={`/travelReimburse/${id}`}>{content}</Link>
        case 'CT':
          return <Link to={`/contract/${id}`}>{content}</Link>
        case 'UC':
          return <Link to={`/useCar/${id}`}>{content}</Link>
        case 'PA':
          return <Link to={`/purchaseApply/${id}`}>{content}</Link>
        case 'PE':
          return <Link to={`/purchase/${id}`}>{content}</Link>
        case 'PT':
          return <Link to={`/payment/${id}`}>{content}</Link>
        case 'RT':
          return <Link to={`/recruit/${id}`}>{content}</Link>
        case 'RE':
          return <Link to={`/reimburse/${id}`}>{content}</Link>
        case 'BD':
          return <Link to={`/budget/${id}`}>{content}</Link>
        case 'NE':
          return <Link to={`/notice/${id}`}>{content}</Link>
      }
    }
    return content;
  }
  const messageList=messageData && messageData.list && messageData.list[0] && messageData.list.map((item,index)=><p key={index} 
    className={styles.msgp}>
      <span className={styles.msgtitle}>{index+1}.{getAction(item)}</span>
      <span className={styles.msgtime}>--{item.createTime}</span>
    </p>) || <span className={styles.msgtime}>暂无消息</span>;
  const noticeList =noticeData && noticeData.list && noticeData.list[0] && noticeData.list.map((item,index)=><p key={index}
    className={styles.msgp}
    >
      <Link to={ `/notice/${item.id}?noComment=true`} >
        <span className={styles.msgtitle}>{index+1}.{item.title}</span>
      </Link>
      <span className={styles.msgtime}>--{item.postingTime}</span>
    </p>) || <span className={styles.msgtime}>暂无通知公告</span>;
  const knowledgeList =knowledgeData && knowledgeData.list && knowledgeData.list[0] && knowledgeData.list.map((item,index)=><p key={index}
    className={styles.msgp}
    >
      <Link to={ `/knowledge/${item.id}?noComment=true`} >
        <span className={styles.msgtitle}>{index+1}.{item.title}</span>
      </Link>
      <span className={styles.msgtime}>--{item.publishTime}</span>
    </p>) || <span className={styles.msgtime}>暂无通知公告</span>;
  
  return (
    
    <Row gutter={24} >
      <Col lg={8} md={12} >
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
        title={<span><Icon type="dot-chart" /> 我的待签收</span>} extra={<Link to='/waitSign'>更多</Link>}
        bodyStyle={{height:364,}}
        >
          <WaitSignList {...waitSignProps} />
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
        title={<span><Icon type="dot-chart" /> 我的待办业务</span>} extra={<Link to='/waiting'>更多</Link>}
        bodyStyle={{height:364,}}
        >
          <WaitList {...waitProps} />
        </Card>
      </Col>
      <Col lg={8} md={24}>
        <Tabs defaultActiveKey="2" className={styles.tabpane}>
          <TabPane tab={<span><Icon type="notification" />通知公告</span>} key="1">
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
          <TabPane tab={<span><Icon type="book" />知识库</span>} key="2">
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
