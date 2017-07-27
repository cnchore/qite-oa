import { queryById,queryEmployee } from '../services/missClock'
import { getTaskFiledPage,getTaskInfo,audit,getDic,getOrg } from '../services/workFlow'
import { treeToArray,config } from '../utils'
import { parse } from 'qs'
import { message } from 'antd'
import ExportCsv from '../utils/export-csv'
import Csv from '../utils/csv'

const { prefix } = config
const exportDataToCsv=(_columns,dataSource)=>{
    let csvData=Csv(_columns,dataSource,',',false);
    let filename='淇特办公归档数据'+Date.now()+'.csv';
    ExportCsv.download(filename,csvData);
}
export default {

  namespace: 'filed',

  state: {
    list: [],
    dicList:[],
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

        if (location.pathname === '/filed') {
          dispatch({
            type: 'query',
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

      payload=parse(location.hash.split('#/filed?')[1]); 
      // payload = parse(location.search.substr(1))
      const userInfo = JSON.parse(sessionStorage.getItem(`${prefix}userInfo`));
      
      if (userInfo && userInfo.data) {
        payload={...payload,rows:payload.pageSize}
        const data = yield call(getTaskFiledPage, payload)
        if(data && data.success){
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
        }else{
          throw data;
        }
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
    *exportAllRows({payload},{call,put}){
      let queryObj=parse(location.hash.split('#/filed?')[1]); 
      let _columns=payload.colums;
      payload={...queryObj,rows:payload.rows,page:1}
      // message.loading('正在获取导出数据...',2);
      const data=yield call(getTaskFiledPage,payload);
      if(data && data.success){
        exportDataToCsv(_columns,data.data.rowsObject);
        message.success('导出成功')
      }else{
        throw data;
      }
    },
    *exportNowPage({payload},{call,put}){
      exportDataToCsv(payload.colums,payload.data);
      message.success('导出成功')
    }
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
      }
    },
    
    getDicSuccess(state,action){
      return {...state,dicList:action.payload}
    },

  },

}
