import React from 'react'
import PropTypes from 'prop-types'
import styles from './AdReimburseDetailPage.less'
import { Icon,Row,Col,Table } from 'antd'
import classNames from 'classnames';
import FileList from '../FileList'
import {changeMoneyToChinese} from '../../utils'
class AdReimburseDetailPage extends React.Component {
  render () {
    const { data,employeeList } = this.props
    let defaultFileList=[];
    if(data.attachList&& data.attachList[0]){
      defaultFileList=data.attachList.map((temp)=>{
        return {...temp,uid:temp.id,status:'done',url:temp.attachUrl,name:temp.attachName}
      })
    }
    
    const getTotalAmount=()=>{
      
      let c=0;
      if(data && data.detailList && data.detailList[0]){
        data.detailList.map(t=>{
          c+=parseFloat(t.costAmount?t.costAmount:0)
        })
      }
      return c.toFixed(2);
    }
    const columns =[{
        title:'序号',
        dataIndex:'index',width:60,
        render:(text,record,index)=>index+1,
      }, {
        title: '费用明细',
        dataIndex: 'costDetail',
        key:'costDetail',
      }, {
        title: '费用金额',
        dataIndex: 'costAmount',
        key:'costAmount',
        width: 120,
        render: (text) => `¥ ${text?String(text.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ','):'0.00'}` || '0.00',
      }]
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
    // footer={()=>(
    //           <div>
    //           合计金额：{`¥ ${getTotalAmount().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
    //           &nbsp;&nbsp;&nbsp;&nbsp;大写：{changeMoneyToChinese(getTotalAmount())}
    //           </div>
    //         )} 
    return (
      <div>
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} className='qite-list-title'>
              <Icon type="credit-card" />广告费用报销信息
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>姓名：</Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>{employeeList?employeeList.realName:'无'}</Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>部门：</Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>{employeeList.postList?(employeeList.postList[0].orgName ||'无'):'无'}</Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>岗位：</Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>{employeeList.postList?(employeeList.postList[0].postName || '无'):'无'}</Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>申请单号：</Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>{data.code}</Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>申请时间：</Col>
          <Col xs={18} md={8} xl={13} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>{data.createTime || data.createTimeStr}</Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            申请区域：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.applyArea?data.applyArea:'无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            客户姓名：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.clientName?data.clientName:'无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            客户地址：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.clientAddress?data.clientAddress:'无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            广告主题：
          </Col>
          <Col xs={18} md={20} xl={21} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.adTheme?data.adTheme:'无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            广告背景：
          </Col>
          <Col xs={18} md={20} xl={21} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.adBackground?data.adBackground:'无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            广告目的：
          </Col>
          <Col xs={18} md={20} xl={21} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.adGoal?data.adGoal:'无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            广告开始时间：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.adTimeStart?data.adTimeStart:'无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            广告结束时间：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.adTimeEnd?data.adTimeEnd:'无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            广告天数：
          </Col>
          <Col xs={18} md={20} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.adDays?data.adDays:'0'}天
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            广告形式：
          </Col>
          <Col xs={18} md={20} xl={21} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.adForm?data.adForm:'无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            活动内容：
          </Col>
          <Col xs={18} md={20} xl={21} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.actContent?data.actContent:'无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label']}>
            促销期销售计划：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.saleGoal?data.saleGoal:0}元
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label']}>
            去年同期销售额：
          </Col>
          <Col xs={18} md={8} xl={13} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.lastYearSales?data.lastYearSales:0}元
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label']}>
            预计达成销售：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.estiSale?data.estiSale:0}元
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label']}>
            预估销售提高：
          </Col>
          <Col xs={18} md={8} xl={13} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.estiImprove?data.estiImprove:0}元
          </Col>
          
          
        </Row>
   
        
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} className='qite-list-title'>
              <Icon type="credit-card" />费用明细
          </Col>
          <Col xs={24} md={24} xl={24} className={styles['q-detail-conent']}>
            {getTable()}
          </Col>
        </Row>
        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label']}>
            费用合计：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.cost?data.cost:0}元
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label']}>
            客户分摊：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.clientPay?data.clientPay:0}元
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label']}>
            公司分摊：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.companyPay?data.companyPay:0}元
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
AdReimburseDetailPage.propTypes = {
}
export default AdReimburseDetailPage
