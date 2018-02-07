import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input,Radio,InputNumber,Modal,Row,Col,Select,Button,Icon,Affix,message } from 'antd'
//import moment from 'moment';
import config from '../../utils/config'
import { FileUpload,SelectUser } from '../../components'
// import uploadImageCallBack from '../../services/uploadImageCallBack'
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
  isMD,
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
  borrowList,
  setState,
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
    validateFieldsAndScroll({scroll:{offsetBottom:30}},(err,values) => {
      if (err) {
        return null;
      }
      if(isEditable){
        message.warning('请先保存差旅费明细');
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
      data.actualExpense=0;
      let _defaultDetailList=[];
      if(detailList && detailList.length>0){
        _defaultDetailList=detailList;
      }else if(defaultDetailList[0]){
        _defaultDetailList=defaultDetailList;
      }
      _defaultDetailList.map((f,index)=>{
        if(f.id) data[`detailList[${index}].id`]=f.id;
        data[`detailList[${index}].departureTimeStr`]=f.departureTimeStr.value;
        data[`detailList[${index}].departurePlace`]=f.departurePlace.value;
        data[`detailList[${index}].arrivalTimeStr`]=f.arrivalTimeStr.value;
        data[`detailList[${index}].arrivalPlace`]=f.arrivalPlace.value;
        data[`detailList[${index}].vehicle`]=f.vehicle.value;
        data[`detailList[${index}].vehicleCost`]=f.vehicleCost.value;
        data[`detailList[${index}].livingCost`]=f.livingCost.value;
        data[`detailList[${index}].subsidyAmount`]=f.subsidyAmount.value;
        data[`detailList[${index}].otherCost`]=f.otherCost.value;
        data.actualExpense+=parseFloat(f.vehicleCost.value)+parseFloat(f.livingCost.value)+parseFloat(f.subsidyAmount.value)+parseFloat(f.otherCost.value);
        
      })
      data.travelIds=data.travelIds.join();
      if(data.travelIds){
        let _a=`,${data.travelIds}`;
        data.travelCodes=travelList.filter(f=>_a.indexOf(`,${f.id}`)>-1).map(c=>c.code).join();
      }else{
        data.travelIds='';
        data.travelCodes='';
      }
      if(data.borrowIds){
        data.borrowCodes=borrowList.filter(f=>String(data.borrowIds)===String(f.id)).map(m=>m.code).join();
        data.advanceExpense=item.advanceExpense;//借款金额
        data.actualExpense=item.actualExpense;//实际报销
        // data.borrowIds=data.borrowIds.join();
      }else{
        data.borrowIds='';
        data.borrowCodes='';
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
        subsidyAmount: {
          editable:false,
          value: temp.subsidyAmount,
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
  
  
  const travelOptions=travelList.map(travel=><Option key={String(travel.id)}>{travel.code}</Option>)
 
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
  if(!item.borrowIds && item.borrowList && item.borrowList[0]){
    item.borrowIds=item.borrowList.map(m=>String(m.id));
  }
  const getCostTotal=(detailList)=>{
    let costTotal=0,_list=detailList || defaultDetailList;
    if(_list[0]){
      _list.forEach(item=>{
        costTotal+=parseFloat(item.vehicleCost.value)
          +parseFloat(item.livingCost.value)
          +parseFloat(item.otherCost.value)
          +parseFloat(item.subsidyAmount.value);
      })
    }
    return costTotal;
  }
  const getBorrowTotal=(ids)=>{
    let costTotal=0;
    if(borrowList[0] && ids){
      borrowList.filter(f=>String(f.id)===String(ids)).forEach(item=>{
        costTotal+=parseFloat((item.payAmount || 0));
      })
    }
    return costTotal;
  }
  const borrowOption=borrowList.map(bor=><Option key={String(bor.id)}>{bor.code}</Option>);

  const handleBorrowChange=(value)=>{
    calcExpense(value);
  }
  const calcExpense=(value,detailList=null)=>{
    let costTotal=getCostTotal(detailList).toFixed(2);
    item.advanceExpense=getBorrowTotal(value).toFixed(2);
    item.actualExpense=(costTotal - item.advanceExpense).toFixed(2);
    item.borrowIds=value;
    if(detailList){
      setState({currentItem:item,detailList});
    }else{
      setState({currentItem:item});
    }
  }
  const detailCallBack=(data)=>{
    calcExpense(item.borrowIds,data);
    // setState({currentItem:item,detailList:data});
  }
  const useUnitOption=config.useUnitList && config.useUnitList.map(u=><Option key={u}>{u}</Option>) || null;
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
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            帐户名：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {getFieldDecorator('accountName', {
                initialValue: item.accountName,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<Input  />)}
            </FormItem>
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            账号：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {getFieldDecorator('accountNumber', {
                initialValue: item.accountNumber,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<Input  />)}
            </FormItem>
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            开户行：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {getFieldDecorator('bankName', {
                initialValue: item.bankName,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<Input  />)}
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
          <Col xs={12} md={20} xl={22} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem style={{width:'100%'}}>
              {getFieldDecorator('travelIds', {
                initialValue:item.travelIds && (typeof item.travelIds ==='string') ?item.travelIds.split(','):[],
              })(<Select mode="multiple" >{travelOptions}</Select>)}
            </FormItem>
          </Col>
        </Row>
        {
          isMD?
          <Row gutter={24} className={styles['q-detail']}>
            <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
              用款单位：
            </Col>
            <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
              <FormItem >
                {
                  getFieldDecorator('useUnit',{
                    initialValue: item.useUnit || undefined,
                    rules: [{
                        required: true,message:'不能为空',
                    }],
                  })(<Select
                    style={{ width: '100%' }}
                    placeholder="选择用款单位"
                  >
                  {useUnitOption}
                  </Select>)
                }
              </FormItem>
            </Col>
          </Row>
          :null
        }   
        <EditCellTable dicList={dicList} 
          dataSource={defaultDetailList} 
          callbackParent={detailCallBack}
          setIsEditable={setIsEditable}
          className={styles['q-detail']}/> 
        
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} className='qite-list-title'>
            <Icon type="credit-card" />借款信息
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            借款单：
          </Col>
          <Col xs={18} md={20} xl={22} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem style={{width:'100%'}}>
              {getFieldDecorator('borrowIds', {
                initialValue:item.borrowIds && String(item.borrowIds) || undefined,
                onChange:handleBorrowChange,
              })(<Select>{borrowOption}</Select>)}
              
            </FormItem>
            
          </Col>
        </Row>
        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            借款金额：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >{item.advanceExpense || 0}{'  元'}</FormItem>
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            实际报销：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >{item.actualExpense>0 && item.actualExpense || 0 }{'  元'}</FormItem>
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            归还多余：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >{ item.actualExpense<0 && Math.abs(item.actualExpense) || 0}{'  元'}</FormItem>
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
