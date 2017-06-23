import pathToRegexp from 'path-to-regexp'
import { queryById,getOrg } from '../../services/knowledge'
import { treeToArray } from '../../utils'

export default {

  namespace: 'knowledgeDetail',

  state: {
    data: {},
    orgList:[],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(() => {
        const match = pathToRegexp('/knowledge/:id').exec(location.pathname)
        if (match) {
          dispatch({ type: 'query', payload: { id: match[1] } })
          dispatch({
            type: 'getOrg',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {
    *query ({
      payload,
    }, { call, put }) {
      const data = yield call(queryById, payload)
      const { success, message, status, ...other } = data
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: other.data,
          },
        })
      } else {
        throw data
      }
    },
     *getOrg ({ payload }, { call, put }) {

      //payload = parse(location.search.substr(1))
      const data = yield call(getOrg, {})

      if (data) {
        yield put({
          type: 'getOrgSuccess',
          payload: {
            orgList: treeToArray(data.data)
          },
        })
      }
    },
  },

  reducers: {
    querySuccess (state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },
    getOrgSuccess (state, action) {
      const { orgList } = action.payload
      return { ...state,
        orgList
        }
    },
  },
}
