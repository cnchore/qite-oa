import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const PurchaseApply = ({ location, dispatch, purchaseApply, loading }) => {
  const { list,fileList,dicList,detailList,travelList,employeeList,taskData, 
    pagination, currentItem, modalVisible, modalType,isEditable } = purchaseApply
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    fileList,
    employeeList,
    travelList,
    detailList,
    dicList,
    taskData,
    isEditable,
    maskClosable: false,
    submitLoading:loading.effects['purchaseApply/submit'],
    confirmLoading: loading.effects[`purchaseApply/${modalType}`],
    auditLoading:loading.effects['purchaseApply/audit'],
    title: `${modalType === 'create' ? '新增－申购申请' : modalType==='update'?'编辑－申购申请':'退回修改－申购申请'}`,
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
    setIsEditable(isEditable){
      dispatch({
        type:'purchaseApply/setIsEditable',
        payload:isEditable,
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
    onSubmit (formItem,nextUser) {
      dispatch({
        type: 'purchaseApply/submit',
        payload: {formItem,nextUser},
      })
    },
    onAudit(formItem,taskItem){
      dispatch({
        type: 'purchaseApply/audit',
        payload: {formItem,taskItem},
      })
    },
    onGoback(){
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname:query.from,
      }))
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
    onSubmit (formItem,nextUser) {
      dispatch({
        type: 'purchaseApply/submit',
        payload: {formItem,nextUser},
      })
    },
    onDelete (id) {
      dispatch({
        type: 'purchaseApply/deleteById',
        payload: {id},
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
          taskData:{},
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
