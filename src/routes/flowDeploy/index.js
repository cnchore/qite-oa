import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const FlowDeploy = ({ location, dispatch, flowDeploy, loading }) => {
  const { list,pdList,dicList,pagination,pdPagination, currentItem, modalVisible } = flowDeploy
  
  const modalProps = {
    item: currentItem,
    visible: modalVisible,
    maskClosable: true,
    title: '查看流程图',
    wrapClassName: 'vertical-center-modal',
    width:1024,
    onCancel () {
      dispatch({
        type: 'flowDeploy/hideModal',
      })
    },
   
  }

  const listProps = {
    dataSource:list,
    loading: loading.effects['flowDeploy/query'],
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
   
    onEditItem (item) {
      dispatch({
        type: 'flowDeploy/viewItem',
        payload: {
          currentItem: item,
        },
      })
    },
    pdListProps:{
      dataSource:pdList,
      loading:loading.effects['flowDeploy/getPDPage'],
      pagination:pdPagination,
      location,
      onChange(page){
        const {query,pathname}=location
        dispatch(routerRedux.push({
          pathname,
          query:{
            ...query,
            pdPage:page.current,
            pdPageSize:page.pageSize,
          }
        }))
      }
    }
  }

  const filterProps = {
    dicList,
    
    onDeploy (data) {
      dispatch({
        type: 'flowDeploy/deploy',
        payload: data,
      })
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

FlowDeploy.propTypes = {
  flowDeploy: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ flowDeploy, loading }) => ({ flowDeploy, loading }))(FlowDeploy)
