import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import {Icon,Row,Col} from 'antd';
import styles from './index.less';
const LogisticsDetail = ({ location, dispatch, logisticsDetail, loading }) => {
  const { data } = logisticsDetail
  return (
    <div className="content-inner">
      <div className="q-goback">
        <a href="javascript:window.history.back();">
          <Icon type="close-circle-o" />
        </a>
      </div>
      <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} className='qite-list-title'>
              <Icon type="credit-card" />物流信息
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            省份：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.province || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            客户姓名：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.clientName || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            客户联系方式：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.clientPhone || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            订单编号：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.orderCode || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            客户地址：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.clientAddress || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            指定物流：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.logistics || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            物流电话：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.logisticsPhone || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            物理地址：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.logisticsAddress || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            到指定物流距离：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.logisticsDistance || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            运输周期（天）：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.transportationCycle || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            发货日期及装货时间：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.deliveryDate || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            发送到物流时间：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.sendLogisticsTime || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            估计到货时间：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.predictArrivalTime || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            物流费用：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.logisticsCost || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            运输走向反馈：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.trendFeedback || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            物流状态：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.logisticsState===-1?'运输异常':data.logisticsState==='1'?'已完成':'运输途中'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            备注）：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.remark || '无'}
          </Col>
      </Row>    
    </div>
  )
}

LogisticsDetail.propTypes = {
  logisticsDetail: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ logisticsDetail, loading }) => ({ logisticsDetail, loading }))(LogisticsDetail)
