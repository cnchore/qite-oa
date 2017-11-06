import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import PositModal from './PositModal'

import { message } from 'antd' 


const Employee = ({ location, dispatch, employee, loading }) => {
  const { list,orgList,photoUrl,dicList,orgTree,positionList,positSelList,orgKey,expand,brandTypeList,
    pagination, currentItem, modalVisible,positSelModalVisible, modalType,selectedPosition,roleList } = employee
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} :currentItem,
    orgList,
    positSelList,
    orgKey,
    expand,
    modalType,
    photoUrl,
    dicList,
    roleList,
    brandTypeList,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects[`employee/${modalType}`],
    setUserRoleLoading:loading.effects['employee/setUserRole'],
    title: `${modalType === 'create' ? '新增员工' : '编辑员工'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `employee/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'employee/hideModal',
      })
    },
    onSetUserRole(data){
      dispatch({
        type: 'employee/setUserRole',
        payload:data,
      })
    },
    onSel(){
      dispatch({
        type:'employee/showPositSelModal',

      })
    },
    setPhoto(url){
      dispatch({
        type:'employee/setPhoto',
        payload:url
      })
    },
    toggle(){
      dispatch({
        type:'employee/toggle',
      })
    },
  }
  const positSelModalProps={
    orgTree,
    positionList,
    selectedPosition,
    orgKey,
    loading:loading.effects['employee/getPosition'],
    visible:positSelModalVisible,
    maskClosable:false,
    confirmLoading:loading.effects['employee/positionSelect'],
    title:'职位选择',
    wrapClassName:'vertical-center-modal',
    onOk(data){
      dispatch({
        type:'employee/positionSelect',
        payload:data,
      })
    },
    onCancel(){
      dispatch({
        type:'employee/hidePositSelModal',
      })
    },
    setSelectedPosition(item){
      dispatch({
        type:'employee/setSelectedPosition',
        payload:item,
      })
    },
    onTreeSelect(key){
      
      dispatch({
        type: 'employee/getPosition',
        payload:{orgId:key}
      })
    },
  }
  const listProps = {
    dataSource: list,
    loading: loading.effects['employee/query'],
    pagination,
    location,
    orgTree,
    orgList,
    //defaultExpandAllRows:true,
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
    onDeleteItem (id) {
      
      dispatch({
        type: 'employee/delete',
        payload: id,
      })
    },
    
    onUserChange(userId,isDisable) {
      
      dispatch({
        type: 'employee/userChange',
        payload: {userId,isDisable},
      })
    },
    onResetPwd(userId) {
      
      dispatch({
        type: 'employee/resetPwd',
        payload: {userId},
      })
    },
    onEditItem (item) {
      
      dispatch({
        type: 'employee/editItem',
        payload: {
          modalType: 'update',
          id: item.id,
        },
      })
    },
    onTreeSelect(key){
      const { query, pathname } = location
      query.orgId=key;
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: 1,
        },
      }))
      dispatch({
        type: 'employee/setOrgKey',
        payload:key
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
        type: 'employee/showModal',
        payload: {
          modalType: 'create',
          currentItem: {},
          photoUrl:'',
        },
      })
    },
    
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
      {positSelModalVisible && <PositModal {...positSelModalProps} />}

    </div>
  )
}

Employee.propTypes = {
  employee: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ employee, loading }) => ({ employee, loading }))(Employee)
