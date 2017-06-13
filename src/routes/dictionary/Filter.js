import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col,Modal } from 'antd'

const ButtonGroup=Button.Group;
const confirm=Modal.confirm;

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}



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
    <Row gutter={24}>
     
      <Col {...ColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ButtonGroup>
            <Button icon="plus" size="large" type="primary" onClick={onAdd}>新增</Button>
            <Button icon="edit" type="primary" size="large" onClick={onEditItem}>编辑</Button>
            <Button icon="delete" type="primary" size="large" onClick={onDelete}>删除</Button>
          </ButtonGroup>
        </div>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  onEditItem:PropTypes.func,
  onDeleteItem:PropTypes.func,
}

export default Form.create()(Filter)
