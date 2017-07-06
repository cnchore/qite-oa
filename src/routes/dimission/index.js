import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Dimission = ({ location, dispatch, dimission, loading }) => {
  const { list,fileList,dicList,employeeList, pagination, currentItem, modalVisible, modalType } = dimission
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    fileList,
    employeeList,
    dicList,
    maskClosable: false,
    submitLoading:loading.effects['dimission/submit'],
    confirmLoading: loading.effects[`dimission/${modalType}`],
    title: `${modalType === 'create' ? '新增离职申请' : '编辑离职申请'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `dimission/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'dimission/hideModal',
      })
    },
    
    getFileList(fileList){
      dispatch({
        type:'dimission/setFileList',
        payload:fileList
      })
    },
    onSubmit (id,title) {
      dispatch({
        type: 'dimission/submit',
        payload: {id,title},
      })
    },
  }

  const listProps = {
    dataSource:list,
    loading: loading.effects['dimission/query'],
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
        type: 'dimission/submit',
        payload: {id,title},
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'dimission/editItem',
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
        type: 'dimission/showModal',
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

Dimission.propTypes = {
  dimission: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ dimission, loading }) => ({ dimission, loading }))(Dimission)
