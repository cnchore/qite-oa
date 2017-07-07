let apiPrefix='/qite/sys',apiPrefixDev='/api/v1',apiPrefixPro='/qite/busi';

let baseURL=process.env.NODE_ENV === 'production'?'http://192.168.0.142:9000':'http://192.168.0.142:8000';

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
  bucket:process.env.NODE_ENV==='production'?'aihama-qite':'dc-test',
  api: {
    //userLogin: `${apiPrefixDev}/user/login`,
    //userLogout: `${apiPrefixDev}/user/logout`,
    //userInfo: `${apiPrefixDev}/userInfo`,
    //users: `${apiPrefixDev}/users`,
    //user: `${apiPrefixDev}/user/:id`,
    dashboard: `${apiPrefixDev}/dashboard`,
    //organization:`${apiPrefixDev}/setting/organization/:id`,
    //图片上传
    imgUpload:`${apiPrefix}/fileHandle/imgUpload`,
    //用户管理
    user:{
      login:`${apiPrefix}/user/login`,
      logout:`${apiPrefix}/user/loginOut`,
      userChange:`${apiPrefix}/user/change`,
      resetPwd:`${apiPrefix}/user/resetPwd`,
    },
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
    //知识库管理
    knowledge:{
      query:`${apiPrefixPro}/knowledge/getPage`,
      queryById:`${apiPrefixPro}/knowledge/getById`,
      getList:`${apiPrefixPro}/knowledge/getList`,
      add:`${apiPrefixPro}/knowledge/add`,
      update:`${apiPrefixPro}/knowledge/update`,
      change:`${apiPrefixPro}/knowledge/change`,
    },
    //考勤异常
    missClock:{
      query:`${apiPrefixPro}/missClock/getPage`,
      queryById:`${apiPrefixPro}/missClock/getById`,
      getList:`${apiPrefixPro}/missClock/getList`,
      save:`${apiPrefixPro}/missClock/save`,
    },
    //请假申请
    leave:{
      query:`${apiPrefixPro}/leave/getPage`,
      queryById:`${apiPrefixPro}/leave/getById`,
      getList:`${apiPrefixPro}/leave/getList`,
      save:`${apiPrefixPro}/leave/save`,
    },
    //加班申请
    overtime:{
      query:`${apiPrefixPro}/overtime/getPage`,
      queryById:`${apiPrefixPro}/overtime/getById`,
      getList:`${apiPrefixPro}/overtime/getList`,
      save:`${apiPrefixPro}/overtime/save`,
    },
    //出差申请
    travel:{
      query:`${apiPrefixPro}/travel/getPage`,
      queryById:`${apiPrefixPro}/travel/getById`,
      getList:`${apiPrefixPro}/travel/getList`,
      save:`${apiPrefixPro}/travel/save`,
    },
    //差旅费报销申请
    travelReimburse:{
      query:`${apiPrefixPro}/travelReimburse/getPage`,
      queryById:`${apiPrefixPro}/travelReimburse/getById`,
      getList:`${apiPrefixPro}/travelReimburse/getList`,
      save:`${apiPrefixPro}/travelReimburse/save`,
    },
    //合同申请
    contract:{
      query:`${apiPrefixPro}/contract/getPage`,
      queryById:`${apiPrefixPro}/contract/getById`,
      getList:`${apiPrefixPro}/contract/getList`,
      save:`${apiPrefixPro}/contract/save`,
    },
    //用车申请
    useCar:{
      query:`${apiPrefixPro}/useCar/getPage`,
      queryById:`${apiPrefixPro}/useCar/getById`,
      getList:`${apiPrefixPro}/useCar/getList`,
      save:`${apiPrefixPro}/useCar/save`,
    },
    //申购申请
    purchaseApply:{
      query:`${apiPrefixPro}/purchaseApply/getPage`,
      queryById:`${apiPrefixPro}/purchaseApply/getById`,
      getList:`${apiPrefixPro}/purchaseApply/getList`,
      save:`${apiPrefixPro}/purchaseApply/save`,
    },
    //采购申请
    purchase:{
      query:`${apiPrefixPro}/purchase/getPage`,
      queryById:`${apiPrefixPro}/purchase/getById`,
      getList:`${apiPrefixPro}/purchase/getList`,
      getApplyList:`${apiPrefixPro}/purchaseDetail/getList`,
      save:`${apiPrefixPro}/purchase/save`,
    },
    //付款申请
    payment:{
      query:`${apiPrefixPro}/payment/getPage`,
      queryById:`${apiPrefixPro}/payment/getById`,
      getList:`${apiPrefixPro}/payment/getList`,
      save:`${apiPrefixPro}/payment/save`,
    },
    //招聘申请
    recruit:{
      query:`${apiPrefixPro}/recruit/getPage`,
      queryById:`${apiPrefixPro}/recruit/getById`,
      getList:`${apiPrefixPro}/recruit/getList`,
      save:`${apiPrefixPro}/recruit/save`,
    },
    //离职申请
    dimission:{
      query:`${apiPrefixPro}/dimission/getPage`,
      queryById:`${apiPrefixPro}/dimission/getById`,
      getList:`${apiPrefixPro}/dimission/getList`,
      save:`${apiPrefixPro}/dimission/save`,
    },
    //转正申请
    regular:{
      query:`${apiPrefixPro}/regular/getPage`,
      queryById:`${apiPrefixPro}/regular/getById`,
      getList:`${apiPrefixPro}/regular/getList`,
      save:`${apiPrefixPro}/regular/save`,
    },
    //调薪申请
    salaryChange:{
      query:`${apiPrefixPro}/salaryChange/getPage`,
      queryById:`${apiPrefixPro}/salaryChange/getById`,
      getList:`${apiPrefixPro}/salaryChange/getList`,
      save:`${apiPrefixPro}/salaryChange/save`,
    },
    //费用报销申请
    reimburse:{
      query:`${apiPrefixPro}/reimburse/getPage`,
      queryById:`${apiPrefixPro}/reimburse/getById`,
      getList:`${apiPrefixPro}/reimburse/getList`,
      save:`${apiPrefixPro}/reimburse/save`,
    },
    //预算申请
    budget:{
      query:`${apiPrefixPro}/budget/getPage`,
      queryById:`${apiPrefixPro}/budget/getById`,
      getList:`${apiPrefixPro}/budget/getList`,
      save:`${apiPrefixPro}/budget/save`,
    },
    //通知发放申请
    notice:{
      query:`${apiPrefixPro}/notice/getPage`,
      queryById:`${apiPrefixPro}/notice/getById`,
      getList:`${apiPrefixPro}/notice/getList`,
      save:`${apiPrefixPro}/notice/save`,
    },
    
  },
}
