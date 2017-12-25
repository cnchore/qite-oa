import React from 'react'
import PropTypes from 'prop-types'
import styles from './home.less'
import { Row, Col,Button,Icon,Tooltip,Popover } from 'antd'
import profle from '../../../../assets/profle.png'
import cs from 'classnames';
import {getWaitAction,getMsgAction} from '../../../utils'

function Home ({ data,darkTheme,userInfo,waitInfo,signInfo,noticeList,knowledgeList,waitList,signList,msgInfo,warningInfo }) {
  const { photo, orgName, realName} = userInfo;
  const noticeListOption=noticeList && noticeList.list[0] && noticeList.list.filter(f=>f.isRead===false).map((item,index)=>{
   return <div key={`notice-list${index}`} className={styles['notice-list']} onClick={e=>{noticeList && noticeList.linkto && noticeList.linkto(item.id)}}>{index+1}.{item.title}</div>;}) 
  || [];
  // console.log('msgInfo.msgVisable:',msgInfo.msgVisable);
  const waitListOption=waitList && waitList[0] && waitList.map((item,index)=>{
    return <div className={styles['waitList-list']} key={`waitList-list${index}`}>
            <div>{index+1}.</div>
            <div className={styles.listCenter}>
              <div>申请人：{item.applyName}{<span style={{ color: item.urgency?'#f00':'' }} >{item.urgency?'紧急':''}</span>}</div>
              <div>申请时间：{item.applyTime && item.applyName.substr(0,10)}</div>
              <div>流程名称：{item.flowName}</div>
            </div>
            <div className={styles.listAction}>
              <div className={styles['listAction-icon']}><Icon type="down" /></div>
              <div className={styles['listAction-button']}>{getWaitAction(item)}</div>
            </div>
          </div>
  }) || null;
  const signListOption=signList && signList.list && signList.list[0] && signList.list.map((item,index)=>{
    return  <div className={styles['signList-list']} key={`signList-list${index}`}>
              <div>{index+1}.</div>
              <div className={styles.listCenter}>
                <div>申请人：{item.applyName}</div>
                <div>申请时间：{item.applyTime && item.applyName.substr(0,10)}</div>
                <div>流程名称：{item.flowName}</div>
              </div>
              <div className={styles.listAction}>
                <div className={styles['listAction-icon']}><Icon type="down" /></div>
                <div className={styles['listAction-button']}><a onClick={e=>signList.linkto(record.taskId)}>签收</a></div>
              </div>
            </div>
  }) || null;
  const msgInfoOption=msgInfo && msgInfo.list && msgInfo.list[0] && msgInfo.list.map((item,index)=>{
    return <div className={styles['msg-list']} key={`msg-list${index}`}>{index+1}.{getMsgAction(item)}。{item.createTime && item.createTime.substr(5).substr(0,11)}</div>
  }) || null;
  const warningInfoOption=warningInfo && warningInfo.list && warningInfo.list.map((item,index)=>{
    return  <Tooltip key={`warning-list${index}`} title={`${index+1}.${getMsgAction(item)}。${item.createTime && item.createTime.substr(5).substr(0,11)}`}>
              <div className={styles['warning-list']} >{index+1}.{getMsgAction(item)}。{item.createTime && item.createTime.substr(5).substr(0,11)}</div>
            </Tooltip>
  }) || null;
  const quickApplyContent1=<div className={styles.content}>
    <p>content</p>
    <p>content</p>
  </div>;
  return (
    <div className={cs(styles.home,darkTheme?styles.light:'')}>
      <Row>
        <Col sm={24} md={10}>
          <Row className={styles.cellH6}>
            <Col span={24} >
              <div className={cs(styles.h10,styles.ch6h10,styles.quick)}>
                <div className={styles['quick-apply']}>
                  <div className={styles.title}><span><i className="iconfont icon-wodeshenqing"/>我的申请－快捷创建</span></div>
                  <div className={styles.body}>
                    <Popover content={quickApplyContent1} trigger="click" placement="bottomLeft" overlayClassName={styles.popover}>
                      <div className={styles['quick-apply-icon1']}><i className="iconfont icon-renliziyuanguanli"/><div>人力资源事务</div></div>
                    </Popover>
                    <div className={styles['quick-apply-icon2']}><i className="iconfont icon-hangzheng1"/><div>行政事务</div></div>
                    <div className={styles['quick-apply-icon3']}><i className="iconfont icon-caiwu"/><div>财务事务</div></div>
                    <div className={styles['quick-apply-icon4']}><i className="iconfont icon-yingxiao"/><div>营销中心事务</div></div>
                  </div>
                </div>
                <div className={styles['quick-often']}>
                  <div className={styles.title}><span><i className="iconfont icon-changyongwenjian"/>我的常用－快捷创建</span></div>
                  <div className={styles.body}>
                    <div className={styles['quick-often-icon']}><i className="iconfont icon-kaoqinyichang"/><div>考勤异常申请</div></div>
                    <div className={styles['quick-often-icon']}><i className="iconfont icon-qingjiashenqing"/><div>请假申请</div></div>
                    <div className={styles['quick-often-icon']}><i className="iconfont icon-jiabanshenqing"/><div>加班申请</div></div>
                    <div className={styles['quick-often-icon']}><i className="iconfont icon-chuchashenqing"/><div>出差申请</div></div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col sm={24} md={6}>
          <Row className={styles.cellH6}>
            <Col span={24}>
              <div className={cs(styles.h4,styles.userInfo)}>
                <div className={styles['userInfo-icon']}>
                  <img className={styles.photo} src={photo || profle} />
                </div>
                <div className={styles['userInfo-list']}>
                  <div>{realName || '游客'}</div>
                  <div>{orgName || '未知部门'}</div>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <Tooltip placement="topLeft" title={waitInfo.desc}>
                <div className={cs(styles.h3,styles.waitInfo)} onClick={waitInfo.linkto && waitInfo.linkto}>
                  <div className={styles['waitInfo-icon']}>
                    <i className="iconfont icon-daibanjian"/>
                    {waitInfo.number?<span className={styles.badge}>{waitInfo.number}</span>:null}
                  </div>
                  <div>待办</div>
                </div>
              </Tooltip>
            </Col>
            <Col span={12}>
              <Tooltip placement="topLeft" title={signInfo.desc}>
                <div className={cs(styles.h3,styles.signInfo)} onClick={signInfo.linkto && signInfo.linkto}>
                  <div className={styles['signInfo-icon']}>
                    <i className="iconfont icon-daiqianshou"/>
                    {signInfo.number?<span className={styles.badge}>{signInfo.number}</span>:null}
                  </div>
                  <div>待签收</div>
                </div>
              </Tooltip>
            </Col>
            <Col span={12}>
              <div className={cs(styles.h3,styles.msgInfo)} onClick={msgInfo.showModal && msgInfo.showModal}>
                <div className={styles['msgInfo-icon']}>
                  <i className="iconfont icon-xiaoxi"/>
                  {msgInfo.total?<span className={styles.badge}>{msgInfo.total}</span>:null}
                </div>
                <div>消息</div>
              </div>
            </Col>
            <Col span={12}>
              <div className={cs(styles.h3,styles.knowledgeInfo)} onClick={knowledgeList.moreHander && knowledgeList.moreHander}>
                <div className={styles['knowledgeInfo-icon']}>
                  <i className="iconfont icon-zhishiku2"/>
                  {knowledgeList.number?<span className={styles.badge}>{knowledgeList.number}</span>:null}
                </div>
                <div>知识库</div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col sm={24} md={8}>
          <Row className={styles.cellH6}>
            <Col span={24}>
              <div className={cs(styles.h4,styles.notice)}>
                <div className={styles.title}>
                  <span><i className="iconfont icon-tongzhigonggao"/>通知公告</span>
                  <span className={styles.more} onClick={noticeList && noticeList.moreHander && noticeList.moreHander}>更多</span>
                </div>
                {noticeListOption[0] && noticeListOption  || <div className={styles['notice-list']}>暂无通知公告</div>}
              </div>
            </Col>
            <Col span={24}>
              <div className={cs(styles.h3t2,styles.warning)}>
                <div className={styles.title}><span><i className="iconfont icon-tongzhi1"/>超时处理公示栏</span><span className={styles.more}>更多</span></div>
                
                {warningInfoOption || <div className={styles['warning-list']}>暂无超时公告</div>}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={13}>
          <Row className={styles.cellH4}>
            <Col span={24}>
              <div className={cs(styles.h10,styles.ch4h10,styles.waitList)}>
                <div className={styles.title}>
                  <span><i className="iconfont icon-wodedaibanyewu"/>我的待办</span>
                  <span className={styles.more} onClick={waitInfo.linkto && waitInfo.linkto}>更多</span>
                </div>
                {waitListOption || <div className={styles['waitList-list']}>暂无待办</div>}
              </div>
            </Col>
          </Row>
        </Col>
        <Col sm={24} md={11}>
          <Row className={styles.cellH4}>
            <Col span={24}>
              <div className={cs(styles.h10,styles.ch4h10,styles.signList)}>
                <div className={styles.title}>
                  <span><i className="iconfont icon-wodedaiqianshou"/>我的待签收</span>
                  <span className={styles.more} onClick={signInfo.linkto && signInfo.linkto}>更多</span>
                </div>
               {signListOption || <div className={styles['signList-list']}>暂无待签收</div>}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <div className={cs(styles.modal,msgInfo.msgVisable?styles.msgshow:styles.msghide)}>
        <span className={styles.msgclose} onClick={msgInfo.hideModal && msgInfo.hideModal}><i className="iconfont icon-guanbi"/></span>
        <div className={styles.msgbody}>
          <div className={styles.msgtitle}><i className="iconfont icon-xiaoxi"/>消息</div>
          {msgInfoOption}
        </div>
      </div>
    </div>
  )
  
}

Home.propTypes = {
  data: PropTypes.array,
}

export default Home
