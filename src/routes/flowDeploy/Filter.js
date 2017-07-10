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
    let fields = getFieldsValue()
    let file=document.getElementById('deployfile').files[0];
    
    fields.file=file;
    
    onDeploy(fields);
  }

  const dicOption=dicList.map(dic=><Option key={dic.dicValue}>{dic.dicName}</Option>)

  return (
    <Form name='fileform'>
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }}>
        <FilterItem label="流程类别">
          {getFieldDecorator('category',{ 
            initialValue: 'MC' 
          })(<Select style={{width:'100%'}}>{dicOption}</Select>)}
        </FilterItem>
      </Col>
     
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }} >
        <FilterItem label="流程名称">
          {getFieldDecorator('filename', { 
            initialValue:null,
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
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
         
          <div>
            <Button icon="plus" size="large" type="primary" onClick={handleSubmit}>部署</Button>
          </div>
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
