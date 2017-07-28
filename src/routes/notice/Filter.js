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
  const { codeLike, createTime,fileNumLike,titleLike } = filter

  const dicOption=dicList.map(dic=><Option key={dic.dicValue}>{dic.dicName}</Option>)
  const isMyNotice=location.hash && location.hash.indexOf('isMyNotice=true')>-1 ? true :false;
  return (
    <Row gutter={24}>

      { isMyNotice?null
        :<Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
          {getFieldDecorator('codeLike', 
            { initialValue: codeLike 
            })(<Search placeholder="申请单号" size="large" onSearch={handleSubmit} />)}
        </Col>
      }
     
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: isMyNotice?7:8 }} >
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
       <Col {...ColProps} xl={{ span: isMyNotice?6:4 }} md={{ span: isMyNotice?6:8  }}>
        {getFieldDecorator('fileNumLike', 
          { initialValue: fileNumLike 
          })(<Search placeholder="文件编号" size="large" onSearch={handleSubmit} />)}
      </Col>
       <Col {...ColProps} xl={{ span: isMyNotice?6:4 }} md={{ span: isMyNotice?6:8  }}>
        {getFieldDecorator('titleLike', 
          { initialValue: titleLike 
          })(<Search placeholder="通知标题" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...TwoColProps} xl={{ span: 6 }} md={{ span: isMyNotice?5:16  }} >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {
            !isMyNotice?
            <div>
              <Button icon="search" type="primary" size="large" className="margin-right" onClick={handleSubmit}>查询</Button>
              <Button icon="reload" size="large" onClick={handleReset}>重置</Button>
            </div>
            :null
          }
          {
            isMyNotice?
            <Button icon="search" type="primary" size="large" className="margin-right" onClick={handleSubmit}>查询</Button>
            :null
          } 
          {
            isMyNotice?
            <Button icon="reload" size="large" onClick={handleReset}>重置</Button>
            :null
          } 
          {
            isMyNotice?null
            :<Button icon="plus" size="large" type="ghost" onClick={onAdd}>新增</Button>
          }
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
