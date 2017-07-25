import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import { message } from 'antd' 


const Dictionary = ({ location, dispatch, dictionary, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType,selectedRowKeys } = dictionary
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {parentId:currentItem.id} :currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['dictionary/update'],
    title: `${modalType === 'create' ? '新增数据字典' : '编辑数据字典'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `dictionary/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'dictionary/hideModal',
      })
    },
  }
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log('selectedRows:',selectedRows[0]);
      dispatch({
        type: 'dictionary/setState',
        payload:selectedRows[0]
      })
    },
    selectedRowKeys,
    type:'radio',
  };
  const listProps = {
    dataSource: list,
    loading: loading.effects['dictionary/query'],
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
    onRowClick(record){
      dispatch({
        type:'dictionary/setState',
        payload:record,
      })
    },
  }

  const filterProps = {
    onAdd () {
      dispatch({
        type: 'dictionary/showModal',
        payload: {
          modalType: 'create',
          currentItem: currentItem,
        },
      })
    },
    onDeleteItem () {
      if(!currentItem ||(currentItem && !currentItem.id)){
        message.error('请选择一个字典后再试')
        return;
      }
      dispatch({
        type: 'dictionary/delete',
        payload: currentItem.id,
      })
    },
    onEditItem () {
      if(!currentItem ||(currentItem && !currentItem.id)){
        message.error('请选择一个字典后再试')
        return;
      }
      dispatch({
        type: 'dictionary/editItem',
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

Dictionary.propTypes = {
  dictionary: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ dictionary, loading }) => ({ dictionary, loading }))(Dictionary)
