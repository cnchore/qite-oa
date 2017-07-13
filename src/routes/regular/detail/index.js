import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import RegularDetailPage from '../../../components/RegularDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'

const Detail = ({ regularDetail }) => {
  const { data,employeeList,commentList } = regularDetail

  return (
    <div className="content-inner">
      <RegularDetailPage data={data} employeeList={employeeList} />
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
  regularDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ regularDetail, loading }) => ({ regularDetail, loading: loading.models.regularDetail }))(Detail)
