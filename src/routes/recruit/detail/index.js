import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import RecruitDetailPage from '../../../components/RecruitDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'
import { Icon} from 'antd'
const Detail = ({ recruitDetail }) => {
  const { data,employeeList,commentList } = recruitDetail
 
  return (
    <div className="content-inner">
      <a href="javascript:window.history.back();" className="q-goback">
        <Icon type="close-circle-o" />
      </a>
      <RecruitDetailPage data={data} employeeList={employeeList} />
      {
        commentList && commentList[0]?
        <CommentTable data={commentList} />
        :null
      } 
      {
        data && data.flowImgSrc?
        <FlowImg path={data.flowImgSrc+'&_t='+Math.random()} />
        :null
      }
    </div>)
}

Detail.propTypes = {
  recruitDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ recruitDetail, loading }) => ({ recruitDetail, loading: loading.models.recruitDetail }))(Detail)
