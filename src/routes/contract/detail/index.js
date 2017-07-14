import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import ContractDetailPage from '../../../components/ContractDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'
const Detail = ({ contractDetail }) => {
  const { data,employeeList,commentList } = contractDetail

  return (
    <div className="content-inner">
      <ContractDetailPage data={data} employeeList={employeeList} />
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
  contractDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ contractDetail, loading }) => ({ contractDetail, loading: loading.models.contractDetail }))(Detail)
