import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import ContractDetailPage from '../../../components/ContractDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'
import { Icon} from 'antd'
const Detail = ({ contractDetail }) => {
  const { data,employeeList,commentList } = contractDetail

  return (
    <div className="content-inner">
      <a href="javascript:window.history.back();" className="q-goback">
        <Icon type="close-circle-o" />
      </a>
      <ContractDetailPage data={data} employeeList={employeeList} />
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
  contractDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ contractDetail, loading }) => ({ contractDetail, loading: loading.models.contractDetail }))(Detail)
