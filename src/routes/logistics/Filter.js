import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Input,Select } from 'antd'

const Search = Input.Search
const Option=Select.Option;

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
}

const Filter = ({
  onAdd,
  onFilterChange,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  

  const handleSubmit = () => {
    let fields = getFieldsValue()
    onFilterChange(fields)
  }

  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit()
  }

  const { clientNameLike, clientPhoneLike,orderCodeLike,logisticsLike,logisticsState } = filter

  

  return (
    <Row gutter={24}>
      <Col {...ColProps} md={{ span: 8 }} xs={{ span: 12 }} >
        {getFieldDecorator('clientNameLike', { initialValue: clientNameLike })(<Search placeholder="客户姓名" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} md={{ span: 8 }} xs={{ span: 12 }}>
        {getFieldDecorator('clientPhoneLike', { initialValue: clientPhoneLike })(<Search placeholder="客户电话" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} md={{ span: 8 }} xs={{ span: 12 }}>
        {getFieldDecorator('orderCodeLike', { initialValue: orderCodeLike })(<Search placeholder="订单编号" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} md={{ span: 8 }} xs={{ span: 12 }}>
        {getFieldDecorator('logisticsLike', { initialValue: logisticsLike })(<Search placeholder="物流名称" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} md={{ span: 8 }} xs={{ span: 12 }}>
        {getFieldDecorator('logisticsState', { initialValue: logisticsState})(
          <Select placeholder="物流状态" allowClear style={{width:'100%'}}>
            <Option value="-1">运输异常</Option>
            <Option value="0">运输途中</Option>
            <Option value="1">已完成</Option>
          </Select>
          )}
      </Col>
      <Col {...TwoColProps}  md={{ span: 8 }} xs={{ span: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div >
            <Button icon="search" type="primary" size="large" className="margin-right" onClick={handleSubmit}>查询</Button>
            <Button icon="reload" size="large" onClick={handleReset}>重置</Button>
          </div>
          <div>
            <Button  size="large" type="primary" icon="plus" onClick={onAdd}>新增</Button>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
