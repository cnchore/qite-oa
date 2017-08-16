import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import ReimburseDetailPage from '../../../components/ReimburseDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'
import { Icon} from 'antd'
import cs from 'classnames'
import {setPrintData} from '../../../utils'
const Detail = ({ reimburseDetail }) => {
  const { data,employeeList,commentList } = reimburseDetail
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
      <ReimburseDetailPage data={data} employeeList={employeeList} />
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
  reimburseDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ reimburseDetail, loading }) => ({ reimburseDetail, loading: loading.models.reimburseDetail }))(Detail)
