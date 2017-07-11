import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'
import { Row,Col,Icon} from 'antd'
import MissClockDetailPage from '../../../components/MissClockDetailPage'

const Detail = ({ missClockDetail }) => {
  const { data,employeeList } = missClockDetail
  
  return (
    <div className="content-inner">
      <MissClockDetailPage data={data} employeeList={employeeList} />
    </div>)
}

Detail.propTypes = {
  missClockDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ missClockDetail, loading }) => ({ missClockDetail, loading: loading.models.missClockDetail }))(Detail)
