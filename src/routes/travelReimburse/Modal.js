import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input,Radio,InputNumber,Modal,Row,Col,Select,Button,Icon,Affix,message } from 'antd'
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
  travelList,//申请人的出差申请列表
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
        message.warning('请先保存差旅费明细');
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
      data.actualExpense=0;
      if(detailList && detailList.length>0){
        detailList.map((f,index)=>{
          if(f.id) data[`detailList[${index}].id`]=f.id;
          data[`detailList[${index}].departureTimeStr`]=f.departureTimeStr.value;
          data[`detailList[${index}].departurePlace`]=f.departurePlace.value;
          data[`detailList[${index}].arrivalTimeStr`]=f.arrivalTimeStr.value;
          data[`detailList[${index}].arrivalPlace`]=f.arrivalPlace.value;
          data[`detailList[${index}].vehicle`]=f.vehicle.value;
          data[`detailList[${index}].vehicleCost`]=f.vehicleCost.value;
          data[`detailList[${index}].livingCost`]=f.livingCost.value;
          data[`detailList[${index}].otherCost`]=f.otherCost.value;
          data.actualExpense+=parseFloat(f.vehicleCost.value)+parseFloat(f.livingCost.value)+parseFloat(f.otherCost.value)
          
        })
      }else if(defaultDetailList[0]){
        defaultDetailList.map((f,index)=>{
          if(f.id) data[`detailList[${index}].id`]=f.id;
          data[`detailList[${index}].departureTimeStr`]=f.departureTimeStr.value;
          data[`detailList[${index}].departurePlace`]=f.departurePlace.value;
          data[`detailList[${index}].arrivalTimeStr`]=f.arrivalTimeStr.value;
          data[`detailList[${index}].arrivalPlace`]=f.arrivalPlace.value;
          data[`detailList[${index}].vehicle`]=f.vehicle.value;
          data[`detailList[${index}].vehicleCost`]=f.vehicleCost.value;
          data[`detailList[${index}].livingCost`]=f.livingCost.value;
          data[`detailList[${index}].otherCost`]=f.otherCost.value;
          data.actualExpense+=parseFloat(f.vehicleCost.value)+parseFloat(f.livingCost.value)+parseFloat(f.otherCost.value)
          
        })
      }
      //console.log('--travelIds---',...data.travelIds);
      if(data.travelIds && data.travelIds[0]){

        let trIds=data.travelIds;
        //console.log('--Ids---',...trIds);
        data.travelCodes=trIds.map(c=>c.label).join()
        data.travelIds=trIds.map(t=>t.key).join()
      }
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
        departureTimeStr: {
          editable: false,
          value: temp.departureTime?temp.departureTime:'',
        },
        departurePlace: {
          editable: false,
          value: temp.departurePlace?temp.departurePlace:'',
        },
        arrivalTimeStr: {
          editable:false,
          value: temp.arrivalTime?temp.arrivalTime:'',
        },
        arrivalPlace: {
          editable:false,
          value: temp.arrivalPlace?temp.arrivalPlace:'',
        },
        vehicle: {
          editable:false,
          value: temp.vehicle,
        },
        vehicleCost: {
          editable:false,
          value: temp.vehicleCost,
        },
        livingCost: {
          editable:false,
          value: temp.livingCost,
        },
        otherCost: {
          editable:false,
          value: temp.otherCost,
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
  const handleAdvanceExpenseChange= (value) => {
    item.advanceExpense=value;
    let t=getActualExpense();
    let c=t-parseFloat(value);
    if(c>0){
      item.surplus=0.00;
      item.validReimburse=c.toFixed(2);
    }else if(c<0){
      item.surplus=c.toFixed(2);
      item.validReimburse=0.00;
    }else{
      item.surplus=0.00;
      item.validReimburse=0.00;
    }
  }
  
  const getExpense=()=>{

    return changeMoneyToChinese(item.expense);
  }
  
  const travelOptions=travelList.map(travel=><Option key={String(travel.id)}>{travel.code}</Option>)

  const getActualExpense=()=>{
    let c=0;
    if(detailList && detailList[0]){
      detailList.map(t=>{
        c+=parseFloat(t.vehicleCost.value)+parseFloat(t.livingCost.value)+parseFloat(t.otherCost.value)
      })
    }else if(defaultDetailList && defaultDetailList[0]){
      defaultDetailList.map(t=>{
        c+=parseFloat(t.vehicleCost.value)+parseFloat(t.livingCost.value)+parseFloat(t.otherCost.value)
      })
    }
    item.actualExpense=c;
    return c;
  }

  let t=getActualExpense();
  let c=t-parseFloat(item.advanceExpense!==undefined && item.advanceExpense!==null?item.advanceExpense:0);
  if(c>0){
    item.surplus=0;
    item.validReimburse=c;
  }else if(c<0){
    item.surplus=c;
    item.validReimburse=0;
  }else{
    item.surplus=0;
    item.validReimburse=0;
  }
  const getTravelIds=()=>{
    if(item.travelIds && item.travelCodes){

      let ids=item.travelIds.split(',');
      let codes=item.travelCodes.split(',');
      return ids.map((item,index)=>{
        return {key:item,label:codes[index]}
      })
    }else{
      return [];
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
            <Icon type="credit-card" />差旅费报销申请信息
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
            报销说明：
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
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label']}>
            出差申请单：
          </Col>
          <Col xs={12} md={20} xl={14} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem style={{width:'100%'}}>
              {getFieldDecorator('travelIds', {
                initialValue:getTravelIds(),
                
              })(<Select mode="multiple" labelInValue >{travelOptions}</Select>)}
            </FormItem>
          </Col>
        </Row>
          
        <EditCellTable dicList={dicList} 
          dataSource={defaultDetailList} 
          callbackParent={getDetailList}
          setIsEditable={setIsEditable}
          className={styles['q-detail']}/> 
        
        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            预支旅费：
          </Col>
          <Col xs={18} md={20} xl={22} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem  >
              {getFieldDecorator('advanceExpense', {
                initialValue:(item.advanceExpense===undefined||item.advanceExpense===null)?0:Number(item.advanceExpense),
                rules: [
                  {
                    required: true,message:'不能为空',
                   
                  },
                ],
                onChange:handleAdvanceExpenseChange,
              })(
                <InputNumber
                  step={0.01} style={{width:'120px'}}
                  formatter={value => `¥ ${value?value.toString().replace(/¥\s?|(,*)/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ','):'0.00'}`}
                  parser={value => value?value.toString().replace(/¥\s?|(,*)/g, ''):0}
                  
                />
              )}
              
            </FormItem>
           
            <FormItem >
            归还多余：{`¥ ${item.surplus?item.surplus.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):'0.00'}`}  
            &nbsp;&nbsp;&nbsp;&nbsp;实际报销：{`¥ ${item.validReimburse?item.validReimburse.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):'0.00'}`}
            </FormItem>
            
         
          </Col>
        </Row>
        <Row gutter={12} className={styles['q-detail']} style={{marginLeft:'2px',marginRight:'2px'}}>
          <blockquote>
            <p>
              备注：<br/>
              1、预支旅费=出差申请单总申请费用；<br/>
              2、报销总额-预支旅费：正数=实际报销；负数=归还多余。
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
