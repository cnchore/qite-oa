import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const SampleReplace = ({ location, dispatch, sampleReplace, loading }) => {
  const { list,fileList,dicList,detailList,employeeList, taskData,busiType,
    pagination, currentItem, modalVisible, modalType,isEditable } = sampleReplace
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    fileList,
    employeeList,
    busiType,
    detailList,
    dicList,
    taskData,
    isEditable,
    maskClosable: false,
    submitLoading:loading.effects['sampleReplace/submit'],
    confirmLoading: loading.effects[`sampleReplace/${modalType}`],
    auditLoading:loading.effects['sampleReplace/audit'],
    title: `${modalType === 'create' ? '新增－售后问题处理申请' : modalType==='update'?'编辑－售后问题处理申请':'退回修改－售后问题处理申请'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `sampleReplace/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'sampleReplace/hideModal',
      })
    },
    setIsEditable(isEditable){
      dispatch({
        type:'sampleReplace/setIsEditable',
        payload:isEditable,
      })
    },
    getFileList(fileList){
      dispatch({
        type:'sampleReplace/setFileList',
        payload:fileList
      })
    },
    getDetailList(detailList){
      dispatch({
        type:'sampleReplace/setDetailList',
        payload:detailList
      })
    },
    onSubmit (formItem,nextUser) {
      dispatch({
        type: 'sampleReplace/submit',
        payload: {formItem,nextUser},
      })
    },
    onAudit(formItem,taskItem){
      dispatch({
        type: 'sampleReplace/audit',
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
    loading: loading.effects['sampleReplace/query'],
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
        type: 'sampleReplace/submit',
        payload: {formItem,nextUser},
      })
    },
    onDelete (id) {
      dispatch({
        type: 'sampleReplace/deleteById',
        payload: {id},
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'sampleReplace/editItem',
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
    
    onAdd (busiType) {
      dispatch({
        type: 'sampleReplace/showModal',
        payload: {
          modalType: 'create',
          fileList:[],
          detailList:[],
          taskData:{},
          busiType:busiType
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

SampleReplace.propTypes = {
  sampleReplace: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ sampleReplace, loading }) => ({ sampleReplace, loading }))(SampleReplace)
