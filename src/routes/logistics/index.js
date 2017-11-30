import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Logistics = ({ location, dispatch, logistics, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType,needRemark } = logistics
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    needRemark,
    maskClosable: false,
    confirmLoading: loading.effects['logistics/update'],
    title: `${modalType === 'create' ? '新增物流信息' : '编辑物流信息'}`,
    wrapClassName: 'vertical-center-modal',
    width:800,
    onOk (data) {
      dispatch({
        type: `logistics/${modalType}`,
        payload: data,
      })
    },

    setNeedRemark(needRemark){
      dispatch({
        type:'logistics/setState',
        payload:{needRemark},
      })
    },
    onCancel () {
      dispatch({
        type: 'logistics/hideModal',
      })
    },
  }

  const listProps = {
    dataSource:list,
    loading: loading.effects['logistics/query'],
    pagination,
    location,
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
        type: 'logistics/delete',
        payload: id,
      })
    },
    onChangeItem (data) {
      dispatch({
        type: 'logistics/change',
        payload: data,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'logistics/editItem',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
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
        type: 'logistics/showModal',
        payload: {
          modalType: 'create',
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

Logistics.propTypes = {
  logistics: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ logistics, loading }) => ({ logistics, loading }))(Logistics)
