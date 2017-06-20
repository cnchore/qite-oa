import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from './routes/app'

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
          path: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/dashboard'))
              cb(null, require('./routes/dashboard/'))
            }, 'dashboard')
          },
        /*
        }, {
          path: 'user',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/user'))
              cb(null, require('./routes/user/'))
            }, 'user')
          },
        }, {
          path: 'user/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/user/detail'))
              cb(null, require('./routes/user/detail/'))
            }, 'user-detail')
          },
        */
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
          path: 'login',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/login'))
              cb(null, require('./routes/login/'))
            }, 'login')
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

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
