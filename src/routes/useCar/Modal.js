import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input,Select,Radio, InputNumber,Modal,Row,Col,DatePicker,Button,Icon,Affix } from 'antd'
import moment from 'moment';
import config from '../../utils/config'
import { FileUpload,SelectUser } from '../../components'
// import uploadImageCallBack from '../../services/uploadImageCallBack'
import styles from './Modal.less'
//import city from '../../utils/chinaCity'
import {changeMoneyToChinese} from '../../utils'
import CommentTable from '../../components/CommentTable'

const confirm = Modal.confirm
const { RangePicker } = DatePicker
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option=Select.Option;
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
      data.useTimeStr=data.useTimeStr?data.useTimeStr.format(dateTimeFormat):null;
      data.returnTimeStr=data.returnTimeStr?data.returnTimeStr.format(dateTimeFormat):null;
      
      
      //console.log('-----',data)
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
      formItem.isupdated=true;
      // console.log('formItem')
      confirm({
        title:'你确定提交修改么？',
        onOk(){
            if(taskData && taskData.taskId){
              let _formItem={...item,...formItem,useTimeStr:item.useTime,returnTimeStr:item.returnTime};
              delete _formItem.useTime;
              delete _formItem.returnTime;
              delete _formItem.createTime;
              delete _formItem.updateTime;
              onAudit(_formItem,taskItem)
            }else{
              onAudit(formItem,taskItem)
            }
          
        },
      })
    }
  }
  const actionRadio=taskData.actionMap?Object.keys(taskData.actionMap).map(act=><Radio value={act} key={act}>{taskData.actionMap[act]}</Radio>):null;
  
  const getHours=(t=null)=>{
    let a,b;
    if(taskData && taskData.taskId){
      a=item.useTime;
      b=item.returnTime;
    }else{
      const data = {...getFieldsValue()}
      a=data.useTimeStr?(data.useTimeStr?data.useTimeStr.format(dateTimeFormat):null):null;
      b=data.returnTimeStr?(data.returnTimeStr?data.returnTimeStr.format(dateTimeFormat):null):null;
    }
    
    if(!a||!b){
      return 0;
    }
    let timeA=new Date(a);
    let timeB=new Date(b);
    return ((timeB-timeA)/(3600*1000)).toFixed(2)
  }
  const getMileage=()=>{
    const data={...getFieldsValue()};
    if(data.mileageStart===undefined || data.mileageEnd===undefined){
      return 0;
    }
    return (parseFloat(data.mileageEnd)-parseFloat(data.mileageStart)).toFixed(2);
  }
  const getCostTotal=()=>{
    const data={...getFieldsValue()};
    if(data.oilCost===undefined || data.roadToll===undefined){
      return 0;
    }
    return (parseFloat(data.oilCost)+parseFloat(data.roadToll)).toFixed(2);
  }
  const dicOption=dicList.map(dic=><Option key={String(dic.id)} disabled={!dic.isAppliable}>{dic.carBrand && dic.carBrand}，{dic.carNum && dic.carNum}</Option>)
  if(taskData && taskData.taskId && item.carId){
    let _info=dicList.filter(f=>String(f.id)===String(item.carId));
    if(_info && _info[0]){
      item.carInfo=`${_info[0].carBrand && _info[0].carBrand}，${_info[0].carNum && _info[0].carNum}`;
    }else{
      item.carInfo='无';
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
                    onClick={handleAudit} size="large">还车并提交</Button>
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
            <Icon type="credit-card" />用车申请信息
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
            用车事由：
          </Col>
          <Col xs={18} md={20} xl={22} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            {
              taskData && taskData.taskId?
              <FormItem>
                {item.remark || '无'}
              </FormItem>
              :
              <FormItem style={{width:'100%'}} >
                {getFieldDecorator('remark', {
                  initialValue:item.remark,
                  rules: [
                    {
                      required: true,message:'不能为空',
                     
                    },
                  ],
                })(<Input type="textarea" autosize={{ minRows: 2, maxRows: 5 }}  style={{width:'100%'}}/>)}
                
              </FormItem>
            }
          </Col>
         
        </Row>
        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            车辆类型：
          </Col>
          <Col xs={18} md={20} xl={22} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            {
              taskData && taskData.taskId?
              <FormItem>
                {item.carInfo}
              </FormItem>
              :
              <FormItem style={{width:'100%'}}>
                {getFieldDecorator('carId', {
                  initialValue:item.carId?String(item.carId):undefined,
                  rules: [
                    {
                      required: true,message:'不能为空',
                    },
                  ],
                })(<Select style={{width:'100%'}}>{dicOption}</Select>)}
                
              </FormItem>
            }
            
          </Col>
        </Row>
        <Row gutter={24} className={styles['q-detail']}>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label-require']}>
            出车时间：
          </Col>
          <Col xs={18} md={6} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            {
              taskData && taskData.taskId?
              <FormItem>
                {item.useTime || '无'}
              </FormItem>
              :
              <FormItem style={{width:'100%'}}>
                {getFieldDecorator('useTimeStr', {
                  initialValue:item.useTime!==undefined&&item.useTime!==null?moment(item.useTime,dateTimeFormat):null,
                  rules: [
                    {
                      required: true,message:'不能为空',
                     
                    },
                  ],
                })(<DatePicker showTime format={dateTimeFormat}  style={{width:'100%'}}/>)}
              </FormItem>
            }
            
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label-require']}>
            预计返回时间：
          </Col>
          <Col xs={18} md={10} xl={14} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            {
              taskData && taskData.taskId?
              <FormItem>
                {item.returnTime}
              </FormItem>
              :
              <FormItem style={{width:'80%'}}>
                {getFieldDecorator('returnTimeStr', {
                  initialValue:item.returnTime!==undefined&&item.returnTime!==null?moment(item.returnTime,dateTimeFormat):null,
                  rules: [
                    {
                      required: true,message:'不能为空',
                     
                    },
                  ],
                })(<DatePicker showTime format={dateTimeFormat}  style={{width:'80%'}}/>)}
              </FormItem>
            }
            <FormItem style={{width:'20%'}}> ，共 {getHours()} 小时</FormItem>
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            预计目的地：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            {
              taskData && taskData.taskId?
              <FormItem>
                {item.estiLocation}
              </FormItem>
              :
              <FormItem style={{width:'100%'}} >
                {getFieldDecorator('estiLocation', {
                  initialValue:item.estiLocation,
                  rules: [
                    {
                      required: true,message:'不能为空',
                    },
                  ],
                })(<Input />)}
              </FormItem>
            }
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label-require']}>
              预计公里数：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            {
              taskData && taskData.taskId?
              <FormItem>
                {item.estiKilometer}
              </FormItem>
              :
              <FormItem style={{width:'80%'}}>
                {getFieldDecorator('estiKilometer', {
                  initialValue:item.estiKilometer!==undefined && item.estiKilometer!==null?Number(item.estiKilometer):0,
                  rules: [{required: true,message:'不能为空',},],
                })(<InputNumber precision={2}
                  style={{width:'100%'}}/>
                 )}
              </FormItem>
            }
            <FormItem style={{width:'20%'}}>公里</FormItem>
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            司机名称：
          </Col>
          <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            {
              taskData && taskData.taskId?
              <FormItem>
                {item.driverName || '无'}
              </FormItem>
              :
              <FormItem style={{width:'100%'}} >
                {getFieldDecorator('driverName', {
                  initialValue:item.driverName,
                  rules: [
                    {
                      required: true,message:'不能为空',
                    },
                  ],
                })(<Input/>)}
              </FormItem>
            }
          </Col>
        </Row>
        {
          item.state===-2 || item.mileageStart?
          <Row gutter={24} className={styles['q-detail']}>
            <Col span={24} className='qite-list-title'>
              <Icon type="credit-card" />交车信息
            </Col>
          </Row>
          :null
        }
        {
          item.state===-2 || item.mileageStart?
          <Row gutter={24} className={styles['q-detail']}>
            <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label-require']}>
              拿车里程：
            </Col>
            <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
              <FormItem style={{width:'80%'}}>
                {getFieldDecorator('mileageStart', {
                  initialValue:item.mileageStart!==undefined && item.mileageStart!==null?Number(item.mileageStart):0,
                  rules: [{required: true,message:'不能为空',},],
                })(<InputNumber precision={2}
                  style={{width:'100%'}}/>
                 )}
              </FormItem>
              <FormItem style={{width:'20%'}}>公里</FormItem>
            </Col>
            <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label-require']}>
              交车里程：
            </Col>
            <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
              <FormItem style={{width:'80%'}}>
                {getFieldDecorator('mileageEnd', {
                  initialValue:item.mileageEnd!==undefined && item.mileageEnd!==null?Number(item.mileageEnd):0,
                  rules: [{required: true,message:'不能为空',},],
                })(<InputNumber 
                  style={{width:'100%'}}/>
                 )}
              </FormItem>
              <FormItem style={{width:'20%'}}>公里</FormItem>
            </Col>
            <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label']}>
              共行驶：
            </Col>
            <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
              <FormItem >
                {getMileage()} 公里
              </FormItem>
              
            </Col>
            <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label']}>
              邮费：
            </Col>
            <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
              <FormItem style={{width:'80%'}}>
                {getFieldDecorator('oilCost', {
                  initialValue:item.oilCost!==undefined && item.oilCost!==null?Number(item.oilCost):0,
                })(<InputNumber 
                  style={{width:'100%'}}/>
                 )}
              </FormItem>
              <FormItem style={{width:'20%'}}>元</FormItem>
            </Col>
            <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label']}>
              过路费：
            </Col>
            <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
              <FormItem style={{width:'80%'}}>
                {getFieldDecorator('roadToll', {
                  initialValue:item.roadToll!==undefined && item.roadToll!==null?Number(item.roadToll):0,
                })(<InputNumber 
                  style={{width:'100%'}}/>
                 )}
              </FormItem>
              <FormItem style={{width:'20%'}}>元</FormItem>
            </Col>
            <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px',paddingLeft:'0px' }} className={styles['q-detail-label']}>
              合计费用：
            </Col>
            <Col xs={18} md={8} xl={6} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
              <FormItem>
              {getCostTotal()}
              &nbsp;&nbsp;&nbsp;&nbsp;
              大写：{changeMoneyToChinese(getCostTotal())}
              </FormItem>
            </Col>
          </Row> 
          :null
        }
        
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
