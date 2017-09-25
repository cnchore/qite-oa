import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import {Icon} from 'antd'
import DimissionDetailPage from '../../../components/DimissionDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'
import cs from 'classnames'
import TaskNodeList from '../../../components/TaskNodeList'
import Iconfont from '../../../components/Iconfont'
import audited from '../../../svg/audited.svg'

const Detail = ({ dimissionDetail }) => {
  const { data,employeeList,commentList,taskNode } = dimissionDetail
  return (
    <div className={cs({'content-inner':true,...JSON.parse(`{"audited${data && data.state && data.state}":true}`) })}>
      <Iconfont className="q-icon-audited" colorful type={audited} />
      <a href="javascript:window.history.back();" className="q-goback">
        <Icon type="close-circle-o" />
      </a>
      <DimissionDetailPage data={data} employeeList={employeeList} />
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
  dimissionDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ dimissionDetail, loading }) => ({ dimissionDetail, loading: loading.models.dimissionDetail }))(Detail)
