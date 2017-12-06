import React from 'react'
import PropTypes from 'prop-types'
import styles from './OverTimeDetailPage.less'
import { Icon,Row,Col,Table } from 'antd'
import classNames from 'classnames';
import FileList from '../FileList'
class OverTimeDetailPage extends React.Component {
render () {
    const { data,employeeList,dicList } = this.props
    let defaultFileList=[];
    if(data&& data.attachList&& data.attachList[0]){
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
    const columns = [{
      title:'序号',
      dataIndex:'index',width:60,
      render:(text,record,index)=>index+1,
    },{
      title: '加班人',
      dataIndex: 'realName',
    }, {
      title: '部门',
      dataIndex: 'orgName',
    }, {
      title: '申请加班开始时间',
      dataIndex: 'overTimeStart',
    }, {
      title: '申请加班结束时间',
      dataIndex: 'overTimeEnd',
    }, {
      title: '申请加班时长',
      dataIndex: 'otTimes',
      render:(text,record)=>getHours(record.overTimeStart,record.overTimeEnd),
    }, {
      title: '实际加班开始时间',
      dataIndex: 'realOverTimeStart',
    }, {
      title: '实际加班结束时间',
      dataIndex: 'realOverTimeEnd',
    }, {
      title: '实际加班时长',
      dataIndex: 'rotTimes',
      render:(text,record)=>getHours(record.realOverTimeStart,record.realOverTimeEnd),
    }];
    const getTable=()=>{
      return (<Table bordered 
            dataSource={data.detailList || []} 
            columns={columns} 
            pagination={false}
            scroll={{ x: 767 }}
            rowKey={record=>record.id}
            />
        )
    }
    return (
      <div>
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} className='qite-list-title'>
              <Icon type="credit-card" />加班信息
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
            加班类型：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          {data.type||'无'}
          </Col>
        
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>加班时段：</Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          {getDicType(data.times,data.timesRemark)}
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>加班原因：</Col>
          <Col xs={18} md={8} xl={14} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>{data.remark}</Col>
        
        </Row>
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} className='qite-list-title'>
              <Icon type="credit-card" />加班明细
          </Col>
          <Col xs={24} md={24} xl={24} className={styles['q-detail-conent']}>
            {getTable()}
          </Col>
        </Row>

        <Row gutter={12} className={styles['q-detail']} style={{marginLeft:'2px',marginTop:'12px',marginRight:'2px'}}>
          <blockquote>
            <p>
              备注：<br/>
              1、请在加班前填写此单，审批结束后交到考勤专员处备案。<br/>
              2、当值人为：考勤专员根据考勤机所记录加班后打卡时间或保安记录离开时间，实际加班时间以当值人员记录为准
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
OverTimeDetailPage.propTypes = {
}
export default OverTimeDetailPage
