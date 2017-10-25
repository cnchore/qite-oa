import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal,DatePicker,Select } from 'antd'
import moment from 'moment';

const FormItem = Form.Item
const Option =Select.Option;
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
  const dateTimeFormat="YYYY-MM-DD";// HH:mm:ss
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {...getFieldsValue()}
      data.maintainDateStartStr=data.maintainDateStartStr?data.maintainDateStartStr.format(dateTimeFormat):null;
      data.maintainDateEndStr=data.maintainDateEndStr?data.maintainDateEndStr.format(dateTimeFormat):null;
      
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
        
        <FormItem label="类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('type', {
            initialValue: item.type!==undefined?String(item.type):undefined,
            rules: [
              {
                required: true,message:'不能为空',
              },
            ],
          })(<Select placeholder="选择类型">
            <Option value="保养">保养</Option>
            <Option value="维修">维修</Option>
          </Select>)}
        </FormItem>
       
        <FormItem label="开始时间" hasFeedback {...formItemLayout}>
          
          {getFieldDecorator('maintainDateStartStr', {
            initialValue:(item.maintainDateStartStr || item.maintainDateStart)? moment(item.maintainDateStartStr || item.maintainDateStart,dateTimeFormat):null,
            rules: [
              {
                required: true,message:'不能为空',
              },
            ],
          })(<DatePicker format={dateTimeFormat} style={{width:'100%'}}/>)}
        </FormItem>
        <FormItem label="结束时间" hasFeedback {...formItemLayout}>
          
          {getFieldDecorator('maintainDateEndStr', {
            initialValue:(item.maintainDateEndStr || item.maintainDateEnd)? moment(item.maintainDateEndStr || item.maintainDateEnd,dateTimeFormat):null,
            rules: [
              {
                required: true,message:'不能为空',
              },
            ],
          })(<DatePicker format={dateTimeFormat} style={{width:'100%'}}/>)}
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
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
