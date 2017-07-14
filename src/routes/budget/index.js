import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Budget = ({ location, dispatch, budget, loading }) => {
  const { list,fileList,dicList,detailList,travelList,employeeList, taskData,pagination, currentItem, modalVisible, modalType } = budget
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
    maskClosable: false,
    submitLoading:loading.effects['budget/submit'],
    confirmLoading: loading.effects[`budget/${modalType}`],
    auditLoading:loading.effects['budget/audit'],
    title: `${modalType === 'create' ? '新增－预算申请' : modalType==='update'?'编辑－预算申请':'退回修改－预算申请'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `budget/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'budget/hideModal',
      })
    },
    
    getFileList(fileList){
      dispatch({
        type:'budget/setFileList',
        payload:fileList
      })
    },
    getDetailList(detailList){
      dispatch({
        type:'budget/setDetailList',
        payload:detailList
      })
    },
    onSubmit (formItem,nextUser) {
      dispatch({
        type: 'budget/submit',
        payload: {formItem,nextUser},
      })
    },
    onAudit(formItem,taskItem){
      dispatch({
        type: 'budget/audit',
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
    loading: loading.effects['budget/query'],
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
        type: 'budget/submit',
        payload: {formItem,nextUser},
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'budget/editItem',
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
        type: 'budget/showModal',
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

Budget.propTypes = {
  budget: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ budget, loading }) => ({ budget, loading }))(Budget)
