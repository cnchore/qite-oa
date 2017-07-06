import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'
import { Row,Col,Icon,Table} from 'antd'
import { FileList } from '../../../components'
import {changeMoneyToChinese} from '../../../utils'

const Detail = ({ budgetDetail }) => {
  const { data,employeeList,dicList } = budgetDetail
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
  const getTotalAmount=()=>{
    
    let c=0;
    if(data && data.detailList && data.detailList[0]){
      data.detailList.map(t=>{
        c+=parseFloat(t.amount)
      })
    }
    return c.toFixed(2);
  }
  const columns =[{
      title:'序号',
      dataIndex:'index',width:60,
      render:(text,record,index)=>index+1,
    
    },{
      title: '部门',
      dataIndex: 'orgName',
      width: 120,
      key:'orgName',
      
    }, {
      title: '供应商',
      dataIndex: 'supplier',
      key:'supplier',
      width: 120,
    }, {
      title: '内容',
      dataIndex: 'content',
      key:'content',
      width: 100,
    }, {
      title: '金额',
      dataIndex: 'amount',
      key:'amount',
      width: 120,
      render: (text) => `¥ ${text?String(text.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ','):'0.00'}` || '0.00',
    }, {
      title: '备注',
      dataIndex: 'remark',
      key:'remark',
    }, {
      title: '使用时间',
      dataIndex: 'payTime',
      key:'payTime',
      width: 170,
    }]
  const getTable=()=>{
    return (<Table bordered 
          dataSource={data.detailList || []} 
          columns={columns} 
          pagination={false}
          scroll={{ x: 1000 }}
          rowKey={record=>record.id}
          footer={()=>(
            <div>
            合计金额：{`¥ ${getTotalAmount().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
            &nbsp;&nbsp;&nbsp;&nbsp;大写：{changeMoneyToChinese(getTotalAmount())}
            </div>
          )} 
          />
      )
  }
  return (
    <div className="content-inner">
      <Row gutter={24} className={styles['q-detail']}>
        <Col span={24} className='qite-list-title'>
            <Icon type="credit-card" />预算信息
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
  budgetDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ budgetDetail, loading }) => ({ budgetDetail, loading: loading.models.budgetDetail }))(Detail)
