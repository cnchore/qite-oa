import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from '../../components'
import { Form, Button, Row, Col, DatePicker, Input,Select } from 'antd'

const Search = Input.Search
//const { RangePicker } = DatePicker
const Option = Select.Option;

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
  dicList,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const dateTimeFormat='YYYY-MM-DD'

  const handleFields = (fields) => {
    const { createTime,missTime } = fields
    if (createTime) {
      fields.createTime = createTime.format(dateTimeFormat);
    }
   
    return fields
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
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

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    fields = handleFields(fields)
    onFilterChange(fields)
  }
  const { codeLike, createTime } = filter

  const dicOption=dicList.map(dic=><Option key={dic.dicValue}>{dic.dicName}</Option>)

  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 12 }}>
        {getFieldDecorator('codeLike', 
          { initialValue: codeLike 
          })(<Search placeholder="申请单号" size="large" onSearch={handleSubmit} />)}
      </Col>
     
      <Col {...ColProps} xl={{ span: 8 }} md={{ span: 12 }} >
        <FilterItem label="申请时间">
          {getFieldDecorator('createTime', { 
            initialValue:createTime? moment(createTime):null,
          })(
            <DatePicker style={{ width: '100%' }} size="large" 
             format={dateTimeFormat} 
            onChange={handleChange.bind(null, 'createTime')} />
          )}
        </FilterItem>
      </Col>
      
      <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button icon="search" type="primary" size="large" className="margin-right" onClick={handleSubmit}>查询</Button>
            <Button icon="reload" size="large" onClick={handleReset}>重置</Button>
            <Button icon="plus" size="large" type="ghost" onClick={onAdd}>新增</Button>
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
