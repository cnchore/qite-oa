import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Travel = ({ location, dispatch, travel, loading }) => {
  const { list,fileList,dicList,employeeList,taskData, pagination, 
    agentObject,currentItem, modalVisible, modalType } = travel
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    fileList,
    agentObject,
    employeeList,
    dicList,
    taskData,
    maskClosable: false,
    submitLoading:loading.effects['travel/submit'],
    confirmLoading: loading.effects[`travel/${modalType}`],
    auditLoading:loading.effects['travel/audit'],
    title: `${modalType === 'create' ? '新增－出差申请' : modalType==='update'?'编辑－出差申请':'退回修改－出差申请'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `travel/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'travel/hideModal',
      })
    },
    setAgent(agentObject){
      dispatch({
        type:'travel/setAgent',
        payload:agentObject
      })
    },
    getFileList(fileList){
      dispatch({
        type:'travel/setFileList',
        payload:fileList
      })
    },
    onSubmit (formItem,nextUser) {
      dispatch({
        type: 'travel/submit',
        payload: {formItem,nextUser},
      })
    },
    onAudit(formItem,taskItem){
      dispatch({
        type: 'travel/audit',
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
    loading: loading.effects['travel/query'],
    pagination,
    location,
    dicList,
    onChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          modalType:null,
          showModalType:null,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    onSubmit (formItem,nextUser) {
      dispatch({
        type: 'travel/submit',
        payload: {formItem,nextUser},
      })
    },
    onDelete (id) {
      dispatch({
        type: 'travel/deleteById',
        payload: {id},
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'travel/editItem',
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
        type: 'travel/showModal',
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

Travel.propTypes = {
  travel: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ travel, loading }) => ({ travel, loading }))(Travel)
