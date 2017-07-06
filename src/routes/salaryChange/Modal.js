import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber,Modal,Row,Col,Button,Icon,Affix } from 'antd'
import moment from 'moment';
import config from '../../utils/config'
import { FileUpload } from '../../components'
import uploadImageCallBack from '../../services/uploadImageCallBack'
import styles from './Modal.less'
//import city from '../../utils/chinaCity'
import {changeMoneyToChinese} from '../../utils'
import templateUrl from '../../../assets/template/调薪申请表.xlsx'

const confirm = Modal.confirm
//const { RangePicker } = DatePicker
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
 
 
  
  return (
      <Form layout='horizontal' onSubmit={handleOk}>
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} style={{display:'flex',justifyContent:'space-between',marginBottom:'24px',paddingBottom:'12px',borderBottom:'1px solid #d9d9d9'}}>
            <div className='qite-title'>
            <Icon type={item.id?'edit':'plus'} />{title}</div>
           
            <Affix target={()=>document.getElementById('layout-main')}>
         
              <div style={{backgroundColor:'#fff'}}>
                <a href={templateUrl} target="_blank">调薪申请表[模版下载]</a>
                {item.id?<Button style={{ marginLeft: 12}}  type="primary" onClick={handleSubmit} size="large" loading={submitLoading}>提交</Button>:null}
                <Button style={{ marginLeft: 12,marginRight: 12 }} type="primary" loading={confirmLoading} onClick={handleOk} size="large">确定</Button>
                <Button  type="ghost" onClick={onCancel} size="large">取消</Button>
              </div>
            </Affix>

          </Col>
          <Col span={24} className='qite-list-title'>
            <Icon type="credit-card" />调薪申请信息
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
            性别：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {employeeList.sex?'男':'女'}
            </FormItem>
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            入职时间：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {employeeList.inductionTime || '无'}
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
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {item.createTime || item.createTimeStr || '无'}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            原部门：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem style={{width:'100%'}} >
              {getFieldDecorator('originalDept', {
                initialValue:item.originalDept || employeeList.postList[0].orgName,
                
              })(<Input style={{width:'100%'}}/>)}
              
            </FormItem>
            
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            原岗位：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem style={{width:'100%'}} >
              {getFieldDecorator('originalPost', {
                initialValue:item.originalPost || employeeList.postList[0].postName, 
                
              })(<Input style={{width:'100%'}}/>)}
              
            </FormItem>
            
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            原总工资：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem style={{width:'100%'}} >
              {getFieldDecorator('originalSalary', {
                initialValue:(item.originalSalary===undefined||item.originalSalary===null)?0:Number(item.originalSalary),
                rules: [
                  {
                    required: true,
                   
                  },
                ],
                
              })(
                <InputNumber
                  step={0.01} style={{width:'100%'}}
                  formatter={value => `¥ ${value?value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):'0.00'}`}
                  parser={value => value?value.toString().replace(/\¥\s?|(,*)/g, ''):0}
                  
                />
              )}
            </FormItem>
            
          </Col>
         
        </Row>
        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            现部门：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem style={{width:'100%'}} >
              {getFieldDecorator('curDept', {
                initialValue:item.curDept,
                
              })(<Input style={{width:'100%'}}/>)}
              
            </FormItem>
            
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            现岗位：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem style={{width:'100%'}} >
              {getFieldDecorator('curPost', {
                initialValue:item.curPost,
                
              })(<Input style={{width:'100%'}}/>)}
              
            </FormItem>
            
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            期望总工资：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem style={{width:'100%'}} >
              {getFieldDecorator('expectedSalary', {
                initialValue:(item.expectedSalary===undefined||item.expectedSalary===null)?0:Number(item.expectedSalary),
                rules: [
                  {
                    required: true,
                   
                  },
                ],
                
              })(
                <InputNumber
                  step={0.01} style={{width:'100%'}}
                  formatter={value => `¥ ${value?value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):'0.00'}`}
                  parser={value => value?value.toString().replace(/\¥\s?|(,*)/g, ''):0}
                  
                />
              )}
            </FormItem>
            
          </Col>
         
        </Row>
      
        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            调薪说明：
          </Col>
          <Col xs={18} md={20} xl={22} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {getFieldDecorator('remark', {
                initialValue: item.remark,
                rules: [
                  {
                    required: true,
                   
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
