
import React from 'react'
import PropTypes from 'prop-types'
import styles from './AdForm.less'
// import cs from 'classnames';
import {changeMoneyToChinese,config,getAuditerName} from '../../utils'
class AdForm extends React.Component {
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
        <div className={styles['title']}>广告费用报销表</div>
        <table className={styles['table']}>
          <tbody>
            <tr>
              <td className={styles['tc']}>申请区域</td>
              <td className={styles['tc']}>{data.applyArea || '无'}</td>
              <td className={styles['tc']}>城市</td>
              <td className={styles['tc']}>{data.city || '无'}</td>
              <td className={styles['tc']}>申请人</td>
              <td className={styles['tc']}>{employeeList.realName || '无'}</td>
              <td className={styles['tc']}>联系电话</td>
              <td className={styles['span15']}>{employeeList.mobilePhone || '无'}</td>
            </tr>
            <tr>
              <td className={styles['tc']} colSpan="8">广告投放说明</td>
            </tr>
            <tr>
              <td className={styles['tc']}>广告目的</td>
              <td colSpan='7' className={styles['tc']}>{data.goal || '无'}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>广告形式</td>
              <td colSpan='7' className={styles['tc']}>{data.adForm || '无'}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>广告时间</td>
              <td colSpan='7' className={styles['tc']}>{data.deliveryTimeStart || '无'} 至 {data.deliveryTimeEnd || '无'} </td>
            </tr>
            <tr>
              <td className={styles['tc']}>覆盖范围</td>
              <td colSpan='5' className={styles['tc']}>{data.coverArea || '无'} </td>
              <td className={styles['tc']}>预计费用</td>
              <td >{data.estiCost || '0'} </td>
            </tr>
            <tr>
              <td className={styles['tc']}>方案描述</td>
              <td colSpan='7' className={styles['tc']}>{data.desc || '无'}</td>
            </tr>
            
            <tr>
              <td className={styles['tc']}>预期效果</td>
              <td colSpan='7' className={styles['tc']}>{data.estiResult || '无'}</td>
            </tr>
            <tr>
              <td colSpan='8' className={styles['tc']}>备注说明</td>
            </tr>
            <tr>
              <td colSpan='8' className={styles['tc']}>{data.remark || '无'}</td>
            </tr>
            <tr>
              <td className={styles['tc']} colSpan="2">发起人</td>
              <td className={styles['tc']} colSpan="2">{employeeList.realName || '无'}</td>
              <td className={styles['tc']} colSpan="2">主动营销部总监</td>
              <td className={styles['tc']} colSpan="2">{getAuditerName(commentList,'本部门总监')}</td>
              
            </tr>
            <tr>
              <td className={styles['tc']} colSpan="2">订单中心</td>
              <td className={styles['tc']} colSpan="2">{getAuditerName(commentList,'订单中心经理')}</td>
              <td className={styles['tc']} colSpan="2">品牌部总监</td>
              <td className={styles['tc']} colSpan="2">{getAuditerName(commentList,'品牌部总监')}</td>
             
            </tr>
            <tr>
              <td colSpan='2' className={styles['tc']}>营销总经理</td>
              <td className={styles['tc']} colSpan="6">{getAuditerName(commentList,'营销副总')}</td>
            </tr>
          </tbody>
        </table>
      </div>
      )
  }
}
AdForm.propTypes = {
}
export default AdForm
