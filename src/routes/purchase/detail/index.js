import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import PurchaseDetailPage from '../../../components/PurchaseDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'
const Detail = ({ purchaseDetail }) => {
  const { data,employeeList,commentList } = purchaseDetail
  
  return (
    <div className="content-inner">
      <PurchaseDetailPage data={data} employeeList={employeeList} />
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
  purchaseDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ purchaseDetail, loading }) => ({ purchaseDetail, loading: loading.models.purchaseDetail }))(Detail)
