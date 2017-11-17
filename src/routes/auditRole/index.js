import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const AuditRole = ({ location, dispatch, auditRole, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType } = auditRole
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    width:1000,
    confirmLoading: loading.effects['auditRole/update'],
    title: `${modalType === 'create' ? '新增审批角色' : '编辑审批角色'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `auditRole/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'auditRole/hideModal',
      })
    },
  }

  const listProps = {
    dataSource:list,
    loading: loading.effects['auditRole/query'],
    pagination,
    location,
    
    onChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    onDeleteItem (id) {
      dispatch({
        type: 'auditRole/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'auditRole/editItem',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }

  const filterProps = {
    
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }))
    },
    
    onAdd () {
      dispatch({
        type: 'auditRole/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
   
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

AuditRole.propTypes = {
  auditRole: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ auditRole, loading }) => ({ auditRole, loading }))(AuditRole)
