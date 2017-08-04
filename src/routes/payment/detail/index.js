import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import PaymentDetailPage from '../../../components/PaymentDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'
import { Icon} from 'antd'
const Detail = ({ paymentDetail }) => {
  const { data,employeeList,commentList } = paymentDetail
 
  return (
    <div className="content-inner">
      <a href="javascript:window.history.back();" className="q-goback">
        <Icon type="close-circle-o" />
      </a>
      <PaymentDetailPage data={data} employeeList={employeeList} />
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
  paymentDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ paymentDetail, loading }) => ({ paymentDetail, loading: loading.models.paymentDetail }))(Detail)
