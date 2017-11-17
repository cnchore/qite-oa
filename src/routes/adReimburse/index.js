import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const AdReimburse = ({ location, dispatch, adReimburse, loading }) => {
  const { list,fileList,dicList,detailList,employeeList, taskData,adList,
    pagination, currentItem, modalVisible, modalType,isEditable } = adReimburse
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    fileList,
    employeeList,
    adList,
    detailList,
    dicList,
    taskData,
    isEditable,
    maskClosable: false,
    submitLoading:loading.effects['adReimburse/submit'],
    confirmLoading: loading.effects[`adReimburse/${modalType}`],
    auditLoading:loading.effects['adReimburse/audit'],
    title: `${modalType === 'create' ? '新增－广告费用报销申请' : modalType==='update'?'编辑－广告费用报销申请':'退回修改－广告费用报销申请'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `adReimburse/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'adReimburse/hideModal',
      })
    },
    setIsEditable(isEditable){
      dispatch({
        type:'adReimburse/setIsEditable',
        payload:isEditable,
      })
    },
    getFileList(fileList){
      dispatch({
        type:'adReimburse/setFileList',
        payload:fileList
      })
    },
    getDetailList(detailList){
      dispatch({
        type:'adReimburse/setDetailList',
        payload:detailList
      })
    },
    onSubmit (formItem,nextUser) {
      dispatch({
        type: 'adReimburse/submit',
        payload: {formItem,nextUser},
      })
    },
    onAudit(formItem,taskItem){
      dispatch({
        type: 'adReimburse/audit',
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
    loading: loading.effects['adReimburse/query'],
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
        type: 'adReimburse/submit',
        payload: {formItem,nextUser},
      })
    },
    onDelete (id) {
      dispatch({
        type: 'adReimburse/deleteById',
        payload: {id},
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'adReimburse/editItem',
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
        type: 'adReimburse/showModal',
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

AdReimburse.propTypes = {
  adReimburse: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ adReimburse, loading }) => ({ adReimburse, loading }))(AdReimburse)
