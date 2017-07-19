import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'
import { Icon} from 'antd'
import SalaryChangeDetailPage from '../../../components/SalaryChangeDetailPage'
import CommentTable from '../../../components/CommentTable'
import FlowImg from '../../../components/FlowImg'

const Detail = ({ salaryChangeDetail }) => {
  const { data,employeeList,commentList } = salaryChangeDetail

  return (
    <div className="content-inner">
      <a href="javascript:window.history.back();" className="q-goback">
        <Icon type="close-circle-o" />
      </a>
      <SalaryChangeDetailPage data={data} employeeList={employeeList} />
      {
        commentList && commentList[0]?
        <CommentTable data={commentList} />
        :null
      } 
      {
        data && data.flowImgSrc?
        <FlowImg path={data.flowImgSrc} />
        :null
      }
    </div>)
}

Detail.propTypes = {
  salaryChangeDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ salaryChangeDetail, loading }) => ({ salaryChangeDetail, loading: loading.models.salaryChangeDetail }))(Detail)
