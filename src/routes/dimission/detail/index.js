import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import {Icon} from 'antd'
import DimissionDetailPage from '../../../components/DimissionDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'
const Detail = ({ dimissionDetail }) => {
  const { data,employeeList,commentList } = dimissionDetail
  return (
    <div className="content-inner">
      <a href="javascript:window.history.back();" className="q-goback">
        <Icon type="close-circle-o" />
      </a>
      <DimissionDetailPage data={data} employeeList={employeeList} />
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
  dimissionDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ dimissionDetail, loading }) => ({ dimissionDetail, loading: loading.models.dimissionDetail }))(Detail)
