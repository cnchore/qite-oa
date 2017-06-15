import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import { message,Affix } from 'antd' 


const MenuManage = ({ location, dispatch, menuManage, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType } = menuManage
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {parentId:currentItem.id || 0} :currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['menuManage/update'],
    title: `${modalType === 'create' ? '新增菜单' : '编辑菜单'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `menuManage/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'menuManage/hideModal',
      })
    },
  }
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log('selectedRows:',selectedRows[0]);
      dispatch({
        type: 'menuManage/setState',
        payload:selectedRows[0]
      })
    },
    
    type:'radio',
  };
  const listProps = {
    dataSource: list,
    loading: loading.effects['menuManage/query'],
    pagination,
    location,
    rowSelection,
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
    
  }

  const filterProps = {
    
    
   
    onAdd () {
      
      dispatch({
        type: 'menuManage/showModal',
        payload: {
          modalType: 'create',
          currentItem: currentItem,
        },
      })
    },
    onAddFirst(){
      dispatch({
        type: 'menuManage/showModal',
        payload: {
          modalType: 'create',
          currentItem: {id:0},
        },
      })

    },
    onDeleteItem () {
      if(!currentItem ||(currentItem && !currentItem.id)){
        message.error('请选择一个字典后再试')
        return;
      }
      dispatch({
        type: 'menuManage/delete',
        payload: currentItem.id,
      })
    },
    onEditItem () {
      if(!currentItem ||(currentItem && !currentItem.id)){
        message.error('请选择一个字典后再试')
        return;
      }
      dispatch({
        type: 'menuManage/editItem',
        payload: {
          modalType: 'update',
          id: currentItem.id,
        },
      })
    },
  }

  return (
    <div className="content-inner">
      <Affix target={() => document.getElementById('layout-main')}>
        <Filter {...filterProps} />
      </Affix>
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

MenuManage.propTypes = {
  menuManage: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ menuManage, loading }) => ({ menuManage, loading }))(MenuManage)
