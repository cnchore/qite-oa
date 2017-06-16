import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'antd'

const ButtonGroup=Button.Group;

const Filter = ({
  onSave,
  onReset,
}) => {
 
 

  return (
    <div style={{ display: 'flex',marginBottom: 16, justifyContent: 'flex-end' }}>
      <ButtonGroup>
        <Button icon="save" size="large" type="primary" onClick={onSave}>保存</Button>
        <Button icon="reload" type="primary" size="large" onClick={onReset}>重置</Button>
      </ButtonGroup>
    </div>
    
  )
}

Filter.propTypes = {
  onSave: PropTypes.func,
  onReset:PropTypes.func,
}

export default Form.create()(Filter)
