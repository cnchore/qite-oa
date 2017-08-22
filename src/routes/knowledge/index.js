import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Knowledge = ({ location, dispatch, knowledge, loading }) => {
  const { list,editorContent,fileList,orgList, pagination, currentItem, modalVisible, modalType } = knowledge
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    editorContent,
    fileList,
    orgList,
    maskClosable: false,
    changeLoading:loading.effects['knowledge/change'],
    confirmLoading: loading.effects[`knowledge/${modalType}`],
    title: `${modalType === 'create' ? '新增知识点' : '编辑知识点'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `knowledge/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'knowledge/hideModal',
      })
    },
    editorCallback(ed){
      dispatch({
        type:'knowledge/setEditorState',
        payload:ed
      })
    },
    
    getFileList(fileList){
      dispatch({
        type:'knowledge/setFileList',
        payload:fileList
      })
    },
    onItemChange (fields,id,title) {
      dispatch({
        type: 'knowledge/change',
        payload: {fields,id,title},
      })
    },
  }

  const listProps = {
    dataSource:list,
    loading: loading.effects['knowledge/query'],
    pagination,
    location,
    orgList,
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
    onItemChange (id,title) {
      dispatch({
        type: 'knowledge/change',
        payload: {fields:null,id,title},
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'knowledge/editItem',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }

  const filterProps = {
    
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
        type: 'knowledge/showModal',
        payload: {
          modalType: 'create',
          editorState:null,
          fileList:[],
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

Knowledge.propTypes = {
  knowledge: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ knowledge, loading }) => ({ knowledge, loading }))(Knowledge)
