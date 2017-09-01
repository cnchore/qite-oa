import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from './routes/app'
import { config } from './utils'
const { prefix } = config
const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/dashboard'))
          cb(null, { component: require('./routes/dashboard/') })
        }, 'dashboard')
      },
      childRoutes: [
        {
          path: '/dashboard',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/dashboard'))
              cb(null, require('./routes/dashboard/'))
            }, 'dashboard')
          },
        
        }, {
          path: '/setting/organization',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/organization'))
              cb(null, require('./routes/organization/'))
            }, 'setting-organization')
          },
        }, {
          path: '/setting/dictionary',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/dictionary'))
              cb(null, require('./routes/dictionary/'))
            }, 'setting-dictionary')
          },
        }, {
          path: '/setting/position',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/position'))
              cb(null, require('./routes/position/'))
            }, 'setting-position')
          },
        }, {
          path: '/setting/roles',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/roles'))
              cb(null, require('./routes/roles/'))
            }, 'setting-roles')
          },
        }, {
          path: '/setting/menu',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/menu'))
              cb(null, require('./routes/menu/'))
            }, 'setting-menu')
          },
        }, {
          path: '/setting/auth',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/auth'))
              cb(null, require('./routes/auth/'))
            }, 'setting-auth')
          },
        }, {
          path: '/setting/employee',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/employee'))
              cb(null, require('./routes/employee/'))
            }, 'setting-employee')
          },
        }, {
          path: '/setting/flowDeploy',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/flowDeploy'))
              cb(null, require('./routes/flowDeploy/'))
            }, 'setting-flowDeploy')
          },
        }, {
          path: '/knowledge',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/knowledge'))
              cb(null, require('./routes/knowledge/'))
            }, 'knowledge')
          },
        }, {
          path: 'knowledge/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/knowledge/detail'))
              cb(null, require('./routes/knowledge/detail/'))
            }, 'knowledge-detail')
          },
        }, {
          path: '/missClock',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/missClock'))
              cb(null, require('./routes/missClock/'))
            }, 'missClock')
          },
        }, {
          path: '/missClock/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/missClock/detail'))
              cb(null, require('./routes/missClock/detail/'))
            }, 'missClock-detail')
          },
        }, {
          path: '/leave',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/leave'))
              cb(null, require('./routes/leave/'))
            }, 'leave')
          },
        }, {
          path: 'leave/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/leave/detail'))
              cb(null, require('./routes/leave/detail/'))
            }, 'leave-detail')
          },
        }, {
          path: '/overtime',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/overtime'))
              cb(null, require('./routes/overtime/'))
            }, 'overtime')
          },
        }, {
          path: 'overtime/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/overtime/detail'))
              cb(null, require('./routes/overtime/detail/'))
            }, 'overtime-detail')
          },
        }, {
          path: '/travel',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/travel'))
              cb(null, require('./routes/travel/'))
            }, 'travel')
          },
        }, {
          path: 'travel/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/travel/detail'))
              cb(null, require('./routes/travel/detail/'))
            }, 'travel-detail')
          },
        }, {
          path: '/legwork',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/legwork'))
              cb(null, require('./routes/legwork/'))
            }, 'legwork')
          },
        }, {
          path: 'legwork/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/legwork/detail'))
              cb(null, require('./routes/legwork/detail/'))
            }, 'legwork-detail')
          },
        }, {
          path: '/travelReimburse',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/travelReimburse'))
              cb(null, require('./routes/travelReimburse/'))
            }, 'travelReimburse')
          },
        }, {
          path: 'travelReimburse/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/travelReimburse/detail'))
              cb(null, require('./routes/travelReimburse/detail/'))
            }, 'travelReimburse-detail')
          },
        }, {
          path: '/contract',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/contract'))
              cb(null, require('./routes/contract/'))
            }, 'contract')
          },
        }, {
          path: 'contract/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/contract/detail'))
              cb(null, require('./routes/contract/detail/'))
            }, 'contract-detail')
          },
        }, {
          path: '/useCar',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/useCar'))
              cb(null, require('./routes/useCar/'))
            }, 'useCar')
          },
        }, {
          path: 'useCar/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/useCar/detail'))
              cb(null, require('./routes/useCar/detail/'))
            }, 'useCar-detail')
          },
        }, {
          path: '/purchaseApply',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/purchaseApply'))
              cb(null, require('./routes/purchaseApply/'))
            }, 'purchaseApply')
          },
        }, {
          path: 'purchaseApply/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/purchaseApply/detail'))
              cb(null, require('./routes/purchaseApply/detail/'))
            }, 'purchaseApply-detail')
          },
        }, {
          path: '/purchase',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/purchase'))
              cb(null, require('./routes/purchase/'))
            }, 'purchase')
          },
        }, {
          path: 'purchase/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/purchase/detail'))
              cb(null, require('./routes/purchase/detail/'))
            }, 'purchase-detail')
          },
        }, {
          path: '/payment',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/payment'))
              cb(null, require('./routes/payment/'))
            }, 'payment')
          },
        }, {
          path: 'payment/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/payment/detail'))
              cb(null, require('./routes/payment/detail/'))
            }, 'payment-detail')
          },
        }, {
          path: '/recruit',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/recruit'))
              cb(null, require('./routes/recruit/'))
            }, 'recruit')
          },
        }, {
          path: 'recruit/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/recruit/detail'))
              cb(null, require('./routes/recruit/detail/'))
            }, 'recruit-detail')
          },
        }, {
          path: '/dimission',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/dimission'))
              cb(null, require('./routes/dimission/'))
            }, 'dimission')
          },
        }, {
          path: 'dimission/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/dimission/detail'))
              cb(null, require('./routes/dimission/detail/'))
            }, 'dimission-detail')
          },
        }, {
          path: '/regular',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/regular'))
              cb(null, require('./routes/regular/'))
            }, 'regular')
          },
        }, {
          path: 'regular/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/regular/detail'))
              cb(null, require('./routes/regular/detail/'))
            }, 'regular-detail')
          },
        }, {
          path: '/salaryChange',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/salaryChange'))
              cb(null, require('./routes/salaryChange/'))
            }, 'salaryChange')
          },
        }, {
          path: 'salaryChange/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/salaryChange/detail'))
              cb(null, require('./routes/salaryChange/detail/'))
            }, 'salaryChange-detail')
          },
        }, {
          path: '/reimburse',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/reimburse'))
              cb(null, require('./routes/reimburse/'))
            }, 'reimburse')
          },
        }, {
          path: 'reimburse/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/reimburse/detail'))
              cb(null, require('./routes/reimburse/detail/'))
            }, 'reimburse-detail')
          },
        }, {
          path: '/budget',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/budget'))
              cb(null, require('./routes/budget/'))
            }, 'budget')
          },
        }, {
          path: 'budget/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/budget/detail'))
              cb(null, require('./routes/budget/detail/'))
            }, 'budget-detail')
          },
        }, {
          path: '/notice',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/notice'))
              cb(null, require('./routes/notice/'))
            }, 'notice')
          },
        }, {
          path: 'notice/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/notice/detail'))
              cb(null, require('./routes/notice/detail/'))
            }, 'notice-detail')
          },
        }, {
          path: '/waiting',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/waiting'))
              cb(null, require('./routes/waiting/'))
            }, 'waiting')
          },
        }, {
          path: 'waiting/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/waiting/detail'))
              cb(null, require('./routes/waiting/detail/'))
            }, 'waiting-detail')
          },
        }, {
          path: '/complete',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/complete'))
              cb(null, require('./routes/complete/'))
            }, 'complete')
          },
        }, {
          path: 'complete/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/complete/detail'))
              cb(null, require('./routes/complete/detail/'))
            }, 'complete-detail')
          },
        }, {
          path: '/filed',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/filed'))
              cb(null, require('./routes/filed/'))
            }, 'filed')
          },
        }, {
          path: 'filed/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/filed/detail'))
              cb(null, require('./routes/filed/detail/'))
            }, 'filed-detail')
          },
        }, {
          path: '/waitSign',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/waitSign'))
              cb(null, require('./routes/waitSign/'))
            }, 'waitSign')
          },
        }, {
          path: 'waitSign/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/waitSign/detail'))
              cb(null, require('./routes/waitSign/detail/'))
            }, 'waitSign-detail')
          },
        }, {
          path: '/storage',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/storage'))
              cb(null, require('./routes/storage/'))
            }, 'storage')
          },
        }, {
          path: 'storage/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/storage/detail'))
              cb(null, require('./routes/storage/detail/'))
            }, 'storage-detail')
          },
        }, {
          path: '/login',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/login'))
              cb(null, require('./routes/login/'))
            }, 'login')
          },
        }, {
          path: '/report',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/report/'))
            }, 'report')
          },
        },{
          path: '/print',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/print/'))
            }, 'print')
          },
        }, {
          path: '/temppage',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/temppage/'))
            }, 'temppage')
          },
        }, {
          path: '*',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error/'))
            }, 'error')
          },
        },
      ],
    },
  ]
 
  history.listen(location=>{
    const {query,search,pathname}=location;
    if(!search || search.indexOf('__t=')===-1){
      let _search=search;
      _search+=search?'&__t=':'?__t=';
      _search+=Date.now();
      // console.log('_pathname:',pathname,_search)
      history.replace(`${pathname}${_search}`)
      return;
    }
    // console.log('history listen:',location)
    const userInfo = JSON.parse(sessionStorage.getItem(`${prefix}userInfo`));
    if (!userInfo || (userInfo && !userInfo.data)) {
      if(pathname!=='/login'){
        console.log('no login');
        history.replace(`/login?from=${pathname}${search}`)
        return;
      }
    }
  })
  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
