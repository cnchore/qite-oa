import React from 'react'
import PropTypes from 'prop-types'
import styles from './ReimburseDetailPage.less'
import { Icon,Row,Col,Table } from 'antd'
import classNames from 'classnames';
import FileList from '../FileList'
import {changeMoneyToChinese} from '../../utils'
class ReimburseDetailPage extends React.Component {
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
          c+=parseFloat(t.amount?t.amount:0)
        })
      }
      return c.toFixed(2);
    }
    const columns =[{
        title:'序号',
        dataIndex:'index',width:60,
        render:(text,record,index)=>index+1,
      }, {
        title: '用途',
        dataIndex: 'uses',
        key:'uses',
      }, {
        title: '金额',
        dataIndex: 'amount',
        key:'amount',
        width: 100,
        render: (text) => `¥ ${text?String(text).replace(/\B(?=(\d{3})+(?!\d))/g, ','):'0.00'}` || '0.00',
      
      }, {
        title: '备注',
        dataIndex: 'remark',
        key:'remark',
        
      }]
    const getTable=()=>{
      return (<Table bordered 
            dataSource={data.detailList || []} 
            columns={columns} 
            pagination={false}
           
            rowKey={record=>record.id}
            footer={()=>(
                  <div>
                  合计金额：{`¥ ${getTotalAmount().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                  <span className='q-pd-8'>大写：</span>
                  {changeMoneyToChinese(getTotalAmount())}
                  </div>
                  )}
            />
        )
    }
    return (
      <div>
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} className='qite-list-title'>
              <Icon type="credit-card" />费用报销信息
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
            采购申请单：
          </Col>
          <Col xs={18} md={20} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.purchaseCodes?data.purchaseCodes:'无'}
          </Col>
        </Row>
   
        
        <Row gutter={24} className={styles['q-detail']}>
          
          <Col xs={24} md={24} xl={24} className={styles['q-detail-conent']}>
            {getTable()}
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
ReimburseDetailPage.propTypes = {
}
export default ReimburseDetailPage
