import React from 'react'
import PropTypes from 'prop-types'
import styles from './PurchaseDetailPage.less'
import { Icon,Row,Col,Table } from 'antd'
import classNames from 'classnames';
import FileList from '../FileList'
import {changeMoneyToChinese} from '../../utils'

class PurchaseDetailPage extends React.Component {
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
    const columns =[{
      title:'序号',
      dataIndex:'index',
      render:(text,record,index)=>index+1,
    },{
      title: '申购部门',
      dataIndex: 'applyDept',
      key:'applyDept',
    },{
      title: '申购人',
      dataIndex: 'applyName',
      key:'applyName',
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
      dataIndex: 'num',
      key:'num',
      render: (text) => `${text?String(text).replace(/\B(?=(\d{3})+(?!\d))/g, ','):'0.00'}` || '0.00',
    }, {
      title: '单位',
      dataIndex: 'unit',
      key:'unit',
    }, {
      title: '单价',
      dataIndex: 'amount',
      key:'amount',
    }, {
      title: '金额',
      dataIndex: 'totalAmount',
      render:(text,record,index)=>{
        let t=parseFloat(record.num)*parseFloat(record.amount!==undefined&&record.amount!==null&&record.amount!==''?record.amount:0);
        return `¥ ${t?t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):'0.00'}` || '¥ 0.00'
      },
    }, {
      title: '使用时间',
      dataIndex: 'useTime',
      key:'useTime',
    }, {
      title: '原因和用途',
      dataIndex: 'remark',
      key:'remark',
      
    }]
    const getTable=()=>{
      return (<Table bordered 
            dataSource={data.purchaseDetailList || []} 
            columns={columns} 
            pagination={false}
            scroll={{ x: 1200 }}
            rowKey={record => record.id}
            footer={()=>(
              <div>
              采购总金额：{`¥ ${data.totalAmount?data.totalAmount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):'0.00'}`}
              &nbsp;&nbsp;&nbsp;&nbsp;大写：{changeMoneyToChinese(data.totalAmount)}
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
          
        </Row>
        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
          采购说明：</Col>
          <Col xs={18} md={20} xl={22} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
          {data.remark?data.remark:'无'}</Col>
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
PurchaseDetailPage.propTypes = {
}
export default PurchaseDetailPage
