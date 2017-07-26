import pathToRegexp from 'path-to-regexp'
import { queryById,queryEmployee } from '../../services/missClock'
import { getDiagramByBusiness,getCommentListBybusiness } from '../../services/workFlow'
import { config } from '../../utils'
const { prefix } = config

export default {
  namespace: 'missClockDetail',
  state: {
    data: {},
    employeeList:[],
    commentList:[],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        // console.log(location,location.pathname)
        const match = pathToRegexp('/missClock/:id').exec(location.pathname)
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
        const commentData=yield call(getCommentListBybusiness,{busiCode:other.data.code,busiId:other.data.id})
        let flowImgSrc=null;
        if(other.data.state!==0){
          flowImgSrc=yield call(getDiagramByBusiness,{busiCode:other.data.code,busiId:other.data.id})
        }
        yield put({
          type:'queryEmployee',
          payload:other.data.userId
        })
        yield put({
          type: 'querySuccess',
          payload: {
            data: {...other.data,flowImgSrc},
            commentList:commentData&&commentData.success?commentData.data:null,
          },
        })
      } else {
        throw data
      }
    },
    *queryEmployee({payload},{call,put}){
        const userInfo = JSON.parse(sessionStorage.getItem(`${prefix}userInfo`));
        if (userInfo && userInfo.data) {
          yield put({
            type: 'queryEmployeeSuccess',
            payload: {
              employeeList:userInfo.data.employeeVo,
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
     queryEmployeeSuccess (state, { payload }) {
      
      return {
        ...state,
        employeeList:payload.employeeList,
      }
    },
  },
}
