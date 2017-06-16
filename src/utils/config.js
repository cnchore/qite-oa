let apiPrefix='/qite/sys',apiPrefixDev='/api/v1';

let baseURL=process.env.NODE_ENV === 'production'?'http://localhost:9000':'http://localhost:8000';

//http://test.aylsonclub.com/qite/sys


module.exports = {
  name: 'Qite OA',
  prefix: 'qiteOa',
  footerText: 'Aihama © 2017',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  baseURL: baseURL,
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: ['http://localhost:7000'],
  openPages: ['/login'],
  apiPrefix: apiPrefixDev,
  api: {
    userLogin: `${apiPrefixDev}/user/login`,
    userLogout: `${apiPrefixDev}/user/logout`,
    userInfo: `${apiPrefixDev}/userInfo`,
    users: `${apiPrefixDev}/users`,
    user: `${apiPrefixDev}/user/:id`,
    dashboard: `${apiPrefixDev}/dashboard`,
    organization:`${apiPrefixDev}/setting/organization/:id`,
    //组织机构
    organizations:{
      query:`${apiPrefix}/org/getTree`,
      queryById:`${apiPrefix}/org/getById`,
      add:`${apiPrefix}/org/add`,
      update:`${apiPrefix}/org/update`,
      delete:`${apiPrefix}/org/deleteById`,
    },
    //数据字典
    dictionary:{
      query:`${apiPrefix}/dictionary/getTree`,
      queryById:`${apiPrefix}/dictionary/getById`,
      getList:`${apiPrefix}/dictionary/getList`,
      add:`${apiPrefix}/dictionary/add`,
      update:`${apiPrefix}/dictionary/update`,
      delete:`${apiPrefix}/dictionary/deleteById`,
    },
    //职位管理
    position:{
      query:`${apiPrefix}/position/getPage`,
      queryById:`${apiPrefix}/position/getById`,
      getList:`${apiPrefix}/position/getList`,
      add:`${apiPrefix}/position/add`,
      update:`${apiPrefix}/position/update`,
      delete:`${apiPrefix}/position/deleteById`,
    },
    //角色管理
    roles:{
      query:`${apiPrefix}/role/getPage`,
      queryById:`${apiPrefix}/role/getById`,
      getList:`${apiPrefix}/role/getList`,
      add:`${apiPrefix}/role/add`,
      update:`${apiPrefix}/role/update`,
      delete:`${apiPrefix}/role/deleteById`,
    },
    //菜单管理
    menu:{
      query:`${apiPrefix}/menu/getTree`,
      queryById:`${apiPrefix}/menu/getById`,
      getList:`${apiPrefix}/menu/getList`,
      add:`${apiPrefix}/menu/add`,
      update:`${apiPrefix}/menu/update`,
      delete:`${apiPrefix}/menu/deleteById`,
    },
    //权限管理
    auth:{
      menuRole:`${apiPrefix}/auth/saveRoleMenu`,
      userRole:`${apiPrefix}/auth/saveUserRole`,
    },
    //人员管理
    employee:{
      query:`${apiPrefix}/employee/getPage`,
      queryById:`${apiPrefix}/employee/getById`,
      getList:`${apiPrefix}/employee/getList`,
      add:`${apiPrefix}/employee/add`,
      update:`${apiPrefix}/employee/update`,
      delete:`${apiPrefix}/employee/deleteById`,
    },
  },
}
