import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'
import { Icon} from 'antd'
import { FileList } from '../../../components'
import PurchaseApplyDetailPage from '../../../components/PurchaseApplyDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'
import cs from 'classnames'
import {setPrintData} from '../../../utils'
import TaskNodeList from '../../../components/TaskNodeList'
const Detail = ({ purchaseApplyDetail }) => {
  const { data,employeeList,commentList,taskNode } = purchaseApplyDetail
  setPrintData(data,employeeList)
  
  return (
    <div className={cs({'content-inner':true,...JSON.parse(`{"audited${data && data.state && data.state}":true}`) })}>
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
      <PurchaseApplyDetailPage data={data} employeeList={employeeList} />
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
  purchaseApplyDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ purchaseApplyDetail, loading }) => ({ purchaseApplyDetail, loading: loading.models.purchaseApplyDetail }))(Detail)
