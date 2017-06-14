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
        <FormItem label="排序" hasFeedback {...formItemLayout}>
          {getFieldDecorator('seq', {
            initialValue: item.seq,
           
          })(<InputNumber step={1} />)}
        </FormItem>
        <FormItem label="字典名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('dicName', {
            initialValue: item.dicName,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
       
        <FormItem label="字典值" hasFeedback {...formItemLayout}>
          {getFieldDecorator('dicValue', {
            initialValue: item.dicValue,
            rules: [
              {
                required: true,
               
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('dicType', {
            initialValue: item.dicType,
            rules: [
              {
                required: true,
                
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="分组" hasFeedback {...formItemLayout}>
          {getFieldDecorator('dicGroup', {
            initialValue: item.dicGroup,
            rules: [
              {
                required: true,
                
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="备注说明" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remark', {
            initialValue: item.remark,
            
          })(<Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} />)}
        </FormItem>
        
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
