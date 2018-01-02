import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Contract = ({ location, dispatch, contract, loading }) => {
  const { list,fileList,dicList,employeeList,taskData, pagination, currentItem, modalVisible, modalType } = contract
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    fileList,
    employeeList,
    dicList,
    taskData,
    maskClosable: false,
    submitLoading:loading.effects['contract/submit'],
    confirmLoading: loading.effects[`contract/${modalType}`],
    auditLoading:loading.effects['contract/audit'],
    title: `${modalType === 'create' ? '新增－合同申请' : modalType==='update'?'编辑－合同申请':'退回修改－合同申请'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `contract/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'contract/hideModal',
      })
    },
    
    getFileList(fileList){
      dispatch({
        type:'contract/setFileList',
        payload:fileList
      })
    },
    onSubmit (formItem,nextUser) {
      dispatch({
        type: 'contract/submit',
        payload: {formItem,nextUser},
      })
    },
    onAudit(formItem,taskItem){
      dispatch({
        type: 'contract/audit',
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
    loading: loading.effects['contract/query'],
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
        type: 'contract/submit',
        payload: {formItem,nextUser},
      })
    },
    onDelete (id) {
      dispatch({
        type: 'contract/deleteById',
        payload: {id},
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'contract/editItem',
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
        type: 'contract/showModal',
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

Contract.propTypes = {
  contract: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ contract, loading }) => ({ contract, loading }))(Contract)
