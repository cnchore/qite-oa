import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import PaymentDetailPage from '../../../components/PaymentDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'
const Detail = ({ paymentDetail }) => {
  const { data,employeeList,commentList } = paymentDetail
 
  return (
    <div className="content-inner">
      <PaymentDetailPage data={data} employeeList={employeeList} />
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
  paymentDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ paymentDetail, loading }) => ({ paymentDetail, loading: loading.models.paymentDetail }))(Detail)
