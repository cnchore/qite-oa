import config from './config'
// import menu from './menu'
import request from './request'
import classnames from 'classnames'
import { color } from './theme'
import lodash from 'lodash'
import { Link } from 'dva/router'
import { notification,Button,Icon,Tag,Tooltip } from 'antd'
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
            forFun(json,item[keyAlias],keyAlias);
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
const setPrintData=(data,employeeList,dicList={},commentList={})=>{
  let printData={
    busiData:data,
    employeeList:employeeList,
    dicList:dicList,
    commentList:commentList
  }
  window.sessionStorage.setItem('printData', JSON.stringify(printData));
}
const getTheme=()=>{
  let dt=window.localStorage.getItem(`${config.prefix}darkTheme`);
 return dt?dt=== 'true':true;
}
const getMsgType=(t)=>{
  switch(t){
    case 1:
    return '待办';
    case 2:
    return '待签收';
    case 3:
    return '待办警告';
    case 4:
    return '待办超时';
    case 5:
    return '待办超时公告';
    case 10:
    return '签收警告';
    case 11:
    return '签收超时';
    case 12:
    return '签收超时公告';
    case 6:
    return '退回修改';
    case 7:
    return '待完善资料';
    case 8:
    return '审核通过';
    case 9:
    return '审核不通过';
    case 13:
    return '采购询价完成';
    case 14:
    return '确定采购通知入库';
    case 15:
    return '入库通知申请人领料';
    case 16:
    return '申请通过通知相关人';
    case 17:
    return '报餐通知';
    case 18:
    return '超时未销假通知';
    case 19:
    return '财务已付款';
    case 20:
    return '财务待付款';
    default:
    return '新消息';
  }
}
const getHMS=(text)=>{
  var t=text?parseFloat(text<0?-1*text:text)/1000:0;
  if(t>=259200){
    return '3天以上'
  }
  let h=Math.floor(t/3600),
      m=Math.floor((t%3600)/60),
      s=Math.ceil((t%3600)%60);
  return `${h}时${m}分${s}秒`
}
const getDateDiff=(a,b)=>{
  if(!a || !b) return 0;
  let _a=typeof a ==='string'?new Date(a).getTime():a;
  let _b=typeof b ==='string'?new Date(b).getTime():b;
  return (Math.abs(_a - _b) / (1000 * 60 * 60 * 24)).toFixed(2);
}
const handerMsgLinkClick=(readFn,readPayload,linkTo,linkPayload)=>{
 readFn && readFn(readPayload || {});
 linkTo && linkPayload && linkTo(linkPayload || {});
}
  const getMsgAction=(item,readFn,linkTo)=>{
    let codeStr=item.code && item.code || null,
      id=codeStr&&codeStr.split('#')[1]||-1,
      codeType=codeStr&&codeStr.substr(0,2) || null,
      _code=codeStr && codeStr.split('#')[0] || '',
      t=getMsgType(item.msgType),
      _msgType=item.msgType,
      content=_msgType===19 || _msgType===20?item.content:`[ ${_code} ${item.flowName && item.flowName || ''}] ${t}`,
      _time=item.expirationTime && (new Date()-new Date(item.expirationTime)) || 0,
      _times=_time!==0?getHMS(_time):'0 时';
    //taskId
    if(_msgType===1){
      // 待办
      return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true,msgType:1,linkTo})}>{content}</a>;
      //<Link to={`/waiting`}>{content}</Link>
    }else if(_msgType===2){
      // 待签收
      return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true,msgType:2,linkTo})}>{content}</a>;
      //<Link to={`/waitSigin`}>{content}</Link>
    }else if(_msgType===3){//----
      // 预警
      return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true,msgType:_msgType,linkTo})}>{`预警：${content.replace(t,'')} 待办，将于 ${_times} 后过期，请尽快处理`}</a>;
      //`预警：${content.replace(t,'')} 待办，将于 ${_times} 后过期，请尽快处理`
    } else if(_msgType===4){//----
      // 超时
      if(item.notNeedEleA){
        return `${content.replace(t,'')} 待办，已超时 ${_times} `;
      }
      return <span onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true,msgType:_msgType,linkTo})}>{`${content.replace(t,'')} 待办，已超时 ${_times} `}</span>;
    }else if(_msgType===5){
      // 超时公告
      if(item.notNeedEleA){
        return `超时公告：${content.replace(t,'')} 待办，超时 ${_times} 未处理`
      }
      return <span onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2})}>{`超时公告：${content.replace(t,'')} 待办，超时 ${_times} 未处理`}</span>;
    }else if(_msgType===10){//----
      // 预警
      return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true,msgType:_msgType,linkTo})}>{`预警：${content.replace(t,'')} 签收，将于 ${_times} 后过期，请尽快处理`}</a>;
      //`预警：${content.replace(t,'')} 签收，将于 ${_times} 后过期，请尽快处理`
    } else if(_msgType===11){//----
      // 超时
      if(item.notNeedEleA){
        return `${content.replace(t,'')} 签收，已超时 ${_times} `
      }
      return <span onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true,msgType:_msgType,linkTo})}>{`${content.replace(t,'')} 签收，已超时 ${_times} `}</span>;
    }else if(_msgType===12){
      // 超时公告
      if(item.notNeedEleA){
        return `超时公告：${content.replace(t,'')} 签收，超时 ${_times} 未处理`
      }
      return <span onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2})}>{`超时公告：${content.replace(t,'')} 签收，超时 ${_times} 未处理`}</span>;
    }else if(_msgType===13){
      // 采购询价完成
      return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2})}>{`${content.replace(t,'')} 已更新 到货日期，请查看`}</a>;
      //`${content.replace(t,'')} 已更新 到货日期，请查看`
    } else if(_msgType===14){
      // 确定采购通知入库
      return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2})}>{`${content.replace(t,'')} 已确定采购，如到货，请更新入库信息`}</a>;
      //`${content.replace(t,'')} 已确定采购，如到货，请更新入库信息`
    }else if(_msgType===15){
      // 入库通知申请人领料
      return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2})}>{`${content.replace(t,'')} 已有货品入库，请至仓库领取`}</a>;
      //`${content.replace(t,'')} 已有货品入库，请至仓库领取`
    }else if(_msgType===6){//----state=-1
      // 退回
      return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true,msgType:_msgType,linkTo})}>{content}</a>;
      //<Link to={`/waiting`}>{content}</Link>
    }else if(_msgType===7){//----state=-2
      // 待完善资料
      return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true,msgType:_msgType,linkTo})}>{content}</a>;
      //<Link to={`/waiting`}>{content}</Link>
    }else if(_msgType===16){
      // 申请通过通知相关人
      return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2})}>{`${content.replace(t,'')} 已审批通过，请到报表管理核实`}</a>;
      //`${content.replace(t,'')} 已审批通过，请到报表管理核实`
    }else if(_msgType===17){
      return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2})}>{`可以报餐啦，不要忘记哦，亲`}</a>;
      //`可以报餐啦，不要忘记哦，亲`
    }else if(_msgType===18){//----state=-1
      // 超时未销假消息通知
      return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true,msgType:_msgType,linkTo})}>{content}</a>;
      //<Link to={`/waiting`}>{content}</Link>
    }else if(_msgType===19){
      //财务已付款
      return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2})}>{content}</a>;
    }else if(_msgType===20){
      //财务待付款
      return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},linkTo,{pathname:'/cashierPayment'})}>{'你有一条待付款'}</a>;
    }else if((_msgType===8 || _msgType===9) && codeType&&id!==-1){
      // 审核通过/不通过
      switch(codeType){
        case 'MC'://考勤异常
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/missClock/${id}`})}>{content}</a>;
        //<Link to={`/missClock/${id}`}>{content}</Link>
        case 'SC'://调薪
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/salaryChange/${id}`})}>{content}</a>;
        //<Link to={`/salaryChange/${id}`}>{content}</Link>
        case 'LE'://请假
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/leave/${id}`})}>{content}</a>;
        //<Link to={`/leave/${id}`}>{content.replace('待完善资料','取消任务代理')}</Link>
        case 'OT'://加班
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/overTime/${id}`})}>{content}</a>;
        //<Link to={`/overTime/${id}`}>{content}</Link>
        case 'TL'://出差
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/travel/${id}`})}>{content}</a>;
        //<Link to={`/travel/${id}`}>{content}</Link>
        case 'DN'://离职
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/dimission/${id}`})}>{content}</a>;
        //<Link to={`/dimission/${id}`}>{content}</Link>
        case 'RR'://转正
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/regular/${id}`})}>{content}</a>;
        //<Link to={`/regular/${id}`}>{content}</Link>
        case 'TR'://出差报销
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/travelReimburse/${id}`})}>{content}{content.indexOf('审核通过')>0?'，请打印表单，并黏贴附件交财务部。':''}</a>;
        //<Link to={`/travelReimburse/${id}`}>{content}{content.indexOf('审核通过')>0?'，请打印表单，并黏贴附件交财务部。':''}</Link>
        case 'CT'://合同
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/contract/${id}`})}>{content}{content.indexOf('审核通过')>0?'，请打印表单，并黏贴附件交财务部。':''}</a>;
        //<Link to={`/contract/${id}`}>{content}{content.indexOf('审核通过')>0?'，请打印表单，并黏贴附件交财务部。':''}</Link>
        case 'UC'://用车
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/useCar/${id}`})}>{content}</a>;
        //<Link to={`/useCar/${id}`}>{content}</Link>
        case 'PA'://申购
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/purchaseApply/${id}`})}>{content}</a>;
        //<Link to={`/purchaseApply/${id}`}>{content}</Link>
        case 'PE'://采购
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/purchase/${id}`})}>{content}{content.indexOf('审核通过')>0?'，请打印表单，并黏贴附件交财务部。':''}</a>;
        //<Link to={`/purchase/${id}`}>{content}{content.indexOf('审核通过')>0?'，请打印表单，并黏贴附件交财务部。':''}</Link>
        case 'PT'://付款
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/payment/${id}`})}>{content}{content.indexOf('审核通过')>0?'，请打印表单，并黏贴附件交财务部。':''}</a>;
        //<Link to={`/payment/${id}`}>{content}{content.indexOf('审核通过')>0?'，请打印表单，并黏贴附件交财务部。':''}</Link>
        case 'RT'://招聘
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/recruit/${id}`})}>{content}</a>;
        //<Link to={`/recruit/${id}`}>{content}</Link>
        case 'RE'://费用报销
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/reimburse/${id}`})}>{content}{content.indexOf('审核通过')>0?'，请打印表单，并黏贴附件交财务部。':''}</a>;
        //<Link to={`/reimburse/${id}`}>{content}{content.indexOf('审核通过')>0?'，请打印表单，并黏贴附件交财务部。':''}</Link>
        case 'BD'://预算
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/budget/${id}`})}>{content}{content.indexOf('审核通过')>0?'，请打印表单，并黏贴附件交财务部。':''}</a>;
        //<Link to={`/budget/${id}`}>{content}{content.indexOf('审核通过')>0?'，请打印表单，并黏贴附件交财务部。':''}</Link>
        case 'NE'://通知
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/notice/${id}`})}>{content}</a>;
        //<Link to={`/notice/${id}`}>{content}</Link>
        case 'LW'://外勤
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/legwork/${id}`})}>{content}</a>;
        //<Link to={`/legwork/${id}`}>{content}</Link>
        case 'AR'://广告费用报销
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/adReimburse/${id}`})}>{content}</a>;
        //<Link to={`/adReimburse/${id}`}>{content}</Link>
        case 'AD'://广告投放
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/ad/${id}`})}>{content}</a>;
        //<Link to={`/ad/${id}`}>{content}</Link>
        case 'SP'://促销活动支持
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/salesPromotion/${id}`})}>{content}</a>;
        //<Link to={`/salesPromotion/${id}`}>{content}</Link>
        case 'PX'://促销活动费用报销
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/promotionExpense/${id}`})}>{content}</a>;
        //<Link to={`/promotionExpense/${id}`}>{content}</Link>
        case 'SM'://样板房折扣申请
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/sampleRoom/${id}`})}>{content}</a>;
        //<Link to={`/sampleRoom/${id}`}>{content}</Link>
        case 'MG'://常规物料及礼品制作
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/materialGift/${id}`})}>{content}</a>;
        //<Link to={`/materialGift/${id}`}>{content}</Link>
        case 'TN'://常规物料及礼品制作
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/train/${id}`})}>{content}</a>;
        //<Link to={`/train/${id}`}>{content}</Link>
        case 'CD'://名片制作
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/card/${id}`})}>{content}</a>;
        //<Link to={`/card/${id}`}>{content}</Link>
        case 'SR'://售后问题处理
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/sampleReplace/${id}`})}>{content}</a>;
        //<Link to={`/sampleReplace/${id}`}>{content}</Link>
        case 'MS'://物料支持自助
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/materialSupport/${id}`})}>{content}</a>;
        //<Link to={`/materialSupport/${id}`}>{content}</Link>
        case 'OP'://开业支持
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/open/${id}`})}>{content}</a>;
        //<Link to={`/open/${id}`}>{content}</Link>
        case 'SU'://店面升级自助申请
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/shopUpgrade/${id}`})}>{content}</a>;
        //<Link to={`/shopUpgrade/${id}`}>{content}</Link>
        case 'RS'://店面装修补贴费用申请
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/renoSubsidy/${id}`})}>{content}</a>;
        //<Link to={`/renoSubsidy/${id}`}>{content}</Link>
        case 'SH'://建店申请
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/shop/${id}`})}>{content}</a>;
        case 'AC'://世嘉建店申请
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/segaApply/${id}`})}>{content}</a>;
        case 'SL'://印章使用申请
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/seal/${id}`})}>{content}</a>;
        //<Link to={`/seal/${id}`}>{content}</Link>
        case 'PP'://领料单
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/pick/${id}`})}>{content}</a>;
        //<Link to={`/pick/${id}`}>{content}</Link>
        case 'UO'://订单加急
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/urgentOrder/${id}`})}>{content}</a>;
        //<Link to={`/urgentOrder/${id}`}>{content}</Link>
        case 'BO'://借款申请
        return <a onClick={e=>handerMsgLinkClick(readFn,{sId:item.id,type:2,hideMsg:true},null,{pathname:`/borrow/${id}`})}>{content}</a>;
        //<Link to={`/borrow/${id}`}>{content}</Link>
      }
    }
    return '新消息';
  };

  const getWaitAction=(record,fromPath="/dashboard",onlyNeedUrl=false)=>{
    let _url=`taskId=${record.taskId}&busiId=${record.busiId}&from=${fromPath}&t=${Math.random()}`,
        text=record.state===-2?'返回完善资料':'退回修改',
        _code=record.busiCode.substr(0,2);
    const handerA=()=>{
      window.location.replace(`${window.location.origin}${window.location.pathname}#/purchase?${_url}`);
      window.location.reload();
    }
    if(_code==='UC' && record.state===-2){
      text='还车登记';
    }
    switch(record.state){
      case 1:
        if(_code==='PE'){
          // return <a  onClick={handerA} target="_self">办理</a>;
          return onlyNeedUrl?`/purchase?${_url}`:<Link to={`/purchase?${_url}`}>办理</Link>;
        }
        return onlyNeedUrl?`/waiting?homeTaskId=${record.taskId}&from=${fromPath}&t=${Math.random()}`:<Link to={`/waiting?homeTaskId=${record.taskId}&from=${fromPath}&t=${Math.random()}`}>办理</Link>;
      case -1:
      case -2:
      switch(_code){
        case 'MC':
        return onlyNeedUrl?`/missClock?${_url}`:<Link to={`/missClock?${_url}`}>{text}</Link>;
        case 'SC':
        return onlyNeedUrl?`/salaryChange?${_url}`:<Link to={`/salaryChange?${_url}`}>{text}</Link>;
        case 'LE':
        return onlyNeedUrl?`/leave?${_url}`:<Link to={`/leave?${_url}`}>{record.state===-2?'取消任务代理':'退回修改'}</Link>;
        case 'OT':
        return onlyNeedUrl?`/overtime?${_url}`:<Link to={`/overtime?${_url}`}>{text}</Link>;
        case 'TL':    
        return onlyNeedUrl?`/travel?${_url}`:<Link to={`/travel?${_url}`}>{record.state===-2?'取消任务代理':'退回修改'}</Link>;
        case 'TR':
        return onlyNeedUrl?`/travelReimburse?${_url}`:<Link to={`/travelReimburse?${_url}`}>{text}</Link>;
        case 'CT':  
        return onlyNeedUrl?`/contract?${_url}`:<Link to={`/contract?${_url}`}>{text}</Link>;
        case 'UC':
        return onlyNeedUrl?`/useCar?${_url}`:<Link to={`/useCar?${_url}`}>{text}</Link>;
        case 'PA':
        return onlyNeedUrl?`/purchaseApply?${_url}`:<Link to={`/purchaseApply?${_url}`}>{text}</Link>;
        case 'PE':
        return onlyNeedUrl?`/purchase?${_url}`:<Link to={`/purchase?${_url}`}>{text}</Link>;
        // return <a  onClick={handerA} target="_self">{text}</a>;
        case 'PT':
        return onlyNeedUrl?`/payment?${_url}`:<Link to={`/payment?${_url}`}>{text}</Link>;
        case 'RT':
        return onlyNeedUrl?`/recruit?${_url}`:<Link to={`/recruit?${_url}`}>{text}</Link>;
        case 'DN':
        return onlyNeedUrl?`/dimission?${_url}`:<Link to={`/dimission?${_url}`}>{text}</Link>;
        case 'RR':
        return onlyNeedUrl?`/regular?${_url}`:<Link to={`/regular?${_url}`}>{text}</Link>;
        case 'RE':
        return onlyNeedUrl?`/reimburse?${_url}`:<Link to={`/reimburse?${_url}`}>{text}</Link>;
        case 'BD':
        return onlyNeedUrl?`/budget?${_url}`:<Link to={`/budget?${_url}`}>{text}</Link>;
        case 'NE':
        return onlyNeedUrl?`/notice?${_url}`:<Link to={`/notice?${_url}`}>{text}</Link>;
        case 'LW':
        return onlyNeedUrl?`/legwork?${_url}`:<Link to={`/legwork?${_url}`}>{record.state===-2?'取消任务代理':'退回修改'}</Link>;
        case 'AR'://广告费用报销
        return onlyNeedUrl?`/adReimburse?${_url}`:<Link to={`/adReimburse?${_url}`}>{text}</Link>;
        case 'AD'://广告投放
        return onlyNeedUrl?`/ad?${_url}`:<Link to={`/ad?${_url}`}>{text}</Link>;
        case 'SP'://促销活动支持
        return onlyNeedUrl?`/salesPromotion?${_url}`:<Link to={`/salesPromotion?${_url}`}>{text}</Link>;
        case 'PX'://促销活动费用报销
        return onlyNeedUrl?`/promotionExpense?${_url}`:<Link to={`/promotionExpense?${_url}`}>{text}</Link>;
        case 'SM'://样板房折扣申请
        return onlyNeedUrl?`/sampleRoom?${_url}`:<Link to={`/sampleRoom?${_url}`}>{text}</Link>;
        case 'MG'://常规物料及礼品制作
        return onlyNeedUrl?`/materialGift?${_url}`:<Link to={`/materialGift?${_url}`}>{text}</Link>;
        case 'TN'://常规物料及礼品制作
        return onlyNeedUrl?`/train?${_url}`:<Link to={`/train?${_url}`}>{text}</Link>;
        case 'CD'://名片制作
        return onlyNeedUrl?`/card?${_url}`:<Link to={`/card?${_url}`}>{text}</Link>;
        case 'SR'://售后问题处理
        return onlyNeedUrl?`/sampleReplace?${_url}`:<Link to={`/sampleReplace?${_url}`}>{text}</Link>;
        case 'MS'://物料支持自助
        return onlyNeedUrl?`/materialSupport?${_url}`:<Link to={`/materialSupport?${_url}`}>{text}</Link>;
        case 'OP'://开业支持
        return onlyNeedUrl?`/open?${_url}`:<Link to={`/open?${_url}`}>{text}</Link>;
        case 'SU'://店面升级自助申请
        return onlyNeedUrl?`/shopUpgrade?${_url}`:<Link to={`/shopUpgrade?${_url}`}>{text}</Link>;
        case 'RS'://店面装修补贴费用申请
        return onlyNeedUrl?`/renoSubsidy?${_url}`:<Link to={`/renoSubsidy?${_url}`}>{text}</Link>;
        case 'SH'://建店申请
        return onlyNeedUrl?`/shop?${_url}`:<Link to={`/shop?${_url}`}>{text}</Link>;
        case 'AC'://世嘉建店申请
        return onlyNeedUrl?`/segaApply?${_url}`:<Link to={`/segaApply?${_url}`}>{text}</Link>;
        case 'SL'://印章使用申请
        return onlyNeedUrl?`/seal?${_url}`:<Link to={`/seal?${_url}`}>{text}</Link>;
        case 'PP'://领料单
        return onlyNeedUrl?`/pick?${_url}`:<Link to={`/pick?${_url}`}>{text}</Link>;
        case 'UO'://订单加急
        return onlyNeedUrl?`/urgentOrder?${_url}`:<Link to={`/urgentOrder?${_url}`}>{text}</Link>;
        case 'BO'://借款
        return onlyNeedUrl?`/borrow?${_url}`:<Link to={`/borrow?${_url}`}>{text}</Link>;
        default :
        return null;
      }
      default :
      return null
    }
  }
  const htmlAudio=()=>{
    var audio = new Audio('http://orrwj2lsc.bkt.clouddn.com/newmsg.mp3');
    audio.autoplay = true;
    audio.loop = false; //是否循环
    audio.play();
  }
  const antdNotice=(title,msg)=>{
    const key = `open${Date.now()}`;
    const btnClick = function () {
      notification.close(key);
      window.location.href=window.location.origin+window.location.pathname+'#/dashboard';
    };
    const btn = (
      <Button type="primary" size="small" onClick={btnClick}>
        查看
      </Button>
    );
    notification.open({
      message: title,
      description:msg,
      btn,
      key,
      icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
      duration:0,
    });
  }
  const showNotice=(title,msg,type='info')=>{
    var Notification = window.Notification || window.mozNotification || window.webkitNotification;
    if(Notification){
      Notification.requestPermission(function(status){
        //status默认值'default'等同于拒绝 'denied' 意味着用户不想要通知 'granted' 意味着用户同意启用通知
        if("granted" != status){
          return;
        }else{
          var tag = "sds"+Math.random();
          var notify = new Notification('',{
              dir:'ltr',
              lang:'zh-CN',
              tag:tag,//实例化的notification的id
              icon:'http://orrwj2lsc.bkt.clouddn.com/msg.png',
              // sound:'http://orrwj2lsc.bkt.clouddn.com/newmsg.mp3',
              //通知的缩略图,//icon 支持ico、png、jpg、jpeg格式
              body:'您有一条新的消息', //通知的具体内容
          });
          notify.onclick=function(){
            //如果通知消息被点击,通知窗口将被激活
            window.focus();
          };
          notify.onerror = function () {
            console.log("HTML5桌面消息出错！！！");
          };
          notify.onshow = function () {
            htmlAudio();
            setTimeout(function(){
              notify.close();
            }, 3000);
          };
          notify.onclose = function () {
            console.log("HTML5桌面消息关闭！！！");
            antdNotice(title,msg);
          };
        }
      });
    }else{
      console.error('您的浏览器不支持Notification');
      htmlAudio();
      antdNotice(title,msg);
    }
    
  };
  const getAuditerName=(commentList,nodeName)=>{
    if(!(commentList instanceof Array))
      return ''
    let cList=commentList.filter(c=>c.nodeName===nodeName);
    if(cList && !cList[0]){
      cList=commentList.filter(f=>f.nodeName.indexOf(nodeName)>-1);
    }
    return cList?cList[0]?cList[0].auditerName:'':'';
  }
  const getAuditerTime=(commentList,nodeName)=>{
    if(!commentList || (commentList && !commentList[0]))
      return ''
    let cList=commentList.filter(c=>c.nodeName===nodeName);
        cList=cList?cList[0]:null;
        return cList?cList.finishTime:'';
  }
  const getRecordState=(text,t=0)=>{
    //状态：0新建  1审核中 2审核通过 3审核不通过
    switch(text){
      case 0:
        return <Tag color=''>新建</Tag>;
      case 1:
        return <Tag color='#87d068'>审核中</Tag>;
      case 2:
        return <Tag color='#2db7f5'>审核通过</Tag>;
      case 3:
        return <Tag color='#f50'>审核不通过</Tag>;
      case -1:
        return <Tag color='#f00'>退回修改</Tag>;
      case -2:
        return t===1?<Tag color='#108ee9'>待销假</Tag>:<Tag color='#108ee9'>待完善资料</Tag>;
      case 4:
        return t===1?<Tag color='#2db7f5'>已销假</Tag>:<Tag color='#2db7f5'>审核通过并完善资料</Tag>;
      case 5:
        return <Tag color='#f00'>撤回申请</Tag>;
    }
  }
  const getTreeOrgNameById=(tree,id)=>{
    let name=null;
    function getArray(data,id){
      for (var i in data) {
        if (data[i].id == id) {
          name=data[i].orgName;
          break;
        } else {
          getArray(data[i].children, id);
        }
      }
    }
    getArray(tree,id);
    return name;
  }
  // 获取url中查询字符串
  const getQueryStringArgs=(str)=>{
    // 取得查询字符串并去掉开头的问号
    let qs=(str.length>0 && str.indexOf('?')>-1?str.substring((str.indexOf('?')+1)):""),
        // 保存数据的对象
        args={},
        // 取得每一项
        items=qs.length?qs.split("&"):[],
        item=null,
        name=null,
        value=null,
        i=0,
        len=items.length;
    if(!len){
      return null;
    }
    // 逐个将每一项添加到args对象中
    for(i=0;i<len;i++){
      item=items[i].split("=");
      name=decodeURIComponent(item[0]);
      value=decodeURIComponent(item[1]);
      if(name.length){
        args[name]=value;
      }
    }
    return args;
  }
  // 根据长度，截取字符显示
  const renderTooltips=(text,len)=>{
    if(!text){
      return '';
    }
    text=String(text);
    if(!len || (len && text.length<=len)){
      return text;
    }
    return <Tooltip title={text}>{text.substr(0,len)}...</Tooltip>
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
    getWaitAction,
    showNotice,
    getAuditerName,
    getAuditerTime,
    getDateDiff,
    getRecordState,
    getTreeOrgNameById,
    getQueryStringArgs,
    renderTooltips,
  }
