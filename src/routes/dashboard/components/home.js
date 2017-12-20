import React from 'react'
import PropTypes from 'prop-types'
import styles from './home.less'
import { Row, Col,Button,Icon } from 'antd'
import profle from '../../../../assets/profle.png'
import cs from 'classnames';

function Home ({ data,darkTheme }) {
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
                    <div className={styles['quick-apply-icon1']}><i className="iconfont icon-renliziyuanguanli"/><div>人力资源事务</div></div>
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
                  <img className={styles.photo} src={profle} />
                </div>
                <div className={styles['userInfo-list']}>
                  <div>罗伊人</div>
                  <div>营销中心</div>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className={cs(styles.h3,styles.waitInfo)}>
                <div className={styles['waitInfo-icon']}>
                  <i className="iconfont icon-daibanjian"/>
                  <span className={styles.badge}>2</span>
                </div>
                <div>待办</div>
              </div>
            </Col>
            <Col span={12}>
              <div className={cs(styles.h3,styles.signInfo)}>
                <div className={styles['signInfo-icon']}>
                  <i className="iconfont icon-daiqianshou"/>
                  <span className={styles.badge}>2</span>
                </div>
                <div>待签收</div>
              </div>
            </Col>
            <Col span={12}>
              <div className={cs(styles.h3,styles.msgInfo)}>
                <div className={styles['msgInfo-icon']}>
                  <i className="iconfont icon-xiaoxi"/>
                  <span className={styles.badge}>2</span>
                </div>
                <div>消息</div>
              </div>
            </Col>
            <Col span={12}>
              <div className={cs(styles.h3,styles.knowledgeInfo)}>
                <div className={styles['knowledgeInfo-icon']}>
                  <i className="iconfont icon-zhishiku2"/>
                  <span className={styles.badge}>2</span>
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
                <div className={styles.title}><span><i className="iconfont icon-tongzhigonggao"/>通知公告</span><span className={styles.more}>更多</span></div>
                <div className={styles['notice-list']}>1.制度培训通知</div>
                <div className={styles['notice-list']}>2.任命通知</div>
              </div>
            </Col>
            <Col span={24}>
              <div className={cs(styles.h3t2,styles.warning)}>
                <div className={styles.title}><span><i className="iconfont icon-tongzhi1"/>超时处理公示栏</span><span className={styles.more}>更多</span></div>
                <div className={styles['warning-list']}>1.赵丽颖：考勤异常申请已超过处理3小时，请尽快处理</div>
                <div className={styles['warning-list']}>2.赵丽颖：考勤异常申请已超过处理3小时，请尽快处理</div>
                <div className={styles['warning-list']}>3.赵丽颖：考勤异常申请已超过处理3小时，请尽快处理</div>
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
                <div className={styles.title}><span><i className="iconfont icon-wodedaibanyewu"/>我的待办</span><span className={styles.more}>更多</span></div>
                <div className={styles['waitList-list']}>
                  <div>1.</div>
                  <div className={styles.listCenter}>
                    <div>申请人：楚乔</div>
                    <div>申请时间：2017-12-12</div>
                    <div>流程名称：考勤异常申请</div>
                  </div>
                  <div className={styles.listAction}>
                    <div className={styles['listAction-icon']}><Icon type="down" /></div>
                    <div className={styles['listAction-button']}><Button>办理</Button></div>
                  </div>
                </div>
                <div className={styles['waitList-list']}>
                  <div>2.</div>
                  <div className={styles.listCenter}>
                    <div>申请人：楚乔</div>
                    <div>申请时间：2017-12-12</div>
                    <div>流程名称：考勤异常申请</div>
                  </div>
                  <div className={styles.listAction}>
                    <div className={styles['listAction-icon']}><Icon type="down" /></div>
                    <div className={styles['listAction-button']}><Button>办理</Button></div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col sm={24} md={11}>
          <Row className={styles.cellH4}>
            <Col span={24}>
              <div className={cs(styles.h10,styles.ch4h10,styles.signList)}>
                <div className={styles.title}><span><i className="iconfont icon-wodedaiqianshou"/>我的待签收</span><span className={styles.more}>更多</span></div>
                <div className={styles['signList-list']}>
                  <div>1.</div>
                  <div className={styles.listCenter}>
                    <div>申请人：楚乔</div>
                    <div>申请时间：2017-12-12</div>
                    <div>流程名称：考勤异常申请</div>
                  </div>
                  <div className={styles.listAction}>
                    <div className={styles['listAction-icon']}><Icon type="down" /></div>
                    <div className={styles['listAction-button']}><Button>签收</Button></div>
                  </div>
                </div>
                <div className={styles['signList-list']}>
                  <div>2.</div>
                  <div className={styles.listCenter}>
                    <div>申请人：楚乔</div>
                    <div>申请时间：2017-12-12</div>
                    <div>流程名称：考勤异常申请</div>
                  </div>
                  <div className={styles.listAction}>
                    <div className={styles['listAction-icon']}><Icon type="down" /></div>
                    <div className={styles['listAction-button']}><Button>签收</Button></div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
  
}

Home.propTypes = {
  data: PropTypes.array,
}

export default Home
