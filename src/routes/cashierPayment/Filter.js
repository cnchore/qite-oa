import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from '../../components'
import { Form, Button, Row, Col, DatePicker,Select, Input } from 'antd'
import config from '../../utils/config'

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

const Filter = ({
  onFilterChange,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  // const dateTimeFormat='YYYY-MM-DD HH:mm:ss'

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

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    onFilterChange(fields)
  }
  const {applierLike,busiCodeLike,useUnit,isPay,remarkLike} = filter
  const useUnitOption=config.useUnitList && config.useUnitList.map(u=><Option key={u}>{u}</Option>) || null;
  return (
    <Row gutter={24}>
      
      <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }} >
        {getFieldDecorator('applierLike', 
        { initialValue: applierLike 
        })(<Search placeholder="申请人" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }} >
        {getFieldDecorator('busiCodeLike', 
        { initialValue:busiCodeLike 
        })(<Search placeholder="单号" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }}>
        {getFieldDecorator('remarkLike', 
          { initialValue: remarkLike 
          })(<Search placeholder="说明" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }} >
        <FilterItem label="用款单位">
          {getFieldDecorator('useUnit', { 
            initialValue:useUnit?useUnit:null,
          })(
            <Select style={{ width: '100%' }} >{useUnitOption}</Select> 
          )}
        </FilterItem>
      </Col>
      <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }} >
        <FilterItem label="是否付款">
          {getFieldDecorator('isPay', { 
            initialValue:isPay?isPay:null,
          })(
            <Select style={{ width: '100%' }} >
              <Option key="true">是</Option>
              <Option key="false">否</Option>
            </Select> 
          )}
        </FilterItem>
      </Col>
      
      
      <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }} >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button icon="search" type="primary" size="large" className="margin-right" onClick={handleSubmit}>查询</Button>
            <Button icon="reload" size="large" onClick={handleReset}>重置</Button>
        </div>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
