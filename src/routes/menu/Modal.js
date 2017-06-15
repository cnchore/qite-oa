import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input,InputNumber,Select, Modal } from 'antd'

const FormItem = Form.Item
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  dicList=[{id:1,dicName:'菜单'},{id:2,dicName:'操作'}],
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
  const dicOptions = dicList.map(dic => <Option key={dic.id}>{dic.dicName}</Option>);
  const handleSelectChange = (value,name) => {
    
    setFieldsValue({
      name: value
    });
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="排序" hasFeedback {...formItemLayout}>
          {getFieldDecorator('seq', {
            initialValue: item.seq,
           
          })(<InputNumber step={1} />)}
        </FormItem>
        <FormItem label="菜单名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('menuName', {
            initialValue: item.menuName,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
       
        <FormItem label="菜单类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('type', {
            initialValue: String(item.type || 1),
            rules: [
              {
                required: true,
               
              },
            ],
          })(<Select onChange={e=>handleSelectChange(e.value,'type')}>{dicOptions}</Select>)}
        </FormItem>
        <FormItem label="菜单图标" hasFeedback {...formItemLayout}>
          {getFieldDecorator('iconUrl', {
            initialValue: item.iconUrl,
            
          })(<Input />)}
        </FormItem>
        <FormItem label="菜单地址" hasFeedback {...formItemLayout}>
          {getFieldDecorator('src', {
            initialValue: item.src,
            
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
