import React from 'react'
import PropTypes from 'prop-types'
import { Form,Radio,Input,Modal,Row,Col,Button,Icon,Affix,message,Select } from 'antd'
//import moment from 'moment';
import config from '../../utils/config'
import { FileUpload,SelectUser } from '../../components'
// import uploadImageCallBack from '../../services/uploadImageCallBack'
import styles from './Modal.less'
//import city from '../../utils/chinaCity'
//import {changeMoneyToChinese} from '../../utils'
import EditCellTable from './EditCellTable'
import templateUrl from '../../../assets/template/财务报销单据.xlsx'
import CommentTable from '../../components/CommentTable'
// import AttachList from './attachList'
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
  purchaseList,
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
    validateFieldsAndScroll((err,values) => {
      if (err) {
        return null;
      }
      if(isEditable){
        message.warning('请先保存费用明细');
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
      if(detailList && detailList.length>0){
        detailList.map((f,index)=>{
          if(f.id) data[`detailList[${index}].id`]=f.id;
          data[`detailList[${index}].uses`]=f.uses.value;
          data[`detailList[${index}].amount`]=f.amount.value;
          data[`detailList[${index}].remark`]=f.remark.value;
          
        })
      }else if(defaultDetailList[0]){
        defaultDetailList.map((f,index)=>{
          if(f.id) data[`detailList[${index}].id`]=f.id;
          data[`detailList[${index}].uses`]=f.uses.value;
          data[`detailList[${index}].amount`]=f.amount.value;
          data[`detailList[${index}].remark`]=f.remark.value;
          
        })
      }
      data.purchaseIds=data.purchaseIds&&data.purchaseIds.join();
      if(data.purchaseIds){
        let _a=`,${data.purchaseIds}`;
        data.purchaseCodes=purchaseList.filter(f=>_a.indexOf(`,${f.id}`)>-1).map(m=>m.code).join();
      }else{
        data.purchaseIds='';
        data.purchaseCodes='';
      }
      if(data.borrowIds){
        data.borrowCodes=borrowList.filter(f=>String(data.borrowIds)===String(f.id)).map(m=>m.code).join();
        data.loan=item.loan;//getBorrowTotal(data.borrowIds).toFixed(2);
        data.payable=item.payable;//(getCostTotal().toFixed(2) - data.loan).toFixed(2);
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
      if(!fields['attachList[0].attachUrl']){
        message.error('请上传附件')
        return;
      }
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
        uses: {
          editable: false,
          value: temp.uses?temp.uses:'',
        },
        amount: {
          editable: false,
          value: temp.amount?temp.amount:'',
        },
        remark: {
          editable:false,
          value: temp.remark,
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
          fields.isupdated=true;
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
  const purchaseOption=purchaseList.map(pur=><Option key={pur.id}>{pur.code}</Option>);
  if(item.purchaseList && item.purchaseList[0]){
    item.purchaseIds=item.purchaseList.map(m=>String(m.id));
  }
  if(!item.borrowIds && item.borrowList && item.borrowList[0]){
    item.borrowIds=item.borrowList.map(m=>String(m.id));
  }
  const getCostTotal=(detailList)=>{
    let costTotal=0,_list=detailList || defaultDetailList;
    if(_list[0]){
      _list.forEach(item=>{
        costTotal+=parseFloat((item.amount.value || 0));
      })
    }
    return costTotal;
  }
  const getBorrowTotal=(ids)=>{
    let costTotal=0;
    if(borrowList[0] && ids){
      borrowList.filter(f=>String(ids)===String(f.id)).forEach(item=>{
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
    item.loan=getBorrowTotal(value).toFixed(2);
    item.payable=(costTotal - item.loan).toFixed(2);
    item.borrowIds=value;
    if(detailList){
      setState({currentItem:item,detailList});
    }else{
      setState({currentItem:item});
    }
  }
  const detailCallBack=(data)=>{
    calcExpense(item.borrowIds,data)
    // setState({currentItem:item,detailList:data});
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
                    <a href={templateUrl} target="_blank">费用报销[模版下载]</a>
                    <Button style={{ marginLeft: 12,marginRight: 12 }} type="primary" loading={auditLoading} 
                    onClick={handleAudit} size="large">确定修改并提交</Button>
                    <Button  type="ghost" onClick={onGoback} size="large">返回待办</Button>
                  </div>
                  ):(
                  <div style={{backgroundColor:'#fff'}}>
                    <a href={templateUrl} style={{ marginRight: 12 }} target="_blank">费用报销[模版下载]</a>
                    <SelectUser type="button" callBack={handleSubmit}  loading={submitLoading}>提交</SelectUser>
                    <Button style={{ marginLeft: 12,marginRight: 12 }} type="primary" loading={confirmLoading} onClick={handleOk} size="large">暂存</Button>
                    <Button  type="ghost" onClick={onCancel} size="large">取消</Button>
                  </div>)
                }
              
            </Affix>

          </Col>
          <Col span={24} className='qite-list-title'>
            <Icon type="credit-card" />费用报销申请信息
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
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            采购申请单：
          </Col>
          <Col xs={18} md={20} xl={22} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem style={{width:'100%'}}>
              {getFieldDecorator('purchaseIds', {
                initialValue:item.purchaseIds && item.purchaseIds[0]?item.purchaseIds:[],
              })(<Select mode="multiple" >{purchaseOption}</Select>)}
              
            </FormItem>
            
          </Col>
        </Row>
        
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
              })(<Select >{borrowOption}</Select>)}
              
            </FormItem>
            
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            核销借款：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >{item.loan || 0}{'  元'}</FormItem>
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            应付款：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem ><span className="font-songti">{item.payable<0 && '-'}</span>{item.payable && Math.abs(item.payable) || 0}{'  元'}</FormItem>
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
