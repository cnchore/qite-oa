import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import RecruitDetailPage from '../../../components/RecruitDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'

const Detail = ({ recruitDetail }) => {
  const { data,employeeList,commentList } = recruitDetail
 
  return (
    <div className="content-inner">
      <RecruitDetailPage data={data} employeeList={employeeList} />
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
  recruitDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ recruitDetail, loading }) => ({ recruitDetail, loading: loading.models.recruitDetail }))(Detail)
