import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'
import { Row,Col,Icon,Table} from 'antd'
import { FileList } from '../../../components'
import {changeMoneyToChinese} from '../../../utils'

const Detail = ({ purchaseDetail }) => {
  const { data,employeeList,dicList } = purchaseDetail
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
            采购总金额：{`¥ ${data.totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
            &nbsp;&nbsp;&nbsp;&nbsp;大写：{changeMoneyToChinese(data.totalAmount)}
            </div>
            )}
          />
      )
  }
  return (
    <div className="content-inner">
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
  purchaseDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ purchaseDetail, loading }) => ({ purchaseDetail, loading: loading.models.purchaseDetail }))(Detail)
