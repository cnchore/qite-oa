import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal,Row,Col,DatePicker,Select } from 'antd'
import moment from 'moment';
import config from '../../utils/config'
import { Editor } from '../../components'
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
  fileUrl,
  onUploadImg,
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
      if(item.id){
        data.id=item.id
      }
      onOk(data)
    })
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
        </Row>
      </Form>

      <Editor
        wrapperStyle={{
          minHeight: 500,
        }}
        editorStyle={{
          minHeight: 376,
        }}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        uploadCallback={uploadImgCallBack}
        //toolbar={{image: { uploadCallback: uploadImageCallBack }}}
      />
            
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
