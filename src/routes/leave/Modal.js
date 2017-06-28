import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input,Radio, InputNumber,Modal,Row,Col,DatePicker,Button,Icon,Affix } from 'antd'
import moment from 'moment';
import config from '../../utils/config'
import { FileUpload } from '../../components'
import uploadImageCallBack from '../../services/uploadImageCallBack'
import styles from './Modal.less'

const confirm = Modal.confirm
const { RangePicker } = DatePicker
const RadioGroup = Radio.Group;
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
const textareaStyle = {
  minHeight: 496,
  width: '100%',
  background: '#f7f7f7',
  borderColor: '#F1F1F1',
  padding: '16px 8px',
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
  defaultFileList=[{
      uid:'-1',
      status:'done',
      name:'安全窗大样图.jpg',
      url:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }],
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
      data.leaveTimeStartStr=data.leaveTime?data.leaveTime[0].format(dateTimeFormat):null;
      data.leaveTimeEndStr=data.leaveTime?data.leaveTime[1].format(dateTimeFormat):null;
      
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
  let initialLeaveTime = []
  if (item.leaveTimeStartStr) {
    initialLeaveTime[0] = moment(item.leaveTimeStartStr)
  }else if(item.leaveTimeStart){
    initialLeaveTime[0] = moment(item.leaveTimeStart)
  }
  if (item.leaveTimeEndStr) {
    initialLeaveTime[1] = moment(item.leaveTimeEndStr)
  }else if(item.leaveTimeEnd){
    initialLeaveTime[1] = moment(item.leaveTimeEnd)
  }
  const dicRadio=dicList.map(dic=><Radio value={dic.dicValue}>{dic.dicName}</Radio>)
  const handleRadioChange= (e) => {
    //console.log('radio checked', e.target.value,e.target);
    item.type=e.target.value;
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
            <Icon type="credit-card" />请假信息
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
            请假类型：
          </Col>
          <Col xs={18} md={20} xl={14} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem >
              {getFieldDecorator('type', {
                initialValue:item.type===undefined?'1':String(item.type),
                rules: [
                  {
                    required: true,
                   
                  },
                ],
                onChange:handleRadioChange,
              })(<RadioGroup labelInValue>{dicRadio}</RadioGroup>)}
              
            </FormItem>
            {item.type==='7'?
            <FormItem >
              {getFieldDecorator('typeRemark', {
                initialValue:item.typeRemark,
              })(<Input />)}
            </FormItem>
            :null}
          </Col>
         
        </Row>
        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            请假时间：
          </Col>
          <Col xs={12} md={20} xl={14} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem >
              {getFieldDecorator('leaveTime', {
                initialValue:initialLeaveTime,
                rules: [
                  {
                    required: true,
                   
                  },
                ],
              })(<RangePicker showTime format={dateTimeFormat}  style={{width:'400px'}}/>)}
            </FormItem>
            <FormItem>共</FormItem>
            <FormItem >
              {getFieldDecorator('leaveHours', {
                initialValue:item.leaveHours,
                rules: [
                  {
                    required: true,
                   
                  },
                ],
              })(<InputNumber step={0.1} />)}
            </FormItem>
            <FormItem>小时</FormItem>

          </Col>
        </Row>
        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            请假原因：
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
