module.exports = [
  {
    id: 1,
    icon: 'laptop',
    name: 'Dashboard',
    router: '/dashboard',
  },
  {
    id: 2,
    bpid: 1,/*面包屑parentId*/
    name: '用户管理',
    icon: 'user',
    router: '/user',
  },
  {
    id: 21,
    mpid: -1,/*菜单parentId*/
    bpid: 2,
    name: 'User Detail',
    router: '/user/:id',
  },
  
  {
    id: 6,
    bpid: 1,
    name: '系统管理',
    icon: 'setting',
  },
  {
    id: 61,
    bpid: 6,
    mpid: 6,
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
    name: '人员管理',
    router: '/setting/user',
  },
  {
    id: 67,
    bpid: 6,
    mpid: 6,
    name: '数据字典',
    router: '/setting/dictionary',
  },
]
