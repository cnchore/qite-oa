import React from 'react'
import PropTypes from 'prop-types'
import {Button, Row, Col } from 'antd'
import styles from './Filter.less'
// const Search = Input.Search
// const Option=Select.Option;



const Filter = ({
  onAdd,
  item={},
  onlyview,
}) => {

  return (
    <Row gutter={24} className={styles['q-detail']}>
      
      <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
        品牌：
      </Col>
      <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          {item.carBrand || '无'}
      </Col>
      <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
        车牌号：
      </Col>
      <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          {item.carNum || '无'}
      </Col>
          
      <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
        户主：
      </Col>
      <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          {item.carOwner || '无'}
      </Col>
          
      <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
        购买日期：
      </Col>
      <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          {item.buyDate || '无'}
      </Col>
          
      <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
        使用地点：
      </Col>
      <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          {item.usePlace || '无'}
      </Col>
      <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
        是否可以申请：
      </Col>
      <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          {item.isAppliable?'是':'否'}
      </Col>
      <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
        备注：
      </Col>
      <Col xs={18} md={8} xl={22} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          {item.remark || '无'}
      </Col>
      {
        !onlyview?
        <Col style={{marginBottom:16}}  span={24}>
          <div style={{ textAlign: 'right'}}>
              <Button  size="large" type="primary" icon="plus" onClick={onAdd}>新增</Button>
          </div>
        </Col>
        :null
      }
    </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  item:PropTypes.object,
}

export default Filter
// export default Form.create()(Filter)
