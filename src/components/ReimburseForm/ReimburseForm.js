import React from 'react'
import PropTypes from 'prop-types'
import styles from './ReimburseForm.less'
// import cs from 'classnames';
import {changeMoneyToChinese,config} from '../../utils'
class ReimburseForm extends React.Component {
  render () {
    const { data,employeeList } = this.props
    const userInfo=JSON.parse(sessionStorage.getItem(`${config.prefix}userInfo`))
    let remark=[],totalAmount=0,defaultRows=[];
    const getCreateDate=()=>{
      let _date=data.createTime && new Date(data.createTime) || new Date();
      return `${_date.getFullYear()}年${_date.getMonth()+1}月${_date.getDate()}日`
    }
    const getRows=data && data.detailList && data.detailList.map((item,index)=>{
      if(item.remark) remark.push(<p key={index+Math.random()}>{`${index+1}.${item.remark && item.remark}`}</p>);
      if(item.amount)totalAmount+=parseFloat(item.amount);
      return (
        <tr key={item.id}>
          <td colSpan="3" className={styles['tl']}>{item.uses && item.uses}</td>
          <td>¥ {item.amount && item.amount.toFixed(2)}</td>
          <td>{changeMoneyToChinese(item.amount)}</td>
        </tr>
      )
    })
    if(data && data.detailList && data.detailList.length<4){
        for(var i=0;i<(4-data.detailList.length);i++){
          defaultRows.push(
            <tr key={4+i}>
              <td colSpan="3"></td>
              <td></td>
              <td></td>
            </tr>
          )
        }
      }
    return (
      <div >
        <div className={styles['title']}><span>费 用 报 销 审 批 单</span></div>
        <div className={styles['header']}>
          <span>报销部门：{employeeList && employeeList.postList && employeeList.postList[0].orgName && employeeList.postList[0].orgName}</span>
          <span>{getCreateDate()}</span>
          <span>单据及附件共&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</span>
        </div>
        <table className={styles['table']}>
          <tbody>
           
            <tr>
              <td colSpan="3" rowSpan="2" className={styles['tc-space25']}>用<i>&nbsp;</i>途</td>
              <td colSpan="2" className={styles['tc']}>金&nbsp;&nbsp;额(元)</td>
            </tr>
            <tr>
              <td className={styles['tc']}>小写</td>
              <td className={styles['tc']}>大写</td>
            </tr>
            {getRows}
            {defaultRows && defaultRows}
            <tr>
              <td colSpan="3" className={styles['tc-space25']}>合<i>&nbsp;</i>计</td>
              <td >¥ {totalAmount.toFixed(2)}</td>
              <td >{changeMoneyToChinese(totalAmount)}</td>
            </tr>
            <tr>
              <td rowSpan="2" className={styles['tc']}>备注</td>
              <td rowSpan="2" colSpan="3" className={styles['tl']}>{remark}</td>
              <td className={styles['tl']}>核销借款</td>
            </tr>
            <tr>
              <td className={styles['tl']}>应付款</td>
            </tr>
            
          </tbody>
        </table>
        <div className={styles['footer']}>
          <span>审批：</span>
          <span>复核(会计)：</span>
          <span>出纳：</span>
          <span>部门负责：</span>
          <span>经办人：{employeeList && employeeList.realName && employeeList.realName}</span>
        </div>
      </div>
      )
  }
}
ReimburseForm.propTypes = {
}
export default ReimburseForm
