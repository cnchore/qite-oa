import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'
import { Row,Col,Icon} from 'antd'
import MissClockDetailPage from '../../../components/MissClockDetailPage'
import SalaryChangeDetailPage from '../../../components/SalaryChangeDetailPage'
import LeaveDetailPage from '../../../components/LeaveDetailPage'
import FlowImg from '../../../components/FlowImg'
import CommentTable from '../../../components/CommentTable'

const Detail = ({ waitingDetail }) => {
  const { data,employeeList,dicList } = waitingDetail
  let detailpage=null;
  if(data && data.busiData && data.userVo && data.userVo.employeeVo){
    switch(data.busiCode.substr(0,2)){
      case 'MC':
        detailpage=<MissClockDetailPage data={data.busiData} employeeList={data.userVo.employeeVo} />
        break
      case 'SC':
        detailpage=<SalaryChangeDetailPage data={data.busiData} employeeList={data.userVo.employeeVo} />
        break
      case 'LE':
        detailpage=<LeaveDetailPage data={data.busiData} employeeList={data.userVo.employeeVo} dicList={dicList}/>
        break
    }
  }
  //console.log(data,employeeList)
  return (
    <div className="content-inner">
       {detailpage}
       { data && data.flowImgSrc?
          <FlowImg path={data.flowImgSrc} />
        :null}
       {
        data && data.commentList?
          <CommentTable data={data.commentList} />
        :null
       }
    </div>)
}

Detail.propTypes = {
  waitingDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ waitingDetail, loading }) => ({ waitingDetail, loading: loading.models.waitingDetail }))(Detail)
