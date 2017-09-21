import React from 'react'
import PropTypes from 'prop-types'
import styles from './PurchaseDetailPage.less'
import { Icon,Row,Col,Table } from 'antd'
import classNames from 'classnames';
import FileList from '../FileList'
import {changeMoneyToChinese} from '../../utils'

class PurchaseDetailPage extends React.Component {
  render () {
    const { data,employeeList,dicList,storeInDetail } = this.props
    let defaultFileList=[],storeFileList=[],purInquiryFileList=[],purConfirmFileList=[];
    if(data.attachList&& data.attachList[0]){
      defaultFileList=data.attachList.filter(l=>l.sourceType===10 && l.use===null).map((temp)=>{
        return {...temp,uid:temp.id,status:'done',url:temp.attachUrl,name:temp.attachName}
      })
      purInquiryFileList=data.attachList.filter(l=>l.sourceType===10 && l.use==='purInquiry').map((temp)=>{
        return {...temp,uid:temp.id,status:'done',url:temp.attachUrl,name:temp.attachName}
      })
      purConfirmFileList=data.attachList.filter(l=>l.sourceType===10 && l.use==='purConfirm').map((temp)=>{
        return {...temp,uid:temp.id,status:'done',url:temp.attachUrl,name:temp.attachName}
      })
      storeFileList=data.attachList.filter(l=>l.sourceType===20).map((temp)=>{
        return {...temp,uid:temp.id,status:'done',url:temp.attachUrl,name:temp.attachName}
      })
    }
    
    let columns =[{
      title:'序号',
      dataIndex:'index',
      render:(text,record,index)=>index+1,
    },{
      title: '物料名称',
      dataIndex: 'materialName',
      key:'materialName',
      
    }, {
      title: '规格',
      dataIndex: 'spec',
      key:'spec',
    }, {
      title: '数量',
      dataIndex: 'purchaseNum',
      key:'purchaseNum',
      render: (text,record) => {
        let _num=text?text:record.num;
        return  `${_num?String(_num).replace(/\B(?=(\d{3})+(?!\d))/g, ','):'0.00'}` || '0.00'
      },
    }, {
      title: '单位',
      dataIndex: 'unit',
      key:'unit',
    }, {
      title: '单价',
      dataIndex: 'amount',
      key:'amount',
      render:(text)=>`¥ ${text?text.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):'0.00'}` || '¥ 0.00'
    }, {
      title: '预估金额',
      dataIndex: 'totalAmount',
      render:(text,record,index)=>{
        let t=parseFloat(record.purchaseNum ? record.purchaseNum : record.num)*parseFloat(record.amount!==undefined&&record.amount!==null&&record.amount!==''?record.amount:0);
        return `¥ ${t?t.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):'0.00'}` || '¥ 0.00'
      },
    }, {
      title: '使用时间', dataIndex: 'useTime',
      key:'useTime',
      render:(text)=>text && text.length>10?text.substr(0,10):text
    }, {
      title: '原因和用途',
      dataIndex: 'remark',
      key:'remark',
    }, {
      title: '供应商名称',
      dataIndex: 'supplierName',key:'supplierName',
    }, {
      title: '采购金额',
      dataIndex: 'purchaseAmount',key:'purchaseAmount',
      render:(text)=>`¥ ${text?text.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):'0.00'}` || '¥ 0.00'
    }, {
      title: '预估到货时间',
      dataIndex: 'estiArrivalTime',key:'estiArrivalTime',
    }, {
      title: '到货/入库时间',
      dataIndex: 'storageTime',key:'storageTime',
    }, {
      title: '是否已入库',
      dataIndex: 'isIn',
      render: (text) => text?'是':'否',
    }]
    if(storeInDetail){
      columns.push({
        title:'操作',
        key: 'operation',
        fixed:'right',
        width: 100,
        render:(text,record)=>!record.isIn?<a onClick={e=>storeInDetail(record.id)}>入库</a>:null
      })
    }
    const getTable=()=>{
      return (<Table bordered 
            dataSource={data.purchaseDetailList || []} 
            columns={columns} 
            pagination={false}
            scroll={{ x: 1800 }}
            rowKey={record => record.id}
            footer={()=>(
              <div>
              预估总金额：{`¥ ${data.totalAmount?data.totalAmount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):'0.00'}`}
              &nbsp;&nbsp;&nbsp;&nbsp;大写：{changeMoneyToChinese(data.totalAmount)}
              &nbsp;&nbsp;&nbsp;&nbsp;采购总金额：{`¥ ${data.purTotalAmount?data.purTotalAmount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):'0.00'}`}
              &nbsp;&nbsp;&nbsp;&nbsp;大写：{changeMoneyToChinese(data.purTotalAmount)}
              </div>
              )}
            />
        )
    }
    return (
      <div>
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} className='qite-list-title'>
              <Icon type="credit-card" />采购信息
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
          紧急程度：</Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          {data.urgency && data.urgency===1?'紧急':'一般'}</Col>

          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
          采购类型：</Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          {data.bigTypeName?data.bigTypeName:'无'}
          {data.typeName?'，'+data.typeName:''}
          </Col>

          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
          同月内重购：</Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          {data.isMonthRepeat?'是':'否'}
          {data.isMonthRepeat && data.monthRepeatReason && '，重复采购原因： '+data.monthRepeatReason}
          </Col>

          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
          采购说明：</Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          {data.remark?data.remark:'无'}</Col>
        </Row> 
        
        <Row gutter={24} className={styles['q-detail']}>
          
          <Col xs={24} md={24} xl={24} className={styles['q-detail-conent']}>
            {getTable()}
          </Col>
        </Row>
        { defaultFileList && defaultFileList[0]?
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
        { purInquiryFileList && purInquiryFileList[0]?
          <Row gutter={24} className={styles['q-detail']}>
            <Col span={24} className='qite-list-title'>
              <Icon type="paper-clip" />询价附件
            </Col>
            <Col span={24} style={{paddingLeft:'12px',paddingRight:'12px'}}>
              <FileList fileList={purInquiryFileList} showRemoveIcon={false}/>
            </Col>
          </Row>
          :null
        }
        { purConfirmFileList && purConfirmFileList[0]?
          <Row gutter={24} className={styles['q-detail']}>
            <Col span={24} className='qite-list-title'>
              <Icon type="paper-clip" />确定采购附件
            </Col>
            <Col span={24} style={{paddingLeft:'12px',paddingRight:'12px'}}>
              <FileList fileList={purConfirmFileList} showRemoveIcon={false}/>
            </Col>
          </Row>
          :null
        }
        
        { !storeInDetail && storeFileList && storeFileList[0]?
          <Row gutter={24} className={styles['q-detail']}>
            <Col span={24} className='qite-list-title'>
              <Icon type="paper-clip" />入库附件
            </Col>
            <Col span={24} style={{paddingLeft:'12px',paddingRight:'12px'}}>
              <FileList fileList={storeFileList} showRemoveIcon={false}/>
            </Col>
          </Row>
          :null
        }
      </div>
      )
  }
}
PurchaseDetailPage.propTypes = {
}
export default PurchaseDetailPage
