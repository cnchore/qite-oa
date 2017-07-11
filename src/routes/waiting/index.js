import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Waiting = ({ location, dispatch, waiting, loading }) => {
  const { list,fileList,employeeList,dicList, pagination, taskData, modalVisible } = waiting
  const { pageSize } = pagination

  const modalProps = {
    taskData,
    visible: modalVisible,
    employeeList,
    maskClosable: false,
    confirmLoading: loading.effects['waiting/submit'],
    title: '流程办理',
    wrapClassName: 'vertical-center-modal',
    
    onCancel () {
      dispatch({
        type: 'waiting/hideModal',
      })
    },
    
    onOk (formItem) {
      dispatch({
        type: 'waiting/submit',
        payload: formItem,
      })
    },
  }

  const listProps = {
    dataSource:list,
    loading: loading.effects['waiting/query'],
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
    
    onEditItem (item) {
      dispatch({
        type: 'waiting/editItem',
        payload: item,
      })
    },
  }

  const filterProps = {
    dicList,
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
    
  }

  return (
    <div className="content-inner">
      {!modalVisible &&<Filter {...filterProps} />}
      {!modalVisible &&<List {...listProps} />}
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

Waiting.propTypes = {
  waiting: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ waiting, loading }) => ({ waiting, loading }))(Waiting)
