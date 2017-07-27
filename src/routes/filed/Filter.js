import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from '../../components'
import { Form, Button, Row, Col, DatePicker,Select, Input } from 'antd'

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
  dicList,
  onFilterChange,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const dateTimeFormat='YYYY-MM-DD HH:mm:ss'

  const handleFields = (fields) => {
    const { applyTimeStr,receiveTimeStr,auditTimeStr } = fields
    if (applyTimeStr.length) {
      fields.applyTimeStart =applyTimeStr[0].format('YYYY-MM-DD')
      fields.applyTimeEnd=applyTimeStr[1].format('YYYY-MM-DD')
    }
    if (receiveTimeStr.length) {
      fields.receiveTimeStart =receiveTimeStr[0].format('YYYY-MM-DD')
      fields.receiveTimeEnd=receiveTimeStr[1].format('YYYY-MM-DD')
    }
    if (auditTimeStr.length) {
      fields.auditTimeStart =auditTimeStr[0].format('YYYY-MM-DD')
      fields.auditTimeEnd=auditTimeStr[1].format('YYYY-MM-DD')
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
  const { applyNameLike,applyTimeStr,receiveTimeStr,auditTimeStr,auditerNameLike,busiCodeLike,flowNameLike,nodeNameLike } = filter

  let initialApplyTime = [],initialReceiveTime=[],initialAuditTime=[];
  if (filter.applyTimeStr && filter.applyTimeStr[0]) {
    initialApplyTime[0] = moment(filter.applyTimeStr[0])
  }
  if (filter.applyTimeStr && filter.applyTimeStr[1]) {
    initialApplyTime[1] = moment(filter.applyTimeStr[1])
  }
  if (filter.receiveTimeStr && filter.receiveTimeStr[0]) {
    initialReceiveTime[0] = moment(filter.receiveTimeStr[0])
  }
  if (filter.receiveTimeStr && filter.receiveTimeStr[1]) {
    initialReceiveTime[1] = moment(filter.receiveTimeStr[1])
  }
  if (filter.auditTimeStr && filter.auditTimeStr[0]) {
    initialAuditTime[0] = moment(filter.auditTimeStr[0])
  }
  if (filter.auditTimeStr && filter.auditTimeStr[1]) {
    initialAuditTime[1] = moment(filter.auditTimeStr[1])
  }  
    //状态：0新建  1审核中 2审核通过 3审核不通过 -1退回修改
  // const stateList=[{value:'0',label:'新建'},{value:'1',label:'审核中'},{value:'2',label:'审核通过'},{value:'3',label:'审核不通过'},{value:'-1',label:'退回修改'},{value:'-2',label:'待完善资料'},{value:'4',label:'审核通过并完善资料'}]
  // const stateOption=stateList.map(st=><Option key={st.value}>{st.label}</Option>)
  const dicOption=dicList.map(dic=><Option key={dic.dicValue}>{dic.dicName}</Option>)

  return (
    <Row gutter={24}>
      
      <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }} >
        <FilterItem label="申请时间">
          {getFieldDecorator('applyTimeStr', { 
            initialValue:initialApplyTime,
          })(
            <RangePicker style={{ width: '100%' }} size="large" 
            format={dateTimeFormat} 
            onChange={handleChange.bind(null, 'applyTimeStr')} />
          )}
        </FilterItem>
      </Col>
      <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }} >
        <FilterItem label="接收时间">
          {getFieldDecorator('receiveTimeStr', { 
            initialValue:initialReceiveTime,
          })(
            <RangePicker style={{ width: '100%' }} size="large" 
             format={dateTimeFormat} 
            onChange={handleChange.bind(null, 'receiveTimeStr')} />
          )}
        </FilterItem>
      </Col>
      <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }} >
        <FilterItem label="审批时间">
          {getFieldDecorator('auditTimeStr', { 
            initialValue:initialAuditTime,
          })(
            <RangePicker style={{ width: '100%' }} size="large" 
             format={dateTimeFormat} 
            onChange={handleChange.bind(null, 'auditTimeStr')} />
          )}
        </FilterItem>
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('applyNameLike', 
          { initialValue: applyNameLike 
          })(<Search placeholder="申请人" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('auditerNameLike', 
          { initialValue: auditerNameLike 
          })(<Search placeholder="审核人" size="large" onSearch={handleSubmit} />)}
      </Col>
      
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }} >
       {getFieldDecorator('nodeNameLike', 
          { initialValue: nodeNameLike?nodeNameLike:null, 
          })(<Search placeholder="当前阶段" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }} >
        <FilterItem label="申请类型">
          {getFieldDecorator('busiCodeLike', { 
            initialValue:busiCodeLike?busiCodeLike:null,
          })(
            <Select style={{ width: '100%' }} >{dicOption}</Select> 
          )}
        </FilterItem>
      </Col>
      
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 16 }} >
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
