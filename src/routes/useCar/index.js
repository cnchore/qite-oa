import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const UseCar = ({ location, dispatch, useCar, loading }) => {
  const { list,fileList,dicList,employeeList,taskData, pagination, currentItem, modalVisible, modalType } = useCar
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    fileList,
    employeeList,
    dicList,
    taskData,
    maskClosable: false,
    submitLoading:loading.effects['useCar/submit'],
    confirmLoading: loading.effects[`useCar/${modalType}`],
    auditLoading:loading.effects['useCar/audit'],
    title: `${modalType === 'create' ? '新增－用车申请' : modalType==='update'?'编辑－用车申请':'退回修改－用车申请'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `useCar/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'useCar/hideModal',
      })
    },
    
    getFileList(fileList){
      dispatch({
        type:'useCar/setFileList',
        payload:fileList
      })
    },
    onSubmit (formItem,nextUser) {
      dispatch({
        type: 'useCar/submit',
        payload: {formItem,nextUser},
      })
    },
    onAudit(formItem,taskItem){
      dispatch({
        type: 'useCar/audit',
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
    loading: loading.effects['useCar/query'],
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
        type: 'useCar/submit',
        payload: {formItem,nextUser},
      })
    },
    onDelete (id) {
      dispatch({
        type: 'useCar/deleteById',
        payload: {id},
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'useCar/editItem',
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
        type: 'useCar/showModal',
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

UseCar.propTypes = {
  useCar: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ useCar, loading }) => ({ useCar, loading }))(UseCar)
