import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button,Modal } from 'antd'

const ButtonGroup=Button.Group;
const confirm=Modal.confirm;


const Filter = ({
  onAdd,
  onEditItem,
  onDeleteItem,
}) => {
 
  const onDelete = () => {
    confirm({
        title: '你确定删除该职位么?',
        onOk () {
          onDeleteItem();
        },
    })
  }
  

  return (
    <div style={{ display: 'flex',marginBottom: 16, justifyContent: 'flex-end' }}>
      <ButtonGroup>
        <Button icon="plus" size="large" type="primary" onClick={onAdd}>新增</Button>
        <Button icon="edit" type="primary" size="large" onClick={onEditItem}>编辑</Button>
      </ButtonGroup>
    </div>
    
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  onEditItem:PropTypes.func,
  onDeleteItem:PropTypes.func,
}

export default Form.create()(Filter)
