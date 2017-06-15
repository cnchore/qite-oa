import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Roles = ({ location, dispatch, roles, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType } = roles
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['roles/update'],
    title: `${modalType === 'create' ? '新增角色' : '编辑角色'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `roles/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'roles/hideModal',
      })
    },
  }

  const listProps = {
    dataSource:list,
    loading: loading.effects['roles/query'],
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
        type: 'roles/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'roles/editItem',
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
        type: 'roles/showModal',
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

Roles.propTypes = {
  roles: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ roles, loading }) => ({ roles, loading }))(Roles)
