import React from 'react'
import PropTypes from 'prop-types'
import styles from './ShopDetailPage.less'
import { Icon,Row,Col,Table } from 'antd'
import classNames from 'classnames';
import FileList from '../FileList'
// import {changeMoneyToChinese} from '../../utils'
class ShopDetailPage extends React.Component {
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
              <Icon type="credit-card" />建店申请信息
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>姓名：</Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>{employeeList?employeeList.realName:'无'}</Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>部门：</Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>{employeeList.postList?(employeeList.postList[0].orgName ||'无'):'无'}</Col>
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
        </Row>
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} className='qite-list-title'>
            <Icon type="credit-card" />客户信息
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            客户姓名：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.clientName || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            客户联系电话：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.clientPhone || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            qq号码：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.qq || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            性别：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {Boolean(data.sex)?'男':'女'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            身份证号：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.idCode || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            合伙人姓名：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.partnerName || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            合伙人联系电话：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.partnerPhone || '无'}
          </Col>
        </Row>
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} className='qite-list-title'>
            <Icon type="credit-card" />店面信息
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            门店位置情况：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.shopLocationLevel || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            门店类型：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.shopType || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            省份：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.province || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            城市：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.city || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            门店地址：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.shopAddress || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            指定物流：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.logistics || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            门店建筑面积：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.shopArea?data.shopArea:0}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            实际使用面积：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.realUseArea?data.realUseArea:0}
          </Col>
        </Row>
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} className='qite-list-title'>
            <Icon type="credit-card" />合同约定
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            装修补贴：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.decorationSubsidy?data.decorationSubsidy:0}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            预计费用：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.estiCost?data.estiCost:0}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            上样产品折扣：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.sampleDiscount?data.sampleDiscount:0}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            预计上样金额：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.estiSampleAmount?data.estiSampleAmount:0}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            其他约定条款：
          </Col>
          <Col xs={18} md={20} xl={13} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.otherTerms || '无'}
          </Col>
        </Row>
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} className='qite-list-title'>
            <Icon type="credit-card" />活动要求
          </Col>
          
          <Col xs={6} md={6} xl={5} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            开业方案是否有具体要求或描述：
          </Col>
          <Col xs={18} md={18} xl={19} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.remark1 || '无'}
          </Col>
          <Col xs={6} md={6} xl={5} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            开业礼品及物料需求（有偿提供）：
          </Col>
          <Col xs={18} md={18} xl={19} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.remark2 || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            试营业时间：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.trialHours || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            开业时间：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.openTimes || '无'}
          </Col>
        </Row>
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} className='qite-list-title'>
            <Icon type="credit-card" />装修进度时间表
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            量尺时间：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.metricTime || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            门店设计时间：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.shopDesignTime || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            产品选型时间：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.productSelectTime || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            生产制作时间：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.makingTime || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            安装服务时间：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.installTime || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            计划试营业时间：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.planTrialHours || '无'}
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
ShopDetailPage.propTypes = {
}
export default ShopDetailPage
