import { query, logout,getLoginUserMenu } from '../services/app'
import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import { config,treeMenuToArrayMenu } from '../utils'
const { prefix } = config

export default {
  namespace: 'app',
  state: {
    user: {},
    menuList:[],
    menuPopoverVisible: false,
    siderFold: localStorage.getItem(`${prefix}siderFold`) === 'true',
    darkTheme: localStorage.getItem(`${prefix}darkTheme`) === 'true' || true,
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(localStorage.getItem(`${prefix}navOpenKeys`)) || [],
  },
  subscriptions: {

    setup ({ dispatch }) {
      dispatch({ type: 'query' })
      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' })
        }, 300)
      }
    },

  },
  effects: {

    *query ({
      payload,
    }, { call, put }) {
      const data = JSON.parse(sessionStorage.getItem(`${prefix}userInfo`));
      const menuData=yield call(getLoginUserMenu, {})
      if (data&& data.success && data.data && menuData && menuData.success) {
        //console.log('userData:',data.message)

        yield put({
          type: 'querySuccess',
          payload: {
            user:data.data,
            menuList:treeMenuToArrayMenu(menuData.data)
          },
        })
        if (location.pathname === '/login') {
          yield put(routerRedux.push('/dashboard'))
        }

      } else {
        // console.log(location)
        // // if (location.pathname !== '/login') {
        //   let _from = location.pathname
        //   if (location.pathname === '/dashboard') {
        //     _from = '/dashboard'
        //   }
        //   // window.location = `${location.origin}/login?from=${_from}`
        //   // console.log('routerRedux:',routerRedux,_from)
        //   yield put(routerRedux.replace(`/login?from=${_from}`))
        // }
        // yield put(routerRedux.replace(`/login`))
      }
    },

    *logout ({
      payload,
    }, { call, put }) {
      const data = yield call(logout, parse(payload))
      if (data.success) {
        sessionStorage.setItem(`${prefix}userInfo`,JSON.stringify({}))
        yield put({ type: 'query' })
      } else {
        throw (data)
      }
    },

    *changeNavbar ({
      payload,
    }, { put, select }) {
      const { app } = yield(select(_ => _))
      const isNavbar = document.body.clientWidth < 769
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar })
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

    switchSider (state) {
      localStorage.setItem(`${prefix}siderFold`, !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },

    switchTheme (state) {
      localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },

    switchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },

    handleNavbar (state, { payload }) {
      return {
        ...state,
        isNavbar: payload,
      }
    },

    handleNavOpenKeys (state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys,
      }
    },
  },
}
