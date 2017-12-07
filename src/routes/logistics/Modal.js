import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal,DatePicker,Select,InputNumber,message,Row,Col,Cascader } from 'antd'
import moment from 'moment';
// import {treeToArray} from '../../utils'
// import city from '../../utils/chinaCity'
// const cityArray=treeToArray(city,null,'parent','value');

const FormItem = Form.Item;
const Option=Select.Option;

const formItemLayout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
}
const doubleFormItemLayout={
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
}
const modal = ({
  needRemark,
  setNeedRemark,
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const dateFormat="YYYY-MM-DD"
  const dateTimeFormat="YYYY-MM-DD HH:ss:mm"
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {...getFieldsValue()}
      if(needRemark && !data.remark){
        message.error('请在备注中，填写运输异常情况！');
        return;
      }
      data.deliveryDateStr=data.deliveryDateStr?data.deliveryDateStr.format(dateTimeFormat):null;          //发货日期及装货时间
      data.sendLogisticsTimeStr=data.sendLogisticsTimeStr?data.sendLogisticsTimeStr.format(dateTimeFormat):null;       //发送到物流时间
      data.predictArrivalTimeStr=data.predictArrivalTimeStr?data.predictArrivalTimeStr.format(dateTimeFormat):null;      //估计到货时间
      
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
  const handleSelect=(value)=>{
    if(value==='-1'){
      setNeedRemark(true);
    }else{
      setNeedRemark(false);
    }
  }
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <Row>
          <Col span={12}>
            <FormItem label="物流状态" hasFeedback {...formItemLayout}>
              {getFieldDecorator('logisticsState', {
                initialValue: item.logisticsState!==undefined?String(item.logisticsState):undefined,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
                onChange:handleSelect,
              })(<Select >
                  <Option value="-1">运输异常</Option>
                  <Option value="0">运输途中</Option>
                  <Option value="1">已完成</Option>
                </Select>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="省份" hasFeedback {...formItemLayout}>
              {getFieldDecorator('province', {
                initialValue: item.province,
                
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="客户姓名" hasFeedback {...formItemLayout}>
              {getFieldDecorator('clientName', {
                initialValue: item.clientName,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="客户联系方式" hasFeedback {...formItemLayout}>
              {getFieldDecorator('clientPhone', {
                initialValue: item.clientPhone,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label="客户地址" hasFeedback {...doubleFormItemLayout}>
              {getFieldDecorator('clientAddress', {
                initialValue: item.clientAddress,
                
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="订单编号" hasFeedback {...formItemLayout}>
              {getFieldDecorator('orderCode', {
                initialValue: item.orderCode,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="指定物流" hasFeedback {...formItemLayout}>
              {getFieldDecorator('logistics', {
                initialValue: item.logistics,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label="物流地址" hasFeedback {...doubleFormItemLayout}>
              {getFieldDecorator('logisticsAddress', {
                initialValue: item.logisticsAddress,
                
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="到指定物流距离（米）" hasFeedback {...formItemLayout}>
              {getFieldDecorator('logisticsDistance', {
                initialValue: item.logisticsDistance,
                
              })(<InputNumber min={0} precision={2} style={{width:'100%'}}/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="物流电话" hasFeedback {...formItemLayout}>
              {getFieldDecorator('logisticsPhone', {
                initialValue: item.logisticsPhone,
                
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="运输周期（天）" hasFeedback {...formItemLayout}>
              {getFieldDecorator('transportationCycle', {
                initialValue: item.transportationCycle,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<InputNumber min={0} style={{width:'100%'}}/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="发货日期及装货时间" hasFeedback {...formItemLayout}>
              {getFieldDecorator('deliveryDateStr', {
                initialValue:(item.deliveryDateStr || item.deliveryDate)? moment(item.deliveryDateStr || item.deliveryDate,dateTimeFormat):null,
                
              })(<DatePicker format={dateTimeFormat} showTime style={{width:'100%'}}/>)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="发送到物流时间" hasFeedback {...formItemLayout}>
              {getFieldDecorator('sendLogisticsTimeStr', {
                initialValue:(item.sendLogisticsTimeStr || item.sendLogisticsTime)? moment(item.sendLogisticsTimeStr || item.sendLogisticsTime,dateTimeFormat):null,
                
              })(<DatePicker format={dateTimeFormat} showTime style={{width:'100%'}}/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="估计到货时间" hasFeedback {...formItemLayout}>
              {getFieldDecorator('predictArrivalTimeStr', {
                initialValue:(item.predictArrivalTimeStr || item.predictArrivalTime)? moment(item.predictArrivalTimeStr || item.predictArrivalTime,dateTimeFormat):null,
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<DatePicker format={dateTimeFormat} showTime style={{width:'100%'}}/>)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="物流费用（元）" hasFeedback {...formItemLayout}>
              {getFieldDecorator('logisticsCost', {
                initialValue: item.logisticsCost,
                
              })(<InputNumber min={0} precision={2} style={{width:'100%'}}/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="运输走向反馈" hasFeedback {...formItemLayout}>
              {getFieldDecorator('trendFeedback', {
                initialValue: item.trendFeedback,
                
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label="备注说明" hasFeedback {...doubleFormItemLayout}>
              {getFieldDecorator('remark', {
                initialValue: item.remark,
                
              })(<Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} />)}
            </FormItem>
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
