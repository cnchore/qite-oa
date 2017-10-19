import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button,Modal } from 'antd'

const ButtonGroup=Button.Group;
const confirm=Modal.confirm;

const Filter = ({
  onAdd,
  onEditItem,
  onDeleteItem,
  onAddFirst,
  onChangeItem,
}) => {
 
  const onChange = () => {
    confirm({
        title: '你确定[启用/禁用]该组织机构么?',
        onOk () {
          onChangeItem();
        },
    })
  }
  

  return (
        <div style={{ display: 'flex',marginBottom: 16, justifyContent: 'flex-end' }}>
          <ButtonGroup>
            <Button icon="plus" size="large" type="primary" onClick={onAdd}>新增</Button>
            <Button icon="plus" size="large" type="primary" onClick={onAddFirst}>新增第一级机构</Button>
            <Button icon="edit" type="primary" size="large" onClick={onEditItem}>编辑</Button>
            <Button type="primary" size="large" onClick={onChange}>启用／禁用</Button>
          </ButtonGroup>
        </div>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  onEditItem:PropTypes.func,
  onChangeItem:PropTypes.func,
  onAddFirst:PropTypes.func,

}

export default Form.create()(Filter)
