import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
// import CountUp from 'react-countup'
import styles from './userInfo.less'
import profle from '../../../../assets/profle.png'
import { classnames,getTheme } from '../../../utils'

function UserInfo ({ photo, orgName, realName }) {

  return (
    <Card className={classnames(styles.userInfo,{[styles.light]:getTheme()})} bordered={false} bodyStyle={{ padding: 0, }}>
      <img className={styles.photo} src={photo || profle} alt={realName} />
      <div className={styles.content}>
        <p className={styles.realName}>{realName}</p>
        <p className={styles.title}>{orgName || '未知部门'}
        </p>
        
      </div>
    </Card>
  )
}

UserInfo.propTypes = {
  photo: PropTypes.string,
  orgName: PropTypes.string,
  realName: PropTypes.string,
}

export default UserInfo
