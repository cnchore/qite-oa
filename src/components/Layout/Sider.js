import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Switch } from 'antd'
import styles from './Layout.less'
import { config } from '../../utils'
import Menus from './Menu'
import { Link } from 'dva/router'

const Sider = ({ siderFold, darkTheme, location, navOpenKeys, changeOpenKeys, menu }) => {
  const menusProps = {
    menu,
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeOpenKeys,
  }
        // {siderFold ? '' : <span>{config.name}</span>}
  return (
    <div>
      {
        !darkTheme?
          <Link className={styles.logo} to="/">
            <img alt={'logo'} src={config.logo} />
          </Link>
        :<div style={{height:'47px'}}></div>
      }
      <Menus {...menusProps} />
      
    </div>
  )
}

Sider.propTypes = {
  menu: PropTypes.array,
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool,
  location: PropTypes.object,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default Sider
