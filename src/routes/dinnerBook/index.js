import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const DinnerBook = ({ location, dispatch, dinnerBook, loading }) => {
  const { list,employeeList,selectedRowKeys,
    pagination, currentItem, modalVisible, modalType } = dinnerBook
  const { pageSize } = pagination
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      dispatch({
        type: 'dinnerBook/setRowKeys',
        payload:selectedRowKeys
      })
    },
    selectedRowKeys,
    type:'checkbox'
  };
  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    employeeList,
    
    rowSelection,
    maskClosable: false,
    tableLoading:loading.effects['dinnerBook/queryEmployee'],
    submitLoading:loading.effects['dinnerBook/change'],
    confirmLoading: loading.effects[`dinnerBook/${modalType}`],
    title: `${modalType === 'create' ? '新增－报餐申请' : modalType==='update'?'编辑－报餐申请':'退回修改－报餐申请'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `dinnerBook/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'dinnerBook/hideModal',
      })
    },
    onSubmit (id,data) {
      dispatch({
        type: 'dinnerBook/change',
        payload: {id,data}
      })
    },
    getDinnerInfo(data){
      dispatch({
        type: 'dinnerBook/getDinnerInfo',
        payload: data,
      })
    },
    setEmployeeList(data){
      dispatch({
        type: 'dinnerBook/setEmployeeList',
        payload: data,
      })
    },
    setEmployeeAndRowKey(rowKey,data){
      dispatch({
        type: 'dinnerBook/setEmployeeAndRowKey',
        payload: {rowKey,data},
      })
    }
  }

  const listProps = {
    dataSource:list,
    loading: loading.effects['dinnerBook/query'],
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
    onSubmit (id) {
      dispatch({
        type: 'dinnerBook/change',
        payload: {id,data:null},
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'dinnerBook/editItem',
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
        type: 'dinnerBook/isCanAdd',
        payload: {
          modalType: 'create',
          employeeList:[],
        },
      })
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

DinnerBook.propTypes = {
  dinnerBook: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ dinnerBook, loading }) => ({ dinnerBook, loading }))(DinnerBook)
