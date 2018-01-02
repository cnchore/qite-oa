import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Reimburse = ({ location, dispatch, reimburse, loading }) => {
  const { list,fileList,dicList,detailList,taskData,purchaseList,employeeList, borrowList,
    pagination, currentItem, modalVisible, modalType,isEditable } = reimburse
  const { pageSize } = pagination

  const modalProps = {
    item: currentItem,
    visible: modalVisible,
    fileList,
    employeeList,
    purchaseList,
    detailList,
    dicList,
    taskData,
    isEditable,
    borrowList,
    maskClosable: false,
    submitLoading:loading.effects['reimburse/submit'],
    confirmLoading: loading.effects[`reimburse/${modalType}`],
    auditLoading:loading.effects['reimburse/audit'],
    title: `${modalType === 'create' ? '新增－费用报销申请' : modalType==='update'?'编辑－费用报销申请':'退回修改－费用报销申请'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `reimburse/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'reimburse/hideModal',
      })
    },
    setIsEditable(isEditable){
      dispatch({
        type:'reimburse/setIsEditable',
        payload:isEditable,
      })
    },
    getFileList(fileList){
      dispatch({
        type:'reimburse/setFileList',
        payload:fileList
      })
    },
    getDetailList(detailList){
      dispatch({
        type:'reimburse/setDetailList',
        payload:detailList
      })
    },
    onSubmit (formItem,nextUser) {
      dispatch({
        type: 'reimburse/submit',
        payload: {formItem,nextUser},
      })
    },
    onAudit(formItem,taskItem){
      dispatch({
        type: 'reimburse/audit',
        payload: {formItem,taskItem},
      })
    },
    setState(fields){
      dispatch({
        type: 'reimburse/setState',
        payload: fields,
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
    loading: loading.effects['reimburse/query'],
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
        type: 'reimburse/submit',
        payload: {formItem,nextUser},
      })
    },
    onDelete (id) {
      dispatch({
        type: 'reimburse/deleteById',
        payload: {id},
      })
    },
    onEditItem (item) {
      dispatch({
        type:'reimburse/getPurchaseList',
        payload:{
          isChooseReimburse:true,
          reimburseId:item.id,
        }
      });
      dispatch({
        type:'reimburse/getBorrowList',
        payload:{
          isReimburse:true,
          reimburseId:item.id,
        }
      });
      dispatch({
        type: 'reimburse/editItem',
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
        type:'reimburse/getPurchaseList',
        payload:{
          isChooseReimburse:true
        }
      });
      dispatch({
        type:'reimburse/getBorrowList',
        payload:{
          isReimburse:true,
        }
      });
      dispatch({
        type: 'reimburse/showModal',
        payload: {
          modalType: 'create',
          currentItem:{},
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

Reimburse.propTypes = {
  reimburse: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ reimburse, loading }) => ({ reimburse, loading }))(Reimburse)
