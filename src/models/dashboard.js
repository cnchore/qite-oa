import { getMyTaskToDoPage,getMessageList,getMessageInfo,getNoticeList,
  getMyCommonApply,getTaskWaitSignPage,signTask,getKnowledgeList } from '../services/dashboard';
import {read} from '../services/app';
import { parse } from 'qs';
import { config,getWaitAction } from '../utils';
const { prefix } = config
// import { routerRedux } from 'dva/router';
import { message } from 'antd';
export default {
  namespace: 'dashboard',
  state: {
    waitData:{},
    userInfo:{},
    messageData:{},
    warningData:{},
    noticeData:{},
    waitSignData:{},
    knowledgeData:{},
    msgVisable:false,
    msgData:{},
    oftenList:[],
    menuData:{},
  },
  subscriptions: {
    setup ({ dispatch,history }) {
      history.listen(location => {
        // console.log('dashboard',localStorage.getItem(`${prefix}darkTheme`));
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
            dispatch({
              type:'getMyCommonApply',
              payload:{page:1,rows:4},
            })
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
              // menuData:JSON.parse(sessionStorage.getItem(`${prefix}menuData`)),
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
              // msgData:JSON.parse(sessionStorage.getItem(`${prefix}menuData`)),
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
      const data=yield call(getMessageList,{...payload,rows:10,isRead:false,msgTypes:'1,2,3,6,7,8,9,10,13,14,15,16,17,18,19'});
      if(data.success){
        yield put({
          type:'getMessageListSuccess',
          payload:{
            messageData:{
              list:data.data.rowsObject,
              total:data.data.total,
              page:payload.page || 1,
            }
          }
        })
      }else{
        throw (data);
      }
      if(!payload.page){
        const warningData=yield call(getMessageList,{...payload,rows:4,isRead:false,msgTypes:'4,5,11,12'});
        if(warningData.success){
          yield put({
            type:'setState',
            payload:{
              warningData:{
                list:warningData.data.rowsObject,
                total:warningData.data.total,
              }
            }
          })
        }else{
          throw (warningData);
        }
      }
    },
    *read({payload},{call,put}){
      let data;
      if(payload && payload.msgType){
        data =yield call(getMessageInfo,{id:payload.sId});
      }else{
        data=yield call(read,payload);
      }
      if(data.success){
        if(payload.msgType && payload.linkTo){
          if(data.data.taskVo){
            if(payload.msgType===2 || payload.msgType===10 || payload.msgType===11){
              payload.linkTo({pathname:'waitSign'});
            }else{
              let {taskId,busiId,busiCode}=data.data.taskVo;
              let _st=1;
              if(payload.msgType===6){
                _st=-1;
              }else if(payload.msgType===7){
                _st=-2;
              }else if(payload.msgType===18){
                _st=-1;
              }
              let _record={
                taskId,
                busiId,
                busiCode,
                state:_st,
              }
              payload.linkTo({pathname:getWaitAction(_record,'/dashboard',true)});
            }
          }else{
            message.info(data.data.taskInfo);
          }
        }
        if(!payload.msgType || !data.data.taskVo){
          const userInfo = JSON.parse(sessionStorage.getItem(`${prefix}userInfo`));
          if(userInfo&& userInfo.success && userInfo.data){
            yield put({
              type:'getMessageList',
              payload:{
                receiveUserId:userInfo.data.id,
              }
            })
          }
        }else if(payload.hideMsg){
          yield put({
            type:'setState',
            payload:{
              msgVisable:false,
            }
          });
        }
      }else{
        throw (data);
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
    *getMyCommonApply({payload},{call,put}){
      const data=yield call(getMyCommonApply,{...payload});
      if(data.success){
        yield put({
          type:'setState',
          payload:{
            oftenList:data.data,
          }
        })
      }
    },
    
   *getKnowledgeList({payload},{call,put}){
      const data=yield call(getKnowledgeList,{...payload,isRead:false});
      if(data.success){
        yield put({
          type:'getKnowledgeListSuccess',
          payload:{
            knowledgeData:{
              list:data.data,
              total:data.data && data.data.length || 0,
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
    setState (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
}
