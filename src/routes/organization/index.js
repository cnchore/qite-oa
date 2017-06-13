import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Organization = ({ location, dispatch, organization, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType,expandedRowKeys,isSwitch } = organization
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['organization/update'],
    title: `${modalType === 'create' ? '新增组织结构' : '编辑组织机构'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `organization/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'organization/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['organization/query'],
    pagination,
    location,
    defaultExpandAllRows:true,
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
        type: 'organization/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'organization/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    onAddChild (id) {
      dispatch({
        type: 'organization/showModal',
        payload: {
          modalType: 'addChild',
          currentItem: {id},
        },
      })
    },
  }

  const filterProps = {
    isSwitch,
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
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/organization',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/organization',
      }))
    },
    
    onSwitch () {
      dispatch({ type: 'organization/onSwitch' })
    },
    onAdd () {
     
      dispatch({
        type: 'organization/showModal',
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

Organization.propTypes = {
  organization: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ organization, loading }) => ({ organization, loading }))(Organization)
