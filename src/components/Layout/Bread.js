import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb, Icon } from 'antd'
import { Link } from 'dva/router'
import styles from './Bread.less'
import pathToRegexp from 'path-to-regexp'
import { queryArray } from '../../utils'

const Bread = ({ menu }) => {
  // 匹配当前路由
  let pathArray = []
  let current,_pathname=location.hash?location.hash.split('?')[0].substr(1):location.pathname;
  if(location.hash && location.hash.indexOf('#/report?')>-1){
    _pathname=location.hash.split('&__t=')[0].substr(1);
  }else if(location.hash && location.hash.indexOf('#/notice?isMyNotice=true')>-1){
    _pathname='/notice?isMyNotice=true';
  }else if(location.hash && location.hash.indexOf('#/notice')>-1 && location.hash.indexOf('?noComment=true')>-1){
    _pathname='/notice?isMyNotice=true';
  }else if(location.hash && location.hash.indexOf('#/knowledge?isMyKnowledge=true')>-1){
    _pathname='/knowledge?isMyKnowledge=true';
  }else if(location.hash && location.hash.indexOf('#/knowledge')>-1 && location.hash.indexOf('?noComment=true')>-1){
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

  // 递归查找父级
  const breads = pathArray.map((item, key) => {
    const content = (
      <span>{item &&item.icon
          ? <Icon type={item.icon} style={{ marginRight: 4 }} />
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
    <div className={styles.bread}>
      <Breadcrumb>
        {breads}
      </Breadcrumb>
    </div>
  )
}

Bread.propTypes = {
  menu: PropTypes.array,
}

export default Bread
