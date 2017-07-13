import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import MissClockDetailPage from '../../../components/MissClockDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'

const Detail = ({ missClockDetail }) => {
  const { data,employeeList,commentList } = missClockDetail
  
  return (
    <div className="content-inner">
      <MissClockDetailPage data={data} employeeList={employeeList} />
      {
      	data && data.flowImgSrc?
      	<FlowImg path={data.flowImgSrc} />
      	:null
      }
      {
      	commentList && commentList[0]?
      	<CommentTable data={commentList} />
      	:null
      }
    </div>)
}

Detail.propTypes = {
  missClockDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ missClockDetail, loading }) => ({ missClockDetail, loading: loading.models.missClockDetail }))(Detail)
