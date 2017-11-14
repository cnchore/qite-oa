import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Button,Tag } from 'antd'
// import styles from './ListGeneral.less'
// import classnames from 'classnames'
import { Link } from 'dva/router'
import { SelectUser } from '../../components'

const confirm = Modal.confirm

const ListGeneral = ({ location, ...tableProps }) => {
 
  return (
    <div>
      <Table
        {...tableProps}
        bordered
        simple
      />
    </div>
  )
}

ListGeneral.propTypes = {
  
}

export default ListGeneral
