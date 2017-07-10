import React from 'react'
import PropTypes from 'prop-types'
import { Form,Modal } from 'antd'
import styles from './Modal.less'


const modal = ({
  item = {},
  ...modalProps
}) => {

  return (
    <Modal {...modalProps} footer={null}>
      <img src={item.url || ''}  alt="流程图" style={{ width: '100%' }} />
    </Modal>
  )
}

modal.propTypes = {
  item: PropTypes.object,
}

export default modal
