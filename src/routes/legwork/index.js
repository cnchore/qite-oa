import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Legwork = ({ location, dispatch, legwork, loading }) => {
  const { list,fileList,dicList,employeeList,taskData, pagination,
    agentObject, currentItem, modalVisible, modalType } = legwork
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    fileList,
    employeeList,
    dicList,
    taskData,
    agentObject,
    maskClosable: false,
    submitLoading:loading.effects['legwork/submit'],
    confirmLoading: loading.effects[`legwork/${modalType}`],
    auditLoading:loading.effects['legwork/audit'],
    title: `${modalType === 'create' ? '新增－外勤申请' : modalType==='update'?'编辑－外勤申请':'退回修改－外勤申请'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `legwork/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'legwork/hideModal',
      })
    },
    setAgent(agentObject){
      dispatch({
        type:'legwork/setAgent',
        payload:agentObject
      })
    },
    getFileList(fileList){
      dispatch({
        type:'legwork/setFileList',
        payload:fileList
      })
    },
    onSubmit (formItem,nextUser) {
      dispatch({
        type: 'legwork/submit',
        payload: {formItem,nextUser},
      })
    },
    onAudit(formItem,taskItem){
      dispatch({
        type: 'legwork/audit',
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
    loading: loading.effects['legwork/query'],
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
        type: 'legwork/submit',
        payload: {formItem,nextUser},
      })
    },
    onDelete (id) {
      dispatch({
        type: 'legwork/deleteById',
        payload: {id},
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'legwork/editItem',
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
        type: 'legwork/showModal',
        payload: {
          modalType: 'create',
          fileList:[],
          taskData:{},
          agentObject:{},
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

Legwork.propTypes = {
  legwork: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ legwork, loading }) => ({ legwork, loading }))(Legwork)
