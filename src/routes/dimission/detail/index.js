import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import DimissionDetailPage from '../../../components/DimissionDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'
const Detail = ({ dimissionDetail }) => {
  const { data,employeeList,commentList } = dimissionDetail
  return (
    <div className="content-inner">
      <DimissionDetailPage data={data} employeeList={employeeList} />
      {
        commentList && commentList[0]?
        <CommentTable data={commentList} />
        :null
      } 
      {
        data && data.flowImgSrc?
        <FlowImg path={data.flowImgSrc} />
        :null
      }
    </div>)
}

Detail.propTypes = {
  dimissionDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ dimissionDetail, loading }) => ({ dimissionDetail, loading: loading.models.dimissionDetail }))(Detail)
