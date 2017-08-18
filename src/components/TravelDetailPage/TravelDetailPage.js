import React from 'react'
import PropTypes from 'prop-types'
import styles from './TravelDetailPage.less'
import { Icon,Row,Col } from 'antd'
import classNames from 'classnames';
import FileList from '../FileList'
import {changeMoneyToChinese} from '../../utils'
class TravelDetailPage extends React.Component {
  render () {
    const { data,employeeList,dicList } = this.props
    let defaultFileList=[];
    if(data.attachList&& data.attachList[0]){
      defaultFileList=data.attachList.map((temp)=>{
        return {...temp,uid:temp.id,status:'done',url:temp.attachUrl,name:temp.attachName}
      })
    }
    const getHours=(a,b)=>{
      if(!a||!b){
        return 0;
      }
      let timeA=new Date(a);
      let timeB=new Date(b);
      return ((timeB-timeA)/(3600*1000)).toFixed(2)
    }
    const getDicType=(value,remark=null)=>{
      let n=dicList.filter(item=>String(item.dicValue)===String(value));
      //console.log(orgList,...n,value);
      if(n && n[0]){
        return remark&&n[0].dicName==='其他'?remark:n[0].dicName;
      }
      return '';
    }
    return (
      <div>
        <Row gutter={24} className={styles['q-detail']}>
        <Col span={24} className='qite-list-title'>
            <Icon type="credit-card" />出差信息
        </Col>
        <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
          姓名：
        </Col>
        <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          {employeeList?employeeList.realName:'无'}
        </Col>
        <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
          部门：
        </Col>
        <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          {employeeList.postList?(employeeList.postList[0].orgName ||'无'):'无'}
        </Col>
        <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
          岗位：
        </Col>
        <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          {employeeList.postList?(employeeList.postList[0].postName || '无'):'无'}
        </Col>
        <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
          申请单号：
        </Col>
        <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          {data.code}
        </Col>
        <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
          申请时间：
        </Col>
        <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          {data.createTime || data.createTimeStr}
        </Col>
        
         <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
          同行人：
        </Col>
        <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          
          {data.colleaguesNames?data.colleaguesNames:'无'}
        </Col>
       
        <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label']}>
          预计出差时间：
        </Col>
        <Col xs={12} md={20} xl={14} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          {data.travelTimeStartStr || data.travelTimeStart || '无'} 
          <span className='q-pd-8'>至</span>
          {data.travelTimeEndStr || data.travelTimeEnd || '无'}
          <span className='q-pd-8'>共</span>
          {data.travelHours?data.travelHours:getHours(data.travelTimeStart,data.travelTimeEnd)}
          <span className='q-pd-8'>小时</span>
        </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' ,paddingLeft:'0px'}} className={styles['q-detail-label']}>
          出差地点：
        </Col>
        <Col xs={12} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          {`${data.province?data.province:''}${data.city?data.city:''}${data.area?data.area:''}${data.address?data.address:''}`}

        </Col>
        <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
          拜访客户：
        </Col>
        <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          {data.customers?data.customers:'无'}
        </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
          出差事由：
        </Col>
        <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
         
          {data.remark?data.remark:'无'}
        </Col>
        <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
          出行方式：
        </Col>
        <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
         
          {getDicType(data.tripMode, data.tripModeRemark)||'无'}
        </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
          申请费用：
        </Col>
        <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          
          {`¥ ${data.expense?data.expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):0}`}
          <span className='q-pd-8'>大写：</span>
          {changeMoneyToChinese(data.expense)}
        </Col>
      </Row>
      <Row gutter={12} className={styles['q-detail']} style={{marginLeft:'2px',marginRight:'2px'}}>
          <blockquote>
            <p>
              备注：<br/>
              1、此申请表作为借款、核销必备凭证。<br/>
              2、如出差途中变更行程计划需及时汇报。<br/>
              3、出差申请表须在接到申请后48小时内批复。
            </p>
          </blockquote>
        </Row> 
        {defaultFileList && defaultFileList[0]?
          <Row gutter={24} className={styles['q-detail']}>
            <Col span={24} className='qite-list-title'>
              <Icon type="paper-clip" />附件信息
            </Col>
            <Col span={24} style={{paddingLeft:'12px',paddingRight:'12px'}}>
              <FileList fileList={defaultFileList} showRemoveIcon={false}/>
            </Col>
          </Row>
          :null
        }
      </div>
      )
  }
}
TravelDetailPage.propTypes = {
}
export default TravelDetailPage
