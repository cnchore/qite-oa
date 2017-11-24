
import React from 'react'
import PropTypes from 'prop-types'
import styles from './PromotionExpenseForm.less'
// import cs from 'classnames';
import {changeMoneyToChinese,config,getAuditerName} from '../../utils'
class PromotionExpenseForm extends React.Component {
  render () {
    const { data,employeeList,commentList } = this.props
    const userInfo=JSON.parse(sessionStorage.getItem(`${config.prefix}userInfo`))
    let defaultRows=[],defaultScheduleRows=[],total=0;

    const getCreateDate=()=>{
      let _date=data.createTime && new Date(data.createTime) || new Date();
      return `${_date.getFullYear()}年${_date.getMonth()+1}月${_date.getDate()}日`
    }
    const getRows=data && data.detailList && data.detailList.map((item,index)=>{
      if(item.costAmount)total+=parseFloat(item.costAmount);
      return (
        <tr key={item.id}>
          <td className={styles['tc']}>{index+1}</td>
          <td className={styles['tc']} colSpan='5'>{item.costDetail && item.costDetail}</td>
          <td className={styles['tc']}>¥ {item.costAmount && item.costAmount.toFixed(2)}</td>
        </tr>
      )
    })
    if(data && data.detailList && data.detailList.length<3){
        for(var i=0;i<(3-data.detailList.length);i++){
          defaultRows.push(
            <tr key={3+i}>
              <td></td>
              <td colSpan='5'></td>
              <td></td>
            </tr>
          )
        }
      }
    const getScheduleRows=data && data.scheduleList && data.scheduleList.map((item,index)=>
      <tr key={`schedule${index}`}>
        <td className={styles['tc']} colSpan="3">{item.content || ''}</td>
        <td className={styles['tc']} colSpan="2">{item.finishTime || ''}</td>
        <td className={styles['tc']}>{item.charger || ''}</td>
        <td className={styles['tc']}>{item.remark || ''}</td>
      </tr>
    )
    if(data && data.scheduleList && data.scheduleList.length<3){
      for(var ii=0;ii<(3-data.scheduleList.length);ii++){
        defaultScheduleRows.push(
          <tr key={`defaultSchedule${ii}`}>
              <td className={styles['tc']} colSpan="3"></td>
              <td className={styles['tc']} colSpan="2"></td>
              <td className={styles['tc']}></td>
              <td className={styles['tc']}></td>
          </tr>
        )
      }
    }
    return (
      <div >
        <div className={styles['title']}>促销费用申请表</div>
        <table className={styles['table']}>
          <tbody>
            <tr>
              <td className={styles['tc']}>申请区域</td>
              <td className={styles['tl']}>{data.applyArea || '无'}</td>
              <td className={styles['tc']}>城市</td>
              <td className={styles['tl']}>{data.city || '无'}</td>
              <td className={styles['tc']}>申请人</td>
              <td className={styles['tl']}>{employeeList.realName || '无'}</td>
              <td className={styles['tc']}>联系电话</td>
              <td className={styles['tl-span15']}>{employeeList.mobilePhone || '无'}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>活动主题</td>
              <td colSpan='7' className={styles['tl']}>{data.actTheme || '无'}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>活动背景</td>
              <td colSpan='7' className={styles['tl']}>{data.actBackground || '无'}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>活动目的</td>
              <td colSpan='7' className={styles['tl']}>{data.actGoal || '无'}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>活动时间</td>
              <td colSpan='7' className={styles['tl']}>{data.actTimeStart || '无'} 至 {data.actTimeEnd || '无'} ，总数为：{data.actDays || 0} 天</td>
            </tr>
            <tr>
              <td className={styles['tc']}>费用形式</td>
              <td colSpan='7' className={styles['tl']}>{data.expenseForm || '无'}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>活动对象</td>
              <td colSpan='7' className={styles['tl']}>{data.actObj || '无'}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>活动内容（执行方式详细描述）</td>
              <td colSpan='7' className={styles['tl']}>{data.actContent || '无'}</td>
            </tr>
            <tr>
              <td className={styles['tc']} rowSpan="4">活动执行进度</td>
              <td className={styles['tc']} colSpan="3">重要工作内容</td>
              <td className={styles['tc']} colSpan="2">完成时间</td>
              <td className={styles['tc']}>负责人</td>
              <td className={styles['tc']}>备注</td>
            </tr>
            {getScheduleRows}
            {defaultScheduleRows && defaultScheduleRows}
            <tr>
              <td className={styles['tc']} rowSpan='2'>销售目标</td>
              <td className={styles['tl-span15']}>促销期销售计划（元）</td>
              <td colSpan='2' className={styles['tl']}>{data.saleGoal || '0'}</td>
              <td className={styles['tl-span15']}>去年同期销售额（元）</td>
              <td colSpan='3' className={styles['tl']}>{data.lastYearSales || '0'}</td>
            </tr>
            <tr>
              <td className={styles['tl-span15']}>预计达成销售（元）</td>
              <td colSpan='2' className={styles['tl']}>{data.estiSale || '0'}</td>
              <td className={styles['tl-span15']}>预告销售提高（元）</td>
              <td colSpan='3' className={styles['tl']}>{data.estiImprove || '0'}</td>
            </tr>
            <tr>
              <td className={styles['tc']} rowSpan={data.detailList&&data.detailList.length>3?data.detailList.length+2:5}>费用报销费用支出明细</td>
              <td className={styles['tc']}>序号</td>
              <td className={styles['tc']} colSpan='5'>费用明细</td>
              <td className={styles['tc']}>费用金额</td>
            </tr>
            
            {getRows}
            {defaultRows && defaultRows}
            <tr>
              <td >费用合计：</td>
              <td className={styles['tl']} colSpan='6'>{total || '0'}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>申请报销时间</td>
              <td colSpan='7' className={styles['tl']}>{getCreateDate()}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>发起人</td>
              <td className={styles['tc']}>{employeeList.realName || '无'}</td>
              <td className={styles['tc']}>部门主管</td>
              <td colSpan='2'className={styles['tc']}>{getAuditerName(commentList,'当区负责人')}</td>
              <td className={styles['tc']}>主动营销部总监</td>
              <td colSpan='2' className={styles['tc']}>{getAuditerName(commentList,'主动营销部总监')}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>客服部经理</td>
              <td className={styles['tc']}>{getAuditerName(commentList,'订单中心经理')}</td>
              <td className={styles['tc']}>营销总经理</td>
              <td colSpan='2' className={styles['tc']}>{getAuditerName(commentList,'营销副总')}</td>
              <td className={styles['tc']}>财务部总监</td>
              <td colSpan='2' className={styles['tc']}>{getAuditerName(commentList,'财务总监')}</td>
            </tr>
          </tbody>
        </table>
      </div>
      )
  }
}
PromotionExpenseForm.propTypes = {
}
export default PromotionExpenseForm
