import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Icon} from 'antd'
import BudgetDetailPage from '../../../components/BudgetDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'
const Detail = ({ budgetDetail }) => {
  const { data,employeeList,commentList } = budgetDetail
  
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
        <FlowImg path={data.flowImgSrc} />
        :null
      }
    </div>)
}

Detail.propTypes = {
  budgetDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ budgetDetail, loading }) => ({ budgetDetail, loading: loading.models.budgetDetail }))(Detail)
