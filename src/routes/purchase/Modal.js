import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input,Radio, InputNumber,Modal,Row,Col,Button,Icon,Affix,message,Select } from 'antd'
//import moment from 'moment';
import config from '../../utils/config'
import { FileUpload,SelectUser,FileList } from '../../components'
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
  defaultFileList=[],
  defaultDetailList=[],
  applyFileList=[],
  purInquiryFileList=[],
  onAudit,
  taskData={},
  auditLoading,
  onGoback,
  setIsEditable,
  isEditable,
  setNeedSel,
  reasonStr,
  isNeedSel,
  turnToDoTask,
  isTurn,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    getFieldsValue,
    setFieldsValue,
  },
  ...modalProps
}) => {
  const dateTimeFormat='YYYY-MM-DD HH:mm:ss'
  const isDisable=item.state===1?true:false;//是否可以编辑：办理时不可编辑
  const taskDefinitionKey=taskData.taskVo && taskData.taskVo.taskDefinitionKey || null;
  const _use=taskDefinitionKey?taskDefinitionKey.split('_')[0]:'';
  //状态：新增，编辑，退回修改，审批（询价，确定采购）
  //新增：item.state===undefined;
  
  const getFields = () => {
    let data=null;
    validateFieldsAndScroll((err,values) => {
      if (err) {
        return null;
      }
      if(item.state!==1 && isEditable){
        message.warning('请先保存物品明细');
        return null;
      }
      data = {...values}
      let _fileList=[];
      if(fileList && fileList.length>0){
        //上传控件内文件
        if(taskDefinitionKey && _use){
          let _tempList=[];
          fileList.map((_item)=>{
            _tempList.push({
              ..._item,
              use:item.state===-1?null:_use,
              useDesc:_use==='purInquiry'?'用于采购询价':''
            })
          })
          _fileList=_tempList.concat(applyFileList);
          if(item.state===-1){//退回修改
            _fileList=_tempList.concat(purInquiryFileList);
          }
        }else{
          _fileList=fileList.concat(purInquiryFileList);
        }
      }else if(defaultFileList[0] || applyFileList[0] || purInquiryFileList[0]){
        //未上传前文件
        if(taskDefinitionKey && _use){
          _fileList=defaultFileList.concat(applyFileList);
          if(item.state===-1){//退回修改
            _fileList=defaultFileList.concat(purInquiryFileList);
          }
        }else{
          _fileList=defaultFileList.concat(purInquiryFileList);
        }

      }
      _fileList.filter(fl=>fl.uid!=='invalid').map((f,index)=>{
        if(f.id) data[`attachList[${index}].id`]=f.id;
        data[`attachList[${index}].attachUrl`]=f.url;
        data[`attachList[${index}].attachName`]=f.name;
        if(f.use){
          data[`attachList[${index}].use`]=f.use;
          data[`attachList[${index}].useDesc`]=f.useDesc;
        }
      })
      //data.totalAmount=0;
      let _defaultDetailList=[]
      if(detailList && detailList.length>0){
        _defaultDetailList=detailList;
      }else if(defaultDetailList[0]){
        _defaultDetailList=defaultDetailList;
      }
      _defaultDetailList.map((f,index)=>{
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
        data[`purchaseDetailList[${index}].realPurchaseNum`]=f.realPurchaseNum.value; //实际采购数量
        data[`purchaseDetailList[${index}].realAmount`]=f.realAmount.value; //实际采购金额-单价
        data[`purchaseDetailList[${index}].purchaseAmount`]=(parseFloat((f.realPurchaseNum.value || 0)) * parseFloat((f.realAmount.value || 0))).toFixed(2); 
        data[`purchaseDetailList[${index}].estiArrivalTimeStr`]=f.estiArrivalTime.value;
        data[`purchaseDetailList[${index}].storageTimeStr`]=f.storageTime.value;
        data[`purchaseDetailList[${index}].isIn`]=f.isIn.value; 
       // data.totalAmount+=parseFloat(f.num.value)*parseFloat(f.amount.value===null||f.amount.value===''|| f.amount.value===undefined?0:f.amount.value);
        
      })

      if(data.bigType){
        data.bigTypeName=dicList.filter(f=>f.dicType==='buyType_Big' && f.dicValue===data.bigType)[0].dicName;
      }
      if(!(item.typeOption && item.typeOption[0]) && item.type){
        data.type=item.type;
        data.typeName=item.typeName;
        item.typeOption=null;
      }else{
        data.typeName=dicList.filter(f=>f.dicType==='buyType_item'+data.bigType && f.dicValue===data.type)[0].dicName;
      }
      if(isDisable){
        data.bigType=item.bigType || 1;
        data.bigTypeName=item.bigTypeName || '错误数据';
        data.type=item.type || 1;
        data.typeName=item.typeName || '错误数据';
      }
      //data.totalAmount=data.totalAmount.toFixed(2);
      if(item.id){
        data.id=item.id;
        data.code=item.code;
      }
    })
    return data;
  }
  const requiredData=()=>{
    if(detailList && !detailList[0] && defaultDetailList && !defaultDetailList[0]){
        message.error('采购明细不能为空');
        return false;
      }
      if(detailList && detailList[0]){
        let _list=[];
        _list=_list.concat(detailList.filter(f=>f.amount.value==='' || parseFloat(f.amount.value)<=0));
        if(_list.length>0){
          message.error('采购明细［单价］必须大于0');
          return false;
        }
        _list=_list.concat(detailList.filter(f=>f.num.value==='' || parseFloat(f.num.value)<=0));
        if(_list.length>0){
          message.error('采购明细［数量］必须大于0');
          return false;
        }
        _list=_list.concat(detailList.filter(f=>f.materialName.value===''));
        if(_list.length>0){
          message.error('采购明细［材料名称］不能为空');
          return false;
        }
      }else if(defaultDetailList && defaultDetailList[0]){
        let _list=[];
        _list=_list.concat(defaultDetailList.filter(f=>f.amount.value==='' || parseFloat(f.amount.value)<=0))
        if(_list.length>0){
          message.error('采购明细［单价］必须大于0');
          return false;
        }
        _list=_list.concat(defaultDetailList.filter(f=>f.num.value==='' || parseFloat(f.num.value)<=0))
        if(_list.length>0){
          message.error('采购明细［数量］必须大于0');
          return false;
        }
        _list=_list.concat(defaultDetailList.filter(f=>f.materialName.value===''))
        if(_list.length>0){
          message.error('采购明细［材料名称］不能为空');
          return false;
        }
      }
      return true;
  }
  const handleOk = () => {
    let fields=getFields();
    if(fields){
      // console.log(fields,detailList)
      if(!fields['attachList[0].attachUrl']){
        message.error('请上传附件');
        return;
      }
      if(!requiredData()){
        return;
      }
     
      // console.log('fields:',fields)
      onOk(fields)
    }
  }
  // console.log(fileList,item.attachList)
  
  let __fileList=[];
  if(fileList[0]){
    __fileList=fileList;
  }else if(item.attachList && item.attachList[0]){
    __fileList=item.attachList;
  }
  if(taskDefinitionKey && _use && item.state===1){
    //采购询价附件
    defaultFileList=__fileList.filter(f=>(f.sourceType===10 && f.use!==null) || f.sourceType===undefined ).map((temp)=>{
      if(temp.createTime)
        return {...temp,uid:temp.id,status:'done',url:temp.attachUrl,name:temp.attachName}
      return {...temp}
    })
    applyFileList=item.attachList.filter(f=>f.sourceType===10 && f.use===null).map((temp)=>{
      if(temp.createTime)
        return {...temp,uid:temp.id,status:'done',url:temp.attachUrl,name:temp.attachName}
      return {...temp}
    })
  }else{
    //采购申请附件
    defaultFileList=__fileList.filter(f=>(f.sourceType===10 && f.use===null) || f.sourceType===undefined).map((temp)=>{
      if(temp.createTime)
        return {...temp,uid:temp.id,status:'done',url:temp.attachUrl,name:temp.attachName}
      return {...temp}
    })
    purInquiryFileList=__fileList.filter(f=>f.sourceType===10 && f.use!==null).map((temp)=>{
      if(temp.createTime)
        return {...temp,uid:temp.id,status:'done',url:temp.attachUrl,name:temp.attachName}
      return {...temp}
    })
  }
  
  if(detailList && detailList[0]){
    defaultDetailList=detailList;
  }else if(item.purchaseDetailList && item.purchaseDetailList[0]){
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
        realPurchaseNum: {
          editable:false,
          value: temp.realPurchaseNum?temp.realPurchaseNum:0,
        },
        realAmount: {
          editable:false,
          value: temp.realAmount?temp.realAmount:0,
        },
        purchaseAmount: {
          editable:false,
          value: temp.purchaseAmount?temp.purchaseAmount:0,
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
      if(!requiredData()){
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
  const purDetailIsNotNull=()=>{
    if(detailList && detailList[0]){
      if(detailList.filter(f=>f.supplierName.value!=='' && f.purchaseAmount.value!==''
                        && f.estiArrivalTime.value!=='' && f.supplierName.value!==null && f.purchaseAmount.value!==null
                        && f.estiArrivalTime.value!==null).length>0){
        return true;
      }
    }else if(defaultDetailList && defaultDetailList[0]){
      if(defaultDetailList.filter(f=>f.supplierName.value!=='' && f.purchaseAmount.value!==''
                        && f.estiArrivalTime.value!=='' && f.supplierName.value!==null && f.purchaseAmount.value!==null
                        && f.estiArrivalTime.value!==null).length>0){
        return true;
      }
    }
    //为空
    return false;
  }
  const handleAudit=(data)=>{
    let taskItem={},formItem=getFields();
    if(formItem){
      // console.log('formItem',formItem.action)
      if(formItem.action!=='3' && formItem.action!=='4' && !isTurn && taskDefinitionKey && _use==='purInquiry' && fileList && fileList.length<1){
        message.error('请上传询价附件')
        return;
      }
      if(formItem.action!=='3' && formItem.action!=='4' && !isTurn && taskDefinitionKey && (_use==='purInquiry' || _use==='purConfirm') && !purDetailIsNotNull()){
        message.error('供应商,到货日期,采购金额,不能为空')
        return;
      }
      taskItem.taskId=taskData.taskId;
      taskItem.busiId=taskData.busiId;
      taskItem.busiCode=taskData.busiCode;
      taskItem.action=formItem.action;
      if(formItem.approvalOpinion) taskItem.approvalOpinion=formItem.approvalOpinion;
      if(data && data.userId) taskItem.auditUserId=data.userId;
      if(isTurn){
       //转办 
       confirm({
        title:'你确定转办么？',
        onOk(){
          turnToDoTask({taskId:taskData.taskId,assigneId:data.userId,approvalOpinion:formItem.approvalOpinion});
        }
       })
      }else{
        confirm({
          title:item.state===1?'你确定办理么？':'你确定提交修改么？',
          onOk(){
              onAudit(formItem,taskItem)
          },
        })
      }
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
    setFieldsValue({'type':undefined});
  }

  const handleActChange=(e)=>{
      var _reasonStr='',_isTurn=false;
      if(e.target.value==='1' || e.target.value==='2'){
        _reasonStr='同意';
      }
      if(e.target.value==='3' || e.target.value==='4'){
        _reasonStr='不同意，退回修改';
      }
      if(e.target.value==='8'){
        _reasonStr="同意转办";
        _isTurn=true;
      }
      // 1 同意；3 返回上一步; 8 转办
      if(e.target.value==='1' || e.target.value==='3' || e.target.value==='8'){
        setNeedSel(true,_reasonStr,_isTurn);
      }else{
        setNeedSel(false,_reasonStr,_isTurn);
      }
  }
  return (
      <Form layout='horizontal' onSubmit={handleOk}>
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} style={{display:'flex',justifyContent:'space-between',marginBottom:'24px',paddingBottom:'12px',borderBottom:'1px solid #d9d9d9'}}>
            <div className='qite-title'>
            <Icon type={item.id?'edit':'plus'} />{taskData && taskData.taskVo && taskData.taskVo.nodeName?taskData.taskVo.nodeName:title}</div>
           
            <Affix target={()=>document.getElementById('layout-main')} style={{minWidth:'310px',textAlign:'right'}}>
                {taskData && taskData.taskId?(
                  <div style={{backgroundColor:'#fff'}}>
                    { isNeedSel?
                      <SelectUser type={isTurn?'turn':'button'} callBack={handleAudit}  loading={auditLoading}/>
                    :
                      <Button style={{ marginRight: 12 }} type="primary" loading={auditLoading} 
                      onClick={handleAudit} size="large">{item.state===-1?'确定修改并提交':'办理'}</Button>
                    }
                    <Button  type="ghost" onClick={onGoback} size="large" style={{ marginLeft: 12 }}>返回待办</Button>
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
                  <Radio value={0} disabled={isDisable}>一般</Radio>
                  <Radio value={1} disabled={isDisable}>紧急</Radio>
                </RadioGroup>)}
            </FormItem>
          </Col>
        </Row>
        
        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            采购类型：
          </Col>
          <Col xs={18} md={20} xl={22} style={{ paddingLeft:'0px',justifyContent:isDisable?'flex-start':'space-between' }} className={styles['q-detail-flex-conent']}>
            {
              !isDisable?
              <FormItem style={{width:'50%'}}>
                {getFieldDecorator('bigType', {
                  initialValue: item.bigType?String(item.bigType):undefined,
                  rules: [
                    {
                      required: true,message:'不能为空',
                     
                    },
                  ],
                  onChange:handleBigTypeChange
                })(<Select placeholder="请选择" disabled={isDisable}>{bigOption}</Select>)}
              </FormItem>
              : <FormItem>{ item.bigTypeName?item.bigTypeName:'未知类型'}</FormItem>
            }
            {
              !isDisable?
              <FormItem style={{width:'45%'}}>
                {getFieldDecorator('type', {
                  initialValue: item.typeName?String(item.typeName):undefined,
                  rules: [
                    {
                      required: true,message:'不能为空',
                     
                    },
                  ],
                })(<Select placeholder="请选择" disabled={isDisable}>{item.typeOption}</Select>)}
              </FormItem>
              : <FormItem>{item.typeName?'，'+item.typeName:''}</FormItem>
            }
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
                  <Radio value={true} disabled={item.state===1}>是</Radio>
                  <Radio value={false} disabled={item.state===1}>否</Radio>
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
                })(<Input type="text" disabled={item.state===1}/>)}
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
              })(<Input type="textarea" autosize={{ minRows: 2, maxRows: 5 }} disabled={item.state===1}/>)}
            </FormItem>
          </Col>
        </Row>

         <EditCellTable dicList={dicList} taskDo={item.state===1 && _use?true:false}
          dataSource={defaultDetailList} useDesc={_use} isCanAdd={item.state===-1?true:false}
          callbackParent={getDetailList}
          setIsEditable={setIsEditable}
          className={styles['q-detail']}/> 
         
        {
          !taskDefinitionKey || applyFileList[0] || (taskDefinitionKey && item.state===-1)?
          <Row gutter={24} className={styles['q-detail']}>

            <Col span={24} className='qite-list-title'>
              <Icon type="paper-clip" />申请附件
            </Col>
            <Col span={24}>
            {
              taskDefinitionKey && _use && item.state===1?
                <FileList fileList={applyFileList} showRemoveIcon={false}/>
              :
              <FormItem >
                <FileUpload defaultFileList={defaultFileList} callbackParent={getFileList} />      
              </FormItem> 
            }
            </Col>
          </Row>
          :null
        }
        {
          (taskDefinitionKey && _use) || purInquiryFileList[0] ?
            <Row gutter={24} className={styles['q-detail']}>

              <Col span={24} className='qite-list-title'>
                <Icon type="paper-clip" />询价／确定采购附件
              </Col>
              <Col span={24}>
                {
                  taskDefinitionKey && item.state===1?
                    <FormItem >
                    { _use==='purInquiry' || _use==='purConfirm'?
                        <FileUpload defaultFileList={defaultFileList} callbackParent={getFileList} />
                      :   
                      <FileList fileList={defaultFileList} showRemoveIcon={false}/>  
                    }
                    </FormItem> 
                  :
                    <FileList fileList={purInquiryFileList} showRemoveIcon={false}/>  
                }
              </Col>
              
            </Row>
          :null
        }
        {
          taskData&&taskData.commentList &&taskData.commentList[0]?
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
                  onChange:handleActChange
                })(<RadioGroup>{actionRadio}</RadioGroup>)}
              </FormItem>
            </Col>
          </Row>
        :null}
        {
          taskData && taskData.taskId && item.state===1?
          <Row gutter={24} className={styles['q-detail']}>
            <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
              审批意见：
            </Col>
            <Col xs={18} md={20} xl={22} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
              <FormItem >
                {getFieldDecorator('approvalOpinion', {
                  initialValue:reasonStr,
                  rules: [{required: true,message:'不能为空',},],
                })(<Input type="textarea" autosize={{ minRows: 2, maxRows: 5 }} />)}
              </FormItem>
            </Col>
          </Row>
          :null
        }
      </Form>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
