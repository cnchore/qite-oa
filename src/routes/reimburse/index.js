import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Reimburse = ({ location, dispatch, reimburse, loading }) => {
  const { list,fileList,dicList,detailList,travelList,employeeList, pagination, currentItem, modalVisible, modalType } = reimburse
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
    submitLoading:loading.effects['reimburse/submit'],
    confirmLoading: loading.effects[`reimburse/${modalType}`],
    title: `${modalType === 'create' ? '新增费用报销申请' : '编辑费用报销申请'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `reimburse/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'reimburse/hideModal',
      })
    },
    
    getFileList(fileList){
      dispatch({
        type:'reimburse/setFileList',
        payload:fileList
      })
    },
    getDetailList(detailList){
      dispatch({
        type:'reimburse/setDetailList',
        payload:detailList
      })
    },
    onSubmit (id,title) {
      dispatch({
        type: 'reimburse/submit',
        payload: {id,title},
      })
    },
  }

  const listProps = {
    dataSource:list,
    loading: loading.effects['reimburse/query'],
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
        type: 'reimburse/submit',
        payload: {id,title},
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'reimburse/editItem',
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
        type: 'reimburse/showModal',
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

Reimburse.propTypes = {
  reimburse: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ reimburse, loading }) => ({ reimburse, loading }))(Reimburse)
