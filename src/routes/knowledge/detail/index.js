import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'
import { Row,Col,Icon,message} from 'antd'
import { FileList } from '../../../components'
import wordExport from '../../../utils/wordExport' 
const Detail = ({ knowledgeDetail }) => {
  const { data,orgList } = knowledgeDetail
  
  let defaultFileList=[];
  if(data.attachList&& data.attachList[0]){
    defaultFileList=data.attachList.map((temp)=>{
      return {...temp,uid:temp.id,status:'done',url:temp.attachUrl,name:temp.attachName}
    })
  }
  const getOrgName=(value)=>{
    let n=orgList.filter(item=>String(item.id)===String(value));
    //console.log(orgList,...n,value);
    if(n && n[0]){
      return n[0].orgName;
    }
    return '';
  }
  const handleWordExport=()=>{
    try{
      wordExport(document.getElementById('pagecontent'),data.title?data.title:'淇特知识库'+Date.now())
    }catch(err){
      message.error('导出失败：'+err.toString())
    }
  }
  return (
    <div className="content-inner">
      <a href="javascript:window.history.back();" className="q-goback">
        <Icon type="close-circle-o" />
      </a>
      <Row gutter={24} className={styles['q-detail']}>
        <Col span={24} className='qite-list-title'>
            <Icon type="credit-card" />知识点信息
        </Col>
        <Col md={5} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>知识点主题：</Col>
        <Col md={7} xl={3} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>{data.title}</Col>
        <Col md={5} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>知识点对象：</Col>
        <Col md={7} xl={3} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>{getOrgName(data.toId)}</Col>
        <Col md={5} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>知识点有效期：</Col>
        <Col md={7} xl={4} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>{data.effectiveTimeStr || '2118-12-01 16:19:14'}</Col>
        <Col md={5} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>创建时间：</Col>
        <Col md={7} xl={4} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>{data.createTimeStr}</Col>
      </Row>
      <Row gutter={24} className={styles['q-detail']}>
         <Col span={24} className='qite-list-title'>
          <Icon type="credit-card" />知识点内容
        </Col>
        <Col span={24} style={{paddingLeft:'12px',paddingRight:'12px'}} className={styles['q-detail-conent']}>
          <div id="pagecontent" className={styles['q-detail-html-conent']} dangerouslySetInnerHTML={{__html: data.content}}></div>
        </Col>
        <Col span={24} >
          <a className="jquery-word-export" onClick={e=>handleWordExport()} >导出为.doc文档</a>
        </Col>
      </Row>
      {
        defaultFileList && defaultFileList[0]?
          <Row gutter={24} className={styles['q-detail']}>
            <Col span={24} className='qite-list-title'>
              <Icon type="paper-clip" />知识点资料
            </Col>
            <Col span={24} style={{paddingLeft:'12px',paddingRight:'12px'}}>
              <FileList fileList={defaultFileList} showRemoveIcon={false}/>
            </Col>
          </Row>
        :null
      }
    </div>)
}

Detail.propTypes = {
  knowledgeDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ knowledgeDetail, loading }) => ({ knowledgeDetail, loading: loading.models.knowledgeDetail }))(Detail)
