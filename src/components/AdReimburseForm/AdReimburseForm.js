
import React from 'react'
import PropTypes from 'prop-types'
import styles from './AdReimburseForm.less'
// import cs from 'classnames';
import {changeMoneyToChinese,config} from '../../utils'
class AdReimburseForm extends React.Component {
  render () {
    const { data,employeeList } = this.props
    const userInfo=JSON.parse(sessionStorage.getItem(`${config.prefix}userInfo`))
    let defaultRows=[],total=0;

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
    return (
      <div >
        <div className={styles['title']}>广告费用报销表</div>
        <table className={styles['table']}>
          <tbody>
            <tr>
              <td className={styles['tc']}>申请区域</td>
              <td colSpan='2' className={styles['tl']}>{data.applyArea || '无'}</td>
              <td className={styles['tc']}>申请人</td>
              <td colSpan='2' className={styles['tl']}>{employeeList.realName || '无'}</td>
              <td className={styles['tc']}>申请时间</td>
              <td className={styles['tl-span15']}>{data.createTime.substr(0,10)}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>客户姓名</td>
              <td colSpan='2' className={styles['tl']}>{data.clientName || '无'}</td>
              <td className={styles['tc']}>客户地址</td>
              <td colSpan='4' className={styles['tl']}>{data.clientAddress || '无'}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>广告主题</td>
              <td colSpan='7' className={styles['tl']}>{data.adTheme || '无'}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>广告背景</td>
              <td colSpan='7' className={styles['tl']}>{data.adBackground || '无'}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>广告目的</td>
              <td colSpan='7' className={styles['tl']}>{data.adGoal || '无'}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>广告时间</td>
              <td colSpan='7' className={styles['tl']}>{data.adTimeStart || '无'} 至 {data.adTimeEnd || '无'} ，总数为：{data.adDays || 0} 天</td>
            </tr>
            <tr>
              <td className={styles['tc']}>广告形式</td>
              <td colSpan='7' className={styles['tl']}>{data.adForm || '无'}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>活动内容执行方式详细描述</td>
              <td colSpan='7' className={styles['tl']}>{data.actContent || '无'}</td>
            </tr>
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
              <td className={styles['tl']} colSpan='2'>{data.cost || '0'}</td>
              <td >客户分摊：</td>
              <td className={styles['tl']}>{data.clientPay || '0'}</td>
              <td className={styles['span12']}>公司分摊：</td>
              <td className={styles['tl']}>{data.companyPay || '0'}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>申请报销时间</td>
              <td colSpan='7' className={styles['tl']}>{getCreateDate()}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>费用审批</td>
              <td colSpan='3' className={styles['tl']}>签字：</td>
              <td colSpan='4' className={styles['tl']}>批复金额：</td>
            </tr>
            <tr>
              <td className={styles['tc']}>制表人</td>
              <td className={styles['tl']}>{employeeList.realName || '无'}</td>
              <td className={styles['tc']}>主动营销部总监</td>
              <td></td>
              <td className={styles['tc']}>品牌部总监</td>
              <td colSpan='3'></td>
            </tr>
            <tr>
              <td className={styles['tc']}>客服部</td>
              <td></td>
              <td className={styles['tc']}>财务部</td>
              <td></td>
              <td className={styles['tc']}>营销总经理</td>
              <td colSpan='3'></td>
            </tr>
          </tbody>
        </table>
      </div>
      )
  }
}
AdReimburseForm.propTypes = {
}
export default AdReimburseForm
