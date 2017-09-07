import { query,queryById,save,change,getDinnerInfo,queryEmployee,getDic,getOrg,isCanAdd } from '../services/dinnerBook'
import { config,arrayToTree,treeToArray } from '../utils'
import { parse } from 'qs'
import { message } from 'antd'
const { prefix } = config

export default {

  namespace: 'dinnerBook',

  state: {
    list: [],
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    employeeList:[],
    selectedRowKeys:[],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname==='/dinnerBook') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
          // dispatch({
          //   type: 'getOrg',
          //   payload: location.query,
          // })
        }
      })
    },
  },

  effects: {
    *query ({ payload }, { call, put }) {

      payload=parse(location.hash.split('#/dinnerBook?')[1]); 
     
      payload={...payload,rows:payload.pageSize}
      const data = yield call(query, payload)
      
      if (data && data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.rowsObject,//arrayToTree(data.data.rowsObject,'id','parentId'),
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.data.total,
            },
          },
        })
        
      }
    },
    *getOrg ({ payload }, { call, put }) {
      const data = yield call(getOrg, {})
      if (data) {
        yield put({
          type: 'getOrgSuccess',
          payload: {
            orgTree: data.data,
            orgList: treeToArray(data.data)
          },
        })
      }
    },
    *getDic ({ payload }, { call, put }) {
      const data = yield call(getDic, payload)
      if (data) {
        yield put({
          type: 'getDicSuccess',
          payload: data.data,
        })
      }
    },
    *queryEmployee ({ payload }, { call, put }) {
      const data = yield call(queryEmployee, {...payload,includeChildOrgId:true})
      if (data && data.success) {
        yield put({
          type: 'queryEmployeeSuccess',
          payload: data.data,
        })
      }
    },
    
    *getDinnerInfo ({ payload }, { call, put }) {
      const data = yield call(getDinnerInfo, payload)
      if (data && data.success) {
        yield put({
          type: 'getDinnerInfoSuccess',
          payload: data.data.detailList,
        })
      }
    },
    *isCanAdd ({ payload }, { call, put }) {

      const data = yield call(isCanAdd, {})
      if (data.success) {
        yield put({ type: 'showModal',payload:payload })
        // yield put({ type: 'query' })
      } else {
        message.error(data.message);
        // throw data
      }
    },
    
    *create ({ payload }, { call, put }) {

      const data = yield call(save, payload)
      if (data.success) {
        message.success('新增成功');
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    *editItem ({ payload }, { call, put }) {
      const id=payload.currentItem.id;
      const data = yield call(queryById, {id})

      if (data.success) {
        
        yield put({ 
          type: 'showModal',
          payload:{
            ...payload,
            currentItem:data.data,
          } 
        })
        yield put({
          type: 'getDinnerInfoSuccess',
          payload: data.data.detailList,
        })
      } else {
        throw data
      }
    },
    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ dinnerBook }) => dinnerBook.currentItem.id)
      const newItem = { ...payload, id }
      const data = yield call(save, newItem)
      if (data.success) {
        message.success('修改成功');
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    *change ({ payload }, { call, put }) {
      let data = null;
      if(payload && payload.id && payload.data===null){
        data=yield call(change, {id:payload.id})
      }else if(payload && payload.data){
        const dinnerData=yield call(save,payload.data);
        if(dinnerData && dinnerData.success && dinnerData.data.state!==1){
          data=yield call(change,{id:dinnerData.data.id});
        }else{
          data=dinnerData;
        }
      }
      if (data.success) {
        message.success(data.message);
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    
  },

  reducers: {

    querySuccess (state, action) {
      const { list, pagination,employeeList } = action.payload
      //console.log('position:',list);
      return { ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
        modalVisible:false,
      }
    },
    getDicSuccess(state,action){
      return {...state,dicList:action.payload}
    },
    queryEmployeeSuccess(state,action){
      return {...state,employeeList:action.payload}
    },
    getDinnerInfoSuccess(state,action){
      let selectedRowKeys=[],tableSource=[];
      if(action.payload && action.payload.length>0){
        // selectedRowKeys=action.payload.map(item=>item.dinnerId)
        action.payload.map((el,index)=>{
          let _item=el;
          _item.breakfast=el.breakfast===null?true:el.breakfast;
          _item.lunch=el.lunch===null?true:el.lunch;
          _item.supper=el.supper===null?true:el.supper;
          _item.dinnerId=el.dinnerId===null?(-1 * index):el.dinnerId;
          tableSource.push(_item);
          selectedRowKeys.push(el.dinnerId===null?(-1 * index):el.dinnerId)
        })
      }
      return {...state,employeeList:tableSource,selectedRowKeys}
    },
    getOrgSuccess (state, action) {
      const { orgList,orgTree } = action.payload
      return { ...state,
        orgList,
        orgTree
        }
    },
    showModal (state, action) {

      return { ...state, ...action.payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    setRowKeys(state,action){
      let _employeeList=[],selectedRowKeys=action.payload;
      
      state.employeeList.map(item=>{
        if(selectedRowKeys.indexOf(item.dinnerId)>-1){
          _employeeList.push(item)
        }
      })
      
      return {...state,selectedRowKeys,employeeList:_employeeList}
    },
    setEmployeeList(state,action){
      let selectedRowKeys=[],tableSource=[];
      if(action.payload && action.payload.length>0){
        // selectedRowKeys=action.payload.map(item=>item.dinnerId)
        action.payload.map((el,index)=>{
          let _item=el;
          _item.breakfast=el.breakfast===null?true:el.breakfast;
          _item.lunch=el.lunch===null?true:el.lunch;
          _item.supper=el.supper===null?true:el.supper;
          _item.dinnerId=el.dinnerId===null?(-1 * index):el.dinnerId;
          tableSource.push(_item);
          selectedRowKeys.push(el.dinnerId===null?(-1 * index):el.dinnerId)
        })
      }
      return {...state,employeeList:tableSource,selectedRowKeys}
      // return {...state,employeeList:action.payload}
    },
    setEmployeeAndRowKey(state,action){
      let selectedRowKeys=state.selectedRowKeys;
      if(action.payload.rowKey!==null){
        selectedRowKeys.push(action.payload.rowKey);
      }
      return {...state,employeeList:action.payload.data,selectedRowKeys}
    },
  },

}
