import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input,Modal,Row,Col,Button,Icon,Affix } from 'antd'
//import moment from 'moment';
import config from '../../utils/config'
import { FileUpload } from '../../components'
import uploadImageCallBack from '../../services/uploadImageCallBack'
import styles from './Modal.less'
//import city from '../../utils/chinaCity'
import {changeMoneyToChinese} from '../../utils'
import EditCellTable from './EditCellTable'

const confirm = Modal.confirm
//const { RangePicker } = DatePicker
//const RadioGroup = Radio.Group;
const FormItem = Form.Item
//const Option =Select.Option;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: {
    span: 12,
  },
}

const twoFormItemLayout = {
  labelCol: { 
    xs: { span: 12 },
    md: { span: 4 }, 
    xl: { span: 3},
  },
  
}

const modal = ({
  item = {},
  onOk,
  title,
  onCancel,
  fileList,//附件列表
  dicList,
  detailList,//费用详情列表
  getDetailList,//获取费用明细的方法
  getFileList,//获取附件的方法
  confirmLoading,
  submitLoading,
  onSubmit,
  employeeList,
  defaultFileList=[],//附件控件prop
  defaultDetailList=[],//行编辑表格控件datasource
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
  },
  ...modalProps
}) => {
  const dateTimeFormat='YYYY-MM-DD HH:mm:ss'

  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {...getFieldsValue()}
      if(fileList && fileList.length>0){
        fileList.map((f,index)=>{
          if(f.id) data[`attachList[${index}].id`]=f.id;
          data[`attachList[${index}].attachUrl`]=f.url;
          data[`attachList[${index}].attachName`]=f.name;
        })
      }else if(defaultFileList[0]){
        defaultFileList.map((f,index)=>{
          if(f.id) data[`attachList[${index}].id`]=f.id;
          data[`attachList[${index}].attachUrl`]=f.url;
          data[`attachList[${index}].attachName`]=f.name;
        })
      }
      if(detailList && detailList.length>0){
        detailList.map((f,index)=>{
          if(f.id) data[`detailList[${index}].id`]=f.id;
          data[`detailList[${index}].orgName`]=f.orgName.value;
          data[`detailList[${index}].supplier`]=f.supplier.value;
          data[`detailList[${index}].content`]=f.content.value;
          data[`detailList[${index}].amount`]=f.amount.value;
          data[`detailList[${index}].remark`]=f.remark.value;
          data[`detailList[${index}].payTimeStr`]=f.payTimeStr.value;
           
        })
      }else if(defaultDetailList[0]){
        defaultDetailList.map((f,index)=>{
          if(f.id) data[`detailList[${index}].id`]=f.id;
          data[`detailList[${index}].orgName`]=f.orgName.value;
          data[`detailList[${index}].supplier`]=f.supplier.value;
          data[`detailList[${index}].content`]=f.content.value;
          data[`detailList[${index}].amount`]=f.amount.value;
          data[`detailList[${index}].remark`]=f.remark.value;
          data[`detailList[${index}].payTimeStr`]=f.payTimeStr.value;
        })
      }
      
      if(item.id){
        data.id=item.id
      }
      //console.log('--travelIds---',data);

      onOk(data)
    })
  }
  if(item.attachList&& item.attachList[0]){
    defaultFileList=item.attachList.map((temp)=>{
      return {...temp,uid:temp.id,status:'done',url:temp.attachUrl,name:temp.attachName}
    })
  }else{
    defaultFileList=[];
  }
  if(item.detailList && item.detailList[0]){
    defaultDetailList=item.detailList.map(temp=>{
      let newRow={
        key: temp.id,
        id:temp.id,
        orgName: {
          editable: false,
          value: temp.orgName?temp.orgName:'',
        },
        supplier: {
          editable: false,
          value: temp.supplier?temp.supplier:'',
        },
        content: {
          editable:false,
          value: temp.content?temp.content:'',
        },
        amount: {
          editable:false,
          value: temp.amount!==null&&temp.amount!==undefined?temp.amount:0,
        },
        payTimeStr: {
          editable:false,
          value: temp.payTime?temp.payTime:'',
        },
        remark: {
          editable:false,
          value: temp.remark,
        },
        
      }
      return newRow;
    })
  }else{
    defaultDetailList=[];
  }
  const handleSubmit=()=>{
    confirm({
        title: `你确定提交申请么?`,
        onOk () {
          onSubmit(item.id,'')
        },
      })
  }
  
  
  
  return (
      <Form layout='horizontal' onSubmit={handleOk}>
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} style={{display:'flex',justifyContent:'space-between',marginBottom:'24px',paddingBottom:'12px',borderBottom:'1px solid #d9d9d9'}}>
            <div className='qite-title'>
            <Icon type={item.id?'edit':'plus'} />{title}</div>
           
            <Affix target={()=>document.getElementById('layout-main')}>
         
              <div style={{backgroundColor:'#fff'}}>
                {item.id?<Button  type="primary" onClick={handleSubmit} size="large" loading={submitLoading}>提交</Button>:null}
                <Button style={{ marginLeft: 12,marginRight: 12 }} type="primary" loading={confirmLoading} onClick={handleOk} size="large">确定</Button>
                <Button  type="ghost" onClick={onCancel} size="large">取消</Button>
              </div>
            </Affix>

          </Col>
          <Col span={24} className='qite-list-title'>
            <Icon type="credit-card" />预算申请信息
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            姓名：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {employeeList.realName || '无'}
            </FormItem>
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            部门：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem>
              {employeeList.postList[0].orgName || '无'}
            </FormItem>
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            岗位：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {employeeList.postList[0].postName || '无'}
            </FormItem>
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            申请单号：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {item.code || '无'}
            </FormItem>
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            申请时间：
          </Col>
          <Col xs={18} md={8} xl={14} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {item.createTime || item.createTimeStr || '无'}
            </FormItem>
          </Col>
        </Row>
        
        
        <EditCellTable dicList={dicList} 
          dataSource={defaultDetailList} 
          callbackParent={getDetailList}
          className={styles['q-detail']}/> 
         
        <Row gutter={24} className={styles['q-detail']}>

          <Col span={24} className='qite-list-title'>
            <Icon type="paper-clip" />申请附件
          </Col>
          <Col span={24}>
            <FormItem >
              <FileUpload defaultFileList={defaultFileList} callbackParent={getFileList} />      
            </FormItem>    
          </Col>
          
        </Row>

      </Form>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
