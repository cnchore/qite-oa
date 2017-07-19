import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import NoticeDetailPage from '../../../components/NoticeDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'
import { Icon} from 'antd'
const Detail = ({ noticeDetail }) => {
  const { data,employeeList,dicList,commentList } = noticeDetail
  return (
    <div className="content-inner">
      <a href="javascript:window.history.back();" className="q-goback">
        <Icon type="close-circle-o" />
      </a>
      <NoticeDetailPage data={data} employeeList={employeeList} dicList={dicList} />
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
  noticeDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ noticeDetail, loading }) => ({ noticeDetail, loading: loading.models.noticeDetail }))(Detail)
