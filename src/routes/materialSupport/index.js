import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
// import Modal from './Modal'

const MaterialSupport = ({ location, dispatch, materialSupport, loading }) => {
  const { list,fileList,dicList,detailList,employeeList, taskData,
    pagination, currentItem, modalVisible, modalType,isEditable } = materialSupport
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
    submitLoading:loading.effects['materialSupport/submit'],
    confirmLoading: loading.effects[`materialSupport/${modalType}`],
    auditLoading:loading.effects['materialSupport/audit'],
    title: `${modalType === 'create' ? '新增－物料支持自助申请' : modalType==='update'?'编辑－物料支持自助申请':'退回修改－物料支持自助申请'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `materialSupport/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'materialSupport/hideModal',
      })
    },
    setIsEditable(isEditable){
      dispatch({
        type:'materialSupport/setIsEditable',
        payload:isEditable,
      })
    },
    getFileList(fileList){
      dispatch({
        type:'materialSupport/setFileList',
        payload:fileList
      })
    },
    getDetailList(detailList){
      dispatch({
        type:'materialSupport/setDetailList',
        payload:detailList
      })
    },
    onSubmit (formItem,nextUser) {
      dispatch({
        type: 'materialSupport/submit',
        payload: {formItem,nextUser},
      })
    },
    onAudit(formItem,taskItem){
      dispatch({
        type: 'materialSupport/audit',
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
    loading: loading.effects['materialSupport/query'],
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
        type: 'materialSupport/submit',
        payload: {formItem,nextUser},
      })
    },
    onDelete (id) {
      dispatch({
        type: 'materialSupport/deleteById',
        payload: {id},
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'materialSupport/editItem',
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
        type: 'materialSupport/showModal',
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

MaterialSupport.propTypes = {
  materialSupport: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ materialSupport, loading }) => ({ materialSupport, loading }))(MaterialSupport)
