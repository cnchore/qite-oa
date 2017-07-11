import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input,Radio,Modal,Row,Col,DatePicker,Button,Icon,Affix } from 'antd'
import moment from 'moment';
import config from '../../utils/config'
import { SelectUser } from '../../components'
import MissClockDetailPage from '../../components/MissClockDetailPage'

import styles from './Modal.less'

const confirm = Modal.confirm

const FormItem = Form.Item
const RadioGroup = Radio.Group;
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
  onOk,
  title,
  onCancel,
  confirmLoading,
  employeeList,
  taskData={},
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
  },
  ...modalProps
}) => {
  const dateTimeFormat='YYYY-MM-DD HH:mm:ss'
  const getFields=()=>{
    let data={};
    validateFields((errors) => {
      if (errors) {
        return {}
      }
      data= {...getFieldsValue()}

      data.taskId=taskData.taskId;
      data.busiCode=taskData.busiCode;
      data.busiId=taskData.busiId;
      
      
    })
    return data;
  }
  const handleSubmit=(data)=>{
    
    onOk({...getFields(),auditUserId:data.userId})
       
  }
  const handleOK=()=>{
    onOk({...getFields()});
  }
  let actionRadio=[],isNeedSel=false;
  if(taskData.actionMap && taskData.actionMap[0]){
    actionRadio=Object.keys(taskData.actionMap).map(act=>{
        if(act==='1'){isNeedSel=true}
     return <Radio value={act} key={act}>{ taskData.actionMap[act]}</Radio>
    })
  }
  return (
      <Form layout='horizontal'>
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} style={{display:'flex',justifyContent:'space-between',marginBottom:'24px',paddingBottom:'12px',borderBottom:'1px solid #d9d9d9'}}>
            <div className='qite-title'><Icon type="schedule" />{title}</div>
            
            <Affix target={()=>document.getElementById('layout-main')}>
         
              <div style={{backgroundColor:'#fff'}}>
                { isNeedSel?
                <SelectUser type="button" callBack={handleSubmit}  loading={confirmLoading}/>
                  :
                <Button type="primary" onClick={handleOK} size="large">提交</Button>
                }
                <Button style={{ marginLeft: 12 }}  type="ghost" onClick={onCancel} size="large">取消</Button>
              </div>
            </Affix>

          </Col>
        </Row>
        <MissClockDetailPage data={taskData.busiData} employeeList={employeeList} />
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} className='qite-list-title'>
            <Icon type="edit" />流程办理
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            操&nbsp;&nbsp;&nbsp;&nbsp;作：
          </Col>
          <Col xs={18} md={20} xl={22} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {getFieldDecorator('action', {
                initialValue:null,
                rules: [
                  {
                    required: true,message:'不能为空',
                   
                  },
                ],
                
              })(<RadioGroup>{actionRadio}</RadioGroup>)}
              
            </FormItem>
            
          </Col>
         
        </Row>
        <Row gutter={24} className={styles['q-detail']}>
          
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            审批意见：
          </Col>
          <Col xs={18} md={20} xl={22} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {getFieldDecorator('approvalOpinion', {
                initialValue:'',
                rules: [
                  {
                    required: true,message:'不能为空',
                   
                  },
                ],
                
              })(<Input type="textarea" autosize={{ minRows: 2, maxRows: 5 }} />)}
              
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
