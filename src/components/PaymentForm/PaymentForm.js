import React from 'react'
import PropTypes from 'prop-types'
import styles from './PaymentForm.less'
// import cs from 'classnames';
// import aylson from '../../../assets/aylson.png'
import {changeMoneyToChinese,config} from '../../utils'
class PaymentForm extends React.Component {
  render () {
    const { data,employeeList } = this.props
    // window.document.title='';
    const userInfo=JSON.parse(sessionStorage.getItem(`${config.prefix}userInfo`))
    return (
      <table className={styles['table']}>
        <tr>
          <td colSpan="6" className={styles['title']}>转账付款单</td>
        </tr>
        <tr>
          <td>申请日期</td>
          <td>{data && data.createTime && data.createTime.substr(0,10)}</td>
          <td>申请人</td>
          <td colSpan="3">{employeeList && employeeList.realName && employeeList.realName}</td>
        </tr>
        <tr>
          <td rowSpan="4">付款方信息</td>
          <td>用款部门</td>
          <td colSpan="4">{employeeList && employeeList.postList && employeeList.postList[0].orgName && employeeList.postList[0].orgName}</td>
        </tr>
        <tr>
          <td>用款事由</td>
          <td colSpan="4">{data && data.remark && data.remark}</td>
        </tr>
        <tr>
          <td rowSpan="2">申请金额</td>
          <td>大写金额：</td>
          <td colSpan="3">{changeMoneyToChinese(data && data.payAmount && data.payAmount || 0)}</td>
        </tr>
        <tr>
          <td>小写金额：</td>
          <td colSpan="3">{data && data.payAmount && data.payAmount || 0}</td>
        </tr>
        <tr>
          <td colSpan="6" className={styles['hr']}></td>
        </tr>
        <tr>
          <td rowSpan="5">收款方信息</td>
          <td>收款公司</td>
          <td colSpan="4">{data && data.payee && data.payee}</td>
        </tr>
        <tr>
          <td>账号</td>
          <td colSpan="4">{data && data.accountNumber && data.accountNumber}</td>
        </tr>
        <tr>
          <td>开户行</td>
          <td colSpan="4">{data && data.bankName && data.bankName}</td>
        </tr>
        <tr>
          <td>对应采购合同号</td>
          <td colSpan="4">{data && data.purchaseCodes && data.purchaseCodes}</td>
        </tr>
        <tr>
          <td>联系人</td>
          <td colSpan="2">{data && data.contacter && data.contacter}</td>
          <td>联系方式</td>
          <td>{data && data.contactPhone && data.contactPhone}</td>
        </tr>
        <tr>
          <td colSpan="6" className={styles['hr']}></td>
        </tr>
        <tr>
          <td colSpan="6">
            <div>
              <span>编制人：{userInfo && userInfo.data && userInfo.data.employeeVo && userInfo.data.employeeVo.realName && userInfo.data.employeeVo.realName}</span>
              <span>申请人：{employeeList && employeeList.realName && employeeList.realName}</span>
              <span>审批人：</span>
              <span>核准：</span>
            </div>
            <div>
              <span>日期：{new Date().toLocaleDateString()}</span>
              <span>日期：{data && data.createTime && data.createTime.substr(0,10)}</span>
              <span>日期：</span>
              <span>日期：</span>
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan="6">
            <div>
              <span>会计：</span>
              <span className={styles['span3']}>出纳：</span>
            </div>
            <div>
              <span>日期：</span>
              <span className={styles['span3']}>日期：</span>
            </div>
          </td>
        </tr>
      </table>
      )
  }
}
PaymentForm.propTypes = {
}
export default PaymentForm
