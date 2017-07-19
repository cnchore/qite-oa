import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'
import { Icon} from 'antd'
import { FileList } from '../../../components'
import PurchaseApplyDetailPage from '../../../components/PurchaseApplyDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'
const Detail = ({ purchaseApplyDetail }) => {
  const { data,employeeList,commentList } = purchaseApplyDetail
  
  return (
    <div className="content-inner">
      <a href="javascript:window.history.back();" className="q-goback">
        <Icon type="close-circle-o" />
      </a>
      <PurchaseApplyDetailPage data={data} employeeList={employeeList} />
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
  purchaseApplyDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ purchaseApplyDetail, loading }) => ({ purchaseApplyDetail, loading: loading.models.purchaseApplyDetail }))(Detail)
