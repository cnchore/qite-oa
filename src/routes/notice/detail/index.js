import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import NoticeDetailPage from '../../../components/NoticeDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'
import { Icon} from 'antd'
const Detail = ({ noticeDetail }) => {
  const { data,employeeList,dicList,commentList } = noticeDetail
  const noComment=location.hash.indexOf('noComment')>0?true:false;
  return (
    <div className="content-inner">
      <a href="javascript:window.history.back();" className="q-goback">
        <Icon type="close-circle-o" />
      </a>
      <NoticeDetailPage data={data} employeeList={employeeList} dicList={dicList} />
      {
        !noComment&& commentList && commentList[0]?
        <CommentTable data={commentList} />
        :null
      } 
      {
        !noComment && data && data.flowImgSrc?
        <FlowImg path={data.flowImgSrc+'&_t='+Math.random()} />
        :null
      }
    </div>)
}

Detail.propTypes = {
  noticeDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ noticeDetail, loading }) => ({ noticeDetail, loading: loading.models.noticeDetail }))(Detail)
