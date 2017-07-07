import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input,InputNumber, Modal } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({

  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {...getFieldsValue()}
      if(item.parentId!==undefined){
        data.parentId=item.parentId
      } 
      if(item.id){
        data.id=item.id
      }
      onOk(data)
    })
  }
 

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="序号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('seq', {
            initialValue: item.seq,
           
          })(<InputNumber step={1} />)}
        </FormItem>
        <FormItem label="机构名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('orgName', {
            initialValue: item.orgName,
            rules: [
              {
                required: true,message:'不能为空',
              },
            ],
          })(<Input />)}
        </FormItem>
       
        <FormItem label="机构编码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('orgCode', {
            initialValue: item.orgCode,
            
          })(<Input />)}
        </FormItem>
        <FormItem label="机构类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('orgTypeName', {
            initialValue: item.orgTypeName,
            rules: [
              {
                required: true,message:'不能为空',
                
              },
            ],
          })(<Input />)}
        </FormItem>
        { true?null :
        <FormItem label="备注说明" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remark', {
            initialValue: item.remark,
            
          })(<Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} />)}
        </FormItem>
        }
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
