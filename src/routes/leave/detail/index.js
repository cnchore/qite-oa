import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'
import { Row,Col,Icon} from 'antd'
import LeaveDetailPage from '../../../components/LeaveDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'

const Detail = ({ leaveDetail }) => {
  const { data,employeeList,dicList,commentList } = leaveDetail
  return (
    <div className="content-inner">
      <LeaveDetailPage data={data} employeeList={employeeList} dicList={dicList} />
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
  leaveDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ leaveDetail, loading }) => ({ leaveDetail, loading: loading.models.leaveDetail }))(Detail)
