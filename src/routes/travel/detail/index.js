import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import TravelDetailPage from '../../../components/TravelDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'
import { Icon} from 'antd'
import cs from 'classnames'
const Detail = ({ travelDetail }) => {
  const { data,employeeList,dicList,commentList } = travelDetail
  
  return (
    <div className={cs({'content-inner':true,...JSON.parse(`{"audited${data && data.state && data.state}":true}`) })}>
      <a href="javascript:window.history.back();" className="q-goback">
        <Icon type="close-circle-o" />
      </a>
      <TravelDetailPage data={data} employeeList={employeeList} dicList={dicList} />
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
  travelDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ travelDetail, loading }) => ({ travelDetail, loading: loading.models.travelDetail }))(Detail)
