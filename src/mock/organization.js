const qs = require('qs')
const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config

let organizationListData = Mock.mock({
  'data|1-10': [
    {
      id: '@id',
      name: '@ctitle(2,4)'+'公司',
      remark: '@last',
      phone: /^1[34578]\d{9}$/,
      leader:'@cname',
      address: '@county(true)',
      createTime: '@datetime',
      parent:-1,
      'children|0-3':[{
        id: '@id',
        name: '@ctitle(2,4)'+'部',
        remark: '@last',
        phone: /^1[34578]\d{9}$/,
        leader:'@cname',
        address: '@county(true)',
        createTime: '@datetime',
      },]
    },
  ],
})


let database = organizationListData.data
const treeToArray=(_tree)=>{
  let array=[];
  let tree=_tree;
  let forFun=(tree,parent=null)=>{
    tree.map((item)=>{
      let _list={}

      for(let obj in item){
        if(!(obj instanceof Array) && obj!=='children'){
          _list[obj]=item[obj];
        }
      }
      if(parent){
        _list.parent=parent;
      }else{
        _list.parent=-1;
      }
      array.push(_list);
      if(item.children){
        forFun(item.children,item.id)
      }
    })
  }
  let isDo=true;
  do{
    forFun(tree);
    isDo=false;
    for(let i in array){
      if(array[i] && array[i].children){
        tree=array;
        array=[];
        isDo=true;
        break;
      }
    }
  }while(isDo)
  return array;
}

const arrayToTree=(array,pid=-1)=>{
  let fn=(data, pid)=> {
      var result = [], temp;
      for (var i = 0; i < data.length; i++) {
          if (data[i].parent == pid) {
              var obj = {};
              for( let v in data[i]){
                if(!(v instanceof Array) && v!=='children'){
                  obj[v]=data[i][v];
                }
              }
              temp = fn(data, data[i].id);
              if (temp.length > 0) {
                  obj.children = temp;
              }
              result.push(obj);
          }
      }
      return result;
  }
  return fn(array,pid);
}

const queryArray = (array, key, keyAlias = 'key') => {
  if(!(array instanceof Array)){
    return null;
  }
  let data
  let forFun=(array,key, keyAlias)=>{
      for(let item of array){
        if(item[keyAlias]===key){
          data=item;
          break;
        }else if(item[keyAlias].children){
          forFun(item[keyAlias].children,key,keyAlias)
        }
      }
  }
  forFun(array,key,keyAlias)
  return data?data:null;
}


const addChildren=(tree,child)=>{
  if(!(tree instanceof Array)){
    return null;
  }
  let data=treeToArray(tree);
  data.push(child);
  
  return arrayToTree(data);
}
const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
}

module.exports = {


  [`GET ${apiPrefix}/setting/organization`] (req, res) {
    const { query } = req

    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1
    //console.log('req:other',other);
    let newData = treeToArray(database);
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === 'address') {
              return other[key].every(iitem => item[key].indexOf(iitem) > -1)
            } else if (key === 'createTime') {
              const start = new Date(other[key][0]).getTime()
              const end = new Date(other[key][1]).getTime()
              const now = new Date(item[key]).getTime()

              if (start && end) {
                return now >= start && now <= end
              }
              return true
            }
            //console.log('----',item[key],other[key],(String(item[key]).trim().indexOf(decodeURI(other[key]).trim())))
            return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1
          }
          return true
        })
      }
    }
    //console.log('========',...newData)
    //newData=arrayToTree(newData);
    //console.log('------',...newData)
    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    })
  },

  [`POST ${apiPrefix}/setting/organization`] (req, res) {
    const newData = req.body
    const _id=req.body.id;
    newData.createTime = Mock.mock('@now')
    newData.id = Mock.mock('@id')
    if(_id){
      newData.parent=_id;
      database=addChildren(database,newData);
    }else{
      newData.parent=-1;
      database.push(newData)
    }

    res.status(200).end()
  },

  [`GET ${apiPrefix}/setting/organization/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`DELETE ${apiPrefix}/setting/organization/:id`] (req, res) {
    const { id } = req.params
    //const data = queryArray(database, id, 'id')
    if (id) {
      let _data=treeToArray(database).filter((item) => item.id !== id);

      database =arrayToTree(_data);
      res.status(204).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`PATCH ${apiPrefix}/setting/organization/:id`] (req, res) {
    const { id } = req.params
    const editItem = req.body
    let isExist = false
    let _data=treeToArray(database);
    _data = _data.map((item) => {
      if (item.id === id) {
        isExist = true
        return Object.assign({}, item, editItem)
      }
      return item
    })
    database=arrayToTree(_data);
    if (isExist) {
      res.status(201).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },
}
