# Antd Admin

-  基于react，ant-desing，dva，mock，使用roadhog本地调试和构建，浅度响应式设计。

## 特性

-   基于[react](https://github.com/facebook/react)，[ant-design](https://github.com/ant-design/ant-design)，[dva](https://github.com/dvajs/dva)，[Mock](https://github.com/nuysoft/Mock) 企业级后台管理系统最佳实践。
-   基于Antd UI 设计语言，提供后台管理系统常见使用场景。
-   基于[dva](https://github.com/dvajs/dva)动态加载 Model 和路由，按需加载。
-   使用[roadhog](https://github.com/sorrycc/roadhog)本地调试和构建，其中Mock功能实现脱离后端独立开发。
-   浅度响应式设计。


## 开发构建

### 目录结构

```bash
├── /dist/           # 项目输出目录
├── /src/            # 项目源码目录
│ ├── /components/   # UI组件及UI相关方法
│ │ ├── skin.less    # 全局样式
│ │ └── vars.less    # 全局样式变量
│ ├── /routes/       # 路由组件
│ │ └── app.js       # 路由入口
│ ├── /models/       # 数据模型
│ ├── /services/     # 数据接口
│ ├── /themes/       # 项目样式
│ ├── /mock/         # 数据mock
│ ├── /utils/        # 工具函数
│ │ ├── config.js    # 项目常规配置
│ │ ├── menu.js      # 菜单及面包屑配置
│ │ ├── config.js    # 项目常规配置
│ │ ├── request.js   # 异步请求函数
│ │ └── theme.js     # 项目需要在js中使用到样式变量
│ ├── route.js       # 路由配置
│ ├── index.js       # 入口文件
│ └── index.html     
├── package.json     # 项目信息
├── .eslintrc        # Eslint配置
└── .roadhogrc.js    # roadhog配置
```

文件夹命名说明:

-   components：组件（方法）为单位以文件夹保存，文件夹名组件首字母大写（如`DataTable`），方法首字母小写（如`layer`）,文件夹内主文件与文件夹同名，多文件以`index.js`导出对象（如`./src/components/Layout`）。
-   routes：页面为单位以文件夹保存，文件夹名首字母小写（特殊除外，如`UIElement`）,文件夹内主文件以`index.js`导出，多文件时可建立`components`文件夹（如`./src/routes/dashboard`），如果有子路由，依次按照路由层次建立文件夹（如`./src/routes/UIElement`）。

### 快速开始

开发：

```bash
npm run dev
打开 http://localhost:8000
```

构建：

```bash
npm run build

将会生成dist目录
```

代码检测：

```bash
npm run lint
```
### 更新日志

#### 2017-6-27

1. 我的申请－考勤异常申请页面展示优化

#### 2017-6-26

1. 优化知识库展示
2. 我的申请-考勤异常申请，页面实现，增加、修改，查看后台接口对接

#### 2017-6-23

1. FileList 组件封装；
2. 知识库管理－查看详情；

#### 2017-6-22

1. 文件上传组件封装；

#### 2017-6-21

1. 知识库管理－页面和功能实现：列表展示，发布、下架，富文本编辑，新增、修改；

#### 2017-6-20

1. 系统管理－员工管理，启用／禁用，密码重置；
2. 系统管理－用户管理，用户登录／注销；
3. 系统管理－权限设置，用户角色绑定；
4. 系统管理－构建局域网测试环境；

#### 2017-6-19

1. 系统管理－员工管理，新增，修改，多职位选择，折叠，头像；

#### 2017-6-16

1. 系统管理－权限管理，页面，后台接口对接；
2. 系统管理－人员管理，页面，后台接口对接；

#### 2017-6-15

1. 系统管理－角色管理，后台接口对接；
2. 系统管理－菜单管理，页面，接口对接；

#### 2017-6-14

1. 系统管理－职位管理，页面，后台接口对接；
2. 系统管理－角色管理，页面

#### 2017-6-13

1. 系统管理－数据字典，后台接口对接；
2. 后台接口qite路径，设置代理；

#### 2017-6-12

1. 系统管理－组织机构后台接口对接；
2. 用户登录、退出－接口对接；

#### 2017-6-8

1. 添加系统管理－组织机构优化方法
1). treeToArray;
2). arrayToTree;

#### 2017-6-8

1. 添加系统管理－组织机构

#### 2017-6-7

1. TreeTable父子递归选择实现；
 

#### 2017-6-6

1. 添加BackTop公共方法；
2. TreeTable父子递归选择实现摸索；

#### 2017-6-5

1. 添加treeTable
2. build优化：取消mock,.roadhog.mock设置即可；

#### 2017-6-2

1. build优化：添加webpack，使用户hash打包文件名

#### 2017-6-1

1. 修复dva的Warning：Accessing PropTypes via the main React package is deprecated. Use the prop-types package from npm instead.（指定react版本为15.0.0）

2. 修复dva的Warning：AnimateChild: React.createClass is deprecated and will be removed in version 16. Use plain JavaScript classes instead. If you're not yet ready to migrate, create-react-class is available on npm as a drop-in replacement.（指定react-router版本为4.4.1）
