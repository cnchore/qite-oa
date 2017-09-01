import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Storage = ({ location, dispatch, storage, loading }) => {
  const { list,fileList,dicList,employeeList, pagination,
    currentItem, modalVisible, modalType } = storage
  const { pageSize } = pagination

  const modalProps = {
    item: currentItem,
    visible: modalVisible,
    fileList,
    employeeList,
    dicList,
    maskClosable: false,
    storeInDetailLoading:loading.effects['storage/update'],
    title: '物品入库',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'storage/hideModal',
      })
    },
    onCancel () {
      dispatch({
        type: 'storage/hideModal',
      })
      dispatch({
        type: 'storage/query',
      })
    },
    getFileList(fileList){
      dispatch({
        type:'storage/setFileList',
        payload:fileList
      })
    },
    storeInDetail(data){
      dispatch({
        type: 'storage/update',
        payload: data,
      })
    },
    
  }

  const listProps = {
    dataSource:list,
    loading: loading.effects['storage/query'],
    pagination,
    location,
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
    onEditItem (item) {
      dispatch({
        type: 'storage/editItem',
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
  }

  return (
    <div className="content-inner">
      {!modalVisible &&<Filter {...filterProps} />}
      {!modalVisible &&<List {...listProps} />}
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

Storage.propTypes = {
  storage: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ storage, loading }) => ({ storage, loading }))(Storage)