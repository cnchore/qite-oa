import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
// import CountUp from 'react-countup'
import styles from './userInfo.less'
import profle from '../../../../assets/profle.png'
function UserInfo ({ photo, orgName, realName }) {
  return (
    <Card className={styles.userInfo} bordered={false} bodyStyle={{ padding: 0, }}>
      <img className={styles.photo} src={photo || profle} alt={realName} />
      <div className={styles.content}>
        <p className={styles.title}>{orgName || '未知部门'}
          <span className={styles.realName}>{realName}</span>
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
