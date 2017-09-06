import pathToRegexp from 'path-to-regexp'
import { queryById } from '../../services/dinnerBook'
export default {
  namespace: 'dinnerBookDetail',
  state: {
    data: {},
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        const match = pathToRegexp('/dinnerBook/:id').exec(location.pathname)
        if (match) {
          dispatch({ type: 'query', payload: { id: match[1] } })
          
        }
      })
    },
  },
  effects: {
    *query ({payload,}, { call, put }) {
      const data = yield call(queryById, payload)
     
      if (data&&data.success) {
       
        yield put({
          type: 'querySuccess',
          payload: {
            data: data.data,
          },
        })
      } else {
        throw data
      }
    },
   
  },
  reducers: {
    querySuccess (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
