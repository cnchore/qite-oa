import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
// import Modal from './Modal'

const SalesPromotion = ({ location, dispatch, salesPromotion, loading }) => {
  const { list,fileList,dicList,detailList,employeeList, taskData,
    pagination, currentItem, modalVisible, modalType,isEditable } = salesPromotion
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    fileList,
    employeeList,
    // travelList,
    detailList,
    dicList,
    taskData,
    isEditable,
    maskClosable: false,
    submitLoading:loading.effects['salesPromotion/submit'],
    confirmLoading: loading.effects[`salesPromotion/${modalType}`],
    auditLoading:loading.effects['salesPromotion/audit'],
    title: `${modalType === 'create' ? '新增－促销活动支持申请' : modalType==='update'?'编辑－促销活动支持申请':'退回修改－促销活动支持申请'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `salesPromotion/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'salesPromotion/hideModal',
      })
    },
    setIsEditable(isEditable){
      dispatch({
        type:'salesPromotion/setIsEditable',
        payload:isEditable,
      })
    },
    getFileList(fileList){
      dispatch({
        type:'salesPromotion/setFileList',
        payload:fileList
      })
    },
    getDetailList(detailList){
      dispatch({
        type:'salesPromotion/setDetailList',
        payload:detailList
      })
    },
    onSubmit (formItem,nextUser) {
      dispatch({
        type: 'salesPromotion/submit',
        payload: {formItem,nextUser},
      })
    },
    onAudit(formItem,taskItem){
      dispatch({
        type: 'salesPromotion/audit',
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
  // console.log('list:',list)
  const listProps = {
    dataSource:list,
    loading: loading.effects['salesPromotion/query'],
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
        type: 'salesPromotion/submit',
        payload: {formItem,nextUser},
      })
    },
    onDelete (id) {
      dispatch({
        type: 'salesPromotion/deleteById',
        payload: {id},
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'salesPromotion/editItem',
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
        type: 'salesPromotion/showModal',
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
    </div>
  )
}
      // {modalVisible && <Modal {...modalProps} />}

SalesPromotion.propTypes = {
  salesPromotion: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ salesPromotion, loading }) => ({ salesPromotion, loading }))(SalesPromotion)
