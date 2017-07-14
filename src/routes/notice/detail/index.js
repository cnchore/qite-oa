import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import NoticeDetailPage from '../../../components/NoticeDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'

const Detail = ({ noticeDetail }) => {
  const { data,employeeList,dicList } = noticeDetail
  return (
    <div className="content-inner">
      <NoticeDetailPage data={data} employeeList={employeeList} dicList={dicList} />
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
  noticeDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ noticeDetail, loading }) => ({ noticeDetail, loading: loading.models.noticeDetail }))(Detail)
