import * as car from '../../services/car'
import * as carDetail from '../../services/carDetail'
//import { arrayToTree,treeToArray } from '../utils'
import { parse } from 'qs'
import { message } from 'antd'
import pathToRegexp from 'path-to-regexp'

export default {

  namespace: 'carDetail',

  state: {
    carInfo:{},
    list: [],
    onlyview:false,
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
        const match = pathToRegexp('/car/:id').exec(location.pathname)
        if (match) {
          dispatch({ type: 'queryCarInfo', payload: { id: match[1] } })
          dispatch({ type: 'query'})
          
        }
      })
    },
  },

  effects: {
    *query ({ payload }, { call, put }) {
      let _hash=location.hash.replace('#/car/','');
      let carId=_hash.split('?')[0];
      payload=parse(_hash.split('?')[1]); 
      // payload = parse(location.search.substr(1))
      
      payload={...payload,rows:payload.pageSize,carId}
      const data = yield call(carDetail.query, payload)

      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.rowsObject,//arrayToTree(data.data.rowsObject,'id','parentId'),
            onlyview:payload.onlyview,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.data.total,
            },
          },
        })
      }
    },
    *queryCarInfo({payload},{call,put}){
      const _carInfo=yield call(car.queryById,payload);
      if(_carInfo.success){
        yield put({
          type:'setState',
          payload:{
            carInfo:_carInfo.data,
          }
        })
      }else{
        throw _carInfo;
      }
    },
   

    *'delete' ({ payload }, { call, put }) {
      const data = yield call(carDetail.deleteById, { id: payload })
      if (data.success) {
        message.success('删除成功');
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *create ({ payload }, { call, put }) {

      const data = yield call(carDetail.save, payload)
      if (data.success) {
        message.success('新增成功');
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    
    *editItem ({ payload }, { call, put }) {
      const id=payload.currentItem.id;
      const data = yield call(carDetail.queryById, {id})
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
      // const id = yield select(({ carDetail }) => carDetail.currentItem.id)
      // const newRole = { ...payload, id }
      const data = yield call(carDetail.save, payload)
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
      const { list,onlyview, pagination } = action.payload
      //console.log('position:',list);
      return { ...state,
        list,
        onlyview,
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
