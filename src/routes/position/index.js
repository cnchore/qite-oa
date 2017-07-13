import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import { message } from 'antd' 


const Position = ({ location, dispatch, position, loading }) => {
  const { list,orgList,orgTree,dicList,orgKey,postLevelList, pagination, currentItem, modalVisible, modalType } = position
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {parentId:currentItem.id} :currentItem,
    orgList,
    dicList,
    orgKey,
    postLevelList,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['position/update'],
    title: `${modalType === 'create' ? '新增职位' : '编辑职位'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `position/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'position/hideModal',
      })
    },
  }
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
     // console.log('selectedRows:',selectedRows[0]);
      dispatch({
        type: 'position/setState',
        payload:selectedRows[0]
      })
    },
    
    type:'radio',
  };
  const listProps = {
    dataSource: list,
    loading: loading.effects['position/query'],
    pagination,
    location,
    rowSelection,
    orgList,
    orgTree,
    postLevelList,
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
        type: 'position/setOrgKey',
        payload:key
      })
    },
  }

  const filterProps = {
    
    
   
    onAdd () {
      
      dispatch({
        type: 'position/showModal',
        payload: {
          modalType: 'create',
          currentItem: currentItem,
        },
      })
    },
    onDeleteItem () {
      if(!currentItem ||(currentItem && !currentItem.id)){
        message.error('请选择一个职位后再试')
        return;
      }
      dispatch({
        type: 'position/delete',
        payload: currentItem.id,
      })
    },
    onEditItem () {
      if(!currentItem ||(currentItem && !currentItem.id)){
        message.error('请选择一个职位后再试')
        return;
      }
      dispatch({
        type: 'position/editItem',
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

Position.propTypes = {
  position: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ position, loading }) => ({ position, loading }))(Position)
