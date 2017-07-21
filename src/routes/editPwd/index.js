import React from 'react'
import PropTypes from 'prop-types'
import { Form,Input,Modal } from 'antd'
const FormItem =Form.Item
const formItemLayout={
	labelCol:{
		span:6,
	},
	wrapperCol:{
		span:14,
	}
}
const editPwd=({
	onOk,
	form:{
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		getFieldValue,
	},
	...editPwdProps
})=>{
	const handleOk=()=>{
		validateFields(errors=>{
			if(errors){
				return
			}
			const data={...getFieldsValue()}
			console.log(data)
			onOk && onOk(data);
		})
	}
	const modalProps={
		...editPwdProps,
		onOk:handleOk,
	}
	const checksecondPassword = (rule, value, callback) => {
    let np=getFieldValue('newPassWord')
    // console.log(value,np)
    if (value && np && value !== np) {
      callback('两次密码应该一致');
    } else {
      callback();
    }
  }
  const checknewPassword = (rule, value, callback) => {
  	let sp=getFieldValue('secondPassWord')
    // console.log(value,sp)
    if (value && sp && value !== sp) {
      callback('两次密码应该一致');
    } else {
      callback();
    }
  }
	return (
		<Modal {...modalProps}>
			<Form layout="horizontal">
				<FormItem label="旧密码" hasFeedback {...formItemLayout}>
					{getFieldDecorator('oldPassWord',{
						initialValue:null,
						rules:[{
							required:true,message:'不能为空',
						}]
					})( <Input type="password" />)}
				</FormItem>
				<FormItem label="新密码" hasFeedback {...formItemLayout}>
					{getFieldDecorator('newPassWord',{
						initialValue:null,
						rules:[{
							required:true,message:'不能为空',
						},{
							validator: checknewPassword,
						}]
					})( <Input type="password" />)}
				</FormItem>
				<FormItem label="确认新密码" hasFeedback {...formItemLayout}>
					{getFieldDecorator('secondPassWord',{
						initialValue:null,
						rules:[{
							required:true,message:'不能为空',
						},{
							validator: checksecondPassword,
						}]
					})( <Input type="password" />)}
				</FormItem>
			</Form>
		</Modal>
	)
}
editPwd.porpTypes={
	form:PropTypes.object.isRequired,
	onOK:PropTypes.func,
}
export default Form.create()(editPwd)