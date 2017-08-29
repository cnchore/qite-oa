import { login } from '../services/login'
import { routerRedux } from 'dva/router'
import { queryURL,config } from '../utils'
const { prefix } = config

export default {
  namespace: 'login',
  state: {
    loginLoading: false,
    banner:1,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if(location.pathname==='/login'){
          if(window.bannerInt){
            window.bannerInt=window.clearInterval(window.bannerInt);
          }else{
            window.bannerInt=window.setInterval(function(){
              // console.log('login:',Date.now());
              dispatch({type:'selBanner',payload:-1})
            },5000);
          }
        }

      })
    },
  },
  effects: {
    *login ({payload,}, { put, call }) {
      // sessionStorage.remove(`${prefix}userInfo`);
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
      if(window.bannerInt){
          window.bannerInt=window.clearInterval(window.bannerInt);
      }
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
    selBanner(state,action){
      let id=action.payload!==-1?action.payload:state.banner;
      if(action.payload===-1){
        id++;
        if(id>2){id=1}
      }
      return {...state,banner:id}
    }
  },
}
