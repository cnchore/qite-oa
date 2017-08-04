import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import MissClockDetailPage from '../../../components/MissClockDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'
import { Icon} from 'antd'
const Detail = ({ missClockDetail }) => {
  const { data,employeeList,commentList } = missClockDetail
  
  return (
    <div className="content-inner">
      <a href="javascript:window.history.back();" className="q-goback">
        <Icon type="close-circle-o" />
      </a>
      <MissClockDetailPage data={data} employeeList={employeeList} />
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
  missClockDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ missClockDetail, loading }) => ({ missClockDetail, loading: loading.models.missClockDetail }))(Detail)
