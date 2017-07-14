import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import ReimburseDetailPage from '../../../components/ReimburseDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'

const Detail = ({ reimburseDetail }) => {
  const { data,employeeList,commentList } = reimburseDetail
  
  return (
    <div className="content-inner">
      <ReimburseDetailPage data={data} employeeList={employeeList} />
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
  reimburseDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ reimburseDetail, loading }) => ({ reimburseDetail, loading: loading.models.reimburseDetail }))(Detail)
