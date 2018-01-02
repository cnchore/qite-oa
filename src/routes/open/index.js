import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Open = ({ location, dispatch, open, loading }) => {
  const { list,fileList,dicList,detailList,employeeList, taskData,
    pagination, currentItem, modalVisible, modalType,isEditable } = open
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
    submitLoading:loading.effects['open/submit'],
    confirmLoading: loading.effects[`open/${modalType}`],
    auditLoading:loading.effects['open/audit'],
    title: `${modalType === 'create' ? '新增－开业支持申请' : modalType==='update'?'编辑－开业支持申请':'退回修改－开业支持申请'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `open/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'open/hideModal',
      })
    },
    setIsEditable(isEditable){
      dispatch({
        type:'open/setIsEditable',
        payload:isEditable,
      })
    },
    getFileList(fileList){
      dispatch({
        type:'open/setFileList',
        payload:fileList
      })
    },
    getDetailList(detailList){
      dispatch({
        type:'open/setDetailList',
        payload:detailList
      })
    },
    onSubmit (formItem,nextUser) {
      dispatch({
        type: 'open/submit',
        payload: {formItem,nextUser},
      })
    },
    onAudit(formItem,taskItem){
      dispatch({
        type: 'open/audit',
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
    loading: loading.effects['open/query'],
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
        type: 'open/submit',
        payload: {formItem,nextUser},
      })
    },
    onDelete (id) {
      dispatch({
        type: 'open/deleteById',
        payload: {id},
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'open/editItem',
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
        type: 'open/showModal',
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

Open.propTypes = {
  open: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ open, loading }) => ({ open, loading }))(Open)
