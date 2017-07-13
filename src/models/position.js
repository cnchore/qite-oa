import { query,queryById,getOrg,getDic,create, remove, update } from '../services/position'
import { arrayToTree,treeToArray } from '../utils'
import { parse } from 'qs'
import { message } from 'antd'

export default {

  namespace: 'position',

  state: {
    list: [],
    orgList:[],
    orgTree:[],
    dicList:[],
    postLevelList:[],
    orgKey:null,
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    pagination: {
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

        if (location.pathname === '/setting/position') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
          dispatch({
            type: 'getOrg',
            payload: location.query,
          })
          dispatch({
            type: 'getDic',
            payload: {dicType:'positionType_item'},
          })
          dispatch({
            type: 'getPostLevel',
            payload: {dicType:'postLevel_item'},
          })
        }
      })
    },
  },

  effects: {
    *query ({ payload }, { call, put }) {

      payload = parse(location.search.substr(1))
      const data = yield call(query, payload)

      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: arrayToTree(data.data.rowsObject,'id','parentId'),
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },

    *getOrg ({ payload }, { call, put }) {

      payload = parse(location.search.substr(1))
      const data = yield call(getOrg, payload)

      if (data) {
        yield put({
          type: 'getOrgSuccess',
          payload: {
            orgTree: data.data,
            orgList: treeToArray(data.data)
          },
        })
      }
    },
    *getDic ({ payload }, { call, put }) {
      const data = yield call(getDic, payload)
      if (data) {
        yield put({
          type: 'getDicSuccess',
          payload: {
            dicList: data.data
          },
        })
      }
    },
    *getPostLevel ({ payload }, { call, put }) {
      const data = yield call(getDic, payload)
      if (data) {
        yield put({
          type: 'getPostLevelSuccess',
          payload: {
            postLevelList: data.data
          },
        })
      }
    },

    *'delete' ({ payload }, { call, put }) {
      const data = yield call(remove, { id: payload })
      if (data.success) {
        message.success('删除成功');
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *create ({ payload }, { call, put }) {

      const data = yield call(create, payload)
      if (data.success) {
        message.success('新增成功');
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    
    *editItem ({ payload }, { call, put }) {
      const id=payload.id;
      const data = yield call(queryById, payload)
      if (data.success) {
        yield put({ 
          type: 'showModal',
          payload:{
            ...payload,
            currentItem:data.data,
          } 
        })
      } else {
        throw data
      }
    },
    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ position }) => position.currentItem.id)
      const newOrganization = { ...payload, id }
      const data = yield call(update, newOrganization)
      if (data.success) {
        message.success('修改成功');
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
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
        } }
    },
    
    getOrgSuccess (state, action) {
      const { orgList,orgTree } = action.payload
      return { ...state,
        orgList,
        orgTree
        }
    },
    getDicSuccess (state, action) {
      const { dicList } = action.payload
      return { ...state,
        dicList
        }
    },
    getPostLevelSuccess (state, action) {
      const { postLevelList } = action.payload
      return { ...state,
        postLevelList
        }
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
    setOrgKey(state,action){
      return {...state,orgKey:action.payload}
    },

  },

}
