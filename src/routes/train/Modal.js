import React from 'react'
import PropTypes from 'prop-types'
import { Form, Radio,Input,Modal,Row,Col,Button,Icon,Affix,message,DatePicker,InputNumber,Checkbox } from 'antd'
import moment from 'moment';
import config from '../../utils/config'
// import uploadImageCallBack from '../../services/uploadImageCallBack'
import styles from './Modal.less'
//import city from '../../utils/chinaCity'
// import {changeMoneyToChinese} from '../../utils'
import EditCellTable from './EditCellTable'
import CommentTable from '../../components/CommentTable'
import { FileUpload } from '../../components'

const confirm = Modal.confirm
//const { RangePicker } = DatePicker
const RadioGroup = Radio.Group;
const FormItem = Form.Item
//const Option =Select.Option;
const CheckboxGroup = Checkbox.Group;

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
  onAudit,
  taskData={},
  auditLoading,
  onGoback,
  isEditable,
  setIsEditable,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    getFieldsValue,
    setFieldsValue,
  },
  ...modalProps
}) => {
  const dateTimeFormat='YYYY-MM-DD HH:mm:ss';
  const taskDefinitionKey=taskData.taskVo && taskData.taskVo.taskDefinitionKey || null;
  const _use=taskDefinitionKey?taskDefinitionKey.split('_')[0]:'';
  const isTrainer=_use==='trainer'?true:false;
  const getFields = () => {
    let data=null;
    validateFieldsAndScroll({scroll:{offsetBottom:30}},(err,values) => {
      if (err) {
        return null;
      }
      if(isEditable){
        message.warning('请先保存明细');
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
      let _defaultDetailList=[];
      if(detailList && detailList.length>0){
        _defaultDetailList=detailList;
      }else if(defaultDetailList[0]){
        _defaultDetailList=defaultDetailList;
      }
      _defaultDetailList.map((f,index)=>{
        if(f.id) data[`detailList[${index}].id`]=f.id;
        data[`detailList[${index}].lecturerFee`]=f.lecturerFee.value;
        data[`detailList[${index}].toolFee`]=f.toolFee.value;
        data[`detailList[${index}].trafficFee`]=f.trafficFee.value;
        data[`detailList[${index}].mealsFee`]=f.mealsFee.value;
        data[`detailList[${index}].hotelFee`]=f.hotelFee.value;
        data[`detailList[${index}].otherFee`]=f.otherFee.value;
      })
      data.trainTimeStr=data.trainTimeStr?data.trainTimeStr.format(dateTimeFormat):null;
      if(data.evalWay){
        data.evalWay=data.evalWay.join();
      }
      if(item.id){
        data.id=item.id;
        data.code=item.code;
      }
      //console.log('--travelIds---',data);
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
  if(detailList && detailList[0]){
    defaultDetailList=detailList;
  }else if(item.detailList && item.detailList[0]){
    defaultDetailList=item.detailList.map(temp=>{
      let newRow={
        key: temp.id,
        id:temp.id,
        lecturerFee:{
          editable:false,
          value:temp.lecturerFee || 0,
        },
        toolFee:{
          editable:false,
          value:temp.toolFee || 0,
        },
        trafficFee:{
          editable:false,
          value:temp.trafficFee || 0,
        },
        mealsFee:{
          editable:false,
          value:temp.mealsFee || 0,
        },
        hotelFee:{
          editable:false,
          value:temp.hotelFee || 0,
        },
        otherFee:{
          editable:false,
          value:temp.otherFee || 0,
        },
        
      }
      return newRow;
    })
  }else{
    defaultDetailList=[];
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
        title:'你确定提交修改么？',
        onOk(){
            onAudit(formItem,taskItem)
        },
      })
    }
  }
  const actionRadio=taskData.actionMap?Object.keys(taskData.actionMap).map(act=><Radio value={act} key={act}>{taskData.actionMap[act]}</Radio>):null;
  const evalWayOptions=['考试方式','内部分享','制定实施计划并执行'];
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
                    <Button type="primary" loading={submitLoading} onClick={e=>handleSubmit({userId:-1})} size="large">提交</Button>
                    <Button style={{ marginLeft: 12,marginRight: 12 }} type="primary" loading={confirmLoading} onClick={handleOk} size="large">暂存</Button>
                    <Button  type="ghost" onClick={onCancel} size="large">取消</Button>
                  </div>)
                }
            </Affix>

          </Col>
          <Col span={24} className='qite-list-title'>
            <Icon type="credit-card" />培训申请信息
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            姓名：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {employeeList.realName || '无'}
            </FormItem>
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            部门：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem>
              {employeeList.postList[0].orgName || '无'}
            </FormItem>
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            岗位：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {employeeList.postList[0].postName || '无'}
            </FormItem>
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            申请单号：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {item.code || '系统自动生成'}
            </FormItem>
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            申请时间：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {item.createTime || item.createTimeStr || '系统自动生成'}
            </FormItem>
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            培训项目名称：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {getFieldDecorator('projectName', {
                initialValue: item.projectName,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            培训目的：
          </Col>
          <Col xs={18} md={20} xl={21} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {getFieldDecorator('purpose', {
                initialValue: item.purpose,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<Input type="textarea" autosize={{ minRows: 2, maxRows: 5 }} />)}
            </FormItem>
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            培训时间：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {getFieldDecorator('trainTimeStr', {
                initialValue:(item.trainTimeStr || item.trainTime)? moment(item.trainTimeStr || item.trainTime,dateTimeFormat):null,
                rules: [
                  {
                    required: true,message:'不能为空',
                   
                  },
                ],
              })(<DatePicker showTime format={dateTimeFormat}  style={{width:'100%'}}/>)}
            </FormItem>
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            培训对象：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {getFieldDecorator('trainObj', {
                initialValue: item.trainObj,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            培训方式：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {getFieldDecorator('trainWay', {
                initialValue: item.trainWay,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            培训地点：
          </Col>
          <Col xs={18} md={8} xl={21} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {getFieldDecorator('trainAddress', {
                initialValue: item.trainAddress,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          
          {
            isTrainer?
            <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
              培训提纲：
            </Col>
            :null
          }
          {
            isTrainer?
            <Col xs={18} md={20} xl={21} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
              <FormItem >
                {getFieldDecorator('trainOutline', {
                  initialValue: item.trainOutline,
                  rules: [
                    {
                      required: true,message:'不能为空',
                    },
                  ],
                })(<Input type="textarea" autosize={{ minRows: 2, maxRows: 5 }} />)}
              </FormItem>
            </Col>
            :null
          }
          {
            isTrainer?
            <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
              评估方式：
            </Col>
            :null
          }
          {
            isTrainer?
            <Col xs={18} md={20} xl={21} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
              <FormItem >
                {getFieldDecorator('evalWay', {
                  initialValue: item.evalWay&& !(item.evalWay instanceof Array)?item.evalWay.split(','):null,
                  rules: [
                    {
                      required: true,message:'不能为空',
                    },
                  ],
                })(<CheckboxGroup options={evalWayOptions} />)}
              </FormItem>
            </Col>
            :null
          }
        </Row>
        <EditCellTable dicList={dicList} 
          dataSource={defaultDetailList} 
          callbackParent={getDetailList}
          setIsEditable={setIsEditable}
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
            <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
              操&nbsp;&nbsp;&nbsp;&nbsp;作：
            </Col>
            <Col xs={18} md={20} xl={21} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
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
