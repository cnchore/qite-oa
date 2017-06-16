import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import { message,Affix } from 'antd' 
import { getFamliy,getChildren,getAnotB } from '../../utils'


const Auth = ({ location, dispatch, auth, loading }) => {
  const { list,roleList,roleKey,selectedRowKeys, pagination } = auth
  const { pageSize } = pagination

  
  const rowSelection = {
      selectedRowKeys,
      
      onSelect: (record, selected, selectedRows) => {

        let _selectedRows=selectedRows.map((item)=>item.id);
        //console.log('selectedRowKeys:',_selectedRows)
        
     
        let _pList=getFamliy(list,record.id,'id','parentId');
        let _cList=getChildren(list,record.id,'id');
        if(selected){
          _selectedRows.push(..._pList);
          _selectedRows.push(..._cList);
        }else{
          _selectedRows=getAnotB(_selectedRows,_pList);
          _selectedRows=getAnotB(_selectedRows,_cList);
          if(_selectedRows[0]){
            let _keys=[]
            _selectedRows.map((item)=>{
              _keys.push(...getFamliy(list,item,'id','parentId'));
            })
            _selectedRows=_keys;
          }
        }
        _selectedRows=Array.from(new Set(_selectedRows))
       
        //console.log('List:',..._selectedRows);
        dispatch({
          type: 'auth/setSelectedRowKeys',
          payload:_selectedRows
        })
        //console.log('onSelect:',record.key, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        dispatch({
          type: 'auth/setSelectedRowKeys',
          payload:selectedRows.map((item)=>item.id)
        })
        //console.log('onSelectAll:',selected, selectedRows, changeRows);
      },
    
  };
  const listProps = {
    dataSource: list,
    loading: loading.effects['auth/query'],
    pagination,
    location,
    rowSelection,
    roleList,
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
      query.roleId=key;
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: 1,
        },
      }))
      dispatch({
        type: 'auth/setRoleKey',
        payload:key
      })
    },
  }

  const filterProps = {
    
    
   
    onSave () {
      if(roleKey===undefined || roleKey===null){
        message.error('请选择一个角色后再试')
        return;
      }
      dispatch({
        type: 'auth/saveMenuRole',
        payload: {},
      })
    },
    onReset () {
      const { query, pathname } = location
      query.roleId=roleKey;
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: 1,
        },
      }))
    },
   
  }

  return (
    <div className="content-inner">
      <Affix target={() => document.getElementById('layout-main')}>
        <Filter {...filterProps} />
      </Affix>
      <List {...listProps} />
    </div>
  )
}

Auth.propTypes = {
  auth: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ auth, loading }) => ({ auth, loading }))(Auth)
