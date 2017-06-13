let apiPrefix='/qite/sys',apiPrefixDev='/api/v1';

let baseURL=process.env.NODE_ENV === 'production'?'http://localhost:9000':'http://localhost:8000';

//http://test.aylsonclub.com/qite/sys


module.exports = {
  name: 'Qite OA',
  prefix: 'qiteOa',
  footerText: 'Aihama OA © 2017',
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
    dictionary:{
      query:`${apiPrefix}/dictionary/getTree`,
      queryById:`${apiPrefix}/dictionary/getById`,
      add:`${apiPrefix}/dictionary/add`,
      update:`${apiPrefix}/dictionary/update`,
      delete:`${apiPrefix}/dictionary/deleteById`,
    },
  },
}
