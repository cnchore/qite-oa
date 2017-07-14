import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import UseCarDetailPage from '../../../components/UseCarDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'

const Detail = ({ useCarDetail }) => {
  const { data,employeeList,dicList,commentList } = useCarDetail
 
  return (
    <div className="content-inner">
      <UseCarDetailPage data={data} employeeList={employeeList} dicList={dicList}/>
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
  useCarDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ useCarDetail, loading }) => ({ useCarDetail, loading: loading.models.useCarDetail }))(Detail)
