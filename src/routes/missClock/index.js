import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const MissClock = ({ location, dispatch, missClock, loading }) => {
  const { list,fileList,employeeList, pagination, currentItem, modalVisible, modalType } = missClock
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    fileList,
    employeeList,
    maskClosable: false,
    submitLoading:loading.effects['missClock/submit'],
    confirmLoading: loading.effects[`missClock/${modalType}`],
    title: `${modalType === 'create' ? '新增考勤异常申请' : '编辑考勤异常申请'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `missClock/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'missClock/hideModal',
      })
    },
    
    getFileList(fileList){
      dispatch({
        type:'missClock/setFileList',
        payload:fileList
      })
    },
    onSubmit (id,title) {
      dispatch({
        type: 'missClock/submit',
        payload: {id,title},
      })
    },
  }

  const listProps = {
    dataSource:list,
    loading: loading.effects['missClock/query'],
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
    onSubmit (id,title) {
      dispatch({
        type: 'missClock/submit',
        payload: {id,title},
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'missClock/editItem',
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
        type: 'missClock/showModal',
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

MissClock.propTypes = {
  missClock: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ missClock, loading }) => ({ missClock, loading }))(MissClock)
