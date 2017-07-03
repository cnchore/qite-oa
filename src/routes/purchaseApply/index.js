import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const PurchaseApply = ({ location, dispatch, purchaseApply, loading }) => {
  const { list,fileList,dicList,detailList,travelList,employeeList, pagination, currentItem, modalVisible, modalType } = purchaseApply
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    fileList,
    employeeList,
    travelList,
    detailList,
    dicList,
    maskClosable: false,
    submitLoading:loading.effects['purchaseApply/submit'],
    confirmLoading: loading.effects[`purchaseApply/${modalType}`],
    title: `${modalType === 'create' ? '新增申购申请' : '编辑申购申请'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `purchaseApply/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'purchaseApply/hideModal',
      })
    },
    
    getFileList(fileList){
      dispatch({
        type:'purchaseApply/setFileList',
        payload:fileList
      })
    },
    getDetailList(detailList){
      dispatch({
        type:'purchaseApply/setDetailList',
        payload:detailList
      })
    },
    onSubmit (id,title) {
      dispatch({
        type: 'purchaseApply/submit',
        payload: {id,title},
      })
    },
  }

  const listProps = {
    dataSource:list,
    loading: loading.effects['purchaseApply/query'],
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
        type: 'purchaseApply/submit',
        payload: {id,title},
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'purchaseApply/editItem',
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
        type: 'purchaseApply/showModal',
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

PurchaseApply.propTypes = {
  purchaseApply: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ purchaseApply, loading }) => ({ purchaseApply, loading }))(PurchaseApply)
