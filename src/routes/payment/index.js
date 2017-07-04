import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Payment = ({ location, dispatch, payment, loading }) => {
  const { list,fileList,dicList,purchaseList,employeeList, pagination, currentItem, modalVisible, modalType } = payment
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    fileList,
    employeeList,
    dicList,
    purchaseList,
    maskClosable: false,
    submitLoading:loading.effects['payment/submit'],
    confirmLoading: loading.effects[`payment/${modalType}`],
    title: `${modalType === 'create' ? '新增付款申请' : '编辑付款申请'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `payment/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'payment/hideModal',
      })
    },
    
    getFileList(fileList){
      dispatch({
        type:'payment/setFileList',
        payload:fileList
      })
    },
    onSubmit (id,title) {
      dispatch({
        type: 'payment/submit',
        payload: {id,title},
      })
    },
  }

  const listProps = {
    dataSource:list,
    loading: loading.effects['payment/query'],
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
        type: 'payment/submit',
        payload: {id,title},
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'payment/editItem',
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
        type: 'payment/showModal',
        payload: {
          modalType: 'create',
          fileList:[],
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

Payment.propTypes = {
  payment: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ payment, loading }) => ({ payment, loading }))(Payment)
