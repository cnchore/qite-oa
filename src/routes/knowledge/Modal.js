import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal,Row,Col,DatePicker,Select,Button,Icon,Affix } from 'antd'
import moment from 'moment';
import config from '../../utils/config'
import { HtmlEditor,FileUpload } from '../../components'

const confirm = Modal.confirm

const Option=Select.Option;
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
}

const twoFormItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
}

const modal = ({
  editorContent,
  editorCallback,
  item = {},
  onOk,
  title,
  onCancel,
  fileList,
  getFileList,
  confirmLoading,
  changeLoading,
  orgList,
  onItemChange,
  defaultFileList=[],
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    getFieldsValue,
    setFieldsValue,
  },
  ...modalProps
}) => {
  const getFields = () => {
    let data=null;
    validateFieldsAndScroll((err,values) => {
      if (err) {
        return null;
      }
      data = {...values}
      data.content=editorContent;
      // draftToHtml(convertToRaw(editorState.getCurrentContent()));
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
      data.effectiveTimeStr=data.effectiveTimeStr?data.effectiveTimeStr.format('YYYY-MM-DD HH:mm:ss'):null;
      
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
  const dateTimeFormat='YYYY-MM-DD HH:mm:ss'

  const editorProps={
    editorStyle:{
      height:'400px',
    },
    content:item.content,
    callback(ht){
      editorCallback && editorCallback(ht);
    }
  } 
  // const onEditorStateChange = (editorContent) => {
  //   setEditorState(editorContent);
  // }
  // const uploadImgCallBack=(file)=>uploadImageCallBack(file,'kgimg');
  //const handleGet=()=>console.log('',fileList)

  const orgOptions = orgList.map(org => <Option key={org.id}>{org.orgName}</Option>);
  const getChangeName=(state)=>{
    if(state===undefined || state===null && state===0|| state===2){
      return true;
    }
    return false;
  }
  const handleItemChange=()=>{
    confirm({
        title: `你确定${getChangeName(item.state)?'发布':'下线'}这条知识项么?`,
        onOk () {
          let fields=getFields();
            console.log(fields)
          if(fields){
            onItemChange(fields,item.id,(getChangeName(item.state)?'发布':'下线'))
          }
        },
      })
  }

  return (
      <Form layout="horizontal" onSubmit={handleOk}>
        <Row gutter={24}>
          <Col span={24} style={{display:'flex',justifyContent:'space-between',marginBottom:'24px',paddingBottom:'12px',borderBottom:'1px solid #d9d9d9'}}>
            <div className='qite-title'>
            <Icon type={item.id?'edit':'plus'} />{title}</div>
           
            <Affix target={()=>document.getElementById('layout-main')}>
         
              <div style={{backgroundColor:'#fff'}}>
                <Button  type="primary" onClick={handleItemChange} size="large" loading={changeLoading}>{(getChangeName(item.state))?'发布':'下线'}</Button>
                <Button style={{ marginLeft: 12,marginRight: 12 }} type="primary" loading={confirmLoading} onClick={handleOk} size="large">暂存</Button>
                <Button  type="ghost" onClick={onCancel} size="large">取消</Button>
              </div>
            </Affix>

          </Col>
          <Col span={24} className='qite-list-title'>
            <Icon type="credit-card" />知识点信息
          </Col>
          <Col span={14}>
            <FormItem label="知识点主题" hasFeedback {...twoFormItemLayout}>
              {getFieldDecorator('title', {
                initialValue: item.title,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={10}>  
            <FormItem  {...formItemLayout}>
            </FormItem>
          </Col> 
          <Col span={14}>
            <FormItem label="知识点对象" hasFeedback {...twoFormItemLayout}>
              {getFieldDecorator('toId', {
                initialValue: String(item.toId===undefined?'':item.toId),
                rules: [
                  {
                    required: true,message:'不能为空',
                   
                  },
                ],
              })(
                <Select  size="large" style={{width:'100%'}}>
                 {orgOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={10}>  
            <FormItem label="知识点有效期" hasFeedback {...formItemLayout}>
              {getFieldDecorator('effectiveTimeStr', {
                initialValue:(item.effectiveTimeStr || item.effectiveTime)? moment(item.effectiveTimeStr || item.effectiveTime,dateTimeFormat):null,
                
              })(<DatePicker showTime format={dateTimeFormat}  style={{width:'100%'}}/>)}
            </FormItem>
          </Col>
          <Col span={24} className='qite-list-title'>
            <Icon type="credit-card" />知识点内容
          </Col>
          <Col span={24}>
            <FormItem >
              <HtmlEditor {...editorProps} />
            </FormItem>
          </Col>
          <Col span={24} className='qite-list-title'>
            <Icon type="paper-clip" />知识点资料
          </Col>
          <Col span={24}>
            <FormItem >

              <FileUpload defaultFileList={defaultFileList} callbackParent={getFileList} />      
            </FormItem>    
          </Col>
          
        </Row>

      </Form>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
