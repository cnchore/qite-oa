import React from 'react'
import PropTypes from 'prop-types'
import styles from './BorrowForm.less'
// import cs from 'classnames';
import {changeMoneyToChinese,config,getAuditerName} from '../../utils'
class BorrowForm extends React.Component {
  render () {
    const { data,employeeList,commentList } = this.props
    const userInfo=JSON.parse(sessionStorage.getItem(`${config.prefix}userInfo`))
    let defaultRows=[],total=0;

    const getCreateDate=()=>{
      let _date=data.createTime && new Date(data.createTime) || new Date();
      return `${_date.getFullYear()}年${_date.getMonth()+1}月${_date.getDate()}日`
    }
    
    return (
      <div >
        <div className={styles['title']}>借（领）款申请表</div>
        <table className={styles['table']}>
          <tbody>
            <tr>
              <td className={styles['tc-span15']}>借款部门</td>
              <td className={styles['tl']} colSpan="2">{data.orgName || '无'}</td>
              <td className={styles['tc']}>申请日期</td>
              <td className={styles['tl']} colSpan="4">{data.createTime.substr(0,10) || '无'}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>借款类型</td>
              <td className={styles['tl']} colSpan="7">{data.type===1?'差旅借款':'其他借款'}</td>
            </tr>
            <tr>
               <td className={styles['tc']}>出差申请单</td>
              <td className={styles['tl']} colSpan="7">{data.travelCodes || ''}</td>
            </tr>
            <tr>
               <td className={styles['tc']}>原因或用途</td>
              <td className={styles['tl']} colSpan="7">{data.remark || ''}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>金额</td>
              <td className={styles['tc']}>大写</td>
              <td className={styles['tl']} colSpan="2">{changeMoneyToChinese((data.payAmount || 0))}</td>
              <td className={styles['tc']}>小写</td>
              <td className={styles['tl']} colSpan="3">{data.payAmount || '0'}</td>
            </tr>
            <tr>
              <td className={styles['tc']} >主管批示</td>
              <td className={styles['tl']} colSpan="3">{getAuditerName(commentList,'部门主管/经理审核')}</td>
              <td className={styles['tc-span15']} >财会意见</td>
              <td className={styles['tl']} colSpan="3">{getAuditerName(commentList,'财务总监审核')}</td>
            </tr>
            <tr>
              <td className={styles['tc']} >单位负责人签章</td>
              <td className={styles['tl']} colSpan="3">{getAuditerName(commentList,'中心副总/中心总监审核')}</td>
               <td className={styles['tc-span15']} >发起人</td>
              <td className={styles['tl']} colSpan="3">{employeeList.realName || '无'}</td>
            </tr>
          </tbody>
        </table>
      </div>
      )
  }
}
BorrowForm.propTypes = {
}
export default BorrowForm
