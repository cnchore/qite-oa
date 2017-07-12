import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber,Modal,Row,Col,DatePicker,Button,Icon,Affix } from 'antd'
import moment from 'moment';
import config from '../../utils/config'
import { FileUpload } from '../../components'
import uploadImageCallBack from '../../services/uploadImageCallBack'
import styles from './Modal.less'
//import city from '../../utils/chinaCity'
import {changeMoneyToChinese} from '../../utils'

const confirm = Modal.confirm
const { RangePicker } = DatePicker
//const RadioGroup = Radio.Group;
const FormItem = Form.Item

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
  fileList,
  dicList,
  getFileList,
  confirmLoading,
  submitLoading,
  onSubmit,
  employeeList,
  defaultFileList=[],
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
  },
  ...modalProps
}) => {
  const dateTimeFormat='YYYY-MM-DD'

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
      data.signDateStr=data.signDateStr?data.signDateStr.format(dateTimeFormat):null;
      data.effectDateStr=data.effectDateStr?data.effectDateStr.format(dateTimeFormat):null;
      
      
      //console.log('-----',data)
      if(item.id){
        data.id=item.id
      }
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

  const handleSubmit=()=>{
    confirm({
        title: `你确定提交申请么?`,
        onOk () {
          onSubmit(item.id,'')
        },
      })
  }
 
  const handleChange=(value)=>{
    item.contractAmount=value;
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
            <Icon type="credit-card" />合同申请信息
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
        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            合同名称：
          </Col>
          <Col xs={18} md={8} xl={10} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem style={{width:'100%'}} >
              {getFieldDecorator('contractName', {
                initialValue:item.contractName,
                rules: [
                  {
                    required: true,message:'不能为空',
                   
                  },
                ],
              })(<Input style={{width:'100%'}}/>)}
              
            </FormItem>
            
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            合同编码：
          </Col>
          <Col xs={18} md={8} xl={10} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem style={{width:'100%'}} >
              {getFieldDecorator('contractCode', {
                initialValue:item.contractCode,
                rules: [
                  {
                    required: true,message:'不能为空',
                   
                  },
                ],
              })(<Input style={{width:'100%'}}/>)}
              
            </FormItem>
            
          </Col>
         
        </Row>
        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            甲方：
          </Col>
          <Col xs={18} md={8} xl={10} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem style={{width:'100%'}} >
              {getFieldDecorator('firstParty', {
                initialValue:item.firstParty,
                rules: [
                  {
                    required: true,message:'不能为空',
                   
                  },
                ],
              })(<Input style={{width:'100%'}}/>)}
              
            </FormItem>
            
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            乙方：
          </Col>
          <Col xs={18} md={8} xl={10} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem style={{width:'100%'}} >
              {getFieldDecorator('secondParty', {
                initialValue:item.secondParty,
                rules: [
                  {
                    required: true,message:'不能为空',
                   
                  },
                ],
              })(<Input style={{width:'100%'}}/>)}
              
            </FormItem>
            
          </Col>
         
        </Row>
        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            合同金额：
          </Col>
          <Col xs={18} md={20} xl={22} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem  >
              {getFieldDecorator('contractAmount', {
                initialValue:(item.contractAmount===undefined||item.contractAmount===null)?0:Number(item.contractAmount),
                rules: [
                  {
                    required: true,message:'不能为空',
                   
                  },
                ],
                onChange:handleChange,
              })(
                <InputNumber
                  precision={2} style={{width:'120px'}}
                  formatter={value =>`¥ ${value?value.toString().replace(/¥\s?|(,*)/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ','):'0.00'}`}
                  parser={value => value?value.toString().replace(/¥\s?|(,*)/g, ''):0}
                  
                />
              )}
              
            </FormItem>
            
            <FormItem >
              大写：{changeMoneyToChinese(item.contractAmount)}
              
            </FormItem>
            
         
          </Col>
        </Row>
        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            签订日期：
          </Col>
          <Col xs={18} md={8} xl={10} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem style={{width:'100%'}} >
              {getFieldDecorator('signDateStr', {
                initialValue:item.signDate!==undefined && item.signDate!==null?moment(item.signDate,dateTimeFormat):null,
                rules: [
                  {
                    required: true,message:'不能为空',
                   
                  },
                ],
              })(<DatePicker format={dateTimeFormat}  style={{width:'100%'}}/>)}
              
            </FormItem>
            
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            生效日期：
          </Col>
          <Col xs={18} md={8} xl={10} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem style={{width:'100%'}} >
              {getFieldDecorator('effectDateStr', {
                initialValue:item.effectDate!==undefined && item.effectDate!==null?moment(item.effectDate,dateTimeFormat):null,
                rules: [
                  {
                    required: true,message:'不能为空',
                   
                  },
                ],
              })(<DatePicker format={dateTimeFormat}  style={{width:'100%'}}/>)}
              
            </FormItem>
            
          </Col>
         
        </Row>
      
        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            合同说明：
          </Col>
          <Col xs={18} md={20} xl={22} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {getFieldDecorator('remark', {
                initialValue: item.remark,
                rules: [
                  {
                    required: true,message:'不能为空',
                   
                  },
                ],
              })(<Input type="textarea" autosize={{ minRows: 2, maxRows: 5 }} />)}
            </FormItem>
          </Col>
        </Row>
     
    
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