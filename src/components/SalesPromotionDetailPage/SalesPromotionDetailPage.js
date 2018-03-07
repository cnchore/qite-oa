import React from 'react'
import PropTypes from 'prop-types'
import styles from './SalesPromotionDetailPage.less'
import { Icon,Row,Col,Table } from 'antd'
import classNames from 'classnames';
import FileList from '../FileList'
import {changeMoneyToChinese} from '../../utils'
class SalesPromotionDetailPage extends React.Component {
  render () {
    const { data,employeeList } = this.props
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
              <Icon type="credit-card" />促销活动支持信息
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>姓名：</Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>{employeeList?employeeList.realName:'无'}</Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>部门：</Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>{employeeList.postList?(employeeList.postList[0].orgParentName ||''):''}/{employeeList.postList?(employeeList.postList[0].orgName ||'无'):'无'}</Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>岗位：</Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>{employeeList.postList?(employeeList.postList[0].postName || '无'):'无'}</Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>申请单号：</Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>{data.code}</Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            申请时间：
          </Col>
          <Col xs={18} md={20} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
              {data.createTime || data.createTimeStr || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            促销类型：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.type?data.type:'无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            申请区域：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.applyArea?data.applyArea:'无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label']}>
            费用预算：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.budge?data.budge:0}元
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label']}>
            预计达成销售：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.estiSale?data.estiSale:0}元
          </Col>
        </Row>
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} className='qite-list-title'>
            <Icon type="credit-card" />需要公司支持方面
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            活动方案：
          </Col>
          <Col xs={18} md={8} xl={13} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.actPlan?data.actPlan:'无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            方案提供时间：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.planSupportTime?data.planSupportTime:'无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            物料设计：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.materialDesign?data.materialDesign:'无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            物料设计完成时间：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.materialDesignFinish?data.materialDesignFinish:'无'}
          </Col>
          
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            物料制作：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.materialMake?data.materialMake:'无'}
          </Col>
          
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            物料费用：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.materialExpense?data.materialExpense:0}元
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            到场人员：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.personnels?data.personnels:'无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            到场时间：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.arrivalTime?data.arrivalTime:'无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            其他支持：
          </Col>
          <Col xs={18} md={20} xl={21} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.otherSupport?data.otherSupport:'无'}
          </Col>
        </Row>
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} className='qite-list-title'>
            <Icon type="credit-card" />促销活动
          </Col>  
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            主题方面：
          </Col>
          <Col xs={18} md={20} xl={21} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.spTheme?data.spTheme:'无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            内容方面：
          </Col>
          <Col xs={18} md={20} xl={21} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.spContent?data.spContent:'无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            力度方面：
          </Col>
          <Col xs={18} md={20} xl={21} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.spIntensity?data.spIntensity:'无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            时间方面：
          </Col>
          <Col xs={18} md={20} xl={21} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.spTime?data.spTime:'无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            其他备注：
          </Col>
          <Col xs={18} md={20} xl={21} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.spRemark?data.spRemark:'无'}
          </Col>
        </Row>
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} className='qite-list-title'>
            <Icon type="credit-card" />物料设计关键点
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            版面：
          </Col>
          <Col xs={18} md={20} xl={21} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.mdPage?data.mdPage:'无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            色彩：
          </Col>
          <Col xs={18} md={20} xl={21} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.mdColor?data.mdColor:'无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            其他：
          </Col>
          <Col xs={18} md={20} xl={21} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.mdRemark?data.mdRemark:'无'}
          </Col>
        </Row>
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} className='qite-list-title'>
            <Icon type="credit-card" />活动宣传计划
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            户外：
          </Col>
          <Col xs={18} md={20} xl={21} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.paOutdoor?data.paOutdoor:'无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            小区：
          </Col>
          <Col xs={18} md={20} xl={21} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.paVillage?data.paVillage:'无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            其他：
          </Col>
          <Col xs={18} md={20} xl={21} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.paRemark?data.paRemark:'无'}
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
SalesPromotionDetailPage.propTypes = {
}
export default SalesPromotionDetailPage
