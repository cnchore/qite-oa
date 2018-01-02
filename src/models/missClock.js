import { query,queryById,save,deleteById,submit,queryEmployee } from '../services/missClock'
import { startProcess,getTaskInfo,audit } from '../services/workFlow'
import { treeToArray,config } from '../utils'
import { parse } from 'qs'
import { message } from 'antd'
import pathToRegexp from 'path-to-regexp'
const { prefix } = config
export default {
  namespace: 'missClock',
  state: {
    list: [],
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    fileList:[],
    employeeList:[],
    taskData:{},
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
        // console.log('location:',location)
        if (location.pathname === '/missClock') {
          let query=location.query;
          if(query && query.taskId && query.busiId && query.from){
            dispatch({
              type: 'toBackEdit',
              payload: query,
            })
          }else{
            if(query.modalType){
              query.showModalType=query.modalType;
            }
            dispatch({
              type: 'query',
              payload: query,
            })
          }
        }
      })
    },
  },

  effects: {
    *query ({ payload }, { call, put }) {
      // console.log('hashHistory:',location)
      // payload = parse(location.search.substr(1))
      let _payload=parse(location.hash.split('#/missClock?')[1]); 
      const userInfo = JSON.parse(sessionStorage.getItem(`${prefix}userInfo`));
      if (userInfo && userInfo.data) {
        _payload.userId=userInfo.data.id;
      }
      payload={..._payload,...payload,rows:_payload.pageSize}
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
        if(payload.showModalType==='create'){
          yield put({
            type:'showModal',
            payload:{
              modalType: 'create',
              fileList:[],
              taskData:{},
            }
          });
        }
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
    *audit ({ payload }, { call, put }) {
      const {formItem,taskItem}=payload
      let newData=null,data=null;

      if(formItem && formItem.id){
        newData=yield call(save,formItem);
        if(newData && newData.success){
          data=yield call(audit,taskItem)
          if(data.success) {
            message.success('[退回修改]成功');
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
      const userInfo = JSON.parse(sessionStorage.getItem(`${prefix}userInfo`));

      if(mcData.success&& userInfo.data){
        let taskData=yield call(getTaskInfo,{taskId:payload.taskId})
        if(taskData.success){
          taskData.data.taskId=payload.taskId;
          yield put({
            type:'showModal',
            payload:{
              currentItem:mcData.data,
              fileList:[],
              taskData:taskData.data,
              employeeList:userInfo.data.employeeVo,
              modalType:'toBackEdit',
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
            taskData:{},
          } 
        })
      } else {
        throw data
      }
    },
    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ missClock }) => missClock.currentItem.id)
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

  },

}
