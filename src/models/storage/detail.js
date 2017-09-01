import pathToRegexp from 'path-to-regexp'
import { queryById,queryEmployee,getDic } from '../../services/purchase'
import { config } from '../../utils'
const { prefix } =config;
export default {

  namespace: 'storageDetail',

  state: {
    data: {},
    employeeList:[],
    dicList:[],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        const match = pathToRegexp('/storage/:id').exec(location.pathname)
        if (match) {
          dispatch({ type: 'query', payload: { id: match[1] } })
          
        }
      })
    },
  },

  effects: {
    *query ({payload,}, { call, put }) {
      const data = yield call(queryById, payload)
      const { success, message, status, ...other } = data
      if (success) {
       
        yield put({
          type:'queryEmployee',
          payload:other.data.userId
        })
        yield put({
          type: 'querySuccess',
          payload: {
            data: other.data,
          },
        })
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
  
    *queryEmployee({payload},{call,put}){
      const userInfo=yield call(queryEmployee,{userId:payload})//other.data.userId
      if(userInfo&&userInfo.success){
        yield put({
          type: 'queryEmployeeSuccess',
          payload: {
            employeeList:userInfo.data.rowsObject[0],
          },
        })
      }else{
        throw userInfo
      }
    }
  },

  reducers: {
    querySuccess (state, { payload }) {
      
      return {
        ...state,
        ...payload,
      }
    },
    getDicSuccess(state,action){
      return {...state,dicList:action.payload}
    },
  
    queryEmployeeSuccess (state, { payload }) {
      
      return {
        ...state,
        employeeList:payload.employeeList,
      }
    },
  },
}
