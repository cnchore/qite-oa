import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import TravelReimburseDetailPage from '../../../components/TravelReimburseDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'
import { Icon} from 'antd'
import cs from 'classnames'
import {setPrintData} from '../../../utils'
const Detail = ({ travelReimburseDetail }) => {
  const { data,employeeList,dicList,commentList } = travelReimburseDetail
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
      <TravelReimburseDetailPage data={data} employeeList={employeeList} dicList={dicList} />
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
  travelReimburseDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ travelReimburseDetail, loading }) => ({ travelReimburseDetail, loading: loading.models.travelReimburseDetail }))(Detail)
