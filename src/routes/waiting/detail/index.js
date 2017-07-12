import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'
import { Row,Col,Icon} from 'antd'
import MissClockDetailPage from '../../../components/MissClockDetailPage'

const Detail = ({ waitingDetail }) => {
  const { data,employeeList } = waitingDetail
  
  //console.log(data,employeeList)
  return (
    <div className="content-inner">
       { data && data.busiData?
          <MissClockDetailPage data={data.busiData} employeeList={employeeList} />
        :null
       }
    </div>)
}

Detail.propTypes = {
  waitingDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ waitingDetail, loading }) => ({ waitingDetail, loading: loading.models.waitingDetail }))(Detail)
