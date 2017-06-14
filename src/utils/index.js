import config from './config'
import menu from './menu'
import request from './request'
import classnames from 'classnames'
import { color } from './theme'
import lodash from 'lodash'

// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.prototype.format = function (format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
    }
  }
  return format
}


/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  const item = array.filter(_ => _[keyAlias] === key)
  if (item.length) {
    return item[0]
  }
  return null
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  let data = lodash.cloneDeep(array)
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}
/**
 * 树状结构转数组格式
 * @param   {array}     array
 * @return  {Array}
 */
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
/**
 * 根据NodeKey查找当前节点以及父节点
 * 
 * @param  {[json]}
 * @param  {[key]}
 * @return {{}}
 */
const getParentNode=(json,key)=>{
    var parentKey = null;
    let getNode= function(json, key) { 
        //1.第一层 root 深度遍历整个JSON
        for (var i = 0; i < json.length; i++) {
            var obj = json[i];
            //2.有节点就开始找，一直递归下去
            if (obj.key === key) {
                //找到了与nodeId匹配的节点，结束递归
                parentKey=obj.parent;
                break;
            } else {
                //3.如果有子节点就开始找
                if (obj.children) {
                    //递归往下找
                    getNode(obj.children, key);
                } else {
                    //跳出当前递归，返回上层递归
                    continue;
                }
            }
        }
        
    }
    getNode(json,key);
    return parentKey;
}
const getFamliy=(json,key)=>{
  let trees=[key];
  let _do=true;
  let _key=key;
  do{
    let parentkey=getParentNode(json,_key);
    if(parentkey && parentkey>-1){
      trees.push(parentkey);
      _key=parentkey;
    }else{
      _do=false;
      
    }
  }
  while(_do)
  return trees;
}
const getChildren=(json,key)=>{
  let keys=[];
  let forFun=(json,key)=>{
    for(let i=0;i<json.length;i++){
      if(json[i].key===key){
        if(json[i].children){
          let _list=json[i].children;
          keys.push(..._list);
          _list.forEach((item)=>{
            forFun(json,item.key);
          })
        }
      }else if(json[i].children){
        forFun(json[i].children,key)
      }
    }
  }
  forFun(json,key);
  return keys.length>0?keys.map((item)=>item.key):[];
}
const getAnotB=(a,b)=>{
  //console.log(...a,'------',...b);
  return a.filter((v)=>{
    if(b.findIndex((o)=>o===v)>-1){
      return false;
    }else{
      return true;
    }
  })
}
module.exports = {
  config,
  menu,
  request,
  color,
  classnames,
  queryURL,
  queryArray,
  arrayToTree,
  treeToArray,
  getFamliy,
  getChildren,
  getAnotB
}
