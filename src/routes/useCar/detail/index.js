import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import UseCarDetailPage from '../../../components/UseCarDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'
import { Icon} from 'antd'
const Detail = ({ useCarDetail }) => {
  const { data,employeeList,dicList,commentList } = useCarDetail
 
  return (
    <div className="content-inner">
      <a href="javascript:window.history.back();" className="q-goback">
        <Icon type="close-circle-o" />
      </a>
      <UseCarDetailPage data={data} employeeList={employeeList} dicList={dicList}/>
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
  useCarDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ useCarDetail, loading }) => ({ useCarDetail, loading: loading.models.useCarDetail }))(Detail)
