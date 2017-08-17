import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'
import { Icon} from 'antd'
import SalaryChangeDetailPage from '../../../components/SalaryChangeDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'
import cs from 'classnames'
import TaskNodeList from '../../../components/TaskNodeList'
const Detail = ({ salaryChangeDetail }) => {
  const { data,employeeList,commentList,taskNode } = salaryChangeDetail

  return (
    <div className={cs({'content-inner':true,...JSON.parse(`{"audited${data && data.state && data.state}":true}`) })}>
      <a href="javascript:window.history.back();" className="q-goback">
        <Icon type="close-circle-o" />
      </a>
      <SalaryChangeDetailPage data={data} employeeList={employeeList} />
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
  salaryChangeDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ salaryChangeDetail, loading }) => ({ salaryChangeDetail, loading: loading.models.salaryChangeDetail }))(Detail)
