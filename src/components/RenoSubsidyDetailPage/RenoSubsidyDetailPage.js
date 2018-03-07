import React from 'react'
import PropTypes from 'prop-types'
import styles from './RenoSubsidyDetailPage.less'
import { Icon,Row,Col,Table,Tooltip } from 'antd'
import classNames from 'classnames';
import FileList from '../FileList'
// import {changeMoneyToChinese} from '../../utils'
class RenoSubsidyDetailPage extends React.Component {
  render () {
    const { data,employeeList } = this.props
    let defaultFileList=[];
    if(data.attachList&& data.attachList[0]){
      defaultFileList=data.attachList.map((temp)=>{
        return {...temp,uid:temp.id,status:'done',url:temp.attachUrl,name:temp.attachName}
      })
    }
    const renderTip=(text)=>{
      return (
        text && text.length>20?
          <Tooltip title={text.toString()}>{`${text.toString().substr(0,(20-3))}...`}</Tooltip>
        :<span>{text && text}</span>
      )
    }
    const columns =[{
        title:'序号',
        dataIndex:'index',width:60,
        render:(text,record,index)=>index+1,
        
      },{
        title: '标准形象点',
        dataIndex: 'imagePoint',
        key:'imagePoint',
        render:(text)=>renderTip(text)
      }, {
        title: '自评',
        dataIndex: 'ratingSelf',
        key:'ratingSelf',
        render:(text)=>renderTip(text)
      }, {
        title: '市场部评估',
        dataIndex: 'ratingMarket',
        key:'ratingMarket',
        render:(text)=>renderTip(text)
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
    return (
      <div>
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} className='qite-list-title'>
              <Icon type="credit-card" />装修补贴费用申请信息
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>姓名：</Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>{employeeList?employeeList.realName:'无'}</Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>部门：</Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>{employeeList.postList?(employeeList.postList[0].orgParentName ||''):''}/{employeeList.postList?(employeeList.postList[0].orgName ||'无'):'无'}</Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>岗位：</Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>{employeeList.postList?(employeeList.postList[0].postName || '无'):'无'}</Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>申请单号：</Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>{data.code}</Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>申请时间：</Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>{data.createTime || data.createTimeStr}</Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            申请区域：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.applyArea || '无'}
          </Col>
          
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            客户姓名：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.clientName || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            客户联系方式：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.clientPhone || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            门店类型：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.shopType || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label']}>
            门店面积：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.shopAreas?data.shopAreas:0}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label']}>
            补贴面积：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.subsAreas?data.subsAreas:0}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            补贴标准：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.subsStandard || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            立项时间：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.projectTime || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            开业时间：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.openTime || '无'}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label']}>
            申请金额：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.applyAmount?data.applyAmount:0}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label']}>
            补贴金额：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.subsAmount?data.subsAmount:0}
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            其他备注：
          </Col>
          <Col xs={18} md={20} xl={13} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            {data.remark || '无'}
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
RenoSubsidyDetailPage.propTypes = {
}
export default RenoSubsidyDetailPage
