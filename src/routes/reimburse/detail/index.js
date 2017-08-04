import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import ReimburseDetailPage from '../../../components/ReimburseDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'
import { Icon} from 'antd'
const Detail = ({ reimburseDetail }) => {
  const { data,employeeList,commentList } = reimburseDetail
  
  return (
    <div className="content-inner">
      <a href="javascript:window.history.back();" className="q-goback">
        <Icon type="close-circle-o" />
      </a>
      <ReimburseDetailPage data={data} employeeList={employeeList} />
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
  reimburseDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ reimburseDetail, loading }) => ({ reimburseDetail, loading: loading.models.reimburseDetail }))(Detail)
