import { login } from '../services/login'
import { routerRedux } from 'dva/router'
import { queryURL,config } from '../utils'
const { prefix } = config

export default {
  namespace: 'login',
  state: {
    loginLoading: false,
  },

  effects: {
    *login ({
      payload,
    }, { put, call }) {
      yield put({ type: 'showLoginLoading' })
      const data = yield call(login, payload)
      yield put({ type: 'hideLoginLoading' })
      if (data.success) {
        yield put({type:'loginSuccess',payload:data})
        const _from = queryURL('from')

        yield put({ type: 'app/query'})
        if (_from) {
          yield put(routerRedux.push(_from))
        } else {
          yield put(routerRedux.push('/dashboard'))
        }
      } else {
        yield put({type:'loginSuccess',payload:{}})
        throw data
      }
    },
  },
  reducers: {
    loginSuccess(state,action){
      sessionStorage.setItem(`${prefix}userInfo`, JSON.stringify(action.payload));
      return {
        ...state,
      }
    },
    showLoginLoading (state) {
      return {
        ...state,
        loginLoading: true,
      }
    },
    hideLoginLoading (state) {
      return {
        ...state,
        loginLoading: false,
      }
    },
  },
}
