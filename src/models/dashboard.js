import { getMyTaskToDoPage,getMessageList,getNoticeList,getTaskWaitSignPage,signTask,getKnowledgeList } from '../services/dashboard'
import { parse } from 'qs'
import { config } from '../utils'
const { prefix } = config
// import { routerRedux } from 'dva/router'
import { message } from 'antd'

export default {
  namespace: 'dashboard',
  state: {
    waitData:{},
    userInfo:{},
    messageData:{},
    noticeData:{},
    waitSignData:{},
    knowledgeData:{},
  },
  subscriptions: {
    setup ({ dispatch,history }) {
      history.listen(location => {
        // console.log('dashboard',location)
        if(location.pathname==='/dashboard' || location.pathname==='/'){
          const userInfo = JSON.parse(sessionStorage.getItem(`${prefix}userInfo`));
          if(userInfo&& userInfo.success && userInfo.data){
            let uf={
              photo:userInfo.data.employeeVo && userInfo.data.employeeVo.photo || '',
              realName:userInfo.data.employeeVo && userInfo.data.employeeVo.realName || '未知姓名',
              orgName:userInfo.data.employeeVo && userInfo.data.employeeVo.postList &&  userInfo.data.employeeVo.postList[0].orgName || '未知部门'
            }
            dispatch({ 
              type: 'query',
              payload:{userInfo:uf} 
            });
            dispatch({
              type:'getMessageList',
              payload:{
                receiveUserId:userInfo.data.id,
              }
            });
            dispatch({
              type:'getNoticeList',
              payload:{isMyNotice:true},//
            });
            dispatch({
              type:'getKnowledgeList',
              payload:{isMyKnowledge:true,userId:userInfo.data.id},//
            });
            dispatch({
               type:'getTaskWaitSignPage',
               payload:{}
            });
          }
        }
      })
    },
  },
  effects: {
    *query ({payload,}, { call, put }) {
      const data = yield call(getMyTaskToDoPage, {rows:5})
      if(data.success){
        if(payload && payload.userInfo){
          yield put({ 
            type: 'querySuccess', 
            payload: { 
              waitData:{
                list:data.data.rowsObject,
                total:data.data.total,
              },
              userInfo:payload.userInfo,
            } 
          })
        }else{
          yield put({ 
            type: 'querySuccess', 
            payload: { 
              waitData:{
                list:data.data.rowsObject,
                total:data.data.total,
              },
            } 
          })
        }
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
    
   *getKnowledgeList({payload},{call,put}){
      const data=yield call(getKnowledgeList,{...payload,rows:10});
      if(data.success){
        yield put({
          type:'getKnowledgeListSuccess',
          payload:{
            knowledgeData:{
              list:data.data.rowsObject,
              total:data.data.total,
            }
          }
        })
      }
    },
    *signTask ({ payload }, { call, put }) {
      const data = yield call(signTask, payload)
      if (data.success) {
        message.success('签收成功，请在［我的待办］页面，进行办理');
        yield put({ type: 'query' })
        yield put({ type: 'getTaskWaitSignPage' })
      } else {
        throw data
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
    getKnowledgeListSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
}
