import { query,queryById,create, change, update,fileUpload,getOrg } from '../services/knowledge'
import { treeToArray,config } from '../utils'
import { parse } from 'qs'
import { message } from 'antd'
// import { EditorState, ContentState, convertFromHTML } from 'draft-js'

// const getEditorState=(html)=>EditorState.createWithContent(
//     ContentState.createFromBlockArray(
//       convertFromHTML(html)
//     )
//   )
const { prefix } = config

export default {

  namespace: 'knowledge',

  state: {
    list: [],
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    editorContent:'',
    fileList:[],
    orgList:[],
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

        if (location.pathname === '/knowledge') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
          dispatch({
            type: 'getOrg',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {
    *query ({ payload }, { call, put }) {

      payload=parse(location.hash.split('#/knowledge?')[1]); 
      // payload = parse(location.search.substr(1))
      const userInfo = JSON.parse(sessionStorage.getItem(`${prefix}userInfo`));

      if (userInfo && userInfo.data) {
        payload.userId=userInfo.data.id;
      }
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
            orgList: treeToArray(data.data)
          },
        })
      }
    },

    *'change' ({ payload }, { call, put }) {
      const data = yield call(change, { id: payload.id })
      if (data.success) {
        message.success(`${payload.title}成功`);
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
      const id=payload.currentItem.id;
      const data = yield call(queryById, {id})
      if (data.success) {
        yield put({ 
          type: 'showModal',
          payload:{
            ...payload,
            currentItem:data.data,
            editorContent:'',
            fileList:[],
          } 
        })
      } else {
        throw data
      }
    },
    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ knowledge }) => knowledge.currentItem.id)
      const newRole = { ...payload, id }
      const data = yield call(update, newRole)
      if (data.success) {
        message.success('修改成功');
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    *fileUpload ({ payload }, { call, put }) {
      const data = yield call(fileUpload, payload)
      if (data.success) {
        message.success('文件上传成功');
        yield put({ 
          type: 'fileUploadSuccess',
          payload: {
            fileUrl:data.data,
          }
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
    fileUploadSuccess(state, action) {
      const { fileUrl } = action.payload
      return { ...state,fileUrl}
    },
    getOrgSuccess (state, action) {
      const { orgList } = action.payload
      return { ...state,
        orgList
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
    setEditorState(state,action){
      return {...state,editorContent:action.payload}
    },
    setFileList(state,action){
      return {...state,fileList:action.payload}
    },

  },

}
