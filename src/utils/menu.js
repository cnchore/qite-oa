module.exports = [
  {
    id: 1,
    icon: 'laptop',
    name: 'Dashboard',
    router: '/dashboard',
  },
  
  {
    id: 2,
    bpid: 1,
    name: '我的工作',
    icon: 'user',
  },
  {
    id: 21,
    mpid: 2,
    bpid: 2,
    name: '我的待办',
    router: '/waiting',
  },
  {
    id: 211,
    mpid: -1,
    bpid: 21,
    name: '详情',
    router: '/waiting/:id',
  },
  {
    id: 22,
    mpid: 2,
    bpid: 2,
    name: '我的已办',
    router: '/complete',
  },
  {
    id: 221,
    mpid: -1,
    bpid: 22,
    name: '详情',
    router: '/complete/:id',
  },
  {
    id: 23,
    mpid: 2,
    bpid: 2,
    name: '我的申请',
  },
  {
    id: 231,
    mpid: 23,
    bpid: 23,
    name: '考勤异常申请',
    router: '/missClock',
  },
  {
    id: 2311,
    mpid: -1,
    bpid: 231,
    name: '详情',
    router: '/missClock/:id',
  },
  {
    id: 232,
    mpid: 23,
    bpid: 23,
    name: '请假申请',
    router: '/leave',
  },
  {
    id: 2321,
    mpid: -1,
    bpid: 232,
    name: '详情',
    router: '/leave/:id',
  },
  {
    id: 233,
    mpid: 23,
    bpid: 23,
    name: '加班申请',
    router: '/overtime',
  },
  {
    id: 2331,
    mpid: -1,
    bpid: 233,
    name: '详情',
    router: '/overtime/:id',
  },
  {
    id: 234,
    mpid: 23,
    bpid: 23,
    name: '出差申请',
    router: '/travel',
  },
  {
    id: 2341,
    mpid: -1,
    bpid: 234,
    name: '详情',
    router: '/travel/:id',
  },
  {
    id: 235,
    mpid: 23,
    bpid: 23,
    name: '差旅费报销申请',
    router: '/travelReimburse',
  },
  {
    id: 2351,
    mpid: -1,
    bpid: 235,
    name: '详情',
    router: '/travelReimburse/:id',
  },
  {
    id: 236,
    mpid: 23,
    bpid: 23,
    name: '合同申请',
    router: '/contract',
  },
  {
    id: 2361,
    mpid: -1,
    bpid: 236,
    name: '详情',
    router: '/contract/:id',
  },
  {
    id: 237,
    mpid: 23,
    bpid: 23,
    name: '用车申请',
    router: '/useCar',
  },
  {
    id: 2371,
    mpid: -1,
    bpid: 237,
    name: '详情',
    router: '/useCar/:id',
  },
  
  {
    id: 238,
    mpid: 23,
    bpid: 23,
    name: '申购申请',
    router: '/purchaseApply',
  },
  {
    id: 2381,
    mpid: -1,
    bpid: 238,
    name: '详情',
    router: '/purchaseApply/:id',
  },
  {
    id: 239,
    mpid: 23,
    bpid: 23,
    name: '采购申请',
    router: '/purchase',
  },
  {
    id: 2391,
    mpid: -1,
    bpid: 239,
    name: '详情',
    router: '/purchase/:id',
  },
  {
    id: 240,
    mpid: 23,
    bpid: 23,
    name: '付款申请',
    router: '/payment',
  },
  {
    id: 2401,
    mpid: -1,
    bpid: 240,
    name: '详情',
    router: '/payment/:id',
  },
  {
    id: 241,
    mpid: 23,
    bpid: 23,
    name: '招聘申请',
    router: '/recruit',
  },
  {
    id: 2411,
    mpid: -1,
    bpid: 241,
    name: '详情',
    router: '/recruit/:id',
  },
  {
    id: 242,
    mpid: 23,
    bpid: 23,
    name: '离职申请',
    router: '/dimission',
  },
  {
    id: 2421,
    mpid: -1,
    bpid: 242,
    name: '详情',
    router: '/dimission/:id',
  },
  {
    id: 243,
    mpid: 23,
    bpid: 23,
    name: '转正申请',
    router: '/regular',
  },
  {
    id: 2431,
    mpid: -1,
    bpid: 243,
    name: '详情',
    router: '/regular/:id',
  },
  {
    id: 244,
    mpid: 23,
    bpid: 23,
    name: '调薪申请',
    router: '/salaryChange',
  },
  {
    id: 2441,
    mpid: -1,
    bpid: 244,
    name: '详情',
    router: '/salaryChange/:id',
  },
  {
    id: 245,
    mpid: 23,
    bpid: 23,
    name: '费用报销申请',
    router: '/reimburse',
  },
  {
    id: 2451,
    mpid: -1,
    bpid: 245,
    name: '详情',
    router: '/reimburse/:id',
  },
  {
    id: 246,
    mpid: 23,
    bpid: 23,
    name: '预算申请',
    router: '/budget',
  },
  {
    id: 2461,
    mpid: -1,
    bpid: 246,
    name: '详情',
    router: '/budget/:id',
  },
  {
    id: 247,
    mpid: 23,
    bpid: 23,
    name: '通知发放申请',
    router: '/notice',
  },
  {
    id: 2471,
    mpid: -1,
    bpid: 247,
    name: '详情',
    router: '/notice/:id',
  },
  {
    id: 24,
    mpid: 2,
    bpid: 2,
    name: '归档查询',
    router:'/filed',
  },
  {
    id: 241,
    mpid: -1,
    bpid: 24,
    name: '详情',
    router: '/filed/:id',
  },
  {
    id: 3,
    bpid: 1,/*面包屑parentId*/
    name: '知识库',
    icon: 'book',
    router: '/knowledge',
  },
  {
    id: 31,
    mpid: -1,/*菜单parentId*/
    bpid: 3,
    name: '详情',
    router: '/knowledge/:id',
  },
  {
    id: 6,
    bpid: 1,/*面包屑parentId*/
    name: '系统管理',
    icon: 'setting',
  },
  {
    id: 61,
    bpid: 6,
    mpid: 6,/*菜单parentId*/
    name: '组织机构',
    router: '/setting/organization',
  },
  {
    id: 62,
    bpid: 6,
    mpid: 6,
    name: '职位管理',
    router: '/setting/position',
  },
  {
    id: 63,
    bpid: 6,
    mpid: 6,
    name: '角色管理',
    router: '/setting/roles',
  },
  {
    id: 64,
    bpid: 6,
    mpid: 6,
    name: '菜单管理',
    router: '/setting/menu',
  },
  {
    id: 65,
    bpid: 6,
    mpid: 6,
    name: '权限管理',
    router: '/setting/auth',
  },
  {
    id: 66,
    bpid: 6,
    mpid: 6,
    name: '员工管理',
    router: '/setting/employee',
  },
  {
    id: 67,
    bpid: 6,
    mpid: 6,
    name: '数据字典',
    router: '/setting/dictionary',
  },
  {
    id: 68,
    bpid: 6,
    mpid: 6,
    name: '流程部署',
    router: '/setting/flowDeploy',
  },
]
/*
广告费用报销
adReimburse
广告投放申请
ad
促销活动支持
salesPromotion
促销费用报销?
promotionExpense
样板房折扣申请
sampleRoom
物料制作申请
materialGift
培训申请
train
名片制作申请
card
售后问题处理申请
sampleReplace
周报表发放申请
?
物料支持自助申请
materialSupport
开业支持申请
open
店面升级申请
shopUpgrade
装修补贴费用申请
renoSubsidy
建店申请
shop
付款申请
？
办公用品申购
？
请假申请
？
外勤出差申请
？
增配申请
？
用章申请
seal
领料申请
pick
*/