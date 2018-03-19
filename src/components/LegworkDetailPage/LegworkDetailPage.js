import React from 'react'
import PropTypes from 'prop-types'
import styles from './LegworkDetailPage.less'
import { Icon,Row,Col } from 'antd'
import classNames from 'classnames';
import FileList from '../FileList'
import {changeMoneyToChinese} from '../../utils'
class LegworkDetailPage extends React.Component {
  render () {
    const { data,employeeList,dicList } = this.props
    let defaultFileList=[];
    if(data.attachList&& data.attachList[0]){
      defaultFileList=data.attachList.map((temp)=>{
        return {...temp,uid:temp.id,status:'done',url:temp.attachUrl,name:temp.attachName}
      })
    }
    
    return (
      <div>
        <Row gutter={24} className={styles['q-detail']}>
        <Col span={24} className='qite-list-title'>
            <Icon type="credit-card" />外勤信息
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
          {employeeList.postList?(employeeList.postList[0].orgParentName ||''):''}/{employeeList.postList?(employeeList.postList[0].orgName ||'无'):'无'}
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
          代理人：
        </Col>
        <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          {data.agentUserName || '无'}
        </Col>
        <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' ,paddingLeft:'0px'}} className={styles['q-detail-label']}>
          外勤地点：
        </Col>
        <Col xs={12} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          {data.address && data.address || '无'}
        </Col>
        <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label']}>
          外勤时间：
        </Col>
        <Col xs={12} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          {data.legworkTimeStartStr || data.legworkTimeStart || '无'} 
          <span className='q-pd-8'>至</span>
          {data.legworkTimeEndStr || data.legworkTimeEnd || '无'}
          <span className='q-pd-8'>共</span>
          {data.legworkHours && data.legworkHours || '无'}
          <span className='q-pd-8'>小时</span>
        </Col>
        </Row>
        <Row gutter={24} className={styles['q-detail']}>
        <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
          外勤事由：
        </Col>
        <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
         
          {data.remark?data.remark:'无'}
        </Col>
        
        <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
          餐费补贴：
        </Col>
        <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          
          {`¥ ${data.mealAllowance?data.mealAllowance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):0}`}
          <span className='q-pd-8'>大写：</span>
          {changeMoneyToChinese(data.mealAllowance)}
        </Col>
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
LegworkDetailPage.propTypes = {
}
export default LegworkDetailPage
