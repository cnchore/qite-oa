import { queryById,queryEmployee } from '../services/missClock'
import { getMyTaskToDoPage,getTaskInfo,audit,getDic,getOrg } from '../services/workFlow'
import * as train from '../services/train'
import * as car from '../services/car'
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
    isNeedSel:false,
    reasonStr:'',
    needEvalRemark:false,
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
          if(location.query && location.query.homeTaskId){
            dispatch({
              type: 'editItem',
              payload: {taskId:location.query.homeTaskId},
            })
          }else{
            dispatch({
              type: 'query',
              payload: location.query,
            })
          }
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
      payload=parse(location.hash.split('#/waiting?')[1]); 
      // payload = parse(location.search.substr(1))
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
      }
    },
    *editItem ({ payload }, { call, put }) {

      const response = yield call(getTaskInfo, {taskId:payload.taskId,isRead:true})
      if (response.success && response.data && response.data.busiData) {
        const employeeRes=yield call(queryEmployee,{userId:response.data.busiData.userId})
        if(employeeRes && employeeRes.success){
          let dicType=null,dicRes=null;  
          switch(response.data.busiCode.substr(0,2)){
            case 'LE':
                dicType='leaveType_item';
              break;
            case 'OT':
                dicType='overtimes_item';
              break;
            case 'TL':
            case 'TR':
              dicType='tripMode_item';
              break;
            case 'UC':
              dicType='carType_item';
              break;
            case 'SL':
              dicType='sealType_item';
              break;
            case 'UO':
              dicType='orderType_item';
              break;
          }
          if(dicType){
            if(dicType==='carType_item'){
              dicRes=yield call(car.query, {})
            }else{
              dicRes= yield call(getDic, {dicType});
            }
          }else if(response.data.busiCode.substr(0,2)==='NE'){
            let orgData=yield call(getOrg, {})
            if(orgData && orgData.success){
              dicRes=orgData;
              dicRes.data=treeToArray(orgData.data);
            }else{
              dicRes=null;
            }
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
    *submit ({ payload }, { call,select, put }) {
      const taskData = yield select(({waiting})=>waiting.taskData);
      let saveData={};
      let data=null;
      if(payload.isNeedSave && taskData.busiCode.substr(0,2)==='TN'){
        saveData=yield call(train.save,payload);
      }else{
        saveData.success=true;
      }
      if(saveData.success){
       data = yield call(audit, payload)
      }
      if (data.success) {
        message.success('办理成功');
        let queryList=parse(location.hash.substr(location.hash.indexOf('?')+1)); 
        if(queryList && queryList.from){
          window.location = `${location.origin}${location.pathname}#${queryList.from}?t=${Math.random()}`;
        }else{
          yield put({ type: 'hideModal' })
          yield put({ type: 'query' })
        }
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
    *closeAndReload({},{call,put}){
      yield put({type:'hideModal'})
      yield put({type:'query'})
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
        isNeedSel:false,
        modalVisible: true,
        needEvalRemark:false,
        reasonStr:'', }
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
    setNeedSel(state,action){
      return {...state,...action.payload}
    },
    setNeedEvalRemark(state,action){
      return {...state,...action.payload}
    },
  },

}
