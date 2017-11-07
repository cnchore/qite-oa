import React from 'react'
import PropTypes from 'prop-types'
import { Form, Radio,Input,Modal,Row,Col,Button,Icon,Affix,message,Switch } from 'antd'
//import moment from 'moment';
import config from '../../utils/config'
// import uploadImageCallBack from '../../services/uploadImageCallBack'
import styles from './Modal.less'
//import city from '../../utils/chinaCity'
// import {changeMoneyToChinese} from '../../utils'
// import EditCellTable from './EditCellTable'
import { FileUpload,SelectUser } from '../../components'
import CommentTable from '../../components/CommentTable'

const confirm = Modal.confirm
//const { RangePicker } = DatePicker
const RadioGroup = Radio.Group;
const FormItem = Form.Item
//const Option =Select.Option;

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
  const dateTimeFormat='YYYY-MM-DD HH:mm:ss'

  const getFields = () => {
    let data=null;
    validateFieldsAndScroll((err,values) => {
      if (err) {
        return null;
      }
      if(isEditable){
        message.warning('请先保存预算明细');
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
            <Icon type="credit-card" />公章使用申请信息
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
          <Col xs={18} md={20} xl={13} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {item.createTime || item.createTimeStr || '系统自动生成'}
            </FormItem>
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            盖章类别：
          </Col>
          <Col xs={18} md={8} xl={13} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {getFieldDecorator('type', {
                initialValue: item.type,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            是否外带：
          </Col>
          <Col xs={18} md={8} xl={5} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {getFieldDecorator('isTakeOut', {
                  initialValue: Boolean(item.isTakeOut),
                  
                })(<Switch defaultChecked={item.isTakeOut} checkedChildren={'是'} unCheckedChildren={'否'} />)}
              </FormItem>
          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            用章原因：
          </Col>
          <Col xs={18} md={20} xl={21} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {getFieldDecorator('reason', {
                initialValue: item.reason,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<Input type="textarea" autosize={{ minRows: 2, maxRows: 5 }}/>)}
            </FormItem>
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
