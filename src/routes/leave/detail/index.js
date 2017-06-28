import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'
import { Row,Col,Icon} from 'antd'
import { FileList } from '../../../components'

const Detail = ({ leaveDetail }) => {
  const { data,employeeList,dicList } = leaveDetail
  /*
  const content = []
  for (let key in data) {
    if ({}.hasOwnProperty.call(data, key)) {
      content.push(<div key={key} className={styles.item}>
        <div>{key}</div>
        <div>{String(data[key])}</div>
      </div>)
    }
  }
  attachList
  */
  let defaultFileList=[];
  if(data.attachList&& data.attachList[0]){
    defaultFileList=data.attachList.map((temp)=>{
      return {...temp,uid:temp.id,status:'done',url:temp.attachUrl,name:temp.attachName}
    })
  }
  const getLeaveType=(value,remark=null)=>{
    let n=dicList.filter(item=>String(item.dicValue)===String(value));
    //console.log(orgList,...n,value);
    if(n && n[0]){
      return remark&&n[0].dicName==='其他'?remark:n[0].dicName;
    }
    return '';
  }
  return (
    <div className="content-inner">
      <Row gutter={24} className={styles['q-detail']}>
        <Col span={24} className='qite-list-title'>
            <Icon type="credit-card" />请假信息
        </Col>
        <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>姓名：</Col>
        <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>{employeeList?employeeList.realName:'无'}</Col>
        <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>部门：</Col>
        <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>{employeeList.postList?(employeeList.postList[0].orgName ||'无'):'无'}</Col>
        <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>岗位：</Col>
        <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>{employeeList.postList?(employeeList.postList[0].postName || '无'):'无'}</Col>
        <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>申请单号：</Col>
        <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>{data.code}</Col>
        <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>申请时间：</Col>
        <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>{data.createTime || data.createTimeStr}</Col>
        <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>请假类型：</Col>
        <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
        {getLeaveType(data.type,data.typeRemark)}
        </Col>
      </Row>
      <Row gutter={24} className={styles['q-detail']}>
      
        <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>请假时间：</Col>
        <Col xs={18} md={20} xl={22} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
        {data.leaveTimeStart || data.leaveTimeStartStr || '无'} 至
        {data.leaveTimeEnd || data.leaveTimeEndStr || '无'}，共{data.leaveHours || '0'} 小时
        </Col>
      </Row>
      <Row gutter={24} className={styles['q-detail']}>
      
        <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>请假原因：</Col>
        <Col xs={18} md={20} xl={22} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>{data.remark}</Col>
      
      </Row>
      <Row gutter={24} className={styles['q-detail']}>
         <Col span={24} className='qite-list-title'>
          <Icon type="credit-card" />审批信息
        </Col>
        <Col span={24} style={{paddingLeft:'12px',paddingRight:'12px'}} className={styles['q-detail-conent']}>
          
        </Col>
      </Row>
      <Row gutter={24} className={styles['q-detail']}>
        <Col span={24} className='qite-list-title'>
          <Icon type="paper-clip" />附件信息
        </Col>
        <Col span={24} style={{paddingLeft:'12px',paddingRight:'12px'}}>
          <FileList fileList={defaultFileList} showRemoveIcon={false}/>
        </Col>
      </Row>
    </div>)
}

Detail.propTypes = {
  leaveDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ leaveDetail, loading }) => ({ leaveDetail, loading: loading.models.leaveDetail }))(Detail)
