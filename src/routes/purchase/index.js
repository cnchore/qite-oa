import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Purchase = ({ location, dispatch, purchase, loading }) => {
  const { list,fileList,dicList,detailList,employeeList, pagination, taskData,isNeedSel,reasonStr,
    currentItem, modalVisible, modalType,isEditable,isTurn } = purchase
  const { pageSize } = pagination

  const modalProps = {
    item: currentItem,
    visible: modalVisible,
    fileList,
    employeeList,
    isNeedSel,reasonStr,
    detailList,
    dicList,
    taskData,
    isEditable,
    isTurn,
    maskClosable: false,
    submitLoading:loading.effects['purchase/submit'],
    confirmLoading: loading.effects[`purchase/${modalType}`],
    auditLoading:loading.effects['purchase/audit'],
    title: `${modalType === 'create' ? '新增－采购申请' : modalType==='update'?'编辑－采购申请':'退回修改－采购申请'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `purchase/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'purchase/hideModal',
      })
    },
    setIsEditable(isEditable){
      dispatch({
        type:'purchase/setIsEditable',
        payload:isEditable
      })
    },
    getFileList(fileList){
      dispatch({
        type:'purchase/setFileList',
        payload:fileList
      })
    },
    getDetailList(detailList){
      // console.log('detailList',detailList)
      dispatch({
        type:'purchase/setDetailList',
        payload:detailList
      })
    },
    onSubmit (formItem,nextUser) {
      dispatch({
        type: 'purchase/submit',
        payload: {formItem,nextUser},
      })
    },
    onAudit(formItem,taskItem){
      dispatch({
        type: 'purchase/audit',
        payload: {formItem,taskItem},
      })
    },
    setNeedSel(isNeedSel,reasonStr,isTurn){
      dispatch({
        type:'purchase/setNeedSel',
        payload:{isNeedSel,reasonStr,isTurn}
      })
    },
    turnToDoTask(data){
      dispatch({
        type: 'purchase/turnToDoTask',
        payload: data,
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
    loading: loading.effects['purchase/query'],
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
        type: 'purchase/submit',
        payload: {formItem,nextUser},
      })
    },
    onDelete (id) {
      dispatch({
        type: 'purchase/deleteById',
        payload: {id},
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'purchase/editItem',
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
        type: 'purchase/showModal',
        payload: {
          modalType: 'create',
          fileList:[],
          detailList:[],
          taskData:{},
          currentItem:{isMonthRepeat:'',typeOption:[]},
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

Purchase.propTypes = {
  purchase: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ purchase, loading }) => ({ purchase, loading }))(Purchase)
