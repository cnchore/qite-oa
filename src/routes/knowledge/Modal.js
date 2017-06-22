import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal,Row,Col,DatePicker,Select,Button } from 'antd'
import moment from 'moment';
import config from '../../utils/config'
import { Editor,FileUpload } from '../../components'
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import uploadImageCallBack from '../../services/uploadImageCallBack'


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
  setEditorState,
  fileList,
  getFileList,
  onUploadImg,
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

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
    width:1000, 
  }
  const onEditorStateChange = (editorContent) => {
    setEditorState(editorContent);
  }
  const uploadImgCallBack=(file)=>uploadImageCallBack(file,'kgimg');
  //const handleGet=()=>console.log('',fileList)
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <Row gutter={24}>
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
                <Select placeholder="发布人" size="large" style={{width:'100%'}}>
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
                initialValue: item.toId,
                rules: [
                  {
                    required: true,
                   
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={8}>  
            <FormItem label="知识点有效期" hasFeedback {...formItemLayout}>
              {getFieldDecorator('effectiveTimeStr', {
                initialValue:(item.effectiveTimeStr || item.effectiveTime)? moment(item.effectiveTimeStr || item.effectiveTime,dateTimeFormat):null,
                
              })(<DatePicker showTime format={dateTimeFormat} />)}
            </FormItem>
          </Col>
          <Col span={24}>
            <Editor
              wrapperStyle={{
                minHeight: 500,
              }}
              editorStyle={{
                minHeight: 396,
              }}
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              uploadCallback={uploadImgCallBack}
              //toolbar={{image: { uploadCallback: uploadImageCallBack }}}
            />
          </Col>
          <Col span={24}>
              <div style={{paddingBottom:'12px'}}>知识点资料</div>

              <FileUpload defaultFileList={defaultFileList} callbackParent={getFileList} />      

          </Col>
        </Row>
      </Form>
      
      
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
