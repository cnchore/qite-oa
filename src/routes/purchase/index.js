import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Purchase = ({ location, dispatch, purchase, loading }) => {
  const { list,fileList,dicList,detailList,applyList,employeeList, pagination, currentItem, modalVisible, modalType } = purchase
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    fileList,
    employeeList,
    applyList,
    detailList,
    dicList,
    maskClosable: false,
    submitLoading:loading.effects['purchase/submit'],
    confirmLoading: loading.effects[`purchase/${modalType}`],
    title: `${modalType === 'create' ? '新增采购申请' : '编辑采购申请'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `purchase/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'purchase/hideModal',
      })
    },
    
    getFileList(fileList){
      dispatch({
        type:'purchase/setFileList',
        payload:fileList
      })
    },
    getDetailList(detailList){
      dispatch({
        type:'purchase/setDetailList',
        payload:detailList
      })
    },
    onSubmit (id,title) {
      dispatch({
        type: 'purchase/submit',
        payload: {id,title},
      })
    },
  }

  const listProps = {
    dataSource:list,
    loading: loading.effects['purchase/query'],
    pagination,
    location,
    dicList,
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
    onSubmit (id,title) {
      dispatch({
        type: 'purchase/submit',
        payload: {id,title},
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'purchase/editItem',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
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
    
    onAdd () {
      dispatch({
        type: 'purchase/showModal',
        payload: {
          modalType: 'create',
          fileList:[],
          detailList:[],
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

Purchase.propTypes = {
  purchase: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ purchase, loading }) => ({ purchase, loading }))(Purchase)
