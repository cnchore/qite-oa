import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
// import Modal from './Modal'

const ShopUpgrade = ({ location, dispatch, shopUpgrade, loading }) => {
  const { list,fileList,dicList,detailList,employeeList, taskData,
    pagination, currentItem, modalVisible, modalType,isEditable } = shopUpgrade
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    fileList,
    employeeList,
    // travelList,
    detailList,
    dicList,
    taskData,
    isEditable,
    maskClosable: false,
    submitLoading:loading.effects['shopUpgrade/submit'],
    confirmLoading: loading.effects[`shopUpgrade/${modalType}`],
    auditLoading:loading.effects['shopUpgrade/audit'],
    title: `${modalType === 'create' ? '新增－店面升级申请' : modalType==='update'?'编辑－店面升级申请':'退回修改－店面升级申请'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `shopUpgrade/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'shopUpgrade/hideModal',
      })
    },
    setIsEditable(isEditable){
      dispatch({
        type:'shopUpgrade/setIsEditable',
        payload:isEditable,
      })
    },
    getFileList(fileList){
      dispatch({
        type:'shopUpgrade/setFileList',
        payload:fileList
      })
    },
    getDetailList(detailList){
      dispatch({
        type:'shopUpgrade/setDetailList',
        payload:detailList
      })
    },
    onSubmit (formItem,nextUser) {
      dispatch({
        type: 'shopUpgrade/submit',
        payload: {formItem,nextUser},
      })
    },
    onAudit(formItem,taskItem){
      dispatch({
        type: 'shopUpgrade/audit',
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
    loading: loading.effects['shopUpgrade/query'],
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
    onSubmit (formItem,nextUser) {
      dispatch({
        type: 'shopUpgrade/submit',
        payload: {formItem,nextUser},
      })
    },
    onDelete (id) {
      dispatch({
        type: 'shopUpgrade/deleteById',
        payload: {id},
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'shopUpgrade/editItem',
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
        type: 'shopUpgrade/showModal',
        payload: {
          modalType: 'create',
          fileList:[],
          detailList:[],
          taskData:{},
        },
      })
    },
   
  }

  return (
    <div className="content-inner">
      {!modalVisible &&<Filter {...filterProps} />}
      {!modalVisible &&<List {...listProps} />}
    </div>
  )
}
      // {modalVisible && <Modal {...modalProps} />}

ShopUpgrade.propTypes = {
  shopUpgrade: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ shopUpgrade, loading }) => ({ shopUpgrade, loading }))(ShopUpgrade)
