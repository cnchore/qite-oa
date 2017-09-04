import React from 'react'
import PropTypes from 'prop-types'
import styles from './TravelReimburseForm.less'
// import cs from 'classnames';
import {changeMoneyToChinese,config,getAuditerName} from '../../utils'
class TravelReimburseForm extends React.Component {
  render () {
    const { data,employeeList,dicList,commentList } = this.props
    const userInfo=JSON.parse(sessionStorage.getItem(`${config.prefix}userInfo`))
    let defaultRows=[],
      totalVehicleCost=0,
      totalLivingCost=0,
      totalOtherCost=0,
      c=parseFloat(data.actualExpense)-parseFloat(data.advanceExpense),
      surplus=c<0?c.toFixed(2):0.00,
      validReimburse=c>0?c.toFixed(2):0.00;

    const getDicType=(value,remark=null)=>{
      let n=dicList.filter(item=>String(item.dicValue)===String(value));
      //console.log(orgList,...n,value);
      if(n && n[0]){
        return remark&&n[0].dicName==='其他'?remark:n[0].dicName;
      }
      return '';
    }
    const getCreateDate=()=>{
      let _date=data.createTime && new Date(data.createTime) || new Date();
      return `${_date.getFullYear()}年${_date.getMonth()+1}月${_date.getDate()}日`
    }
    const getRows=data && data.detailList && data.detailList.map((item,index)=>{
      let t=parseFloat(item.vehicleCost)+parseFloat(item.livingCost)+parseFloat(item.otherCost);
      if(item.vehicleCost)totalVehicleCost+=parseFloat(item.vehicleCost);
      if(item.livingCost)totalLivingCost+=parseFloat(item.livingCost);
      if(item.otherCost)totalOtherCost+=parseFloat(item.otherCost);
      return (
        <tr key={item.id}>
          <td className={styles['tl']}>{item.departureTime && item.departureTime}</td>
          <td className={styles['tl']}>{item.departurePlace && item.departurePlace}</td>
          <td className={styles['tl']}>{item.arrivalTime && item.arrivalTime}</td>
          <td className={styles['tl']}>{item.arrivalPlace && item.arrivalPlace}</td>
          <td className={styles['tl']}>{item.vehicle && getDicType(item.vehicle)}</td>
          <td>¥ {item.vehicleCost && item.vehicleCost.toFixed(2)}</td>
          <td>¥ {item.livingCost && item.livingCost.toFixed(2)}</td>
          <td>¥ {item.otherCost && item.otherCost.toFixed(2)}</td>
          <td>¥ {t && t.toFixed(2)}</td>
        </tr>
      )
    })
    if(data && data.detailList && data.detailList.length<8){
        for(var i=0;i<(8-data.detailList.length);i++){
          defaultRows.push(
            <tr key={8+i}>
              <td></td>
              <td></td>
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
        <div className={styles['title']}><span>出 差 旅 费 报 销 单</span></div>
        <div className={styles['header']}>报销日期：{getCreateDate()}</div>
        <table className={styles['table']}>
          <tbody>
            <tr>
              <td colSpan="3" className={styles['tl']}>部门：{employeeList && employeeList.postList && employeeList.postList[0].orgName && employeeList.postList[0].orgName}</td>
              <td colSpan="3" className={styles['tl']}>出差人：{employeeList && employeeList.realName && employeeList.realName}</td>
              <td colSpan="3" className={styles['tl']}>出差事由：{data && data.remark && data.remark}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>出发时间</td>
              <td className={styles['tc']}>出发地点</td>
              <td className={styles['tc']}>到达时间</td>
              <td className={styles['tc']}>到达地点</td>
              <td className={styles['tc']}>交通工具</td>
              <td className={styles['tc']}>交通费用</td>
              <td className={styles['tc']}>住宿费</td>
              <td className={styles['tc']}>其他费用</td>
              <td className={styles['tc']}>小计金额</td>
            </tr>
            
            {getRows}
            {defaultRows && defaultRows}
            <tr>
              <td colSpan="5">合计</td>
              <td>¥ {totalVehicleCost && totalVehicleCost.toFixed(2)}</td>
              <td>¥ {totalLivingCost && totalLivingCost.toFixed(2)}</td>
              <td>¥ {totalOtherCost && totalOtherCost.toFixed(2)}</td>
              <td>¥ {data && data.actualExpense && data.actualExpense.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="3"  className={styles['tl']}>报销总额(大写)：{changeMoneyToChinese(data.actualExpense)}</td>
              <td colSpan="2" className={styles['tl']}>预支旅费：¥ {data && data.advanceExpense && data.advanceExpense.toFixed(2)}</td>
              <td colSpan="2" className={styles['tl']}>补额不足：¥ {validReimburse}</td>
              <td colSpan="2" className={styles['tl']}>归还多余：¥ {surplus}</td>
            </tr>
            
          </tbody>
        </table>
        <div className={styles['footer']}>
          <span>主管：{getAuditerName(commentList,'直属副总/总监审批')}</span>
          <span>审核：{getAuditerName(commentList,'总经理审批')}</span>
          <span>报销人：{employeeList && employeeList.realName && employeeList.realName}</span>
        </div>
      </div>
      )
  }
}
TravelReimburseForm.propTypes = {
}
export default TravelReimburseForm
