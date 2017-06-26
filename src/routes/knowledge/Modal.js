import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal,Row,Col,DatePicker,Select,Button,Icon,Affix } from 'antd'
import moment from 'moment';
import config from '../../utils/config'
import { Editor,FileUpload } from '../../components'
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import uploadImageCallBack from '../../services/uploadImageCallBack'

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
    span: 4,
  },
  wrapperCol: {
    span: 19,
  },
}
const textareaStyle = {
  minHeight: 496,
  width: '100%',
  background: '#f7f7f7',
  borderColor: '#F1F1F1',
  padding: '16px 8px',
}
const modal = ({
  editorState,
  item = {},
  onOk,
  title,
  onCancel,
  setEditorState,
  fileList,
  getFileList,
  onUploadImg,
  confirmLoading,
  changeLoading,
  orgList,
  onItemChange,
  defaultFileList=[{
      uid:'-1',
      status:'done',
      name:'安全窗大样图.jpg',
      url:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }],
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {...getFieldsValue()}
      data.content=draftToHtml(convertToRaw(editorState.getCurrentContent()));
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
        data.id=item.id
      }
      onOk(data)
    })
  }
  if(item.attachList&& item.attachList[0]){
    defaultFileList=item.attachList.map((temp)=>{
      return {...temp,uid:temp.id,status:'done',url:temp.attachUrl,name:temp.attachName}
    })
  }else{
    defaultFileList=[];
  }
  const dateTimeFormat='YYYY-MM-DD HH:mm:ss'

 
  const onEditorStateChange = (editorContent) => {
    setEditorState(editorContent);
  }
  const uploadImgCallBack=(file)=>uploadImageCallBack(file,'kgimg');
  //const handleGet=()=>console.log('',fileList)

  const orgOptions = orgList.map(org => <Option key={org.id}>{org.orgName}</Option>);

  const handleItemChange=()=>{
    confirm({
        title: `你确定${item.state===0||item.state===2?'发布':'下线'}这条知识项么?`,
        onOk () {
          onItemChange(item.id,(item.state===0||item.state===2?'发布':'下线'))
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
                {item.id?<Button  type="primary" onClick={handleItemChange} size="large" loading={changeLoading}>{(item.state===0||item.state===2)?'发布':'下线'}</Button>:null}
                <Button style={{ marginLeft: 12,marginRight: 12 }} type="primary" loading={confirmLoading} onClick={handleOk} size="large">确定</Button>
                <Button  type="ghost" onClick={onCancel} size="large">取消</Button>
              </div>
            </Affix>

          </Col>
          <Col span={24} className='qite-list-title'>
            <Icon type="credit-card" />知识点信息
          </Col>
          <Col span={16}>
            <FormItem label="知识点主题" hasFeedback {...twoFormItemLayout}>
              {getFieldDecorator('title', {
                initialValue: item.title,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={8}>  
            <FormItem label="知识点状态" hasFeedback {...formItemLayout}>
              {getFieldDecorator('state', { 
                initialValue: String(item.state===undefined?'':item.state)
              })(
                <Select size="large" style={{width:'100%'}}>
                  <Option key='0'>未发布</Option>
                  <Option key='1'>已发布</Option>
                  <Option key='2'>已下线</Option>
                </Select>
              )}
            </FormItem>
          </Col> 
          <Col span={16}>
            <FormItem label="知识点对象" hasFeedback {...twoFormItemLayout}>
              {getFieldDecorator('toId', {
                initialValue: String(item.toId===undefined?'':item.toId),
                rules: [
                  {
                    required: true,
                   
                  },
                ],
              })(
                <Select  size="large" style={{width:'100%'}}>
                 {orgOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>  
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

              <Editor
                wrapperStyle={{
                  minHeight: 500,
                }}
                editorStyle={{
                  height: 396,
                }}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                uploadCallback={uploadImgCallBack}
                //toolbar={{image: { uploadCallback: uploadImageCallBack }}}
              />
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
