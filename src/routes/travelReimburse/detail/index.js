import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import TravelReimburseDetailPage from '../../../components/TravelReimburseDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'

const Detail = ({ travelReimburseDetail }) => {
  const { data,employeeList,dicList,commentList } = travelReimburseDetail
  
  return (
    <div className="content-inner">
      <TravelReimburseDetailPage data={data} employeeList={employeeList} dicList={dicList} />
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
  travelReimburseDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ travelReimburseDetail, loading }) => ({ travelReimburseDetail, loading: loading.models.travelReimburseDetail }))(Detail)
