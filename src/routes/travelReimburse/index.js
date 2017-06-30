import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const TravelReimburse = ({ location, dispatch, travelReimburse, loading }) => {
  const { list,fileList,dicList,detailList,travelList,employeeList, pagination, currentItem, modalVisible, modalType } = travelReimburse
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
    submitLoading:loading.effects['travelReimburse/submit'],
    confirmLoading: loading.effects[`travelReimburse/${modalType}`],
    title: `${modalType === 'create' ? '新增差旅费报销申请' : '编辑差旅费报销申请'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `travelReimburse/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'travelReimburse/hideModal',
      })
    },
    
    getFileList(fileList){
      dispatch({
        type:'travelReimburse/setFileList',
        payload:fileList
      })
    },
    getDetailList(detailList){
      dispatch({
        type:'travelReimburse/setDetailList',
        payload:detailList
      })
    },
    onSubmit (id,title) {
      dispatch({
        type: 'travelReimburse/submit',
        payload: {id,title},
      })
    },
  }

  const listProps = {
    dataSource:list,
    loading: loading.effects['travelReimburse/query'],
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
        type: 'travelReimburse/submit',
        payload: {id,title},
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'travelReimburse/editItem',
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
        type: 'travelReimburse/showModal',
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

TravelReimburse.propTypes = {
  travelReimburse: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ travelReimburse, loading }) => ({ travelReimburse, loading }))(TravelReimburse)
