import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from '../../components'
import { Form, Button, Row, Col, DatePicker, Input,Select } from 'antd'

const Search = Input.Search
const { RangePicker } = DatePicker
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
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const handleFields = (fields) => {
    const { createTime } = fields
    if (createTime.length) {
      fields.publishTimeStart = createTime[0].format('YYYY-MM-DD');
      fields.publishTimeEnd = createTime[1].format('YYYY-MM-DD');
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
  const { titleLike, publisherLike,state } = filter

  let initialCreateTime = []
  if (filter.publishTimeStart) {
    initialCreateTime[0] = moment(filter.publishTimeStart)
  }
  if (filter.publishTimeEnd) {
    initialCreateTime[1] = moment(filter.publishTimeEnd)
  }

  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('titleLike', 
          { initialValue: titleLike 
          })(<Search placeholder="知识主题" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('publisherLike', { initialValue: publisherLike })(
          <Search placeholder="发布人" size="large" onSearch={handleSubmit} />
          )}
      </Col>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }}>
        <FilterItem label="发布时间">
          {getFieldDecorator('createTime', { initialValue: initialCreateTime })(
            <RangePicker style={{ width: '100%' }} size="large" onChange={handleChange.bind(null, 'createTime')} />
          )}
        </FilterItem>
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('state', { initialValue: String(state===undefined?'':state) })(
          <Select placeholder="发布人" size="large" onChange={handleSubmit} style={{width:'100%'}}>
            <Option key='0'>未发布</Option>
            <Option key='1'>已发布</Option>
            <Option key='2'>已下线</Option>
          </Select>
          )}
      </Col>
      <Col {...TwoColProps} xl={{ span: 6 }} md={{ span: 16 }} sm={{ span: 24 }}>
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
