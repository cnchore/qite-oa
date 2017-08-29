import React from 'react'
import styles from './Footer.less'
import { config,classnames } from '../../utils'

const Footer = ({darkTheme}) => <div className={classnames(styles.footer,{[styles.light]:darkTheme})}>
  {config.footerText}
</div>

export default Footer
