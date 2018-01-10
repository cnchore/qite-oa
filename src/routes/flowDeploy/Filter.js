import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Input,Select } from 'antd'
import { FilterItem } from '../../components'

const Option = Select.Option;

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const Filter = ({
  filter,
  onSearch,
  onDeploy,
  dicList,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  //const dateTimeFormat='YYYY-MM-DD HH:mm:ss'

  const handleSubmit = () => {
    let fields = getFieldsValue();
    let file=document.getElementById('deployfile').files[0];
    
    fields.file=file;
    
    onDeploy(fields);
  }
  const handleSearch =()=>{
    let fields = getFieldsValue();
    onSearch({category:fields.category,nameLike:fields.fileName});
  }
  const handleReset = () => {
    const fields = getFieldsValue();
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields);
    handleSearch();
  }
  const dicOption=dicList && dicList[0] && dicList.map(dic=><Option key={dic.dicValue}>{dic.dicName}</Option>)
  const { category, nameLike } = filter;
  return (
    <Form name='fileform'>
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }}>
        <FilterItem label="流程类别">
          {getFieldDecorator('category',{ 
            initialValue: category || null
          })(<Select style={{width:'100%'}}>{dicOption}</Select>)}
        </FilterItem>
      </Col>
     
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }} >
        <FilterItem label="流程名称">
          {getFieldDecorator('fileName', { 
            initialValue: nameLike || null,
          })(
            <Input />
          )}
        </FilterItem>
      </Col>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }} >
        <FilterItem label="流程文件">
          
            <Input type="file" name='file' id='deployfile'/>
          
        </FilterItem>
      </Col>
      
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 24 }} >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button icon="plus" size="large" type="primary" onClick={handleSubmit}>部署</Button>
            <Button icon="search" size="large" type="primary" onClick={handleSearch}>查询</Button>
            <Button icon="reload" size="large"  onClick={handleReset}>重置</Button>
        </div>
      </Col>
    </Row>
    
    </Form>
  )
}

Filter.propTypes = {
  onDeploy: PropTypes.func,
  form: PropTypes.object,
}

export default Form.create()(Filter)
