import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const RenoSubsidy = ({ location, dispatch, renoSubsidy, loading }) => {
  const { list,fileList,dicList,detailList,employeeList, taskData,
    pagination, currentItem, modalVisible, modalType,isEditable } = renoSubsidy
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
    submitLoading:loading.effects['renoSubsidy/submit'],
    confirmLoading: loading.effects[`renoSubsidy/${modalType}`],
    auditLoading:loading.effects['renoSubsidy/audit'],
    title: `${modalType === 'create' ? '新增－装修补贴费用申请' : modalType==='update'?'编辑－装修补贴费用申请':'退回修改－装修补贴费用申请'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `renoSubsidy/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'renoSubsidy/hideModal',
      })
    },
    setIsEditable(isEditable){
      dispatch({
        type:'renoSubsidy/setIsEditable',
        payload:isEditable,
      })
    },
    getFileList(fileList){
      dispatch({
        type:'renoSubsidy/setFileList',
        payload:fileList
      })
    },
    getDetailList(detailList){
      dispatch({
        type:'renoSubsidy/setDetailList',
        payload:detailList
      })
    },
    onSubmit (formItem,nextUser) {
      dispatch({
        type: 'renoSubsidy/submit',
        payload: {formItem,nextUser},
      })
    },
    onAudit(formItem,taskItem){
      dispatch({
        type: 'renoSubsidy/audit',
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
    loading: loading.effects['renoSubsidy/query'],
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
        type: 'renoSubsidy/submit',
        payload: {formItem,nextUser},
      })
    },
    onDelete (id) {
      dispatch({
        type: 'renoSubsidy/deleteById',
        payload: {id},
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'renoSubsidy/editItem',
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
        type: 'renoSubsidy/showModal',
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

RenoSubsidy.propTypes = {
  renoSubsidy: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ renoSubsidy, loading }) => ({ renoSubsidy, loading }))(RenoSubsidy)
