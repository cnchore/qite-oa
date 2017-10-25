import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import {Icon} from 'antd'

const CarDetail = ({ location, dispatch, carDetail, loading }) => {
  const { carInfo,list, pagination, currentItem, modalVisible, modalType,onlyview } = carDetail
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['carDetail/update'],
    title: `${modalType === 'create' ? '新增维修/保养记录' : '编辑维修/保养记录'}`,
    wrapClassName: 'vertical-center-modal',
    // width:800,
    onOk (data) {
      dispatch({
        type: `carDetail/${modalType}`,
        payload: {...data,carId:carInfo.id},
      })
    },
    onCancel () {
      dispatch({
        type: 'carDetail/hideModal',
      })
    },
  }

  const listProps = {
    dataSource:list,
    loading: loading.effects['carDetail/query'],
    pagination,
    location,
    onlyview,
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
        type: 'carDetail/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'carDetail/editItem',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }

  const filterProps = {
    item:carInfo,
    onlyview,
    onAdd () {
      dispatch({
        type: 'carDetail/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
   
  }

  return (
    <div className="content-inner">
      <div className="q-goback">
        <a href="javascript:window.history.back();">
          <Icon type="close-circle-o" />
        </a>
      </div>
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && !onlyview && <Modal {...modalProps} />}
    </div>
  )
}

CarDetail.propTypes = {
  carDetail: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ carDetail, loading }) => ({ carDetail, loading }))(CarDetail)
