import pathToRegexp from 'path-to-regexp'
import { queryEmployee } from '../../services/missClock'
//import { treeToArray } from '../../utils'
import { getTaskInfo } from '../../services/workFlow'

export default {

  namespace: 'waitingDetail',

  state: {
    data: {},
    employeeList:[],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(() => {
        const match = pathToRegexp('/waiting/:id').exec(location.pathname)
        if (match) {
          dispatch({ type: 'query', payload: { taskId: match[1] } })
          
        }
      })
    },
  },

  effects: {
    *query ({payload,}, { call, put }) {
      const data = yield call(getTaskInfo, payload)
      const { success, message, status, ...other } = data
      if (success) {
          yield put({
            type:'queryEmployee',
            payload:other.data.busiData.userId
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
     queryEmployeeSuccess (state, { payload }) {
      
      return {
        ...state,
        employeeList:payload.employeeList[0],
      }
    },
  },
}
