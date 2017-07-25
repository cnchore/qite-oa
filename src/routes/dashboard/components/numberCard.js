import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Card,Tooltip } from 'antd'
import CountUp from 'react-countup'
import styles from './numberCard.less'
import { Link } from 'dva/router'

function NumberCard ({ icon, color, title, number,linkto,desc, countUp }) {
  return (
    <Card className={styles.numberCard} bordered={false} bodyStyle={{ padding: 0 }}>
      {
        desc?
        <Tooltip placement="topLeft" title={desc}>
          <Icon className={styles.iconWarp} style={{ color }} type={icon} />
        </Tooltip>
        : <Icon className={styles.iconWarp} style={{ color }} type={icon} />
      }
      
      <div className={styles.content}>
        {
          desc?
          <Tooltip placement="topRight" title={desc}>
            <p className={styles.title}>{title || 'No Title'}</p>
          </Tooltip>
          :<p className={styles.title}>{title || 'No Title'}</p>
        }
        
        <p className={styles.number}>
          <Link to={ linkto || '#'}>
            <CountUp
              start={0}
              end={number}
              duration={2.75}
              useEasing
              useGrouping
              separator=","
              {...countUp || {}}
            />
          </Link>
        </p>
      </div>
    </Card>
  )
}

NumberCard.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  number: PropTypes.number,
  countUp: PropTypes.object,
}

export default NumberCard
