import React from 'react'
import PropTypes from 'prop-types'
import { Form,Modal,Row,Col,
  Radio,Input,Button,Icon,Affix,
  message,DatePicker,InputNumber } from 'antd'
import moment from 'moment';
import styles from './FormGeneral.less'
import FileUpload from '../FileUpload'
import CommentTable from '../CommentTable'
import SelectUser from '../SelectUser'

const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const formItemLayout = {}
const dateTimeFormat='YYYY-MM-DD HH:mm:ss';
const FormItem = Form.Item;

const FormGeneral = ({
  state = {},
  title,
  cards,
  formActions={},
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    getFieldsValue,
    setFieldsValue,
  },
  ...formProps
}) => {
  const { currentItem,taskData,fileList } =state;
  let defaultFileList=[];

  const getFields=()=>{
    let data=null;
    validateFieldsAndScroll((err,values)=>{
      if(err) {
        return null;
      }
      data={...values};
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
      if(currentItem.id){
        data.id=currentItem.id;
        data.code=currentItem.code;
      }
    })
    return data;
  }
  const handleOk = () => {
    let fields=getFields();
    if(fields){
      formActions.onOk(fields);
    }
  }
  const handleSubmit=(data)=>{
    confirm({
        title: `你确定提交申请么?`,
        onOk () {
          let fields=getFields();
          fields.isupdated=true;
          if(fields){
            formActions.onSubmit(fields,data)
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
            formActions.onAudit(formItem,taskItem)
        },
      })
    }
  }
  //暂时采用业务组建开发方式
  const btns=taskData && taskData.taskId?
      <div className={styles['flex-btn']}>
        <Button type="primary" loading={formActions.auditLoading} onClick={handleAudit} size="large">{formActions.auditText}</Button>
        <Button  type="ghost" onClick={formActions.onGoback} size="large">返回待办</Button>
      </div>
    :<div className={styles['flex-btn']}>
      <SelectUser type="button" loading={formActions.submitLoading} callBack={handleSubmit} >提交</SelectUser>
      <Button  type="primary" loading={formActions.okLoading} onClick={handleOk} size="large">暂存</Button>
      <Button  type="ghost" onClick={formActions.onCancel} size="large">取消</Button>
    </div>;

  const getFormItem=(col)=>{
    if(!col) return null;
    switch(col.type){
      case 'label':
        return eval(col.field) || col.defaultValue;
      case 'input':
        return getFieldDecorator(col.field,{
          initialValue:eval(col.defaultValue),
          rules:col.rules
        })(<Input {...col.props}/>);
      case 'InputNumber':
        return <div className={styles['q-detail-flex-conent']}>
          <span>{col.addonBefore}</span>
          {getFieldDecorator(col.field,{
            initialValue:eval(col.defaultValue),
            rules:col.rules
          })(<InputNumber {...col.props}/>)}
        </div>;
      case 'DatePicker':
        return getFieldDecorator(col.field,{
          initialValue:eval(col.defaultValue)?moment(eval(col.defaultValue),col.props.format):null,
          rules:col.rules
        })(<DatePicker {...col.props}/>);
    }
  }
  const getCardRows=(rows)=>{
    if(!rows || rows.length<1){
      return null;
    }
    return rows.map((row,index)=><Col {...row.layout} key={`col${index}`}>
          <FormItem label={row.text} {...formItemLayout} className={styles['q-detail-conent']}>
            {getFormItem(row)}
          </FormItem>
        </Col>)
  }
  const rows=cards?
    cards.map((card,index)=>{
      return <Row gutter={24} className={styles['q-detail']} key={`row${index}`}>
              {
                card.title?
                  <Col key={`card${index}`} className='qite-list-title'>
                    <Icon type="credit-card" />{card.title && card.title}
                  </Col>
                :null
              }
              {getCardRows(card.rows)}
             </Row>
    })
    :null;
  if(fileList && fileList[0]){
    defaultFileList=fileList.map((temp)=>{
      if(temp.createTime)
        return {...temp,uid:temp.id,status:'done',url:temp.attachUrl,name:temp.attachName}
      return {...temp}
    })
  }else if(currentItem.attachList&& currentItem.attachList[0]){
    defaultFileList=currentItem.attachList.map((temp)=>{
      return {...temp,uid:temp.id,status:'done',url:temp.attachUrl,name:temp.attachName}
    })
  }
  const actionRadio=taskData.actionMap?Object.keys(taskData.actionMap).map(act=><Radio value={act} key={act}>{taskData.actionMap[act]}</Radio>):null;
  const uploadCallback=(fileList)=>{
    formActions.setState({fileList});
  }
  return (
     <Form layout='horizontal'>
      <Row gutter={24} className={styles['q-detail']}>
        <Col span={24} className={styles['q-header']}>
          <div className='qite-title'><Icon type={currentItem.id?'edit':'plus'} />{title}</div>
          <Affix target={()=>document.getElementById('layout-main')}>
            {btns}
          </Affix>
        </Col>
      </Row> 
       {rows}
      <Row gutter={24} className={styles['q-detail']}>
        <Col span={24} className='qite-list-title'>
          <Icon type="paper-clip" />申请附件
        </Col>
        <Col span={24}>
          <FormItem >
            <FileUpload defaultFileList={defaultFileList} callbackParent={uploadCallback} />      
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
          <Col span={24} className={styles['q-detail-conent']}>
            <FormItem label="操作" {...formItemLayout}>
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

FormGeneral.propTypes = {
 
}

export default Form.create()(FormGeneral)
