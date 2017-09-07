import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Icon,Table,Row,Col} from 'antd'
import cs from 'classnames'
import styles from './index.less'
const Detail = ({ dinnerBookDetail }) => {
  const { data,loading } = dinnerBookDetail
  const tableProps={
    dataSource: data.detailList,
    loading: loading,
    pagination:false,
  }
  const columns=[{
    title:'部门',
    dataIndex:'deptName',
    key:'deptName',
  },{
    title: '姓名',
    dataIndex: 'dinnerName',
    key: 'dinnerName',
  },{
    title:'早餐',
    key:'breakfast',
    dataIndex:'breakfast',
    render:(text,record,index)=>text?<Icon type="check" /> :null,

  },{
    title:'午餐',
    key:'lunch',
    dataIndex:'lunch',
    render:(text,record,index)=>text?<Icon type="check" /> :null,
  },{
    title:'晚餐',
    key:'supper',
    dataIndex:'supper',
    render:(text,record,index)=>text?<Icon type="check" /> :null,
  },{
    title:'报餐人',
    key:'createrName',
    dataIndex:'createrName',
  }]
  const getRecordState=(text)=>{
    //状态：0未提交  1已提交 2已取消
    switch(text){
      case 0:
        return '未提交';
      case 1:
        return '已提交';
      case 2:
        return '已取消';
     
    }
  }
  return (
    <div className='content-inner' >
      <div className="q-goback">
        <a href="javascript:window.history.back();">
          <Icon type="close-circle-o" />
        </a>
      </div>
      <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} className='qite-list-title'>
              <Icon type="credit-card" />报餐信息
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            报餐人姓名：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.createrName?data.createrName:'无'}
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            预约用餐时间：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.bookTime?data.bookTime:'无'}
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            状态：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.state!==null?getRecordState(data.state):'无'}
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            早餐总数：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.breakfastTotal?data.breakfastTotal:'0'}
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            午餐总数：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.lunchTotal?data.lunchTotal:'0'}
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            晚餐总数：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.supperTotal?data.supperTotal:'0'}
          </Col>
          
        </Row>
      <Table
          {...tableProps}
          bordered
          scroll={{ x: 1024 }}
          columns={columns}
          simple
          rowKey={record => record.id}
        />
      
    </div>)
}

Detail.propTypes = {
  dinnerBookDetail: PropTypes.object,
  
}

export default connect(({ dinnerBookDetail, loading }) => ({ dinnerBookDetail, loading: loading.models.dinnerBookDetail }))(Detail)
