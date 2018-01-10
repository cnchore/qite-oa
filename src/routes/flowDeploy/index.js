import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import List from './List';
import Filter from './Filter';
import Modal from './Modal';

const FlowDeploy = ({ location, dispatch, flowDeploy, loading }) => {
  const { list,pdList,dicList,pagination,pdPagination, currentItem, modalVisible } = flowDeploy;
  const { pageSize } = pagination;
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
      dispatch({
        type:'flowDeploy/query',
        payload:{
          page:page.current,
          pageSize:page.pageSize,
        }
      })
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
        dispatch({
          type:'flowDeploy/getPDPage',
          payload:{
            page:page.current,
            pageSize:page.pageSize,
          }
        });
      }
    }
  }

  const filterProps = {
    dicList,
    filter:{
      ...location.query,
    },
    onSearch(data){
      // dispatch({
      //   type:'flowDeploy/query',
      //   payload:data,
      // });
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...data,
          page: 1,
          pageSize,
        },
      }));
      // dispatch({
      //   type:'flowDeploy/getPDPage',
      //   payload:data,
      // });
    },
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
