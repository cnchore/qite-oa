import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import BudgetDetailPage from '../../../components/BudgetDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'
const Detail = ({ budgetDetail }) => {
  const { data,employeeList,commentList } = budgetDetail
  
  return (
    <div className="content-inner">
     <MissClockDetailPage data={data} employeeList={employeeList} />
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
  budgetDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ budgetDetail, loading }) => ({ budgetDetail, loading: loading.models.budgetDetail }))(Detail)
