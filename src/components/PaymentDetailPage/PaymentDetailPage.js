import React from 'react'
import PropTypes from 'prop-types'
import styles from './PaymentDetailPage.less'
import { Icon,Row,Col } from 'antd'
import classNames from 'classnames';
import FileList from '../FileList'
import {changeMoneyToChinese} from '../../utils'

class PaymentDetailPage extends React.Component {
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
              <Icon type="credit-card" />付款/预付款信息
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
            申请类型：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.type || '未知'}
          </Col>
         <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            合同编号：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          { data.purchaseContract || '无'}
           
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            账号：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          { data.accountNumber || '无'}
            
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
          联系方式：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          { data.contactPhone || '无'}
          
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            收款方：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          { data.payee || '无'}
            
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            开户行：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            { data.bankName || '无'}
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
          联系人：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          { data.contacter || '无'}
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            合同申请单：
          </Col>
          <Col xs={18} md={20} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.contractCodes ||'无'}
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            采购申请单：
          </Col>
          <Col xs={18} md={20} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.purchaseCodes ||'无'}
          </Col>
           <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            申请金额：
          </Col>
          <Col xs={18} md={20} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
           
            {`¥ ${data.payAmount?String(data.payAmount.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ','):'0.00'}` || '0.00'}
            <span className='q-pd-8'>大写：</span>
            {changeMoneyToChinese(data.payAmount)}
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            付款说明：
          </Col>
          <Col xs={18} md={20} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            
            {data.remark?data.remark:'无'}
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
PaymentDetailPage.propTypes = {
}
export default PaymentDetailPage
