import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'
import { Row,Col,Icon} from 'antd'
import LeaveDetailPage from '../../../components/LeaveDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'
import cs from 'classnames'
import TaskNodeList from '../../../components/TaskNodeList'
import Iconfont from '../../../components/Iconfont'
import audited from '../../../svg/audited.svg'

const Detail = ({ leaveDetail }) => {
  const { data,employeeList,dicList,commentList,taskNode } = leaveDetail
  return (
    <div className={cs({'content-inner':true,...JSON.parse(`{"audited${data && data.state && data.state}":true}`) })}>
      <Iconfont className="q-icon-audited" colorful type={audited} />
      <a href="javascript:window.history.back();" className="q-goback">
        <Icon type="close-circle-o" />
      </a>
      <LeaveDetailPage data={data} employeeList={employeeList} dicList={dicList} />
      {
        taskNode && taskNode[0] && data && data.state<2?
        <TaskNodeList data={taskNode} />
        :null
      }
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
  leaveDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ leaveDetail, loading }) => ({ leaveDetail, loading: loading.models.leaveDetail }))(Detail)
