import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Seal = ({ location, dispatch, seal, loading }) => {
  const { list,fileList,dicList,detailList,employeeList, taskData,
    pagination, currentItem, modalVisible, modalType,isEditable } = seal
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
    submitLoading:loading.effects['seal/submit'],
    confirmLoading: loading.effects[`seal/${modalType}`],
    auditLoading:loading.effects['seal/audit'],
    title: `${modalType === 'create' ? '新增－用章申请' : modalType==='update'?'编辑－用章申请':'退回修改－用章申请'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `seal/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'seal/hideModal',
      })
    },
    setIsEditable(isEditable){
      dispatch({
        type:'seal/setIsEditable',
        payload:isEditable,
      })
    },
    getFileList(fileList){
      dispatch({
        type:'seal/setFileList',
        payload:fileList
      })
    },
    getDetailList(detailList){
      dispatch({
        type:'seal/setDetailList',
        payload:detailList
      })
    },
    onSubmit (formItem,nextUser) {
      dispatch({
        type: 'seal/submit',
        payload: {formItem,nextUser},
      })
    },
    onAudit(formItem,taskItem){
      dispatch({
        type: 'seal/audit',
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
    loading: loading.effects['seal/query'],
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
        type: 'seal/submit',
        payload: {formItem,nextUser},
      })
    },
    onDelete (id) {
      dispatch({
        type: 'seal/deleteById',
        payload: {id},
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'seal/editItem',
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
        type: 'seal/showModal',
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

Seal.propTypes = {
  seal: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ seal, loading }) => ({ seal, loading }))(Seal)
