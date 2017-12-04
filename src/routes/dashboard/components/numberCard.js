import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Card,Tooltip } from 'antd'
import CountUp from 'react-countup'
import styles from './numberCard.less'
import { Link } from 'dva/router'
import { classnames,getTheme } from '../../../utils'

function NumberCard ({ icon, bgcolor,color, title, number,linkto,desc, countUp }) {
  let _color=!getTheme()?color:'#fff';
  const handerClick=()=>{
    linkto && linkto();
  }
  return (
    <Card className={classnames(styles.numberCard,{[styles.light1]:getTheme() && bgcolor==='light1'},{[styles.light2]:getTheme() && bgcolor==='light2'})} 
      bordered={false} bodyStyle={{ padding: 0 }} onClick={handerClick}>
      {
        desc?
        <Tooltip placement="topLeft" title={desc}>
          <i className={classnames(icon,styles.iconWarp)} style={{ color:_color }} />
        </Tooltip>
        : <i className={classnames(icon,styles.iconWarp)} style={{ color:_color }} />
      }
      
      <div className={styles.content} >
      
        <p className={styles.number}>
        {
          desc?
          <Tooltip placement="topRight" title={desc}>
            <span className={styles.title}>{title || 'No Title'}</span>
          </Tooltip>
          :<span className={styles.title}>{title || 'No Title'}</span>
        }
          
            <CountUp
              start={0}
              end={number}
              duration={2.75}
              useEasing
              useGrouping
              separator=","
              {...countUp || {}}
            />
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
