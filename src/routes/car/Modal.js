import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal,DatePicker,Switch } from 'antd'
import moment from 'moment';

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
  const dateTimeFormat="YYYY-MM-DD"
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {...getFieldsValue()}
      data.buyDateStr=data.buyDateStr?data.buyDateStr.format(dateTimeFormat):null;
      
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
        
        <FormItem label="品牌" hasFeedback {...formItemLayout}>
          {getFieldDecorator('carBrand', {
            initialValue: item.carBrand,
            rules: [
              {
                required: true,message:'不能为空',
              },
            ],
          })(<Input />)}
        </FormItem>
       
        <FormItem label="车牌号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('carNum', {
            initialValue: item.carNum,
            rules: [
              {
                required: true,message:'不能为空',
               
              },
            ],
          })(<Input />)}
        </FormItem>

        <FormItem label="户主" hasFeedback {...formItemLayout}>
          {getFieldDecorator('carOwner', {
            initialValue: item.carOwner,
            rules: [
              {
                required: true,message:'不能为空',
               
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="购买日期" hasFeedback {...formItemLayout}>
          
          {getFieldDecorator('buyDateStr', {
            initialValue:(item.buyDateStr || item.buyDate)? moment(item.buyDateStr || item.buyDate,dateTimeFormat):null,
            rules: [
              {
                required: true,message:'不能为空',
              },
            ],
          })(<DatePicker format={dateTimeFormat} style={{width:'100%'}}/>)}
        </FormItem>
        <FormItem label="使用地点" hasFeedback {...formItemLayout}>
          {getFieldDecorator('usePlace', {
            initialValue: item.usePlace,
            rules: [
              {
                required: true,message:'不能为空',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="是否可以申请" hasFeedback {...formItemLayout}>
          
          {getFieldDecorator('isAppliable', {
            initialValue: Boolean(item.isAppliable),
            rules: [
              {
                required: true,message:'不能为空',
              },
            ],
          })(<Switch defaultChecked={item.isAppliable} checkedChildren={'是'} unCheckedChildren={'否'} />)}
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
