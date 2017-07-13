import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import TravelDetailPage from '../../../components/TravelDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'

const Detail = ({ travelDetail }) => {
  const { data,employeeList,dicList,commentList } = travelDetail
  
  return (
    <div className="content-inner">
      <TravelDetailPage data={data} employeeList={employeeList} dicList={dicList} />
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
  travelDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ travelDetail, loading }) => ({ travelDetail, loading: loading.models.travelDetail }))(Detail)
