import { query,queryById,getOrg,getPosition,create,getRoles,
  remove, update,userChange,resetPwd,setUserRole,getDic } from '../services/employee'
import { arrayToTree,treeToArray } from '../utils'
import { parse } from 'qs'
import { message } from 'antd'

export default {

  namespace: 'employee',

  state: {
    list: [],
    orgList:[],
    orgTree:[],
    positSelList:[],
    positionList:[],
    //roleList:[],
    dicList:[],
    photoUrl:null,
    orgKey:null,
    currentItem: {},
    modalVisible: false,
    positSelModalVisible:false,
    modalType: 'create',
    expand:false,
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

        if (location.pathname === '/setting/employee') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
          dispatch({
            type: 'getOrg',
            payload: location.query,
          })
          dispatch({
            type: 'getPosition',
            payload: location.query,
          })
          //empoyeeState_item
          dispatch({
            type: 'getDic',
            payload: {dicType:'empoyeeState_item'},
          })
        }
      })
    },
  },

  effects: {
    *query ({ payload }, { call, put }) {

      payload=parse(location.hash.split('#/setting/employee?')[1]); 
      // payload = parse(location.search.substr(1))
      payload={...payload,rows:payload.pageSize}
      const data = yield call(query, payload)

      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.rowsObject,//arrayToTree(data.data.rowsObject,'id','parentId'),
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.data.total,
            },
          },
        })
      }
    },

    *getOrg ({ payload }, { call, put }) {

      //payload = parse(location.search.substr(1))
      const data = yield call(getOrg, {})

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
    *getDic({ payload }, { call, put }) {

      //payload = parse(location.search.substr(1))
      const data = yield call(getDic, payload)

      if (data) {
        yield put({
          type: 'getDicSuccess',
          payload: {
            dicList: data.data,
          },
        })
      }
    },
    *getPosition ({ payload }, { call, put }) {

      //payload = parse(location.search.substr(1))
      const data = yield call(getPosition, payload)

      if (data) {
        yield put({
          type: 'getPositionSuccess',
          payload: {
            positionList: data.data
          },
        })
      }
    },
    *getRoles ({ payload }, { call, put }) {

      //payload = parse(location.search.substr(1))
      const data = yield call(getRoles, payload)

      if (data) {
        yield put({
          type: 'getRolesSuccess',
          payload: {
            roleList: data.data
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
            photoUrl:null,
          } 
        })
      } else {
        throw data
      }
    },
    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ employee }) => employee.currentItem.id)
      const newEmployee = { ...payload, id }
      const data = yield call(update, newEmployee)
      if (data.success) {
        message.success('修改成功');
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    *setUserRole ({ payload }, { call, put }) {
      
      const data = yield call(setUserRole, payload)
      if (data.success) {
        message.success('设置用户角色成功');
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    
    *positionSelect ({ payload }, { call, put }) {
      //const positId = payload;
      //console.log('payload:',payload);
      if (payload.id) {
        
        yield put({ 
          type: 'positionSelectSuccess',
          payload:payload
         })
        yield put({ type: 'hidePositSelModal' })
      } else {
        throw {success:false,message:'Position selection error'}
      }
    },
    *userChange ({ payload }, { call, put }) {
      
      const data = yield call(userChange, payload)
      if (data.success) {
        message.success(`${payload.isDisable?'禁用':'启用'}成功`);
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    *resetPwd ({ payload }, { call, put }) {
      const data = yield call(resetPwd, payload)
      if (data.success) {
        message.success('重置密码成功');
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
        dicList,
        }
    },
    getPositionSuccess (state, action) {
      const { positionList } = action.payload
      return { ...state,
        positionList
        }
    },
    getRolesSuccess (state, action) {
      const { roleList } = action.payload
      return { ...state,
        roleList
        }
    },
    positionSelectSuccess(state, action) {
      //const { positId } = action.payload
      //console.log('payload:',action.payload)
      return { ...state,
        positSelList:[...state.positSelList,action.payload],
        }

    },
    showPositSelModal (state, action) {

      return { ...state, ...action.payload, positSelModalVisible: true }
    },

    hidePositSelModal (state) {
      return { ...state, positSelModalVisible: false }
    },
    showModal (state, action) {

      return { ...state, ...action.payload, modalVisible: true,positSelList:[] }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    setState(state,action){
      return {...state,currentItem:action.payload}
    },
    setPhoto(state,action){
      return {...state,photoUrl:action.payload}
    },
    setOrgKey(state,action){
      return {...state,orgKey:action.payload}
    },
    toggle(state,action){
      return {...state,expand:!state.expand}
    },
  },

}
