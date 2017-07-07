import { query,queryById,save,submit,queryEmployee,getDic,getApplyList } from '../services/purchase'
import { config } from '../utils'
import { parse } from 'qs'
import { message } from 'antd'

const { prefix } = config

export default {

  namespace: 'purchase',

  state: {
    list: [],
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    fileList:[],
    dicList:[],
    detailList:[],
    employeeList:[],
    applyList:[],
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

        if (location.pathname === '/purchase') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
          dispatch({
            type:'getApplyList',
            payload:{isChoosePurchase:false}//流程通了后，需改为true
          })
        }
      })
    },
  },

  effects: {
    *query ({ payload }, { call, put }) {

      payload = parse(location.search.substr(1))
      const userInfo = JSON.parse(sessionStorage.getItem(`${prefix}userInfo`));
      if (userInfo && userInfo.data) {
        payload.userId=userInfo.data.id;
      }
      payload={...payload,rows:payload.pageSize}
      const data = yield call(query, payload)
      
      if (data && userInfo && userInfo.data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.rowsObject,//arrayToTree(data.data.rowsObject,'id','parentId'),
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.data.total,
            },
            employeeList:userInfo.data.employeeVo,
          },
        })
        
      }else {
        if (location.pathname !== '/login') {
          let from = location.pathname
          if (location.pathname === '/dashboard') {
            from = '/dashboard'
          }
          window.location = `${location.origin}/login?from=${from}`
        }
      }
    },
    *getDic ({ payload }, { call, put }) {

     // payload = parse(location.search.substr(1))
      const data = yield call(getDic, payload)

      if (data) {
        yield put({
          type: 'getDicSuccess',
          payload: data.data,
        })
      }
    },
    *getApplyList ({ payload }, { call, put }) {

     // payload = parse(location.search.substr(1))
      const data = yield call(getApplyList, payload)

      if (data) {
        yield put({
          type: 'getApplyListSuccess',
          payload: data.data,
        })
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

    *submit ({ payload }, { call, put }) {

      const data = yield call(submit, { id: payload.id })
      if (data.success) {
        message.success('提交成功');
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
            fileList:[],
            detailList:[],
          } 
        })
      } else {
        throw data
      }
    },
    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ purchase }) => purchase.currentItem.id)
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
        employeeList,
      }
    },
    getDicSuccess(state,action){
      return {...state,dicList:action.payload}
    },
    getApplyListSuccess(state,action){
      return {...state,applyList:action.payload}
    },
    showModal (state, action) {

      return { ...state, ...action.payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    setState(state,action){
      return {...state,currentItem:action.payload}
    },
    setFileList(state,action){
      return {...state,fileList:action.payload}
    },
    setDetailList(state,action){
      return {...state,detailList:action.payload}
    },
  },

}
