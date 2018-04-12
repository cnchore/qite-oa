import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './Bread.less';
import pathToRegexp from 'path-to-regexp';
import { queryArray,classnames } from '../../utils';
import FlowImgView from '../FlowImgView';
const Bread = ({ menu,darkTheme }) => {
  if(!menu){menu=[];}
  // 匹配当前路由
  let pathArray = []
  let current,code='',
  _hash=location.hash,
  _pathname=_hash?_hash.split('?')[0].substr(1):location.pathname;
  if(_hash && _hash.indexOf('#/report?')>-1){
    _pathname=_hash.split('&__t=')[0].substr(1);
  }else if(_hash && _hash.indexOf('#/notice?isMyNotice=true')>-1){
    _pathname='/notice?isMyNotice=true';
  }else if(_hash && _hash.indexOf('#/notice')>-1 && _hash.indexOf('?noComment=true')>-1){
    _pathname='/notice?isMyNotice=true';
  }else if(_hash && _hash.indexOf('#/knowledge?isMyKnowledge=true')>-1){
    _pathname='/knowledge?isMyKnowledge=true';
  }else if(_hash && _hash.indexOf('#/knowledge')>-1 && _hash.indexOf('?noComment=true')>-1){
    _pathname='/knowledge?isMyKnowledge=true';
  }
  
  for (let index in menu) {
    if (menu[index].router && pathToRegexp(menu[index].router).exec(_pathname)) {
      current = menu[index]
      break
    }
  }
  const getPathArray = (item) => {
    pathArray.unshift(item)
    if (item.bpid) {
      getPathArray(queryArray(menu, item.bpid, 'id'))
    }
  }

  if (!current) {
    pathArray.push(menu[0])
    pathArray.push({
      id: 404,
      name: 'Not Found',
    })
  } else {
    getPathArray(current)
  }
  if(_pathname!=='/dinnerBook' && pathArray && pathArray[0] && pathArray.filter(f=>f.name==='我的申请').length){

    let __pathName=pathArray.slice(-1)[0].router;
    // console.log(pathArray)
    let _code=__pathName.substr(1);
    code=`${_code.substr(0,1).toUpperCase()}${_code.substr(1)}`;
  }
  
  // 递归查找父级
  const breads = pathArray.map((item, key) => {
    const content = (
      <span>{item &&item.icon
          ? <i className={`iconfont ${item.icon}`} style={{ marginRight: 4 }}/>
          : ''}{item && item.name}</span>
    )
    return (
      <Breadcrumb.Item key={key}>
        {((pathArray.length - 1) !== key)
          ? <Link to={item && item.router}>
              {content}
          </Link>
          : content}
      </Breadcrumb.Item>
    )
  })

  return (
    <div className={classnames(styles.bread,{[styles.light]:darkTheme})}>
      <Breadcrumb>
        {breads}
      </Breadcrumb>
      {
        code?<FlowImgView code={code}/>:null
      }
    </div>
  )
}

Bread.propTypes = {
  menu: PropTypes.array,
}

export default Bread
