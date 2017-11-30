import { query,getPage,queryById,save,change,deleteById } from '../services/logistics';
// import { getDic } from '../services/dictionary';
//import { arrayToTree,treeToArray } from '../utils'
import { parse } from 'qs';
import { message } from 'antd';
export default {
  namespace: 'logistics',
  state: {
    list: [],
    currentItem: {},
    needRemark:false,
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
        if (location.pathname === '/logistics') {
          dispatch({
            type: 'query',
            payload: location.query,
          });
          // dispatch({type:'getDic',payload:{dicType:'logisticsType_item'}});
        }
      })
    },
  },

  effects: {
    *query ({ payload }, { call, put }) {
      payload=parse(location.hash.split('#/logistics?')[1]); 
      payload={...payload,rows:payload.pageSize};
      const data = yield call(getPage, payload);
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
    *'delete' ({ payload }, { call, put }) {
      const data = yield call(deleteById, { id: payload });
      if (data.success) {
        message.success('删除成功');
        yield put({ type: 'query' });
      } else {
        throw data;
      }
    },
    *'change' ({ payload }, { call, put }) {
      const data = yield call(change, payload);
      if (data.success) {
        message.success('物流状态修改成功');
        yield put({ type: 'query' });
      } else {
        throw data;
      }
    },
    *create ({ payload }, { call, put }) {
      const data = yield call(save, payload);
      if (data.success) {
        message.success('新增成功');
        yield put({ type: 'hideModal' });
        yield put({ type: 'query' });
      } else {
        throw data
      }
    },
    
    *editItem ({ payload }, { call, put }) {
      const id=payload.currentItem.id;
      const data = yield call(queryById, {id});
      if (data.success) {
        const {logisticsState} =data.data;
        yield put({ 
          type: 'showModal',
          payload:{
            ...payload,
            currentItem:data.data,
            needRemark:logisticsState===-1?true:false,
          } 
        })
      } else {
        throw data
      }
    },
    *update ({ payload }, { select, call, put }) {
      const data = yield call(save, payload)
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
      const { list, pagination } = action.payload;
      return { ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        } }
    },
    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    setState(state,action){
      return {...state,...action.payload}
    },
  },

}
