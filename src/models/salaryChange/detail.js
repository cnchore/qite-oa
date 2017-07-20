import pathToRegexp from 'path-to-regexp'
import { queryById,queryEmployee,getDic } from '../../services/salaryChange'
//import { treeToArray } from '../../utils'
import { getDiagramByBusiness,getCommentListBybusiness } from '../../services/workFlow'

export default {

  namespace: 'salaryChangeDetail',

  state: {
    data: {},
    employeeList:[],
    dicList:[],
    commentList:[],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        const match = pathToRegexp('/salaryChange/:id').exec(location.pathname)
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
        if(other.data.state!==0)flowImgSrc=yield call(getDiagramByBusiness,{busiCode:other.data.code,busiId:other.data.id})
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
          ...payload,
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
