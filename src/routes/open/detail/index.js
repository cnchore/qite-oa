import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Icon} from 'antd'
import cs from 'classnames'
import OpenDetailPage from '../../../components/OpenDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'
import TaskNodeList from '../../../components/TaskNodeList'
import {setPrintData} from '../../../utils'
import Iconfont from '../../../components/Iconfont'
import audited from '../../../svg/audited.svg'
const Detail = ({ openDetail }) => {
  const { data,employeeList,commentList,taskNode } = openDetail
  setPrintData(data,employeeList,null,commentList)
  return (
    <div className={cs({'content-inner':true,...JSON.parse(`{"audited${data && data.state && data.state}":true}`) })}>
      <Iconfont className="q-icon-audited" colorful type={audited} />
      <div className="q-goback">
        {
          data?
          <a href={`${location.origin}${location.pathname}#/print`} target="_black" className="q-print-link">
            打印表单
          </a>
          :null
        }
        <a href="javascript:window.history.back();">
          <Icon type="close-circle-o" />
        </a>
      </div>

      <OpenDetailPage data={data} employeeList={employeeList} />
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
  openDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ openDetail, loading }) => ({ openDetail, loading: loading.models.openDetail }))(Detail)
