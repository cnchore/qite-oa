import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const SalaryChange = ({ location, dispatch, salaryChange, loading }) => {
  const { list,fileList,dicList,employeeList,taskData, pagination, currentItem, modalVisible, modalType } = salaryChange
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    fileList,
    employeeList,
    dicList,
    taskData,
    maskClosable: false,
    submitLoading:loading.effects['salaryChange/submit'],
    confirmLoading: loading.effects[`salaryChange/${modalType}`],
    auditLoading:loading.effects['salaryChange/audit'],
    title: `${modalType === 'create' ? '新增－调薪申请' : modalType==='update'?'编辑－调薪申请':'退回修改－调薪申请'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `salaryChange/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'salaryChange/hideModal',
      })
    },
    
    getFileList(fileList){
      dispatch({
        type:'salaryChange/setFileList',
        payload:fileList
      })
    },
    onSubmit (formItem,nextUser) {
      dispatch({
        type: 'salaryChange/submit',
        payload: {formItem,nextUser},
      })
    },
    onAudit(formItem,taskItem){
      dispatch({
        type: 'salaryChange/audit',
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
    loading: loading.effects['salaryChange/query'],
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
        type: 'salaryChange/submit',
        payload: {formItem,nextUser},
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'salaryChange/editItem',
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
        type: 'salaryChange/showModal',
        payload: {
          modalType: 'create',
          fileList:[],
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

SalaryChange.propTypes = {
  salaryChange: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ salaryChange, loading }) => ({ salaryChange, loading }))(SalaryChange)
