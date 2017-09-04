import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Layout } from '../components'
import { classnames, config } from '../utils'
import { Helmet } from 'react-helmet'
import '../themes/index.less'
import './app.less'
import NProgress from 'nprogress'
import {BackTop} from 'antd'
import EditPwdModal from './editPwd'
const { prefix } = config

const { Header, Bread, Footer, Sider, styles } = Layout
let lastHref

const App = ({ children, location, dispatch, app, loading }) => {
  const { user,editPwdModal,menuList, siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys } = app
  const isDashboard=()=>{
    if(location.pathname==='/' || location.pathname==='/dashboard'){
      return true;
    }
    return false
  }
  const href = window.location.href
  // console.log(`user darkTheme:`,darkTheme)
  if (lastHref !== href) {
    NProgress.start()
    if (!loading.global) {
      NProgress.done()
      lastHref = href
    }
  }
  const editPwdProps={
    visible:editPwdModal,
    maskClosable:false,
    confirmLoading:loading.effects['app/editPwd'],
    title:'修改密码',
    onOk(data){
      dispatch({
        type:'app/editPwd',
        payload:data,
      })
    },
    onCancel(){
      dispatch({
        type:'app/hideEditPwdModal'
      })
    }
  }
  const headerProps = {
    menu:menuList,
    user,
    siderFold,
    location,
    isNavbar,
    darkTheme,
    isDashboard:isDashboard(),
    menuPopoverVisible,
    navOpenKeys,
    switchMenuPopover () {
      dispatch({ type: 'app/switchMenuPopver' })
    },
    logout () {
      dispatch({ type: 'app/logout' })
    },
    toEditPwd(){
      dispatch({type:'app/showEditPwdModal'})
    },
    switchSider () {
      dispatch({ type: 'app/switchSider' })
    },
    changeOpenKeys (openKeys) {
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
    changeTheme () {
      dispatch({ type: 'app/switchTheme' })
    },
  }

  const siderProps = {
    menu:menuList,
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeOpenKeys (openKeys) {
      localStorage.setItem(`${prefix}navOpenKeys`, JSON.stringify(openKeys))
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  }
  
  const breadProps = {
    menu:menuList,
    darkTheme:darkTheme && isDashboard()
  }
  const footerProps={
    darkTheme:darkTheme && isDashboard()
  }
  if (config.openPages && config.openPages.indexOf(location.pathname) > -1) {
    return <div>{children}</div>
  }

  const  { iconFontJS, iconFontCSS, logo, name } = config
  
  
  return (
    <div>
      <Helmet>
        <title>{name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={logo} type="image/x-icon" />
      
      </Helmet>
      <div className={classnames(styles.layout, { [styles.fold]: isNavbar ? false : siderFold }, { [styles.withnavbar]: isNavbar })}>
        {!isNavbar ? <aside className={classnames(styles.sider, { [styles.light]: darkTheme })}>
          <Sider {...siderProps} />
        </aside> : ''}
        <div className={classnames(styles.main,{[styles.light]:darkTheme && isDashboard()})} id="layout-main">
          <Header {...headerProps} className={darkTheme && isDashboard()?styles['header-light']:''}/>
          <Bread {...breadProps} location={location} />
          <div className={styles.container}>
            <div className={styles.content}>
              <BackTop target={()=>document.getElementById('layout-main')}>
                <div className="ant-back-top-inner">UP</div>
              </BackTop>
              {children}
            </div>
          </div>

          <Footer {...footerProps}/>
        </div>
      </div>
      {editPwdModal && <EditPwdModal {...editPwdProps} />}
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ app, loading }) => ({ app, loading }))(App)
