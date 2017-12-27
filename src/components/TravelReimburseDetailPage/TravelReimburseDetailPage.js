import React from 'react'
import PropTypes from 'prop-types'
import styles from './TravelReimburseDetailPage.less'
import { Icon,Row,Col,Table } from 'antd'
import classNames from 'classnames';
import FileList from '../FileList'
import {changeMoneyToChinese} from '../../utils'

class TravelReimburseDetailPage extends React.Component {
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
    let _actualExpense=0;
    if(data.detailList&&data.detailList[0]){
        let _t=0;
        data.detailList.map(t=>{
          _t+=parseFloat(t.vehicleCost)
            +parseFloat(t.livingCost)
            +parseFloat(t.otherCost)
            +parseFloat(t.subsidyAmount)
        })
        _actualExpense=_t.toFixed(2);
    }
   
    const columns = [{
        title:'序号',
        dataIndex:'index',
        render:(text,record,index)=>index+1,
      
      },{
        title: '出发时间',
        dataIndex: 'departureTime',
        render:(text)=>text?text.substr(5,5):'',
      }, {
        title: '出发地点',
        dataIndex: 'departurePlace',
      }, {
        title: '到达时间',
        dataIndex: 'arrivalTime',
        render:(text)=>text?text.substr(5,5):'',
      }, {
        title: '到达地点',
        dataIndex: 'arrivalPlace',
      }, {
        title: '交通工具',
        dataIndex: 'vehicle',
        render: (text) => getDicType(text),
      }, {
        title: '交通费用',
        dataIndex: 'vehicleCost',
        render: (text) => `¥ ${text?String(text.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ','):'0.00'}` || '¥ 0.00',
      }, {
        title: '住宿费',
        dataIndex: 'livingCost',
        render: (text) => `¥ ${text?String(text.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ','):'0.00'}` || '¥ 0.00',
      }, {
        title: '补贴费用',
        dataIndex: 'subsidyAmount',
        render: (text) => `¥ ${text?String(text.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ','):'0.00'}` || '¥ 0.00',
      }, {
        title: '其他费用',
        dataIndex: 'otherCost',
        render: (text) => `¥ ${text?String(text.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ','):'0.00'}` || '¥ 0.00',
      }, {
        title: '合计金额',
        dataIndex: 'total',
        
        render: (text, record, index) =>{
          let t=parseFloat(record.vehicleCost)+parseFloat(record.livingCost)+parseFloat(record.otherCost)+parseFloat(record.subsidyAmount);
          return `¥ ${t?t.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):'0.00'}` || '¥ 0.00'
        },
      
      }]
    const getTable=()=>{
      return (<Table bordered 
            dataSource={data.detailList} 
            columns={columns} 
            pagination={false}
            scroll={{ x: 1300 }} 
            rowKey={record=>record.id}
            />
        )
    }
    return (
      <div>
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} className='qite-list-title'>
              <Icon type="credit-card" />差旅费报销信息
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
            帐户名：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.accountName?data.accountName:'无'}
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            账号：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.accountNumber?data.accountNumber:'无'}
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            开户行：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.bankName?data.bankName:'无'}
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            报销说明：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.remark?data.remark:'无'}
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' ,paddingLeft:'0px'}} className={styles['q-detail-label']}>
            出差申请单：
          </Col>
          <Col xs={12} md={8} xl={22} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.travelCodes?data.travelCodes:'无'}
          </Col>
        </Row>
        <Row gutter={24} className={styles['q-detail']}>
          
          <Col xs={24} md={24} xl={24} className={styles['q-detail-conent']}>
            {getTable()}
          </Col>
        </Row>
        
        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            报销总额：
          </Col>
          <Col xs={18} md={20} xl={22} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
             {`¥ ${_actualExpense?String(_actualExpense).replace(/\B(?=(\d{3})+(?!\d))/g, ','):'0.00'}`}
            &nbsp;&nbsp;&nbsp;&nbsp;大写：{changeMoneyToChinese(_actualExpense?_actualExpense:0.00)}
          </Col>
        </Row>
        
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} className='qite-list-title'>
            <Icon type="credit-card" />借款信息
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            借款单：
          </Col>
          <Col xs={18} md={20} xl={22} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.borrowCodes || '无'}
          </Col>
        </Row>
        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            借款金额：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.advanceExpense || 0}{'  元'}
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            实际报销：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.actualExpense>0 && data.actualExpense || 0}{'  元'}
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            归还多余：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.actualExpense<0 && Math.abs(data.actualExpense) || 0}{'  元'}
          </Col>
        </Row> 
        <Row gutter={12} className={styles['q-detail']} style={{marginLeft:'2px',marginRight:'2px'}}>
          <blockquote>
            <p>
              备注：<br/>
              1、预支旅费=出差申请单总申请费用；<br/>
              2、报销总额-预支旅费：正数=实际报销；负数=归还多余。
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
TravelReimburseDetailPage.propTypes = {
}
export default TravelReimburseDetailPage
