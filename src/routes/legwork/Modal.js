import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input,Radio, InputNumber,Modal,Row,Col,Cascader,DatePicker,Button,Icon,Affix } from 'antd'
import moment from 'moment';
import config from '../../utils/config'
import { FileUpload,SelectUser } from '../../components'
// import uploadImageCallBack from '../../services/uploadImageCallBack'
import styles from './Modal.less'
import city from '../../utils/chinaCity'
import {changeMoneyToChinese} from '../../utils'
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
  onAudit,
  taskData={},
  auditLoading,
  onGoback,
  defaultFileList=[],
  agentObject={},
  setAgent,
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
        fileList.filter(fl=>fl.uid!=='invalid').map((f,index)=>{
          if(f.id) data[`attachList[${index}].id`]=f.id;
          data[`attachList[${index}].attachUrl`]=f.url;
          data[`attachList[${index}].attachName`]=f.name;
        })
      }else if(defaultFileList[0]){
        defaultFileList.filter(fl=>fl.uid!=='invalid').map((f,index)=>{
          if(f.id) data[`attachList[${index}].id`]=f.id;
          data[`attachList[${index}].attachUrl`]=f.url;
          data[`attachList[${index}].attachName`]=f.name;
        })
      }
      data.legworkTimeStartStr=data.legworkTime?data.legworkTime[0].format(dateTimeFormat):null;
      data.legworkTimeEndStr=data.legworkTime?data.legworkTime[1].format(dateTimeFormat):null;
      data.legworkTime=null;
      // data.provinceId=data.destination?data.destination[0]:-1;
      // data.cityId=data.destination?data.destination[1]:-1;
      // data.areaId=data.destination?data.destination[2]:-1;
      // data.province=item.province;
      // data.city=item.city;
      // data.area=item.area;
      //console.log('-----',data)
      data.agentUserName= agentObject.agentUserName && agentObject.agentUserName || item.agentUserName;
      data.agentUserId= agentObject.agentUserId && agentObject.agentUserId || item.agentUserId;

      if(item.id){
        data.id=item.id;
        data.code=item.code;
        data.state=item.state;
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
          fields.isupdated=true;
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
        title:item.state===-2?'你确定取消任务代理么？':'你确定提交修改么？',
        onOk(){
            onAudit(formItem,taskItem)
        },
      })
    }
  }
  const actionRadio=taskData.actionMap?Object.keys(taskData.actionMap).map(act=><Radio value={act} key={act}>{taskData.actionMap[act]}</Radio>):null;
  
  let initialLegworkTime = []
  if (item.legworkTimeStartStr) {
    initialLegworkTime[0] = moment(item.legworkTimeStartStr)
  }else if(item.legworkTimeStart){
    initialLegworkTime[0] = moment(item.legworkTimeStart)
  }
  if (item.legworkTimeEndStr) {
    initialLegworkTime[1] = moment(item.legworkTimeEndStr)
  }else if(item.legworkTimeEnd){
    initialLegworkTime[1] = moment(item.legworkTimeEnd)
  }
  // let initialDestination=[]
  // if(item.provinceId){
  //   initialDestination[0]=item.provinceId;
  // }
  // if(item.cityId){
  //   initialDestination[1]=item.cityId;
  // }
  // if(item.areaId){
  //   initialDestination[2]=item.areaId;
  // }
  // const dicRadio=dicList.map(dic=><Radio key={dic.id} value={dic.dicValue}>{dic.dicName}</Radio>)
  const handleRadioChange= (e) => {
    //console.log('radio checked', e.target.value,e.target);
    item.tripMode=e.target.value;
  }
  const handleMealAllowanceChange= (value) => {
    item.mealAllowance=value;
  }
  const getHours=(t=null)=>{
    const data = {...getFieldsValue()}
    let a=data.legworkTime?(data.legworkTime[0]?data.legworkTime[0].format(dateTimeFormat):null):null;
    let b=data.legworkTime?(data.legworkTime[1]?data.legworkTime[1].format(dateTimeFormat):null):null;
    
    if(!a||!b){
      return 0;
    }
    let timeA=new Date(a);
    let timeB=new Date(b);
    return ((timeB-timeA)/(3600*1000)).toFixed(2)
  }
  
  // const destinationChange=(value,selectedOptions)=>{
  //   //console.log('destinationChange:',value,selectedOptions)
  //   item.province=selectedOptions[0].label;
  //   item.city=selectedOptions[1].label;
  //   item.area=selectedOptions[2].label;
  // }
  const handleAgent=(data)=>{
    if(data && data.userId){
      setAgent({agentUserId:data.userId,agentUserName:data.realName})
    }
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
                  onClick={handleAudit} size="large">{item.state===-2?'确定取消任务代理':'确定修改并提交'}</Button>
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
            <Icon type="credit-card" />外勤申请信息
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
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {item.createTime || item.createTimeStr || '系统自动生成'}
            </FormItem>
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            任务代理人：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem >
                {agentObject.agentUserName && agentObject.agentUserName || item.agentUserName}
            </FormItem>
            {
              taskData && taskData.taskId && item.state!==-1?
              null:
              <FormItem >
                <SelectUser type="selectAgent" callBack={handleAgent} ></SelectUser>
              </FormItem>
            }
          </Col>
        </Row>
        
        
        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label-require']}>
            出勤时间：
          </Col>
          <Col xs={18} md={8} xl={12} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem style={{width:'100%'}}>
              {getFieldDecorator('legworkTime', {
                initialValue:initialLegworkTime,
                rules: [
                  {
                    required: true,message:'不能为空',
                   
                  },
                ],
              })(<RangePicker disabled={taskData && taskData.taskId && item.state!==-1} showTime format={dateTimeFormat}  style={{width:'100%'}}/>)}
            </FormItem>
           
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label-require']}>
            共：
          </Col>
          <Col xs={18} md={8} xl={8} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem>
              {getFieldDecorator('legworkHours', {
                initialValue:item.legworkHours,
                rules: [
                  {
                    required: true,message:'不能为空',
                   
                  },
                ],
              })(<InputNumber disabled={taskData && taskData.taskId && item.state!==-1} step={1} />)}
            </FormItem>
            <FormItem>小时</FormItem>
          </Col>
        </Row>
       
        <Row gutter={24} className={styles['q-detail']}>
          
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' ,paddingLeft:'0px'}} className={styles['q-detail-label-require']}>
           出勤地址：
          </Col>
          <Col xs={18} md={20} xl={22} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
          
            <FormItem style={{width:'100%'}}>
              {getFieldDecorator('address', {
                initialValue:item.address,
                rules: [{required: true,message:'不能为空',},],
              })(<Input disabled={taskData && taskData.taskId && item.state!==-1} />)}
            </FormItem>

          </Col>
        </Row>
        
        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            出勤事由：
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
              })(<Input type="textarea" disabled={taskData && taskData.taskId && item.state!==-1} autosize={{ minRows: 2, maxRows: 5 }} />)}
            </FormItem>
          </Col>
        </Row>
        
       <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            餐费补贴：
          </Col>
          <Col xs={18} md={20} xl={22} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem >
              {getFieldDecorator('mealAllowance', {
                initialValue:(item.mealAllowance===undefined||item.mealAllowance===null)?0:Number(item.mealAllowance),
                rules: [{required: true,message:'不能为空',},],
                onChange:handleMealAllowanceChange,
              })(
                <InputNumber disabled={taskData && taskData.taskId && item.state!==-1}
                  step={1} style={{width:'150px'}}
                  formatter={value => `¥ ${value?value.toString().replace(/¥\s?|(,*)/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ','):0}`}
                  parser={value => value?value.toString().replace(/¥\s?|(,*)/g, ''):0}
                />
              )}
            </FormItem>
            {item.mealAllowance?
            <FormItem >
              大写：{changeMoneyToChinese(item.mealAllowance)}
            </FormItem>
            :null}
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
        {
          taskData&&taskData.commentList?
            <CommentTable data={taskData.commentList} />
          :null
        }
        {taskData && taskData.taskId && item.state!==-1?
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
