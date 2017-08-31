import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input,Radio, InputNumber,Modal,Row,Col,Button,Icon,Affix,message,Select } from 'antd'
//import moment from 'moment';
import config from '../../utils/config'
import { FileUpload,SelectUser } from '../../components'
import uploadImageCallBack from '../../services/uploadImageCallBack'
import styles from './Modal.less'
//import city from '../../utils/chinaCity'
import {changeMoneyToChinese} from '../../utils'
import EditCellTable from './EditCellTable'
import CommentTable from '../../components/CommentTable'

const confirm = Modal.confirm
//const { RangePicker } = DatePicker
const RadioGroup = Radio.Group;
const FormItem = Form.Item
const Option =Select.Option;

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
  // applyList,//申购明细列表
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
  setIsEditable,
  isEditable,
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
      if(isEditable){
        message.warning('请先保存物品明细');
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
      //data.totalAmount=0;
      if(detailList && detailList.length>0){
        detailList.map((f,index)=>{
          if(f.id) data[`purchaseDetailList[${index}].id`]=f.id;
          if(f.applyId)data[`purchaseDetailList[${index}].applyId`]=f.applyId;
          data[`purchaseDetailList[${index}].materialName`]=f.materialName.value;
          data[`purchaseDetailList[${index}].spec`]=f.spec.value;
          data[`purchaseDetailList[${index}].purchaseNum`]=f.num.value;
          data[`purchaseDetailList[${index}].unit`]=f.unit.value;
          data[`purchaseDetailList[${index}].amount`]=f.amount.value;
          data[`purchaseDetailList[${index}].useTimeStr`]=f.useTimeStr.value;
          data[`purchaseDetailList[${index}].remark`]=f.remark.value;
          data[`purchaseDetailList[${index}].supplierName`]=f.supplierName.value; 
          data[`purchaseDetailList[${index}].purchaseAmount`]=f.purchaseAmount.value; 
          data[`purchaseDetailList[${index}].estiArrivalTimeStr`]=f.estiArrivalTime.value;
          data[`purchaseDetailList[${index}].storageTimeStr`]=f.storageTime.value;
          data[`purchaseDetailList[${index}].isIn`]=f.isIn.value; 
          //data.totalAmount+=parseFloat(f.num.value)*parseFloat(f.amount.value===null||f.amount.value===''|| f.amount.value===undefined?0:f.amount.value);
           
        })
      }else if(defaultDetailList[0]){
        defaultDetailList.map((f,index)=>{
          if(f.id) data[`purchaseDetailList[${index}].id`]=f.id;
          if(f.applyId)data[`purchaseDetailList[${index}].applyId`]=f.applyId;
          data[`purchaseDetailList[${index}].spec`]=f.spec.value;
          data[`purchaseDetailList[${index}].purchaseNum`]=f.num.value;
          data[`purchaseDetailList[${index}].unit`]=f.unit.value;
          data[`purchaseDetailList[${index}].amount`]=f.amount.value;
          data[`purchaseDetailList[${index}].useTimeStr`]=f.useTimeStr.value;
          data[`purchaseDetailList[${index}].remark`]=f.remark.value;
          data[`purchaseDetailList[${index}].supplierName`]=f.supplierName.value; 
          data[`purchaseDetailList[${index}].purchaseAmount`]=f.purchaseAmount.value; 
          data[`purchaseDetailList[${index}].estiArrivalTimeStr`]=f.estiArrivalTime.value;
          data[`purchaseDetailList[${index}].storageTimeStr`]=f.storageTime.value;
          data[`purchaseDetailList[${index}].isIn`]=f.isIn.value; 
         // data.totalAmount+=parseFloat(f.num.value)*parseFloat(f.amount.value===null||f.amount.value===''|| f.amount.value===undefined?0:f.amount.value);
          
        })
      }
      item.typeOption=null;
      if(data.bigType){
        data.bigTypeName=dicList.filter(f=>f.dicType==='buyType_Big' && f.dicValue===data.bigType)[0].dicName;
      }
      if(data.type){
        data.typeName=dicList.filter(f=>f.dicType==='buyType_item'+data.bigType && f.dicValue===data.type)[0].dicName;
      }
      //data.totalAmount=data.totalAmount.toFixed(2);
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
      // console.log(fields,detailList)
      if(!fields['attachList[0].attachUrl']){
        message.error('请上传附件')
        return;
      }
      onOk(fields)
    }
  }
  if(item.attachList&& item.attachList[0]){
    defaultFileList=item.attachList.map((temp)=>{
      return {...temp,uid:temp.id,status:'done',url:temp.attachUrl,name:temp.attachName}
    })
  }else{
    defaultFileList=[];
  }
  if(item.purchaseDetailList && item.purchaseDetailList[0]){
    defaultDetailList=item.purchaseDetailList.map(temp=>{
      let newRow={
        key: temp.id,
        id:temp.id,
        applyId:temp.applyId?temp.applyId:null,
        materialName: {
          editable: false,
          value: temp.materialName?temp.materialName:'',
        },
        spec: {
          editable: false,
          value: temp.spec?temp.spec:'',
        },
        num: {
          editable:false,
          value: temp.purchaseNum!==undefined&&temp.purchaseNum!==null?temp.purchaseNum:temp.num,
        },
        unit: {
          editable:false,
          value: temp.unit?temp.unit:'',
        },
        amount: {
          editable:false,
          value: temp.amount?temp.amount:'',
        },
        useTimeStr: {
          editable:false,
          value: temp.useTime?temp.useTime:'',
        },
        remark: {
          editable:false,
          value: temp.remark,
        },
        supplierName: {
          editable:false,
          value: temp.supplierName,
        },
        purchaseAmount: {
          editable:false,
          value: temp.purchaseAmount?temp.purchaseAmount:'',
        },
        estiArrivalTime: {
          editable:false,
          value: temp.estiArrivalTime?temp.estiArrivalTime:'',
        },
        storageTime: {
          editable:false,
          value: temp.storageTime?temp.storageTime:'',
        },
        isIn: {
          editable:false,
          value: temp.isIn,
        },
      }
      return newRow;
    })
  }else{
    defaultDetailList=[];
  }
  const handleSubmit=(data)=>{
    let fields=getFields();
    if(fields){
      if(!fields['attachList[0].attachUrl']){
        message.error('请上传附件')
        return;
      }
      confirm({
        title: `你确定提交申请么?`,
        onOk () {
          onSubmit(fields,data)
        },
      })
    }
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
  const bigOption=dicList.filter(f=>f.dicType==='buyType_Big').map(dic=><Option key={dic.dicValue}>{dic.dicName}{dic.remark?` (${dic.remark})`:''}</Option>)
  // let typeOption=null;
  const handleIsMonthRepeatChange= (e) => {
    item.isMonthRepeat=e.target.value;
  }
  const handleBigTypeChange=(value)=>{
    let _type='buyType_item'+value;
    item.typeOption=dicList.filter(f=>f.dicType===_type).map(dic=><Option key={dic.dicValue}>{dic.dicName}{dic.remark?` (${dic.remark})`:''}</Option>)
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
            <Icon type="credit-card" />采购申请信息
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
            紧急程度：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {getFieldDecorator('urgency', {
                initialValue: item.urgency!==undefined && item.urgency!==null?parseInt(item.urgency):0,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],

              })(<RadioGroup>
                  <Radio value={0}>一般</Radio>
                  <Radio value={1}>紧急</Radio>
                </RadioGroup>)}
            </FormItem>
          </Col>
        </Row>
        
        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            采购类型：
          </Col>
          <Col xs={18} md={20} xl={22} style={{ paddingLeft:'0px',justifyContent:'space-between' }} className={styles['q-detail-flex-conent']}>
            <FormItem style={{width:'50%'}}>
              {getFieldDecorator('bigType', {
                initialValue: item.bigType?String(item.bigType):undefined,
                rules: [
                  {
                    required: true,message:'不能为空',
                   
                  },
                ],
                onChange:handleBigTypeChange
              })(<Select placeholder="请选择">{bigOption}</Select>)}
            </FormItem>
            <FormItem style={{width:'45%'}}>
              {getFieldDecorator('type', {
                initialValue: item.type?String(item.type):undefined,
                rules: [
                  {
                    required: true,message:'不能为空',
                   
                  },
                ],
              })(<Select placeholder="请选择">{item.typeOption}</Select>)}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={6} xl={4} style={{ paddingRight:'0px',textAlign:'left' }} className={styles['q-detail-label-require']}>
            同一月内是否重复采购：
          </Col>
          <Col xs={18} md={18} xl={20} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem style={{width:'20%'}}>
              {getFieldDecorator('isMonthRepeat', {
                initialValue: item.isMonthRepeat!==undefined && item.isMonthRepeat!==null?Boolean(item.isMonthRepeat):false,
                rules: [
                  {
                    required: true,message:'不能为空',
                   
                  },
                ],
                onChange:handleIsMonthRepeatChange,
              })(<RadioGroup>
                  <Radio value={true}>是</Radio>
                  <Radio value={false}>否</Radio>
                </RadioGroup>)}
            </FormItem>
            {item.isMonthRepeat?
              <FormItem style={{width:'23%',textAlign:'right'}}>
                重复采购原因：
              </FormItem>
              :null}
            {item.isMonthRepeat?
              <FormItem style={{width:'50%'}} >
                {getFieldDecorator('monthRepeatReason', {
                  initialValue: item.monthRepeatReason,
                  rules: [
                    {
                      required: true,message:'不能为空',
                     
                    },
                  ],
                })(<Input type="text" />)}
              </FormItem>
            :null}
          </Col>
        </Row>
       
        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            采购说明：
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
