import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Notice = ({ location, dispatch, notice, loading }) => {
  const { list,fileList,dicList,employeeList,editorState,
   pagination, currentItem, modalVisible, modalType } = notice
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    fileList,
    employeeList,
    editorState,
    dicList,
    maskClosable: false,
    submitLoading:loading.effects['notice/submit'],
    confirmLoading: loading.effects[`notice/${modalType}`],
    title: `${modalType === 'create' ? '新增通知发放申请' : '编辑通知发放申请'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `notice/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'notice/hideModal',
      })
    },
    
    getFileList(fileList){
      dispatch({
        type:'notice/setFileList',
        payload:fileList
      })
    },
    onSubmit (id,title) {
      dispatch({
        type: 'notice/submit',
        payload: {id,title},
      })
    },
    setEditorState(ed){
      dispatch({
        type:'notice/setEditorState',
        payload:ed
      })
    },
  }

  const listProps = {
    dataSource:list,
    loading: loading.effects['notice/query'],
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
    onSubmit (id,title) {
      dispatch({
        type: 'notice/submit',
        payload: {id,title},
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'notice/editItem',
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
        type: 'notice/showModal',
        payload: {
          modalType: 'create',
          fileList:[],
          editorState:null,
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

Notice.propTypes = {
  notice: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ notice, loading }) => ({ notice, loading }))(Notice)
