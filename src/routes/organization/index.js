import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import { message } from 'antd' 


const Organization = ({ location, dispatch, organization, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType,selectedRowKeys } = organization
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {parentId:currentItem.id} :currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['organization/update'],
    title: `${modalType === 'create' ? '新增组织机构' : '编辑组织机构'}`,
    wrapClassName: 'vertical-center-modal',
    orgTree:list,
    onOk (data) {
      dispatch({
        type: `organization/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'organization/hideModal',
      })
    },
  }
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
     // console.log('selectedRows:',selectedRows[0]);
      dispatch({
        type: 'organization/setState',
        payload:selectedRows[0]
      })
    },
    getCheckboxProps: record => ({
      // disabled: record.isDisable === true, // Column configuration not to be checked
    }),
    selectedRowKeys,
    type:'radio',
  };
  const listProps = {
    dataSource: list,
    loading: loading.effects['organization/query'],
    pagination,
    location,
    rowSelection,
    defaultExpandAllRows:true,
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
    onRowClick(record,index,event){
      // console.log('onRowClick:',record,index,event)
      // if(record && !record.isDisable){
      // }
      dispatch({
        type: 'organization/setState',
        payload:record,
      })
    },
  }

  const filterProps = {
    
    
   
    onAdd () {
      if(!currentItem ||(currentItem && !currentItem.id)){
        message.error('请选择一个机构后再试')
        return;
      }
      dispatch({
        type: 'organization/showModal',
        payload: {
          modalType: 'create',
          currentItem: currentItem,
        },
      })
    },
    onDeleteItem () {
      if(!currentItem ||(currentItem && !currentItem.id)){
        message.error('请选择一个机构后再试')
        return;
      }
      dispatch({
        type: 'organization/delete',
        payload: currentItem.id,
      })
    },
    onChangeItem () {
      if(!currentItem ||(currentItem && !currentItem.id)){
        message.error('请选择一个机构后再试')
        return;
      }
      dispatch({
        type: 'organization/change',
        payload: {id:currentItem.id,isDisable:!currentItem.isDisable},
      })
    },
    onAddFirst(){
      dispatch({
        type: 'organization/showModal',
        payload: {
          modalType: 'create',
          currentItem: {id:0},
        },
      })

    },
    onEditItem () {
      if(!currentItem ||(currentItem && !currentItem.id)){
        message.error('请选择一个机构后再试')
        return;
      }
      dispatch({
        type: 'organization/editItem',
        payload: {
          modalType: 'update',
          id: currentItem.id,
        },
      })
    },
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

Organization.propTypes = {
  organization: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ organization, loading }) => ({ organization, loading }))(Organization)
