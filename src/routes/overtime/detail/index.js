import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import OverTimeDetailPage from '../../../components/OverTimeDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'

const Detail = ({ overtimeDetail }) => {
  const { data,employeeList,dicList,commentList } = overtimeDetail
  return (
    <div className="content-inner">
      <OverTimeDetailPage data={data} employeeList={employeeList} dicList={dicList} />
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
  overtimeDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ overtimeDetail, loading }) => ({ overtimeDetail, loading: loading.models.overtimeDetail }))(Detail)
