
import React from 'react'
import PropTypes from 'prop-types'
import styles from './BudgetForm.less'
// import cs from 'classnames';
import {changeMoneyToChinese,config,getAuditerName} from '../../utils'
class BudgetForm extends React.Component {
  render () {
    const { data,employeeList,commentList } = this.props
    const userInfo=JSON.parse(sessionStorage.getItem(`${config.prefix}userInfo`))
    let defaultRows=[],total=0;

    const getCreateDate=()=>{
      let _date=data.createTime && new Date(data.createTime) || new Date();
      return `${_date.getFullYear()}年${_date.getMonth()+1}月${_date.getDate()}日`
    }
    const getRows=data && data.detailList && data.detailList.map((item,index)=>{
      if(item.amount)total+=parseFloat(item.amount);
      return (
        <tr key={item.id}>
          <td className={styles['tc']}>{index+1}</td>
          <td className={styles['tc']}>{item.orgName && item.orgName}</td>
          <td className={styles['tc']}>{item.supplier && item.supplier}</td>
          <td className={styles['tc']}>{item.content && item.content}</td>
          <td>¥ {item.amount && item.amount.toFixed(2)}</td>
          <td className={styles['tc']}>{item.payTime && item.payTime}</td>
          <td className={styles['tc']}>{item.remark && item.remark}</td>
        </tr>
      )
    })
    if(data && data.detailList && data.detailList.length<14){
        for(var i=0;i<(14-data.detailList.length);i++){
          defaultRows.push(
            <tr key={14+i}>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )
        }
      }
    return (
      <div >
        <div className={styles['title']}>付款计划</div>
        <table className={styles['table']}>
          <tbody>
            <tr>
              <td className={styles['tc']}>序号</td>
              <td className={styles['tc']}>部门</td>
              <td className={styles['tc']}>供应商</td>
              <td className={styles['tc']}>内容</td>
              <td className={styles['tc']}>金额</td>
              <td className={styles['tc']}>用付款时间</td>
              <td className={styles['tc']}>备注</td>
            </tr>
            
            {getRows}
            {defaultRows && defaultRows}
            <tr >
              <td colSpan="7" className={styles['flex']}>
                <div>
                  <span >部门负责人：{
                     getAuditerName(commentList,'一级中心副总/总监') 
                  || getAuditerName(commentList,'直属副总/总监审核')}</span>
                  <span >财务总监：{
                     getAuditerName(commentList,'财务总监') 
                  || getAuditerName(commentList,'财务总监审核')}</span>
                  <span >总经理：{
                     getAuditerName(commentList,'总经理') 
                  || getAuditerName(commentList,'总经理审批')}</span>
                  <span >申请人：{
                     employeeList && employeeList.realName && employeeList.realName}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className={styles['footer']}>
          <div></div>
          <div>
            <table className={styles['table']}>
              <tbody>
                <tr>
                  <td className={styles['tc']}>对公</td>
                  <td></td>
                </tr>
                <tr>
                  <td className={styles['tc']}>对私</td>
                  <td></td>
                </tr>
                <tr>
                  <td className={styles['tc']}>总计</td>
                  <td>¥ {total && total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div></div>
        </div>
      </div>
      )
  }
}
BudgetForm.propTypes = {
}
export default BudgetForm
