import React from 'react'
import PropTypes from 'prop-types'
import { Form, Radio,Input,Modal,Row,Col,Button,Icon,Affix,message,DatePicker,InputNumber,Checkbox,Select } from 'antd'
import moment from 'moment';
import config from '../../utils/config'
import styles from './Modal.less'
//import city from '../../utils/chinaCity'
import {getDateDiff} from '../../utils'
import EditCellTable from './EditCellTable'
import { FileUpload } from '../../components'
import CommentTable from '../../components/CommentTable'

const confirm = Modal.confirm
const { RangePicker } = DatePicker
const RadioGroup = Radio.Group;
const FormItem = Form.Item
const Option =Select.Option;
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
  adList,
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
        data[`detailList[${index}].costDetail`]=f.costDetail.value;
        data[`detailList[${index}].costAmount`]=f.costAmount.value;
      })
      data.adTimeStartStr=data.adTime?data.adTime[0].format(dateTimeFormat):null;
      data.adTimeEndStr=data.adTime?data.adTime[1].format(dateTimeFormat):null;
      if(!data.adDays){
        data.adDays=getDateDiff(data.adTimeStartStr,data.adTimeEndStr);
      }
      data.adTime=null;
      data.cost=item.cost;
      data.adForm=data.adForm.join();
      // data.adIds=data.adIds && data.adIds.join();
      if(data.adIds){
        // let _a=`,${data.adIds}`;
        // data.adCodes=adList.filter(f=>_a.indexOf(`,${f.id}`)>-1).map(c=>c.code).join();
        let _r=adList.filter(f=>String(f.id)===String(data.adIds));
        data.adCodes=_r?_r[0].code:'';
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
        costDetail: {
          editable: false,
          value: temp.costDetail?temp.costDetail:'',
        },
        costAmount: {
          editable:false,
          value: temp.costAmount!==null&&temp.costAmount!==undefined?temp.costAmount:0,
        },
      }
      return newRow;
    })
  }else{
    defaultDetailList=[];
  }
  if(defaultDetailList[0]){
    item.cost=0;
    defaultDetailList.forEach(d=>{item.cost+=parseFloat(d.costAmount.value);})
    if(item.cost){
      item.clientPay=(item.cost * 0.5).toFixed(2);
      item.companyPay=(item.cost * 0.5).toFixed(2);
    }
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
  const adFormOptions=['电视','报纸','标牌','小区'];
  if((item.adTimeStartStr || item.adTimeStart) && (item.adTimeEndStr || item.adTimeEnd)){
    item.adTime=[moment(item.adTimeStartStr || item.adTimeStart,dateTimeFormat),moment(item.adTimeEnd || item.adTimeEndStr,dateTimeFormat)]
  }
  const handleAdTimeChange=(dates,dateStrings)=>{
    item.adDays=dateStrings?getDateDiff(dateStrings[0],dateStrings[1]):0;
  }
  const adOptions=adList.map(ad=><Option key={String(ad.id)}>{ad.code}</Option>)
  
  if(item.adList && item.adList[0]){
    item.adIds=item.adList.map(m=>String(m.id))[0];
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
                    <Button type="primary" loading={submitLoading} onClick={e=>handleSubmit({userId:-1})} size="large">提交</Button>
                    <Button style={{ marginLeft: 12,marginRight: 12 }} type="primary" loading={confirmLoading} onClick={handleOk} size="large">暂存</Button>
                    <Button  type="ghost" onClick={onCancel} size="large">取消</Button>
                  </div>)
                }
            </Affix>

          </Col>
          <Col span={24} className='qite-list-title'>
            <Icon type="credit-card" />广告费用报销申请信息
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
          <Col xs={18} md={8} xl={13} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {item.createTime || item.createTimeStr || '系统自动生成'}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label-require']}>
            广告投放申请单：
          </Col>
          <Col xs={18} md={20} xl={13} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem style={{width:'100%'}}>
              {getFieldDecorator('adIds', {
                initialValue:item.adIds?item.adIds:undefined,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<Select >{adOptions}</Select>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            申请区域：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {getFieldDecorator('applyArea', {
                initialValue: item.applyArea,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            客户姓名：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {getFieldDecorator('clientName', {
                initialValue: item.clientName,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<Input/>)}
            </FormItem>
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            客户地址：
          </Col>
          <Col xs={18} md={20} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {getFieldDecorator('clientAddress', {
                initialValue: item.clientAddress,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            广告主题：
          </Col>
          <Col xs={18} md={20} xl={21} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {getFieldDecorator('adTheme', {
                initialValue: item.adTheme,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            广告背景：
          </Col>
          <Col xs={18} md={20} xl={21} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {getFieldDecorator('adBackground', {
                initialValue: item.adBackground,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<Input type="textarea" autosize={{ minRows: 2, maxRows: 5 }} />)}
            </FormItem>
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            广告目的：
          </Col>
          <Col xs={18} md={20} xl={21} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {getFieldDecorator('adGoal', {
                initialValue: item.adGoal,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<Input type="textarea" autosize={{ minRows: 2, maxRows: 5 }} />)}
            </FormItem>
          </Col>

          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            广告时间：
          </Col>
          <Col xs={18} md={20} xl={13} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {getFieldDecorator('adTime', {
                initialValue:item.adTime,
                rules: [
                  {
                    required: true,message:'不能为空',
                   
                  },
                ],
                onChange:handleAdTimeChange,
              })(<RangePicker showTime format={dateTimeFormat}  style={{width:'100%'}}/>)}
            </FormItem>
          </Col>
          
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            广告天数：
          </Col>
          <Col xs={18} md={20} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem >
              {getFieldDecorator('adDays', {
                initialValue:item.adDays?item.adDays:0,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<InputNumber style={{width:'100%'}} precision={2} step={1} />)}
            </FormItem>
            <FormItem >天</FormItem>
          </Col>
        </Row>
        <Row gutter={24} className={styles['q-detail']}> 
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            广告形式：
          </Col>
          <Col xs={18} md={20} xl={21} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {getFieldDecorator('adForm', {
                initialValue: item.adForm&& !(item.adForm instanceof Array)?item.adForm.split(','):null,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<CheckboxGroup options={adFormOptions} />)}
            </FormItem>
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            活动内容：
          </Col>
          <Col xs={18} md={20} xl={21} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {getFieldDecorator('actContent', {
                initialValue: item.actContent,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<Input type="textarea" autosize={{ minRows: 2, maxRows: 5 }} />)}
            </FormItem>
          </Col>
          <Col xs={6} md={5} xl={3} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label-require']}>
            促销期销售计划：
          </Col>
          <Col xs={18} md={19} xl={9} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem >
              {getFieldDecorator('saleGoal', {
                initialValue:item.saleGoal?item.saleGoal:0,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<InputNumber style={{width:'100%'}} precision={2} step={1} />)}
            </FormItem>
            <FormItem >元</FormItem>
          </Col>
          <Col xs={6} md={5} xl={3} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label-require']}>
            去年同期销售额：
          </Col>
          <Col xs={18} md={19} xl={9} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem >
              {getFieldDecorator('lastYearSales', {
                initialValue:item.lastYearSales?item.lastYearSales:0,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<InputNumber style={{width:'100%'}} precision={2} step={1} />)}
            </FormItem>
            <FormItem >元</FormItem>
          </Col>
          <Col xs={6} md={5} xl={3} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label-require']}>
            预计达成销售：
          </Col>
          <Col xs={18} md={19} xl={9} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem >
              {getFieldDecorator('estiSale', {
                initialValue:item.estiSale?item.estiSale:0,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<InputNumber style={{width:'100%'}} precision={2} step={1} />)}
            </FormItem>
            <FormItem >元</FormItem>
          </Col>
          <Col xs={6} md={5} xl={3} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label-require']}>
            预估销售提高：
          </Col>
          <Col xs={18} md={19} xl={9} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem >
              {getFieldDecorator('estiImprove', {
                initialValue:item.estiImprove?item.estiImprove:0,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<InputNumber style={{width:'100%'}} precision={2} step={1} />)}
            </FormItem>
            <FormItem >元</FormItem>
          </Col>
          
          
          
        </Row>

        
        <EditCellTable dicList={dicList} 
          dataSource={defaultDetailList} 
          callbackParent={getDetailList}
          setIsEditable={setIsEditable}
          className={styles['q-detail']}/>
          <br/> 
        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label-require']}>
            费用合计：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem >
              {item.cost || 0}
            </FormItem>
            <FormItem >元</FormItem>
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label-require']}>
            客户分摊：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem >
              {getFieldDecorator('clientPay', {
                initialValue:item.clientPay?item.clientPay:0,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<InputNumber style={{width:'100%'}} precision={2} step={1} readOnly/>)}
            </FormItem>
            <FormItem >元</FormItem>
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label-require']}>
            公司分摊：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem >
              {getFieldDecorator('companyPay', {
                initialValue:item.companyPay?item.companyPay:0,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<InputNumber style={{width:'100%'}} precision={2} step={1} readOnly/>)}
            </FormItem>
            <FormItem >元</FormItem>
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
