import { queryById,queryEmployee } from '../services/missClock'
import { getMyTaskToDoPage,getTaskInfo,audit,getDic } from '../services/workFlow'

import { treeToArray,config } from '../utils'
import { parse } from 'qs'
import { message } from 'antd'

const { prefix } = config
export default {

  namespace: 'waiting',

  state: {
    list: [],
    dicList:[],
    taskData:{},
    modalVisible: false,
    fileList:[],
    employeeList:[],
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

        if (location.pathname === '/waiting') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
          dispatch({
            type: 'getDic',
            payload: {dicType:'flowType_item'},
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
        payload={...payload,rows:payload.pageSize}
        const data = yield call(getMyTaskToDoPage, payload)
        if(data && data.success){
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
        }else{
          throw data;
        }
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
    *editItem ({ payload }, { call, put }) {

      const response = yield call(getTaskInfo, {taskId:payload.taskId})
      if (response.success && response.data && response.data.busiData) {
        const employeeRes=yield call(queryEmployee,{userId:response.data.busiData.userId})
        if(employeeRes && employeeRes.success){
          let dicType=null,dicRes=null;  
          switch(response.data.busiCode.substr(0,2)){
            case 'LE':
                dicType='leaveType_item'
              break;
            case 'OT':
                dicType='overtimes_item'
              break;
            case 'TL':
            case 'TR':
              dicType='tripMode_item'
              break;
          }
          if(dicType){
           dicRes= yield put({
              type: 'getDic',
              payload: {dicType},
            })
          }
          yield put({ 
            type: 'showModal',
            payload:{
              taskData:{...response.data,taskId:payload.taskId,dicList:dicRes&&dicRes.success?dicRes.data:[]},
              employeeList:employeeRes.data.rowsObject,
            }
          })
        }else{
          throw employeeRes
        }

      } else {
        throw response
      }
    },
    *submit ({ payload }, { call, put }) {

      const data = yield call(audit, payload)
      if (data.success) {
        message.success('办理成功');
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
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
    
  },

  reducers: {

    querySuccess (state, action) {
      const { list, pagination } = action.payload
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
   
    showModal (state, action) {
      //console.log('payload:',action.payload)
      return { ...state, 
        taskData:action.payload.taskData, 
        employeeList:action.payload.employeeList[0],
        modalVisible: true }
    },
    getDicSuccess(state,action){
      return {...state,dicList:action.payload}
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    
    setFileList(state,action){
      return {...state,fileList:action.payload}
    },

  },

}
