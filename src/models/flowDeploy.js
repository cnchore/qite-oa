import { getDiagramByDeployId,getDeployPage,getDic,deploy,getPDPage } from '../services/flowDeploy'
import { config } from '../utils'
import { parse } from 'qs'
import { message } from 'antd'

const { prefix } = config

export default {

  namespace: 'flowDeploy',

  state: {
    list: [],
    pdList:[],
    currentItem: {},
    modalVisible: false,
    dicList:[],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
    pdPagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/setting/flowDeploy') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
          dispatch({
            type: 'getPDPage',
            payload: location.query,
          })
          dispatch({
            type: 'getDic',
            payload: {dicType:'flowType_item'},
          })
        }
      })
    },
  },

  effects: {
    *query ({ payload }, { call, put }) {

      payload = parse(location.search.substr(1))
      
      payload={...payload,rows:payload.pageSize}
      const data = yield call(getDeployPage, payload)
      
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.rowsObject,//arrayToTree(data.data.rowsObject,'id','parentId'),
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.data.total,
            }
          },
        })
      }
    },
    *getPDPage ({ payload }, { call, put }) {

      payload = parse(location.search.substr(1))
      
      payload={...payload,rows:payload.pdPageSize}
      const data = yield call(getPDPage, payload)
      
      if (data) {
        yield put({
          type: 'getPDPageSuccess',
          payload: {
            list: data.data.rowsObject,//arrayToTree(data.data.rowsObject,'id','parentId'),
            pagination: {
              current: Number(payload.pdPage) || 1,
              pdPageSize: Number(payload.pdPageSize) || 10,
              total: data.data.total,
            }
          },
        })
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
    
    
    *viewItem ({ payload }, { call, put }) {
      const id=payload.currentItem.id;
      //const data = yield call(getDiagramByDeployId, {deployId:id})

      if (id) {
        
        yield put({ 
          type: 'showModal',
          payload:{
            ...payload,
            currentItem:{url:`${getDiagramByDeployId()}?deployId=${id}`},
          } 
        })
      } else {
        throw {success:false,message:'id invaild'}
      }
    },
    *deploy ({ payload }, { call, put }) {
      const data = yield call(deploy, payload)

      if (data.success) {
        message.success('部署成功')
        yield put({ 
          type: 'query'
        })
        yield put({ 
          type: 'getPDPage'
        })
      } else {
        throw data
      }
    },
    
  },

  reducers: {

    querySuccess (state, action) {
      const { list, pagination } = action.payload
      //console.log('position:',list);
      return { ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
        modalVisible:false,
        
      }
    },
    getPDPageSuccess (state, action) {
      const { list, pagination } = action.payload
      //console.log('position:',list);
      return { ...state,
        pdList:list,
        pdPagination: {
          ...state.pdPagination,
          ...pagination,
        },
        modalVisible:false,
      }
    },
    getDicSuccess(state,action){
      return {...state,dicList:action.payload}
    },
    showModal (state, action) {

      return { ...state, ...action.payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    setState(state,action){
      return {...state,currentItem:action.payload}
    },
   
  },

}
