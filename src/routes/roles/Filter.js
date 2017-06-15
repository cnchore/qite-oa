import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Input, } from 'antd'

const Search = Input.Search

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
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

  const { roleNameLike, roleCodeLike } = filter

  

  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 7 }} xs={{ span: 12 }} >
        {getFieldDecorator('roleNameLike', { initialValue: roleNameLike })(<Search placeholder="角色名称" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 7 }} xs={{ span: 12 }}>
        {getFieldDecorator('roleCodeLike', { initialValue: roleCodeLike })(<Search placeholder="角色编码" size="large" onSearch={handleSubmit} />)}
      </Col>
      
      <Col {...TwoColProps} xl={{ span: 12 }} md={{ span: 10 }} xs={{ span: 24 }}>
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
