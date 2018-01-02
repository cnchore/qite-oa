import React,{ PureComponent }  from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card,Icon,Tabs } from 'antd'
import { NumberCard, UserInfo,WaitList,WaitSignList,Home } from './components'
import styles from './index.less'
import { color,getTheme,classnames,getMsgType,getMsgAction } from '../../utils'
import { Link,routerRedux } from 'dva/router'

const TabPane=Tabs.TabPane;
// function Dashboard ({ dashboard,loading,location,dispatch }) {
class Dashboard extends PureComponent {
  render(){
    const {dashboard,loading,location,dispatch,menuData}=this.props;
    const { userInfo,waitData,messageData,noticeData,waitSignData,
      knowledgeData,msgVisable,oftenList,warningData} = dashboard
    const darkTheme=getTheme();
    // console.log('dashboard-props:',this.props);
    
    if(darkTheme){
      //home props
      const waitInfo={
        number: waitData && waitData.total || 0,
        linkto:()=>{
          dispatch(routerRedux.push({
            pathname:'/waiting',
          }));
        },
        desc:'指定本人处理的业务',
      }
      const signInfo={
        number: waitSignData && waitSignData.total || 0,
        linkto:()=>{
          dispatch(routerRedux.push({
            pathname:'/waitSign',
          }));
        },
        desc:'未选择指定处理人，需手动签收本人应处理的业务',
      }
      const _noticeList={
        moreHander:()=>{
          dispatch(routerRedux.push({
            pathname:'/notice',
            query:{isMyNotice:true}
          }));
        },
        list:noticeData && noticeData.list || [],
        linkto:(id)=>{
          dispatch(routerRedux.push({
            pathname:`/notice/${id}`,
            query:{noComment:true}
          }));
        }
      }
      const _knowledgeList={
        moreHander:()=>{
          dispatch(routerRedux.push({
            pathname:'/knowledge',
            query:{isMyKnowledge:true}
          }));
        },
        number:knowledgeData && knowledgeData.total || 0,
      }
      const signList={
        list:waitSignData && waitSignData.list || [],
        linkto (item) {
          dispatch({
            type: 'dashboard/signTask',
            payload: item,
          })
        },
      }
      // let msgData=messageData && messageData.list && messageData.list.filter(f=>f.msgType!==4 && f.msgType!==5 && f.msgType!==11 && f.msgType!==12) || []
      // let warningData=messageData && messageData.list && messageData.list.filter(f=>(f.msgType===4 || f.msgType===5 || f.msgType===11 || f.msgType===12)) || []

      const msgInfo={
        list:messageData && messageData.list && messageData.list || [],
        total:messageData && messageData.total || 0,
        msgVisable,
        showModal(){
          dispatch({
            type: 'dashboard/setState',
            payload: {msgVisable:true},
          });
        },
        hideModal(){
          dispatch({
            type: 'dashboard/setState',
            payload: {msgVisable:false},
          });
        },
        read(payload){
          dispatch({
            type:'dashboard/read',
            payload:payload,
          })
        },
        linkto(payload){
          dispatch(routerRedux.push(payload));
        }
      }
      const warningInfo={
        list:warningData && warningData.list && warningData.list || [],
        total:warningData && warningData.total && warningData.total || 0,
      }
      const quickData={
        shortcut:menuData && menuData || [],
        oftenList,
        linkto:(pathname,query)=>{
          dispatch(routerRedux.push({pathname,query}));
        },
      }
      return <Home darkTheme={darkTheme}
              quickData={quickData} 
              userInfo={userInfo}
              waitInfo={waitInfo}
              signInfo={signInfo}
              noticeList={_noticeList}
              knowledgeList={_knowledgeList}
              waitList={waitData && waitData.list || []}
              signList={signList}
              msgInfo={msgInfo}
              warningInfo={warningInfo}
              />;
    }else{
      const waitNum={
        icon: 'iconfont icon-daibanjian',
        color:color.blue,
        bgcolor: 'light1',
        title: '待办件',
        number: waitData && waitData.total || 0,
        linkto:()=>{
          dispatch(routerRedux.push({
            pathname:'/waiting',
          }))
        },
        desc:'指定本人处理的业务',
       
      }
      const waitSignNum={
        icon: 'iconfont icon-daiqianshou',
        color:color.purple,
        bgcolor:'light2',
        title: '待签收件',
        number: waitSignData && waitSignData.total || 0,
        linkto:()=>{
          dispatch(routerRedux.push({
            pathname:'/waitSign',
          }))
        },
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
        className={classnames(styles.msgp,item.isRead?styles.old:styles.new)}
        >
          <span className={styles.msgtitle}>
            <Link to={ `/notice/${item.id}?noComment=true`} >
              {index+1}.{item.title}
            </Link>
          </span>
          <span className={styles.msgtime}>{item.postingTime && item.postingTime.substr(5).substr(0,11)}</span>
        </p>) || <span className={styles.msgtime}>暂无通知公告</span>;
      const knowledgeList =knowledgeData && knowledgeData.list && knowledgeData.list[0] && knowledgeData.list.map((item,index)=><p key={index}
        className={styles.msgp}
        >
          <span className={styles.msgtitle}>
            <Link to={ `/knowledge/${item.id}?noComment=true`} >
              {index+1}.{item.title}
            </Link>
          </span>
          <span className={styles.msgtime}>{item.publishTime && item.publishTime.substr(5).substr(0,11)}</span>
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
  }
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
}

export default connect(({ dashboard ,loading}) => ({ dashboard,loading}))(Dashboard)
