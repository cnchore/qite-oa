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
    const { createTime,updateTime,bookTime } = fields
    if (createTime) {
      fields.createTime = createTime.format(dateTimeFormat);
    }
    if (updateTime) {
      fields.updateTime = updateTime.format(dateTimeFormat);
    }
    if (bookTime) {
      fields.bookTime = bookTime.format(dateTimeFormat);
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
  const { updateTime, createTime,bookTime,state } = filter


  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 8 }} md={{ span: 12 }} >
        <FilterItem label="创建时间">
          {getFieldDecorator('createTime', { 
            initialValue:createTime? moment(createTime):null,
          })(
            <DatePicker style={{ width: '100%' }} size="large" 
             format={dateTimeFormat} 
            onChange={handleChange.bind(null, 'createTime')} />
          )}
        </FilterItem>
      </Col>
      <Col {...ColProps} xl={{ span: 8 }} md={{ span: 12 }} >
        <FilterItem label="更新时间">
          {getFieldDecorator('updateTime', { 
            initialValue:updateTime? moment(updateTime):null,
          })(
            <DatePicker style={{ width: '100%' }} size="large" 
             format={dateTimeFormat} 
            onChange={handleChange.bind(null, 'updateTime')} />
          )}
        </FilterItem>
      </Col>
      <Col {...ColProps} xl={{ span: 8 }} md={{ span: 12 }} >
        <FilterItem label="预约时间">
          {getFieldDecorator('bookTime', { 
            initialValue:bookTime? moment(bookTime):null,
          })(
            <DatePicker style={{ width: '100%' }} size="large" 
             format={dateTimeFormat} 
            onChange={handleChange.bind(null, 'bookTime')} />
          )}
        </FilterItem>
      </Col>
      <Col {...ColProps} xl={{ span: 8 }} md={{ span: 12 }} >
        <FilterItem label="状态">
          {getFieldDecorator('state', { 
            initialValue:state!==undefined && state!==null?state:undefined,
          })(
            <Select style={{ width: '100%' }} placeholder='请选择'
              onChange={handleChange.bind(null,'state')}
              allowClear
            >
              <Option key={0}>未提交</Option>
              <Option key={1}>已提交</Option>
              <Option key={2}>已取消</Option>
            </Select>
          )}
        </FilterItem>
      </Col>
      <Col {...TwoColProps} xl={{ span: 16 }} md={{ span: 12 }} >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div >
            <Button icon="search" type="primary" size="large" className="margin-right" onClick={handleSubmit}>查询</Button>
            <Button icon="reload" size="large" onClick={handleReset}>重置</Button>
          </div>
          <div>
            <Button icon="plus" size="large" type="ghost" onClick={onAdd}>新增</Button>
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
