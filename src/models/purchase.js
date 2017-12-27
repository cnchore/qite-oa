import { query,queryById,save,deleteById,submit,queryEmployee,getDic,getApplyList } from '../services/purchase'
import { config } from '../utils'
import { parse } from 'qs'
import { message } from 'antd'
import { startProcess,getTaskInfo,audit,turnToDoTask } from '../services/workFlow'

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
    // applyList:[],
    taskData:{},
    isEditable:false,
    reasonStr:'',
    isNeedSel:false,
    isTurn:false,
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
          let query=location.query;
          if(query && query.taskId && query.busiId && query.from){
            dispatch({
              type: 'toBackEdit',
              payload: query,
            })
          }else{
            dispatch({
              type: 'query',
              payload: query,
            })
          }
          // dispatch({
          //   type:'getApplyList',
          //   payload:{isChoosePurchase:true}//流程通了后，需改为true
          // })
          dispatch({
            type: 'getDic',
            payload: {dicGroup:'buyType_group'},
          })
        }
      })
    },
  },

  effects: {
    *query ({ payload }, { call, put }) {

      payload=parse(location.hash.split('#/purchase?')[1]); 
      // payload = parse(location.search.substr(1))
      const userInfo = JSON.parse(sessionStorage.getItem(`${prefix}userInfo`));
      if (userInfo && userInfo.data) {
        payload.userId=userInfo.data.id;
      }
      payload={...payload,rows:payload.pageSize}
      const data = yield call(query, payload)
      
      if (data && data.success && userInfo && userInfo.data) {
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
        });
        if(payload.modalType==='create'){
          yield put({
            type:'showModal',
            payload:{
              modalType: 'create',
              fileList:[],
              detailList:[],
              taskData:{},
              currentItem:{isMonthRepeat:'',typeOption:[]}
            }
          });
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
      const {formItem,nextUser}=payload
      let newData=null,data=null;

      if(formItem && formItem.isupdated){
        newData=yield call(save,formItem);
        if(newData && newData.data && nextUser && nextUser.userId){
          data=yield call(startProcess, { 
            busiId: newData.data.id,
            busiCode:newData.data.code, 
            nextTaskUserId:nextUser.userId 
          })
        }
        
      }else{
        data= yield call(startProcess, { 
          busiId: formItem.id,
          busiCode:formItem.code, 
          nextTaskUserId:nextUser.userId
        })
      }
      if (data && data.success) {
        message.success('提交成功');
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        if(!data && newData){
          throw newData;
        }else{
          throw data
        }
      }
    },
    *audit ({ payload }, { call,select, put }) {
      const {formItem,taskItem}=payload
      let newData=null,data=null;
      const _state = yield select(({ purchase }) => purchase.currentItem.state)
      if(formItem && formItem.id){
        newData=yield call(save,formItem);
        if(newData && newData.success){
          data=yield call(audit,taskItem)
          if(data.success) {
            message.success(_state===1?'[办理]成功':'[退回修改]成功');
            //yield put({ type: 'hideModal' })

            let queryList=parse(location.hash.substr(location.hash.indexOf('?')+1)); 
            window.location = `${location.origin}${location.pathname}#${queryList.from}?t=${Math.random()}`;
            
          } else {
            throw data
          }
        }else{
          throw newData
        }
      }
      
    },
    *toBackEdit({payload},{call,put}){
      const mcData=yield call(queryById,{id:payload.busiId})
      // const userInfo = JSON.parse(sessionStorage.getItem(`${prefix}userInfo`));
      const employeeRes=yield call(queryEmployee,{userId:mcData.data.userId})
      if(mcData.success && employeeRes.success){
        let taskData=yield call(getTaskInfo,{taskId:payload.taskId,isRead:true})
        if(taskData.success){
          taskData.data.taskId=payload.taskId;
          yield put({
            type:'showModal',
            payload:{
              currentItem:mcData.data,
              fileList:[],
              taskData:taskData.data,
              employeeList:employeeRes.data.rowsObject[0],
              modalType:'toBackEdit',
              reasonStr:'',
              detailList:[],
            }
          })
        }else{
          throw taskData
        }
      }else{
        throw mcData
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
            taskData:{},
          } 
        })
      } else {
        throw data
      }
    },
    
    *turnToDoTask ({ payload }, { call, put }) {
      const data = yield call(turnToDoTask, payload)
      if (data.success) {
        message.success('转办成功');
        let queryList=parse(location.hash.substr(location.hash.indexOf('?')+1)); 
        window.location = `${location.origin}${location.pathname}#${queryList.from}?t=${Math.random()}`;
            
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
    *deleteById ({ payload }, { call, put }) {
      const data = yield call(deleteById, {id:payload.id})
      if (data.success) {
        message.success('删除成功');
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
    setIsEditable(state,action){
      return {...state,isEditable:action.payload}
    },
    setNeedSel(state,action){
      return {...state,...action.payload}
    },
  },

}
