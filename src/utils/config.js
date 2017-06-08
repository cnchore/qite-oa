let baseURL='http://localhost:8000/api/v1';
if (process.env.NODE_ENV === 'production'){
  baseURL='http://localhost:9000/api/v1'
}
module.exports = {
  name: 'Aylson OA',
  prefix: 'aylsonOa',
  footerText: 'Aylson OA © 2017',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  baseURL: baseURL,
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: ['http://localhost:7000'],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  api: {
    userLogin: '/user/login',
    userLogout: '/user/logout',
    userInfo: '/userInfo',
    users: '/users',
    user: '/user/:id',
    dashboard: '/dashboard',
    organization:'/setting/organization/:id',
  },
}
