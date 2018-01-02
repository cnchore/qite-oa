import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const UrgentOrder = ({ location, dispatch, urgentOrder, loading }) => {
  const { list,fileList,dicList,employeeList, taskData,
    pagination, currentItem, modalVisible, modalType } = urgentOrder
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    fileList,
    employeeList,
    dicList,
    taskData,
    maskClosable: false,
    submitLoading:loading.effects['urgentOrder/submit'],
    confirmLoading: loading.effects[`urgentOrder/${modalType}`],
    auditLoading:loading.effects['urgentOrder/audit'],
    title: `${modalType === 'create' ? '新增－订单加急申请' : modalType==='update'?'编辑－订单加急申请':'退回修改－订单加急申请'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `urgentOrder/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'urgentOrder/hideModal',
      })
    },
    getFileList(fileList){
      dispatch({
        type:'urgentOrder/setFileList',
        payload:fileList
      })
    },
    onSubmit (formItem,nextUser) {
      dispatch({
        type: 'urgentOrder/submit',
        payload: {formItem,nextUser},
      })
    },
    onAudit(formItem,taskItem){
      dispatch({
        type: 'urgentOrder/audit',
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
    loading: loading.effects['urgentOrder/query'],
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
        type: 'urgentOrder/submit',
        payload: {formItem,nextUser},
      })
    },
    onDelete (id) {
      dispatch({
        type: 'urgentOrder/deleteById',
        payload: {id},
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'urgentOrder/editItem',
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
        type: 'urgentOrder/showModal',
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

UrgentOrder.propTypes = {
  urgentOrder: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ urgentOrder, loading }) => ({ urgentOrder, loading }))(UrgentOrder)
