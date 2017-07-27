let apiPrefix='/qite/sys',apiPrefixDev='/api/v1',apiPrefixPro='/qite/busi';
let baseURL=process.env.NODE_ENV === 'production'?'http://test.aylsonclub.com':'http://192.168.0.142:8000';
//http://test.aylsonclub.com/qite/sys
//http://192.168.0.142:8000
//http://192.168.0.142:9000
//http://192.168.0.108:8080
module.exports = {
  name: '淇特办公系统',
  prefix: 'qiteOa',
  footerText: 'Aihama © 2017',
  logo: 'logo.png',
  iconFontCSS: 'iconfont.css',
  iconFontJS: 'iconfont.js',
  baseURL: baseURL,
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: ['http://localhost:7000'],
  openPages: ['/login'],
  apiPrefix: apiPrefixDev,
  bucket:process.env.NODE_ENV==='production'?'aihama-qite':'dc-test',
  api: {
    dashboard: `${apiPrefixDev}/dashboard`,
    //图片上传
    imgUpload:`${apiPrefix}/fileHandle/imgUpload`,
    //用户管理
    message:{
      getPage:`${apiPrefix}/message/getPage`,
    },
    user:{
      login:`${apiPrefix}/user/login`,
      logout:`${apiPrefix}/user/loginOut`,
      userChange:`${apiPrefix}/user/change`,
      resetPwd:`${apiPrefix}/user/resetPwd`,
      editPwd:`${apiPrefix}/user/editPwd`,
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
      getLoginUserMenu:`${apiPrefix}/menu/getLoginUserMenu`,
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
      deleteById:`${apiPrefixPro}/knowledge/deleteById`,
    },
    //考勤异常
    missClock:{
      query:`${apiPrefixPro}/missClock/getPage`,
      queryById:`${apiPrefixPro}/missClock/getById`,
      getList:`${apiPrefixPro}/missClock/getList`,
      save:`${apiPrefixPro}/missClock/save`,
      deleteById:`${apiPrefixPro}/missClock/deleteById`,
    },
    //请假申请
    leave:{
      query:`${apiPrefixPro}/leave/getPage`,
      queryById:`${apiPrefixPro}/leave/getById`,
      getList:`${apiPrefixPro}/leave/getList`,
      save:`${apiPrefixPro}/leave/save`,
      deleteById:`${apiPrefixPro}/leave/deleteById`,
    },
    //加班申请
    overtime:{
      query:`${apiPrefixPro}/overtime/getPage`,
      queryById:`${apiPrefixPro}/overtime/getById`,
      getList:`${apiPrefixPro}/overtime/getList`,
      save:`${apiPrefixPro}/overtime/save`,
      deleteById:`${apiPrefixPro}/overtime/deleteById`,
    },
    //出差申请
    travel:{
      query:`${apiPrefixPro}/travel/getPage`,
      queryById:`${apiPrefixPro}/travel/getById`,
      getList:`${apiPrefixPro}/travel/getList`,
      save:`${apiPrefixPro}/travel/save`,
      deleteById:`${apiPrefixPro}/travel/deleteById`,
    },
    //差旅费报销申请
    travelReimburse:{
      query:`${apiPrefixPro}/travelReimburse/getPage`,
      queryById:`${apiPrefixPro}/travelReimburse/getById`,
      getList:`${apiPrefixPro}/travelReimburse/getList`,
      save:`${apiPrefixPro}/travelReimburse/save`,
      deleteById:`${apiPrefixPro}/travelReimburse/deleteById`,
    },
    //合同申请
    contract:{
      query:`${apiPrefixPro}/contract/getPage`,
      queryById:`${apiPrefixPro}/contract/getById`,
      getList:`${apiPrefixPro}/contract/getList`,
      save:`${apiPrefixPro}/contract/save`,
      deleteById:`${apiPrefixPro}/contract/deleteById`,
    },
    //用车申请
    useCar:{
      query:`${apiPrefixPro}/useCar/getPage`,
      queryById:`${apiPrefixPro}/useCar/getById`,
      getList:`${apiPrefixPro}/useCar/getList`,
      save:`${apiPrefixPro}/useCar/save`,
      deleteById:`${apiPrefixPro}/useCar/deleteById`,
    },
    //申购申请
    purchaseApply:{
      query:`${apiPrefixPro}/purchaseApply/getPage`,
      queryById:`${apiPrefixPro}/purchaseApply/getById`,
      getList:`${apiPrefixPro}/purchaseApply/getList`,
      save:`${apiPrefixPro}/purchaseApply/save`,
      deleteById:`${apiPrefixPro}/purchaseApply/deleteById`,
    },
    //采购申请
    purchase:{
      query:`${apiPrefixPro}/purchase/getPage`,
      queryById:`${apiPrefixPro}/purchase/getById`,
      getList:`${apiPrefixPro}/purchase/getList`,
      getApplyList:`${apiPrefixPro}/purchaseDetail/getList`,
      save:`${apiPrefixPro}/purchase/save`,
      deleteById:`${apiPrefixPro}/purchase/deleteById`,
    },
    //付款申请
    payment:{
      query:`${apiPrefixPro}/payment/getPage`,
      queryById:`${apiPrefixPro}/payment/getById`,
      getList:`${apiPrefixPro}/payment/getList`,
      save:`${apiPrefixPro}/payment/save`,
      deleteById:`${apiPrefixPro}/payment/deleteById`,
    },
    //招聘申请
    recruit:{
      query:`${apiPrefixPro}/recruit/getPage`,
      queryById:`${apiPrefixPro}/recruit/getById`,
      getList:`${apiPrefixPro}/recruit/getList`,
      save:`${apiPrefixPro}/recruit/save`,
      deleteById:`${apiPrefixPro}/recruit/deleteById`,
    },
    //离职申请
    dimission:{
      query:`${apiPrefixPro}/dimission/getPage`,
      queryById:`${apiPrefixPro}/dimission/getById`,
      getList:`${apiPrefixPro}/dimission/getList`,
      save:`${apiPrefixPro}/dimission/save`,
      deleteById:`${apiPrefixPro}/dimission/deleteById`,
    },
    //转正申请
    regular:{
      query:`${apiPrefixPro}/regular/getPage`,
      queryById:`${apiPrefixPro}/regular/getById`,
      getList:`${apiPrefixPro}/regular/getList`,
      save:`${apiPrefixPro}/regular/save`,
      deleteById:`${apiPrefixPro}/regular/deleteById`,
    },
    //调薪申请
    salaryChange:{
      query:`${apiPrefixPro}/salaryChange/getPage`,
      queryById:`${apiPrefixPro}/salaryChange/getById`,
      getList:`${apiPrefixPro}/salaryChange/getList`,
      save:`${apiPrefixPro}/salaryChange/save`,
      deleteById:`${apiPrefixPro}/salaryChange/deleteById`,
    },
    //费用报销申请
    reimburse:{
      query:`${apiPrefixPro}/reimburse/getPage`,
      queryById:`${apiPrefixPro}/reimburse/getById`,
      getList:`${apiPrefixPro}/reimburse/getList`,
      save:`${apiPrefixPro}/reimburse/save`,
      deleteById:`${apiPrefixPro}/reimburse/deleteById`,
    },
    //预算申请
    budget:{
      query:`${apiPrefixPro}/budget/getPage`,
      queryById:`${apiPrefixPro}/budget/getById`,
      getList:`${apiPrefixPro}/budget/getList`,
      save:`${apiPrefixPro}/budget/save`,
      deleteById:`${apiPrefixPro}/budget/deleteById`,
    },
    //通知发放申请
    notice:{
      query:`${apiPrefixPro}/notice/getPage`,
      queryById:`${apiPrefixPro}/notice/getById`,
      getList:`${apiPrefixPro}/notice/getList`,
      save:`${apiPrefixPro}/notice/save`,
      deleteById:`${apiPrefixPro}/notice/deleteById`,
    },
    //流程处理
    workflow:{
      deploy:`${apiPrefixPro}/workflow/deploy`,
      getDeployPage:`${apiPrefixPro}/workflow/getDeployPage`,
      getPDPage:`${apiPrefixPro}/workflow/getPDPage`,
      getDiagramByDeployId:`${apiPrefixPro}/workflow/getDiagramByDeployId`,
      getDiagram:`${apiPrefixPro}/workflow/getDiagram`,
      startProcess:`${apiPrefixPro}/workflow/startProcess`,
      getMyTaskToDoPage:`${apiPrefixPro}/workflow/getMyTaskToDoPage`,
      getMyTaskDonePage:`${apiPrefixPro}/workflow/getMyTaskDonePage`,
      getTaskFiledPage:`${apiPrefixPro}/workflow/getTaskFiledPage`,
      getTaskInfo:`${apiPrefixPro}/workflow/getTaskInfo`,
      audit:`${apiPrefixPro}/workflow/audit`,
      getDiagramByBusiness:`${apiPrefixPro}/workflow/getDiagramByBusiness`,
      getCommentListBybusiness:`${apiPrefixPro}/workflow/getCommentListBybusiness`,
      getTaskWaitSignPage:`${apiPrefixPro}/workflow/getTaskWaitSignPage`,
      signTask:`${apiPrefixPro}/workflow/signTask`,
    },
  },
}
