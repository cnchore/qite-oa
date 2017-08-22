import { query, logout,getLoginUserMenu,editPwd } from '../services/app'
import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import { config,treeMenuToArrayMenu } from '../utils'
import { message } from 'antd'
// import io from 'socket.io-client'
const { prefix,websocketUrl } = config
  
export default {
  namespace: 'app',
  state: {
    user: {},
    menuList:[],
    menuPopoverVisible: false,
    editPwdModal:false,
    siderFold: localStorage.getItem(`${prefix}siderFold`) === 'true',
    darkTheme: localStorage.getItem(`${prefix}darkTheme`) === 'true' || true,
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(localStorage.getItem(`${prefix}navOpenKeys`)) || [],
  },
  subscriptions: {
    setup ({ dispatch,history }) {
      // history.listen(location=>{
      //   console.log('app location:',location)
      // })
      dispatch({ type: 'query',payload:{bindsocket:true} })
      
    },
  },
  effects: {

    *query ({payload}, { call, put }) {
      // console.log('app payload:',payload);
      const data = JSON.parse(sessionStorage.getItem(`${prefix}userInfo`));
      const menuData=yield call(getLoginUserMenu, {})
      if (data&& data.success && data.data  && menuData && menuData.success) {
        // console.log('userData:',data.message)
        yield put({
          type: 'querySuccess',
          payload: {
            user:data.data,
            menuList:treeMenuToArrayMenu(menuData.data)
          },
        })
        // console.info('do socket')
        //创建socket
        // let _url='ws://www.aylsonclub.com/qite/websocket/socketServer.do';
        // let _url='ws://test.aylsonclub.com/qite/websocket/socketServer.do';
        // let _url='ws://192.168.0.108:8080/qite/websocket/socketServer.do';
        let websocket=null;
        try{
          if('WebSocket' in window){
            websocket = new WebSocket(websocketUrl());
            websocket.onconnect=function(){
              console.log('websocket connect.');
            }
           
            websocket.onerror=function(error){
              console.error('socket error:',error);
            }
          
            websocket.onmessage=function(evt){
              console.log('websocket message:',evt);
            }
            
            window.close=function(){
              websocket.onclose();
            }
          }
        }catch(er){
          console.error('catch websocket error:',er)
        }
        if (location.pathname === '/login') {
          yield put(routerRedux.push('/dashboard'))
        }

      } 
    },

    *logout ({payload}, { call, put }) {
      const data = yield call(logout, {})
      if (data.success) {
        sessionStorage.setItem(`${prefix}userInfo`,JSON.stringify({}))
        yield put(routerRedux.push('/login'))
        // yield put({ type: 'query' })
      } else {
        throw (data)
      }
    },
    *editPwd ({payload}, { call, put }) {
      const data = yield call(editPwd, parse(payload))
      if (data.success) {
        message.success('密码修改成功');
        yield put({type:'editPwdSuccess'})
        yield put(routerRedux.push('/login'))
      } else {
        throw (data)
      }
    },
    *changeNavbar ({payload}, { put, select }) {
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
    showEditPwdModal(state){
      return {...state,editPwdModal:true}
    },
    hideEditPwdModal(state){
      return {...state,editPwdModal:false}
    },
    editPwdSuccess(state,{payload}){
      return {...state,editPwdModal:false}
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
