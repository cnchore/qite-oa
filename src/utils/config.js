let apiPrefix='/qite/sys',apiPrefixDev='/api/v1',apiPrefixPro='/qite/busi',apiPreLogi='/qite/logi';
let _websocketUrl='/qite/websocket/socketServer.do';

module.exports = {
  name: '伊蕾莎集团办公系统',
  prefix: 'qiteOa',
  footerText: '伊蕾莎集团 © 2017',
  logo: 'logo.png',
  logoThree:'3logo.png',
  iconFontCSS: 'iconfont.css',
  iconFontJS: 'iconfont.js',
  baseURL: function(){
    return window.location.origin;
  },
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: ['http://localhost:7000'],
  openPages: ['/login','/print'],
  apiPrefix: apiPrefixDev,
  bucket:process.env.NODE_ENV==='production'?'aihama-qite':'dc-test',
  websocketUrl:function(){
    var _url=new window.URL(window.location.origin);
    if(_url && _websocketUrl){
      _url.protocol=_url.protocol==="https:"?"wss:":"ws:";
      return _url.origin+_websocketUrl;
    }
    return '';
  },
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
      query:`${apiPrefix}/org/getTree?isDisable=false`,
      queryAll:`${apiPrefix}/org/getTree`,
      queryById:`${apiPrefix}/org/getById`,
      add:`${apiPrefix}/org/add`,
      update:`${apiPrefix}/org/update`,
      delete:`${apiPrefix}/org/deleteById`,
      change:`${apiPrefix}/org/change`,
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
    //外勤申请
    legwork:{
      query:`${apiPrefixPro}/legwork/getPage`,
      queryById:`${apiPrefixPro}/legwork/getById`,
      getList:`${apiPrefixPro}/legwork/getList`,
      save:`${apiPrefixPro}/legwork/save`,
      deleteById:`${apiPrefixPro}/legwork/deleteById`,
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
      storeInDetail:`${apiPrefixPro}/purchase/storeInDetail`,
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
    //报餐申请
    dinnerBook:{
      query:`${apiPreLogi}/dinnerBook/getPage`,
      queryById:`${apiPreLogi}/dinnerBook/getById`,
      getList:`${apiPreLogi}/dinnerBook/getList`,
      save:`${apiPreLogi}/dinnerBook/save`,
      getDinnerInfo:`${apiPreLogi}/dinnerBook/getDinnerInfo`,
      change:`${apiPreLogi}/dinnerBook/change`,
      isCanAdd:`${apiPreLogi}/dinnerBook/isCanAdd`,
    },
    //通知发放申请
    notice:{
      query:`${apiPrefixPro}/notice/getPage`,
      queryById:`${apiPrefixPro}/notice/getById`,
      getList:`${apiPrefixPro}/notice/getList`,
      save:`${apiPrefixPro}/notice/save`,
      deleteById:`${apiPrefixPro}/notice/deleteById`,
    },
    // 广告费用报销
    adReimburse:{
      query:`${apiPrefixPro}/adReimburse/getPage`,
      queryById:`${apiPrefixPro}/adReimburse/getById`,
      getList:`${apiPrefixPro}/adReimburse/getList`,
      save:`${apiPrefixPro}/adReimburse/save`,
      deleteById:`${apiPrefixPro}/adReimburse/deleteById`,
    },
    // 广告投放申请
    ad:{
      query:`${apiPrefixPro}/ad/getPage`,
      queryById:`${apiPrefixPro}/ad/getById`,
      getList:`${apiPrefixPro}/ad/getList`,
      save:`${apiPrefixPro}/ad/save`,
      deleteById:`${apiPrefixPro}/ad/deleteById`,
    },
    // 促销活动支持
    salesPromotion:{
      query:`${apiPrefixPro}/salesPromotion/getPage`,
      queryById:`${apiPrefixPro}/salesPromotion/getById`,
      getList:`${apiPrefixPro}/salesPromotion/getList`,
      save:`${apiPrefixPro}/salesPromotion/save`,
      deleteById:`${apiPrefixPro}/salesPromotion/deleteById`,
    },
    // 促销费用报销
    promotionExpense:{
      query:`${apiPrefixPro}/promotionExpense/getPage`,
      queryById:`${apiPrefixPro}/promotionExpense/getById`,
      getList:`${apiPrefixPro}/promotionExpense/getList`,
      save:`${apiPrefixPro}/promotionExpense/save`,
      deleteById:`${apiPrefixPro}/promotionExpense/deleteById`,
    },
    // 样板房折扣申请
    sampleRoom:{
      query:`${apiPrefixPro}/sampleRoom/getPage`,
      queryById:`${apiPrefixPro}/sampleRoom/getById`,
      getList:`${apiPrefixPro}/sampleRoom/getList`,
      save:`${apiPrefixPro}/sampleRoom/save`,
      deleteById:`${apiPrefixPro}/sampleRoom/deleteById`,
    },
    // 物料制作申请
    materialGift:{
      query:`${apiPrefixPro}/materialGift/getPage`,
      queryById:`${apiPrefixPro}/materialGift/getById`,
      getList:`${apiPrefixPro}/materialGift/getList`,
      save:`${apiPrefixPro}/materialGift/save`,
      deleteById:`${apiPrefixPro}/materialGift/deleteById`,
    },
    // 培训申请
    train:{
      query:`${apiPrefixPro}/train/getPage`,
      queryById:`${apiPrefixPro}/train/getById`,
      getList:`${apiPrefixPro}/train/getList`,
      save:`${apiPrefixPro}/train/save`,
      deleteById:`${apiPrefixPro}/train/deleteById`,
    },
    // 名片制作申请
    card:{
      query:`${apiPrefixPro}/card/getPage`,
      queryById:`${apiPrefixPro}/card/getById`,
      getList:`${apiPrefixPro}/card/getList`,
      save:`${apiPrefixPro}/card/save`,
      deleteById:`${apiPrefixPro}/card/deleteById`,
    },
    // 售后问题处理申请
    sampleReplace:{
      query:`${apiPrefixPro}/sampleReplace/getPage`,
      queryById:`${apiPrefixPro}/sampleReplace/getById`,
      getList:`${apiPrefixPro}/sampleReplace/getList`,
      save:`${apiPrefixPro}/sampleReplace/save`,
      deleteById:`${apiPrefixPro}/sampleReplace/deleteById`,
    },
    // 周报表发放申请

    // 物料支持自助申请
    materialSupport:{
      query:`${apiPrefixPro}/materialSupport/getPage`,
      queryById:`${apiPrefixPro}/materialSupport/getById`,
      getList:`${apiPrefixPro}/materialSupport/getList`,
      save:`${apiPrefixPro}/materialSupport/save`,
      deleteById:`${apiPrefixPro}/materialSupport/deleteById`,
    },
    // 开业支持申请
    open:{
      query:`${apiPrefixPro}/open/getPage`,
      queryById:`${apiPrefixPro}/open/getById`,
      getList:`${apiPrefixPro}/open/getList`,
      save:`${apiPrefixPro}/open/save`,
      deleteById:`${apiPrefixPro}/open/deleteById`,
    },
    // 店面升级申请
    shopUpgrade:{
      query:`${apiPrefixPro}/shopUpgrade/getPage`,
      queryById:`${apiPrefixPro}/shopUpgrade/getById`,
      getList:`${apiPrefixPro}/shopUpgrade/getList`,
      save:`${apiPrefixPro}/shopUpgrade/save`,
      deleteById:`${apiPrefixPro}/shopUpgrade/deleteById`,
    },
    // 装修补贴费用申请
    renoSubsidy:{
      query:`${apiPrefixPro}/renoSubsidy/getPage`,
      queryById:`${apiPrefixPro}/renoSubsidy/getById`,
      getList:`${apiPrefixPro}/renoSubsidy/getList`,
      save:`${apiPrefixPro}/renoSubsidy/save`,
      deleteById:`${apiPrefixPro}/renoSubsidy/deleteById`,
    },
    // 建店申请
    shop:{
      query:`${apiPrefixPro}/shop/getPage`,
      queryById:`${apiPrefixPro}/shop/getById`,
      getList:`${apiPrefixPro}/shop/getList`,
      save:`${apiPrefixPro}/shop/save`,
      deleteById:`${apiPrefixPro}/shop/deleteById`,
    },
    // 付款申请
    // ？
    // 办公用品申购
    // ？
    // 请假申请
    // ？
    // 外勤出差申请
    // ？
    // 增配申请
    // ？
    // 用章申请
    seal:{
      query:`${apiPrefixPro}/seal/getPage`,
      queryById:`${apiPrefixPro}/seal/getById`,
      getList:`${apiPrefixPro}/seal/getList`,
      save:`${apiPrefixPro}/seal/save`,
      deleteById:`${apiPrefixPro}/seal/deleteById`,
    },
    // 领料申请
    pick:{
      query:`${apiPrefixPro}/pick/getPage`,
      queryById:`${apiPrefixPro}/pick/getById`,
      getList:`${apiPrefixPro}/pick/getList`,
      save:`${apiPrefixPro}/pick/save`,
      deleteById:`${apiPrefixPro}/pick/deleteById`,
    },
    //公务车管理
    car:{
      query:`${apiPreLogi}/car/getPage`,
      getList:`${apiPreLogi}/car/getList`,
      getById:`${apiPreLogi}/car/getById`,
      save:`${apiPreLogi}/car/save`,
    },
    //公务车详情
    carDetail:{
      query:`${apiPreLogi}/carDetail/getPage`,
      getList:`${apiPreLogi}/carDetail/getList`,
      getById:`${apiPreLogi}/carDetail/getById`,
      save:`${apiPreLogi}/carDetail/save`,
      deleteById:`${apiPreLogi}/carDetail/deleteById`,
    },
    // 审批角色管理
    auditConfig:{
      query:`${apiPrefixPro}/auditConfig/getPage`,
      queryById:`${apiPrefixPro}/auditConfig/getById`,
      getList:`${apiPrefixPro}/auditConfig/getList`,
      add:`${apiPrefixPro}/auditConfig/add`,
      update:`${apiPrefixPro}/auditConfig/update`,
      saveUserAudit:`${apiPrefixPro}/auditConfig/saveUserAudit`,
      deleteById:`${apiPrefixPro}/auditConfig/deleteById`,
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
      getTaskListByBusinessKey:`${apiPrefixPro}/workflow/getTaskListByBusinessKey`,
      turnToDoTask:`${apiPrefixPro}/workflow/turnToDoTask`,
    },
  },
}
