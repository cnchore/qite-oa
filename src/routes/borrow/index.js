import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Borrow = ({ location, dispatch, borrow, loading }) => {
  const { list,fileList,dicList,employeeList, taskData,orgTree,travelList,
    pagination, currentItem, modalVisible, modalType } = borrow
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    fileList,
    employeeList,
    orgTree,
    travelList,
    dicList,
    taskData,
    // isEditable,
    maskClosable: false,
    submitLoading:loading.effects['borrow/submit'],
    confirmLoading: loading.effects[`borrow/${modalType}`],
    auditLoading:loading.effects['borrow/audit'],
    title: `${modalType === 'create' ? '新增－借款申请' : modalType==='update'?'编辑－借款申请':'退回修改－借款申请'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `borrow/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'borrow/hideModal',
      })
    },
    getFileList(fileList){
      dispatch({
        type:'borrow/setFileList',
        payload:fileList
      })
    },
    onSubmit (formItem,nextUser) {
      dispatch({
        type: 'borrow/submit',
        payload: {formItem,nextUser},
      })
    },
    onAudit(formItem,taskItem){
      dispatch({
        type: 'borrow/audit',
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
    loading: loading.effects['borrow/query'],
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
        type: 'borrow/submit',
        payload: {formItem,nextUser},
      })
    },
    onDelete (id) {
      dispatch({
        type: 'borrow/deleteById',
        payload: {id},
      })
    },
    onEditItem (item) {
      dispatch({
        type:'borrow/getTravelList',
        payload:{
          borrowId:item.id,
        }
      });
      dispatch({
        type: 'borrow/editItem',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      });
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
      dispatch({type:'borrow/getTravelList'});
      dispatch({
        type: 'borrow/showModal',
        payload: {
          modalType: 'create',
          fileList:[],
          detailList:[],
          taskData:{},
        },
      });
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

Borrow.propTypes = {
  borrow: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ borrow, loading }) => ({ borrow, loading }))(Borrow)
