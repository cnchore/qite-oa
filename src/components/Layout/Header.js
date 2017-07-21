import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Popover } from 'antd'
import styles from './Header.less'
import Menus from './Menu'

const SubMenu = Menu.SubMenu

const Header = ({ user, logout,toEditPwd, switchSider, siderFold, isNavbar, menuPopoverVisible, location, switchMenuPopover, navOpenKeys, changeOpenKeys, menu }) => {
  let handleClickMenu = e => e.key === 'logout'?logout():e.key==='editPwd'?toEditPwd():null
  const menusProps = {
    menu,
    siderFold: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location,
    navOpenKeys,
    changeOpenKeys,
  }
  return (
    <div className={styles.header}>
      {isNavbar
        ? <Popover placement="bottomLeft" onVisibleChange={switchMenuPopover} visible={menuPopoverVisible} 
          overlayClassName={styles.popovermenu} trigger="click" content={<Menus {...menusProps} />}>
            <div className={styles.button}>
              <Icon type="bars" />
            </div>
          </Popover>
        : <div className={styles.button} onClick={switchSider}>
            <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
          </div>
      }
      <div className={styles.rightWarpper}>
        <div className={styles.button}>
          <Icon type="bell" />
        </div>
        <Menu mode="horizontal" onClick={handleClickMenu}>
          <SubMenu mode="vertaical" style={{
            float: 'right',
          }} title={
            <span> 
              <Icon type="user" />
              {user.userName} 
            </span>
            }
          >
            <Menu.Item key="editPwd">
              <Icon type="lock" />修改密码
            </Menu.Item>
            <Menu.Item key="logout">
              <Icon type="logout" />注销
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </div>
  )
}

Header.propTypes = {
  menu: PropTypes.array,
  user: PropTypes.object,
  logout: PropTypes.func,
  toEditPwd:PropTypes.func,
  switchSider: PropTypes.func,
  siderFold: PropTypes.bool,
  isNavbar: PropTypes.bool,
  menuPopoverVisible: PropTypes.bool,
  location: PropTypes.object,
  switchMenuPopover: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default Header
