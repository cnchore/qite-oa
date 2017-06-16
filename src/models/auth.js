import { query,queryRole,saveMenuRole} from '../services/auth'
import { arrayToTree,treeToArray } from '../utils'
import { parse } from 'qs'
import { message } from 'antd'

export default {

  namespace: 'auth',

  state: {
    list: [],
    roleList:[],
    roleKey:null,
    selectedRowKeys:[],
   
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

        if (location.pathname === '/setting/auth') {
          
          dispatch({
            type: 'queryRole',
            payload: location.query,
          })
          dispatch({
            type: 'query',
            payload: location.query,
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
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },

    *queryRole ({ payload }, { call, put }) {

      //payload = parse(location.search.substr(1))
      const data = yield call(queryRole, {})

      if (data) {
        yield put({
          type: 'queryRoleSuccess',
          payload: {
            roleList: data.data,
          },
        })
      }
    },
    

    
    *saveMenuRole ({ payload }, { select, call, put }) {
      const roleId = yield select(({ auth }) => auth.roleKey)
      const menuIds = yield select(({ auth }) => auth.selectedRowKeys.join())
      const newAuth = {roleId, menuIds }
      const data = yield call(saveMenuRole, newAuth)
      if (data.success) {
        message.success('保存成功');
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
        selectedRowKeys:[],
        pagination: {
          ...state.pagination,
          ...pagination,
        } }
    },
    
    queryRoleSuccess (state, action) {
      const { roleList } = action.payload
      return { ...state,
        roleList
        }
    },
    
    setRoleKey(state,action){
      return {...state,roleKey:action.payload}
    },
    setSelectedRowKeys(state,action){
      return {...state,selectedRowKeys:action.payload}
    },

  },

}
