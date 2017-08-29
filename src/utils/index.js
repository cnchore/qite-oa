import config from './config'
// import menu from './menu'
import request from './request'
import classnames from 'classnames'
import { color } from './theme'
import lodash from 'lodash'
import { Link } from 'dva/router'
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
const treeToArray=(_tree,parent=null,parentAlias='parent',keyAlias='id')=>{
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
      if(parent!==null && parent!==undefined){
        _list[parentAlias]=parent;
      }else{
        _list[parentAlias]=-1;
      }
      array.push(_list);
      if(item.children){
        forFun(item.children,item[keyAlias])
      }
    })
  }
  let isDo=true;
  do{
    forFun(tree,parent);
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
const getParentNode=(json,key,keyAlias = 'key',parentAlias='parent')=>{
    var parentKey = null;
    let getNode= function(json, key,keyAlias = 'key',parentAlias='parent') { 
        //1.第一层 root 深度遍历整个JSON
        for (var i = 0; i < json.length; i++) {
            var obj = json[i];
            //2.有节点就开始找，一直递归下去
            if (obj[keyAlias] === key) {
                //找到了与nodeId匹配的节点，结束递归
                parentKey=obj[parentAlias];
                break;
            } else {
                //3.如果有子节点就开始找
                if (obj.children) {
                    //递归往下找
                    getNode(obj.children, key,keyAlias,parentAlias);
                } else {
                    //跳出当前递归，返回上层递归
                    continue;
                }
            }
        }
        
    }
    getNode(json,key,keyAlias,parentAlias);
    return parentKey;
}
const getFamliy=(json,key,keyAlias = 'key',parentAlias='parent')=>{
  let trees=[key];
  let _do=true;
  let _key=key;
  do{
    let parentkey=getParentNode(json,_key,keyAlias,parentAlias);
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
const getChildren=(json,key,keyAlias = 'key')=>{
  let keys=[];
  let forFun=(json,key,keyAlias = 'key')=>{
    for(let i=0;i<json.length;i++){
      if(json[i][keyAlias]===key){
        if(json[i].children){
          let _list=json[i].children;
          keys.push(..._list);
          _list.forEach((item)=>{
            forFun(json,item[keyAlias]);
          })
        }
      }else if(json[i].children){
        forFun(json[i].children,key,keyAlias)
      }
    }
  }
  forFun(json,key,keyAlias);
  return keys.length>0?keys.map((item)=>item[keyAlias]):[];
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
const changeMoneyToChinese=(n)=>{
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
  return "";
  var unit = "仟佰拾亿仟佰拾万仟佰拾元角分", str = "";
  n += "00";
  var p = n.indexOf('.');
  if (p >= 0)
  n = n.substring(0, p) + n.substr(p+1, 2);
  unit = unit.substr(unit.length - n.length);
  for (var i=0; i < n.length; i++)
  str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
  return str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g,"").replace(/元$/g, "元整");
}
const treeMenuToArrayMenu=(treeList)=>{
  var list=treeToArray(treeList,0,'parentId','id');
  var menuList=[];
  if(list&&list[0]){
    list.forEach(item=>{
        var menuItem={
          id:item.id,
          mpid:item.type===3?-1:item.parentId,
          bpid:item.parentId,
          name:item.menuName
        }
        if(item.src){
          menuItem.router=item.src;
        }
        if(item.iconUrl){
          menuItem.icon=item.iconUrl;
        }
        menuList.push(menuItem)
    })
    return menuList;
  }else{
    return [{
    id: 1,
    icon: 'laptop',
    name: 'Dashboard',
    router: '/dashboard',
  }];
  }
}
const findIsEditable=(data)=>{
    let _isEditable=false;
    data.forEach(item=>{
      Object.keys(item).forEach((child)=>{
        if(item[child] && item[child].editable!==undefined && item[child].editable===true){
          _isEditable=true;
        }
      })
    })
    return _isEditable;
} 
const setPrintData=(data,employeeList,dicList={})=>{
  let printData={
    busiData:data,
    employeeList:employeeList,
    dicList:dicList,
  }
  window.sessionStorage.setItem('printData', JSON.stringify(printData));
}
const getTheme=()=>{
   return window.localStorage.getItem(`${config.prefix}darkTheme`) === 'true'?true:false;
}
const getMsgType=(t)=>{
    switch(t){
      case 1:
        return '待办';
      case 2:
        return '待签收';
      case 3:
        return '警告';
      case 4:
        return '超时';
      case 5:
        return '超时公告';
      case 6:
        return '退回修改';
      case 7:
        return '待完善资料';
      case 8:
        return '审核通过';
      case 9:
        return '审核不通过';
      default:
        return '新消息';
    }
  }
const getMsgAction=(item)=>{
    let codeStr=item.code && item.code || null,
        id=codeStr&&codeStr.split('#')[1]||-1,
        codeType=codeStr&&codeStr.substr(0,2) || null,
        _code=codeStr && codeStr.split('#')[0] || '',
        t=getMsgType(item.msgType),
        content=`[ ${_code} ${item.flowName && item.flowName}] ${t}`
    if(codeType&&id!==-1){
      switch(codeType){
        case 'MC'://考勤异常
          return <Link to={`/missClock/${id}`}>{content}</Link>
        case 'SC'://调薪
          return <Link to={`/salaryChange/${id}`}>{content}</Link>
        case 'LE'://请假
          return <Link to={`/leave/${id}`}>{content.replace('待完善资料','待销假')}</Link>
        case 'OT'://加班
          return <Link to={`/overTime/${id}`}>{content}</Link>
        case 'TL'://出差
          return <Link to={`/travel/${id}`}>{content}</Link>
        case 'DN'://离职
          return <Link to={`/dimission/${id}`}>{content}</Link>
        case 'RR'://转正
          return <Link to={`/regular/${id}`}>{content}</Link>
        case 'TR'://出差报销
          return <Link to={`/travelReimburse/${id}`}>{content}{content.indexOf('审核通过')>0?'，请打印表单，并黏贴附件交财务部。':''}</Link>
        case 'CT'://合同
          return <Link to={`/contract/${id}`}>{content}{content.indexOf('审核通过')>0?'，请打印表单，并黏贴附件交财务部。':''}</Link>
        case 'UC'://用车
          return <Link to={`/useCar/${id}`}>{content}</Link>
        case 'PA'://申购
          return <Link to={`/purchaseApply/${id}`}>{content}</Link>
        case 'PE'://采购
          return <Link to={`/purchase/${id}`}>{content}{content.indexOf('审核通过')>0?'，请打印表单，并黏贴附件交财务部。':''}</Link>
        case 'PT'://付款
          return <Link to={`/payment/${id}`}>{content}{content.indexOf('审核通过')>0?'，请打印表单，并黏贴附件交财务部。':''}</Link>
        case 'RT'://招聘
          return <Link to={`/recruit/${id}`}>{content}</Link>
        case 'RE'://费用报销
          return <Link to={`/reimburse/${id}`}>{content}{content.indexOf('审核通过')>0?'，请打印表单，并黏贴附件交财务部。':''}</Link>
        case 'BD'://预算
          return <Link to={`/budget/${id}`}>{content}{content.indexOf('审核通过')>0?'，请打印表单，并黏贴附件交财务部。':''}</Link>
        case 'NE'://通知
          return <Link to={`/notice/${id}`}>{content}</Link>
        case 'LW'://外勤
          return <Link to={`/legwork/${id}`}>{content}</Link>
      }
    }
    return content;
  }
module.exports = {
  config,
  treeMenuToArrayMenu,
  request,
  color,
  classnames,
  queryURL,
  queryArray,
  arrayToTree,
  treeToArray,
  getFamliy,
  getChildren,
  getAnotB,
  changeMoneyToChinese,
  findIsEditable,
  setPrintData,
  getTheme,
  getMsgType,
  getMsgAction,
}
