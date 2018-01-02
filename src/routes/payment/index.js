import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Payment = ({ location, dispatch, payment, loading }) => {
  const { list,fileList,dicList,purchaseList,employeeList,taskData, pagination, currentItem, modalVisible, modalType } = payment
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    fileList,
    employeeList,
    dicList,
    purchaseList,
    taskData,
    maskClosable: false,
    submitLoading:loading.effects['payment/submit'],
    confirmLoading: loading.effects[`payment/${modalType}`],
    auditLoading:loading.effects['payment/audit'],
    title: `${modalType === 'create' ? '新增－付款申请' : modalType==='update'?'编辑－付款申请':'退回修改－付款申请'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `payment/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'payment/hideModal',
      })
    },
    
    getFileList(fileList){
      dispatch({
        type:'payment/setFileList',
        payload:fileList
      })
    },
    onSubmit (formItem,nextUser) {
      dispatch({
        type: 'payment/submit',
        payload: {formItem,nextUser},
      })
    },
    onAudit(formItem,taskItem){
      dispatch({
        type: 'payment/audit',
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
    loading: loading.effects['payment/query'],
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
        type: 'payment/submit',
        payload: {formItem,nextUser},
      })
    },
    onDelete (id) {
      dispatch({
        type: 'payment/deleteById',
        payload: {id},
      })
    },
    onEditItem (item) {
      dispatch({
        type:'payment/getPurchaseList',
        payload:{
          payId:item.id,
        }
      });
      dispatch({
        type: 'payment/editItem',
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
      dispatch({
        type:'payment/getPurchaseList'
      });
      dispatch({
        type: 'payment/showModal',
        payload: {
          modalType: 'create',
          fileList:[],
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

Payment.propTypes = {
  payment: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ payment, loading }) => ({ payment, loading }))(Payment)
