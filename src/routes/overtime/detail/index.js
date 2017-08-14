import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import OverTimeDetailPage from '../../../components/OverTimeDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'
import { Icon} from 'antd'
import cs from 'classnames'

const Detail = ({ overtimeDetail }) => {
  const { data,employeeList,dicList,commentList } = overtimeDetail
  return (
    <div className={cs({'content-inner':true,'audited':data && data.state===2})}>
      <a href="javascript:window.history.back();" className="q-goback">
        <Icon type="close-circle-o" />
      </a>
      <OverTimeDetailPage data={data} employeeList={employeeList} dicList={dicList} />
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
  overtimeDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ overtimeDetail, loading }) => ({ overtimeDetail, loading: loading.models.overtimeDetail }))(Detail)
