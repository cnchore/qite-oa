import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input,Radio, InputNumber,Modal,Row,Col,DatePicker,Button,Icon,Affix } from 'antd'
import moment from 'moment';
import config from '../../utils/config'
import { FileUpload,SelectUser } from '../../components'
import uploadImageCallBack from '../../services/uploadImageCallBack'
import styles from './Modal.less'
import CommentTable from '../../components/CommentTable'
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
  onAudit,
  taskData={},
  auditLoading,
  onGoback,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    getFieldsValue,
    setFieldsValue,
  },
  ...modalProps
}) => {
  const dateTimeFormat='YYYY-MM-DD HH:mm:ss'

  const getFields = () => {
    let data=null;
    validateFieldsAndScroll((err,values) => {
      if (err) {
        return null;
      }
      data = {...values}
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
      if(data.overTime){
      data.overTimeStartStr=data.overTime?data.overTime[0].format(dateTimeFormat):null;
      data.overTimeEndStr=data.overTime?data.overTime[1].format(dateTimeFormat):null;
      }
      if(data.realOverTime){
      data.realOverTimeStartStr=data.realOverTime?data.realOverTime[0].format(dateTimeFormat):null;
      data.realOverTimeEndStr=data.realOverTime?data.realOverTime[1].format(dateTimeFormat):null;
      }
      data.overTime=null;
      data.realOverTime=null;
      if(item.id){
        data.id=item.id;
        data.code=item.code;
      }
    })
    return data;
  }
  const handleOk = () => {
    let fields=getFields();
    if(fields){
      onOk(fields)
    }
  }
  if(fileList[0]){
    defaultFileList=fileList.map((temp)=>{
      if(temp.createTime)
        return {...temp,uid:temp.id,status:'done',url:temp.attachUrl,name:temp.attachName}
      return {...temp}
    })
  }else if(item.attachList&& item.attachList[0]){
    defaultFileList=item.attachList.map((temp)=>{
      return {...temp,uid:temp.id,status:'done',url:temp.attachUrl,name:temp.attachName}
    })
  }else{
    defaultFileList=[];
  }

  const handleSubmit=(data)=>{
    confirm({
        title: `你确定提交申请么?`,
        onOk () {
          let fields=getFields();
          if(fields){
            onSubmit(fields,data)
          }
        },
      })
  }
  const handleAudit=()=>{
    let taskItem={},formItem=getFields();
    if(formItem){
      taskItem.taskId=taskData.taskId;
      taskItem.busiId=taskData.busiId;
      taskItem.busiCode=taskData.busiCode;
      taskItem.action=formItem.action;
      // console.log('formItem')
      confirm({
        title:'你确定提交修改么？',
        onOk(){
            onAudit(formItem,taskItem)
        },
      })
    }
  }
  const actionRadio=taskData.actionMap?Object.keys(taskData.actionMap).map(act=><Radio value={act} key={act}>{taskData.actionMap[act]}</Radio>):null;

  let initialOverTime = []
  if (item.overTimeStartStr) {
    initialOverTime[0] = moment(item.overTimeStartStr)
  }else if(item.overTimeStart){
    initialOverTime[0] = moment(item.overTimeStart)
  }
  if (item.overTimeEndStr) {
    initialOverTime[1] = moment(item.overTimeEndStr)
  }else if(item.overTimeEnd){
    initialOverTime[1] = moment(item.overTimeEnd)
  }
  let initialRealOverTime = []
  if (item.realOverTimeStartStr) {
    initialRealOverTime[0] = moment(item.realOverTimeStartStr)
  }else if(item.realOverTimeStart){
    initialRealOverTime[0] = moment(item.realOverTimeStart)
  }
  if (item.realOverTimeEndStr) {
    initialRealOverTime[1] = moment(item.realOverTimeEndStr)
  }else if(item.realOverTimeEnd){
    initialRealOverTime[1] = moment(item.realOverTimeEnd)
  }
  const dicRadio=dicList.map(dic=><Radio value={dic.dicValue} key={dic.id}>{dic.dicName}</Radio>)
  const handleRadioChange= (e) => {
    //console.log('radio checked', e.target.value,e.target);
    item.times=e.target.value;
  }
  const handleTypeChange= (e) => {
    item.type=e.target.value;
  }
  const getHours=(t=null)=>{
    const data = {...getFieldsValue()}
    let a=data.overTime?(data.overTime[0]?data.overTime[0].format(dateTimeFormat):null):null;
    let b=data.overTime?(data.overTime[1]?data.overTime[1].format(dateTimeFormat):null):null;
    if(t){
    a=data.realOverTime?(data.realOverTime[0]?data.realOverTime[0].format(dateTimeFormat):null):null;
    b=data.realOverTime?(data.realOverTime[1]?data.realOverTime[1].format(dateTimeFormat):null):null;
    }
    if(!a||!b){
      return 0;
    }
    let timeA=new Date(a);
    let timeB=new Date(b);
    return ((timeB-timeA)/(3600*1000)).toFixed(2)
  }
  return (
      <Form layout='horizontal' onSubmit={handleOk}>
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} style={{display:'flex',justifyContent:'space-between',marginBottom:'24px',paddingBottom:'12px',borderBottom:'1px solid #d9d9d9'}}>
            <div className='qite-title'>
            <Icon type={item.id?'edit':'plus'} />{title}</div>
           
            <Affix target={()=>document.getElementById('layout-main')}>
                {taskData && taskData.taskId?(
                  <div style={{backgroundColor:'#fff'}}>
                    <Button style={{ marginRight: 12 }} type="primary" loading={auditLoading} 
                    onClick={handleAudit} size="large">确定修改并提交</Button>
                    <Button  type="ghost" onClick={onGoback} size="large">返回待办</Button>
                  </div>
                  ):(
                  <div style={{backgroundColor:'#fff'}}>
                    <SelectUser type="button" callBack={handleSubmit}  loading={submitLoading}>提交</SelectUser>
                    <Button style={{ marginLeft: 12,marginRight: 12 }} type="primary" loading={confirmLoading} onClick={handleOk} size="large">暂存</Button>
                    <Button  type="ghost" onClick={onCancel} size="large">取消</Button>
                  </div>)
                }
            </Affix>

          </Col>
          <Col span={24} className='qite-list-title'>
            <Icon type="credit-card" />加班申请信息
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
              {item.code || '系统自动生成'}
            </FormItem>
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            申请时间：
          </Col>
          <Col xs={18} md={8} xl={14} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {item.createTime || item.createTimeStr || '系统自动生成'}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            加班类型：
          </Col>
          <Col xs={18} md={20} xl={14} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem >
              {getFieldDecorator('type', {
                initialValue:item.type===undefined?'申请加班':String(item.type),
                rules: [
                  {
                    required: true,message:'不能为空',
                   
                  },
                ],
                onChange:handleTypeChange,
              })(<RadioGroup >
                  <Radio value='申请加班'>申请加班</Radio>
                  <Radio value='补报加班'>补报加班</Radio>
                </RadioGroup>)}
              
            </FormItem>
            
          </Col>
         
        </Row>
        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            加班时段：
          </Col>
          <Col xs={18} md={20} xl={14} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem >
              {getFieldDecorator('times', {
                initialValue:item.times===undefined?'1':String(item.times),
                rules: [
                  {
                    required: true,message:'不能为空',
                   
                  },
                ],
                onChange:handleRadioChange,
              })(<RadioGroup labelInValue>{dicRadio}</RadioGroup>)}
              
            </FormItem>
            {item.times==='4'?
            <FormItem >
              {getFieldDecorator('timesRemark', {
                initialValue:item.timesRemark,
              })(<Input />)}
            </FormItem>
            :null}
          </Col>
         
        </Row>
        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label-require']}>
            申请加班时间：
          </Col>
          <Col xs={12} md={20} xl={14} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem >
              {getFieldDecorator('overTime', {
                initialValue:initialOverTime,
                rules: [
                  {
                    required: true,message:'不能为空',
                   
                  },
                ],
              })(<RangePicker showTime format={dateTimeFormat}  style={{width:'400px'}}/>)}
            </FormItem>
            <FormItem> 共 {getHours()} 小时</FormItem>

          </Col>
        </Row>
        {item.type==='补报加班'?
        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' ,paddingLeft:'0px'}} className={styles['q-detail-label-require']}>
            实际加班时间：
          </Col>
          <Col xs={12} md={20} xl={14} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem >
              {getFieldDecorator('realOverTime', {
                initialValue:initialRealOverTime,
                rules: [
                  {
                    required: true,message:'不能为空',
                   
                  },
                ],
              })(<RangePicker showTime format={dateTimeFormat}  style={{width:'400px'}}/>)}
            </FormItem>
            <FormItem> 共 {getHours(1)} 小时</FormItem>

          </Col>
        </Row>
        :null}
        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            加班原因：
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
        <Row gutter={12} className={styles['q-detail']} style={{marginLeft:'2px',marginRight:'2px'}}>
        <blockquote>
          <p>
            备注：<br/>
            1、请在加班前填写此单，审批结束后交到考勤专员处备案。<br/>
            2、当值人为：考勤专员根据考勤机所记录加班后打卡时间或保安记录离开时间，实际加班时间以当值人员记录为准
          </p>
        </blockquote>
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
        {
          taskData&&taskData.commentList?
              <CommentTable data={taskData.commentList} />
            :null
          }
          {taskData && taskData.taskId?
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
                    rules: [{required: true,message:'不能为空',},],
                  })(<RadioGroup>{actionRadio}</RadioGroup>)}
                </FormItem>
              </Col>
            </Row>
          :null}
      </Form>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
