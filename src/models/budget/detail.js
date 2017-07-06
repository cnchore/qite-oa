import pathToRegexp from 'path-to-regexp'
import { queryById,queryEmployee,getDic } from '../../services/budget'
//import { treeToArray } from '../../utils'

export default {

  namespace: 'budgetDetail',

  state: {
    data: {},
    employeeList:[],
    dicList:[],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(() => {
        const match = pathToRegexp('/budget/:id').exec(location.pathname)
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
            payload:other.data.userId,
          })
          yield put({
            type: 'querySuccess',
            payload: {
              data: other.data
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
          //console.log(userInfo.data.rowsObject[0])
          yield put({
            type: 'queryEmployeeSuccess',
            payload: {
              employeeList:userInfo.data.rowsObject,
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
        data:payload.data,
      }
    },
    getDicSuccess(state,action){
      return {...state,dicList:action.payload}
    },
    queryEmployeeSuccess (state, { payload }) {
      
      return {
        ...state,
        employeeList:payload.employeeList[0],
      }
    },
  },
}
