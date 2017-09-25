import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import PurchaseDetailPage from '../../../components/PurchaseDetailPage'
import { Icon} from 'antd'
import cs from 'classnames'
import Iconfont from '../../../components/Iconfont'
import audited from '../../../svg/audited.svg'

const Detail = ({ storageDetail }) => {
  const { data,employeeList } = storageDetail
  
  return (
    <div className={cs({'content-inner':true,...JSON.parse(`{"audited${data && data.state && data.state}":true}`) })}>
      <Iconfont className="q-icon-audited" colorful type={audited} />
      <div className="q-goback">
        
        <a href="javascript:window.history.back();">
          <Icon type="close-circle-o" />
        </a>
      </div>
      <PurchaseDetailPage data={data} employeeList={employeeList} />
      
    </div>)
}

Detail.propTypes = {
  storageDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ storageDetail, loading }) => ({ storageDetail, loading: loading.models.storageDetail }))(Detail)
