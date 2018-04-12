import React from 'react'
import PropTypes from 'prop-types'
import styles from './SegaApplyForm.less'
// import cs from 'classnames';
import {changeMoneyToChinese,config,getAuditerName} from '../../utils'
class SegaApplyForm extends React.Component {
  render () {
    const { data,employeeList,commentList } = this.props
    const userInfo=JSON.parse(sessionStorage.getItem(`${config.prefix}userInfo`))
    let defaultRows=[],total=0;

    const getCreateDate=()=>{
      let _date=data.createTime && new Date(data.createTime) || new Date();
      return `${_date.getFullYear()}年${_date.getMonth()+1}月${_date.getDate()}日`
    }
    const getApplyArea=(t)=>{
      switch(String(t)){
        case '1':
          return '华南大区';
        case '2':
          return '华中大区';
        case '3':
          return '西南大区';
        default:
          return '无';
      }
    }
    return (
      <div >
        <div className={styles['title']}>世嘉建店申请流程表</div>
        <div className={styles['header']}>时间：{getCreateDate()}</div>
        <table className={styles['table']}>
          <tbody>
           <tr>
            <td className={styles['tc-span10']} colSpan="2" rowSpan="3">客户信息</td>
            <td className={styles['tc']} >姓名</td>
            <td className={styles['tc']} >{data.name || ''}</td>
            <td className={styles['tc']} >联系方式</td>
            <td className={styles['tc']} >{data.phone || ''}</td>
            <td className={styles['tc']} >QQ号</td>
            <td className={styles['tc']} >{data.qq || ''}</td>
           </tr>
           <tr>
            <td className={styles['tc']} >性别</td>
            <td className={styles['tc']} >{Boolean(data.sex)?'男':'女'}</td>
            <td className={styles['tc']} >身份证号</td>
            <td className={styles['tc']} colSpan="3">{data.idCode || ''}</td>
           </tr>
           <tr>
            <td className={styles['tc']} >合伙人姓名</td>
            <td className={styles['tc']} >{data.partnerName || ''}</td>
            <td className={styles['tc']} >联系方式</td>
            <td className={styles['tc']} >{data.partnerPhone || ''}</td>
            <td className={styles['tc']} >申请大区</td>
            <td className={styles['tc']} >{getApplyArea(data.applyArea) || ''}</td>
           </tr>
           <tr>
            <td className={styles['tc']} colSpan="2" rowSpan="4">店面信息</td>
            <td className={styles['tc']} >店面位置</td>
            <td className={styles['tc']} colSpan="3">{data.storePosition || ''}</td>
            <td className={styles['tc']} >店面类型</td>
            <td className={styles['tc']} >{data.storefrontType || ''}</td>
           </tr>
           <tr>
            <td className={styles['tc']} >省份及城市</td>
            <td className={styles['tc']} >{data.provinceScities || ''}</td>
            <td className={styles['tc']} colSpan="2">店面详细地址</td>
            <td className={styles['tc']} colSpan="2">{data.detailedAddress || ''}</td>
           </tr>
           <tr>
            <td className={styles['tc']}>指定物流</td>
            <td className={styles['tc']} colSpan="5">{data.designatedLogistics || ''}</td>
           </tr>
           <tr>
            <td className={styles['tc']}>套餐选择</td>
            <td className={styles['tc']} >{data.choiceMeal || ''}</td>
            <td className={styles['tc']} colSpan="2">系列产品配置</td>
            <td className={styles['tc']} colSpan="2">{data.productSeriesConfiguration || ''}</td>
           </tr>
           <tr>
            <td className={styles['tc']} colSpan="2" rowSpan="3">合同约定</td>
            <td className={styles['tc']} colSpan="2">样品返回补贴</td>
            <td className={styles['tc']} colSpan="2">{data.sampleSubsidy || ''}</td>
            <td className={styles['tc']} >预计费用</td>
            <td className={styles['tc']} >{data.expectedCost || ''}</td>
           </tr>
           <tr>
            <td className={styles['tc']} colSpan="2">上样产品折扣</td>
            <td className={styles['tc']} colSpan="2">{data.productDiscount || ''}</td>
            <td className={styles['tc']} >预计上样金额</td>
            <td className={styles['tc']} >{data.expectedAmount || ''}</td>
           </tr>
           <tr>
            <td className={styles['tc']} colSpan="2">其他约定条款</td>
            <td className={styles['tc']} colSpan="4">{data.otherAgreedTerms || ''}</td>
           </tr>
           <tr>
            <td className={styles['tc']} colSpan="2">发起人</td>
            <td className={styles['tc']}>{employeeList.realName || ''}</td>
            <td className={styles['tc']} colSpan="2">部门主管</td>
            <td className={styles['tc']}>{getAuditerName(commentList,'部门主管')}</td>
            <td className={styles['tc']}>销售大区总监</td>
            <td className={styles['tc']}>{getAuditerName(commentList,'销售大区总监')}</td>
           </tr>
           <tr>
            <td className={styles['tc']} colSpan="2">订单中心经理</td>
            <td className={styles['tc']}>{getAuditerName(commentList,'订单中心经理')}</td>
            <td className={styles['tc']} colSpan="2">营销总经理</td>
            <td className={styles['tc']} colSpan="3">{getAuditerName(commentList,'营销副总')}</td>
           </tr>
          </tbody>
        </table>
      </div>
      )
  }
}
SegaApplyForm.propTypes = {
}
export default SegaApplyForm
