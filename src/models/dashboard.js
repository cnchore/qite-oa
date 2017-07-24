import { getMyTaskToDoPage,getMessageList,getNoticeList,getTaskWaitSignPage } from '../services/dashboard'
import { parse } from 'qs'
import { config } from '../utils'
const { prefix } = config
// import { routerRedux } from 'dva/router'

export default {
  namespace: 'dashboard',
  state: {
    waitData:{},
    userInfo:{},
    messageData:{},
    noticeData:{},
    waitSignData:{},
  },
  subscriptions: {
    setup ({ dispatch,history }) {
      history.listen(location => {
        const userInfo = JSON.parse(sessionStorage.getItem(`${prefix}userInfo`));
        if(userInfo&& userInfo.success && userInfo.data){
          let uf={
            photo:userInfo.data.employeeVo && userInfo.data.employeeVo.photo || '',
            realName:userInfo.data.employeeVo && userInfo.data.employeeVo.realName || '未知姓名',
            orgName:userInfo.data.employeeVo && userInfo.data.employeeVo.postList &&  userInfo.data.employeeVo.postList[0].orgName || '未知部门'
          }
          dispatch({ type: 'query',payload:{userInfo:uf,userId:userInfo.data.id} })
        }
      })
    },
  },
  effects: {
    *query ({payload,}, { call, put }) {
      const data = yield call(getMyTaskToDoPage, {rows:5})
      if(data.success){
        yield put({
          type:'getMessageList',
          payload:{
            receiveUserId:payload.userId,
          }
        })
        yield put({
          type:'getNoticeList',
          payload:{}
        })
        yield put({
          type:'getTaskWaitSignPage',
          payload:{}
        })
        yield put({ 
          type: 'querySuccess', 
          payload: { 
            waitData:{
              list:data.data.rowsObject,
              total:data.data.total,
            },
            userInfo:payload.userInfo 
          } 
        })
      }
    },
    
    *getTaskWaitSignPage({payload},{call,put}){
      const data=yield call(getTaskWaitSignPage,{...payload,rows:5});
      if(data.success){
        yield put({
          type:'getTaskWaitSignPageSuccess',
          payload:{
            waitSignData:{
              list:data.data.rowsObject,
              total:data.data.total,
            }
          }
        })
      }
    },
    *getMessageList({payload},{call,put}){
      const data=yield call(getMessageList,{...payload,rows:10});
      if(data.success){
        yield put({
          type:'getMessageListSuccess',
          payload:{
            messageData:{
              list:data.data.rowsObject,
              total:data.data.total,
            }
          }
        })
      }
    },
    *getNoticeList({payload},{call,put}){
      const data=yield call(getNoticeList,{...payload,rows:10});
      if(data.success){
        yield put({
          type:'getNoticeListSuccess',
          payload:{
            noticeData:{
              list:data.data.rowsObject,
              total:data.data.total,
            }
          }
        })
      }
    },
  },
  reducers: {
    querySuccess (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
    getTaskWaitSignPageSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
    getMessageListSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
    getNoticeListSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
}
