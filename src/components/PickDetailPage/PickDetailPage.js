import React from 'react'
import PropTypes from 'prop-types'
import styles from './PickDetailPage.less'
import { Icon,Row,Col,Table,Tooltip } from 'antd'
import classNames from 'classnames';
import FileList from '../FileList'
import {changeMoneyToChinese} from '../../utils'
class PickDetailPage extends React.Component {
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
          c+=parseFloat(t.pickNum)*parseFloat(t.singlePrice)
      })
      }
      return c.toFixed(2);
    }
    const columns =[{
        title:'序号',
        dataIndex:'index',width:60,
        render:(text,record,index)=>index+1,
      },{
        title: '编号',
        dataIndex: 'no',
        width: 120,
      }, {
        title: '名称及规格',
        dataIndex: 'spec',
        width: 120,
      }, {
        title: '单位',
        dataIndex: 'unit',
        width: 120,
      }, {
        title: '申请领取数量',
        dataIndex: 'applyNum',
        width: 120,
      }, {
        title: '实际领取数量',
        dataIndex: 'pickNum',
        width:120,
      }, {
        title: '单价',
        dataIndex: 'singlePrice',
        width: 120,
      }, {
        title: '总值',
        dataIndex: 'amountCount',
        width: 120,
        render:(text,record)=>(parseFloat(record.singlePrice)*parseFloat(record.pickNum)).toFixed(2),
      },{
        title:'用途',
        dataIndex:'use',
        render:(text)=>text && text.length>15?
          <Tooltip title={text}>{text.substr(0,12)}...</Tooltip>
          :<span>{text && text}</span>
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
      <div>
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} className='qite-list-title'>
              <Icon type="credit-card" />领料申请信息
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>姓名：</Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>{employeeList?employeeList.realName:'无'}</Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>部门：</Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>{employeeList.postList?(employeeList.postList[0].orgParentName ||''):''}/{employeeList.postList?(employeeList.postList[0].orgName ||'无'):'无'}</Col>
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
PickDetailPage.propTypes = {
}
export default PickDetailPage
