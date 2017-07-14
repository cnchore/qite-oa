import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'
import { Row,Col,Icon,Table} from 'antd'
import { FileList } from '../../../components'
import PurchaseApplyDetailPage from '../../../components/PurchaseApplyDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'
const Detail = ({ purchaseApplyDetail }) => {
  const { data,employeeList,commentList } = purchaseApplyDetail
  
  return (
    <div className="content-inner">
      <PurchaseApplyDetailPage data={data} employeeList={employeeList} />
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
  purchaseApplyDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ purchaseApplyDetail, loading }) => ({ purchaseApplyDetail, loading: loading.models.purchaseApplyDetail }))(Detail)
