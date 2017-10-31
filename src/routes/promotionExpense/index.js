import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const PromotionExpense = ({ location, dispatch, promotionExpense, loading }) => {
  const { list,fileList,dicList,detailList,employeeList, taskData,
    pagination, currentItem, modalVisible, modalType,isEditable,
    scheduleList,isScheduleEditable } = promotionExpense
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    fileList,
    employeeList,
    // travelList,
    scheduleList,
    isScheduleEditable,
    detailList,
    dicList,
    taskData,
    isEditable,
    maskClosable: false,
    submitLoading:loading.effects['promotionExpense/submit'],
    confirmLoading: loading.effects[`promotionExpense/${modalType}`],
    auditLoading:loading.effects['promotionExpense/audit'],
    title: `${modalType === 'create' ? '新增－促销费用报销申请' : modalType==='update'?'编辑－促销费用报销申请':'退回修改－促销费用报销申请'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `promotionExpense/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'promotionExpense/hideModal',
      })
    },
    setIsEditable(isEditable){
      dispatch({
        type:'promotionExpense/setIsEditable',
        payload:isEditable,
      })
    },
    setScheduleEditable(isScheduleEditable){
      dispatch({
        type:'promotionExpense/setScheduleEditable',
        payload:isScheduleEditable,
      })
    },
    getFileList(fileList){
      dispatch({
        type:'promotionExpense/setFileList',
        payload:fileList
      })
    },
    getDetailList(detailList){
      dispatch({
        type:'promotionExpense/setDetailList',
        payload:detailList
      })
    },
    getScheduleList(scheduleList){
      dispatch({
        type:'promotionExpense/getScheduleList',
        payload:scheduleList
      })
    },
    onSubmit (formItem,nextUser) {
      dispatch({
        type: 'promotionExpense/submit',
        payload: {formItem,nextUser},
      })
    },
    onAudit(formItem,taskItem){
      dispatch({
        type: 'promotionExpense/audit',
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
    loading: loading.effects['promotionExpense/query'],
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
        type: 'promotionExpense/submit',
        payload: {formItem,nextUser},
      })
    },
    onDelete (id) {
      dispatch({
        type: 'promotionExpense/deleteById',
        payload: {id},
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'promotionExpense/editItem',
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
        type: 'promotionExpense/showModal',
        payload: {
          modalType: 'create',
          fileList:[],
          detailList:[],
          taskData:{},
          scheduleList:[],
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

PromotionExpense.propTypes = {
  promotionExpense: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ promotionExpense, loading }) => ({ promotionExpense, loading }))(PromotionExpense)
