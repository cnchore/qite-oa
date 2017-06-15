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
        title: '你确定删除该字典么?',
        onOk () {
          onDeleteItem();
        },
    })
  }
  

  return (
        <div style={{ display: 'flex', justifyContent: 'flex-end',marginBottom: 16 }}>
          <ButtonGroup>
            <Button icon="plus" size="large" type="primary" onClick={onAdd}>新增</Button>
            <Button icon="edit" type="primary" size="large" onClick={onEditItem}>编辑</Button>
            <Button icon="delete" type="primary" size="large" onClick={onDelete}>删除</Button>
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
