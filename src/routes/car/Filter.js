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

  const { carBrandLike, carNumLike,carOwnerLike,isAppliable } = filter

  

  return (
    <Row gutter={24}>
      <Col {...ColProps} md={{ span: 8 }} xs={{ span: 12 }} >
        {getFieldDecorator('carBrandLike', { initialValue: carBrandLike })(<Search placeholder="品牌" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} md={{ span: 8 }} xs={{ span: 12 }}>
        {getFieldDecorator('carNumLike', { initialValue: carNumLike })(<Search placeholder="车牌" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} md={{ span: 8 }} xs={{ span: 12 }}>
        {getFieldDecorator('carOwnerLike', { initialValue: carOwnerLike })(<Search placeholder="户主" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} md={{ span: 8 }} xs={{ span: 12 }}>
        {getFieldDecorator('isAppliable', { initialValue: isAppliable})(
          <Select placeholder="是否可以申请" allowClear style={{width:'100%'}}>
            <Option value="true">是</Option>
            <Option value="false">否</Option>
          </Select>
          )}
      </Col>
      <Col {...TwoColProps}  md={{ span: 16 }} xs={{ span: 24 }}>
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
