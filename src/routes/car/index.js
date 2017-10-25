import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Car = ({ location, dispatch, car, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType } = car
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['car/update'],
    title: `${modalType === 'create' ? '新增公务车' : '编辑公务车'}`,
    wrapClassName: 'vertical-center-modal',
    width:800,
    onOk (data) {
      dispatch({
        type: `car/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'car/hideModal',
      })
    },
  }

  const listProps = {
    dataSource:list,
    loading: loading.effects['car/query'],
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
        type: 'car/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'car/editItem',
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
        type: 'car/showModal',
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

Car.propTypes = {
  car: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ car, loading }) => ({ car, loading }))(Car)
