import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Recruit = ({ location, dispatch, recruit, loading }) => {
  const { list,fileList,dicList,employeeList, pagination, currentItem, modalVisible, modalType } = recruit
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    fileList,
    employeeList,
    dicList,
    maskClosable: false,
    submitLoading:loading.effects['recruit/submit'],
    confirmLoading: loading.effects[`recruit/${modalType}`],
    title: `${modalType === 'create' ? '新增招聘申请' : '编辑招聘申请'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `recruit/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'recruit/hideModal',
      })
    },
    
    getFileList(fileList){
      dispatch({
        type:'recruit/setFileList',
        payload:fileList
      })
    },
    onSubmit (id,title) {
      dispatch({
        type: 'recruit/submit',
        payload: {id,title},
      })
    },
  }

  const listProps = {
    dataSource:list,
    loading: loading.effects['recruit/query'],
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
        type: 'recruit/submit',
        payload: {id,title},
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'recruit/editItem',
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
        type: 'recruit/showModal',
        payload: {
          modalType: 'create',
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

Recruit.propTypes = {
  recruit: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ recruit, loading }) => ({ recruit, loading }))(Recruit)
