import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Icon} from 'antd'
import cs from 'classnames'
import SampleRoomDetailPage from '../../../components/SampleRoomDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'
import TaskNodeList from '../../../components/TaskNodeList'
import {setPrintData} from '../../../utils'
import Iconfont from '../../../components/Iconfont'
import audited from '../../../svg/audited.svg'
const Detail = ({ sampleRoomDetail }) => {
  const { data,employeeList,commentList,taskNode } = sampleRoomDetail
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

      <SampleRoomDetailPage data={data} employeeList={employeeList} />
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
  sampleRoomDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ sampleRoomDetail, loading }) => ({ sampleRoomDetail, loading: loading.models.sampleRoomDetail }))(Detail)
