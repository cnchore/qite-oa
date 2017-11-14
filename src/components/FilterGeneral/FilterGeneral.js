import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, DatePicker, Input } from 'antd'
import styles from './FilterGeneral.less'

const FilterGeneral = ({
  config,
  onFilterChange,
  form: {
    getFieldDecorator,
    getFieldsValue,
    resetFields,
  },
}) => {
  const handleSubmit = () => {
    let fields = getFieldsValue()
    onFilterChange(fields)
  }
  const handleReset = () => {
    resetFields();
    onFilterChange({})
  }

  const renderActItem=(item,index)=>{
    if(!item || !item.type){
      return null;
    }
    switch(item.type){
      case 'submit':
        return <Button key={`act${index}`} {...item.props} onClick={handleSubmit}>{item.text}</Button>;
      case 'reset':
        return <Button key={`act${index}`}  {...item.props} onClick={handleReset}>{item.text}</Button>;
      default :
        return <Button key={`act${index}`}  {...item.props} >{item.text}</Button>;
    }
  }
  const renderFormItem=(item)=>{
    if(!item || !item.type){
      return null;
    }
    switch(item.type){
      case 'Input':
        return <Input {...item.props} />;
      case 'DatePicker':
        return <DatePicker {...item.props} />;
      default :
        return null;
    }
  }
  const cols=config.formItems && config.formItems.map((item,index)=>
      <Col key={`col${index}`} {...item.parentProps}>
        <Form.Item label={item.text && item.text}>
          {
            getFieldDecorator(item.field)(
              renderFormItem(item)
            )
          }
        </Form.Item>
      </Col>
    ) || null;
  const acts=config.actions && config.actions.map((act,index)=>
      renderActItem(act,index)
    ) || null;
  return (
    <Form layout="inline" className={styles['filter-form']}>
      <Row gutter={24} >
        {cols}
        <Col {...config.actionsLayout}>
          <div className={styles['actions']}>
            {acts}
          </div>
        </Col>
      </Row>
    </Form>
  )
}

FilterGeneral.propTypes = {
  config: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(FilterGeneral)
