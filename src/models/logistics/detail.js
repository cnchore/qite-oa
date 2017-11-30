import pathToRegexp from 'path-to-regexp';
import { queryById } from '../../services/logistics';
// import { getDic } from '../../services/dictionary';
import { config } from '../../utils';
const { prefix } = config;
export default {
  namespace: 'logisticsDetail',
  state: {
    data: {},
    dicList:[],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        const match = pathToRegexp('/logistics/:id').exec(location.pathname);
        if (match) {
          dispatch({ type: 'query', payload: { id: match[1] } });
          // dispatch({type:'getDic',payload:{dicType:'logisticsType_item'}});
        }
      })
    },
  },

  effects: {
    *query ({payload,}, { call, put }) {
      const data = yield call(queryById, payload);
      const { success, message, status, ...other } = data;
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: other.data,
          },
        });
      } else {
        throw data;
      }
    },
    *getDic ({ payload }, { call, put }) {
     // payload = parse(location.search.substr(1))
      const data = yield call(getDic, payload)
      if (data) {
        yield put({
          type: 'getDicSuccess',
          payload: data.data,
        });
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
    getDicSuccess(state,action){
      return {...state,dicList:action.payload}
    },
  },
}
