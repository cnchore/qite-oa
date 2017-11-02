import React from 'react'
import PropTypes from 'prop-types'
import styles from './ShopForm.less'
// import cs from 'classnames';
import {changeMoneyToChinese,config} from '../../utils'
class ShopForm extends React.Component {
  render () {
    const { data,employeeList } = this.props
    const userInfo=JSON.parse(sessionStorage.getItem(`${config.prefix}userInfo`))
    let defaultRows=[],total=0;

    const getCreateDate=()=>{
      let _date=data.createTime && new Date(data.createTime) || new Date();
      return `${_date.getFullYear()}年${_date.getMonth()+1}月${_date.getDate()}日`
    }
    
    return (
      <div >
        <div className={styles['title']}>建店申请流程表</div>
        <div className={styles['header']}>时间：{getCreateDate()}</div>
        <table className={styles['table']}>
          <tbody>
           <tr>
            <td className={styles['tc-span10']} colSpan="2" rowSpan="3">客户信息</td>
            <td className={styles['tc']} >姓名</td>
            <td className={styles['tc']} >{data.clientName || ''}</td>
            <td className={styles['tc']} >联系方式</td>
            <td className={styles['tc']} >{data.clientPhone || ''}</td>
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
            <td className={styles['tc']} colSpan="2">{data.partnerName || ''}</td>
            <td className={styles['tc']} >联系方式</td>
            <td className={styles['tc']} colSpan="2">{data.partnerPhone || ''}</td>
           </tr>
           <tr>
            <td className={styles['tc']} colSpan="2" rowSpan="4">店面信息</td>
            <td className={styles['tc']} >店面位置</td>
            <td className={styles['tc']} colSpan="3">{data.shopLocationLevel || ''}</td>
            <td className={styles['tc']} >店面类型</td>
            <td className={styles['tc']} >{data.shopType || ''}</td>
           </tr>
           <tr>
            <td className={styles['tc']} >省份及城市</td>
            <td className={styles['tc']} >{data.province || ''}{data.city || ''}</td>
            <td className={styles['tc']} colSpan="2">店面详细地址</td>
            <td className={styles['tc']} colSpan="2">{data.shopAddress || ''}</td>
           </tr>
           <tr>
            <td className={styles['tc']}>指定物流</td>
            <td className={styles['tc']} colSpan="5">{data.logistics || ''}</td>
           </tr>
           <tr>
            <td className={styles['tc']}>店面建筑面积</td>
            <td className={styles['tc']} >{data.shopArea || ''}</td>
            <td className={styles['tc']} colSpan="2">实际使用面积</td>
            <td className={styles['tc']} colSpan="2">{data.realUseArea || ''}</td>
           </tr>
           <tr>
            <td className={styles['tc']} colSpan="2" rowSpan="3">合同约定</td>
            <td className={styles['tc']} colSpan="2">装修补贴(元/平米)</td>
            <td className={styles['tc']} colSpan="2">{data.decorationSubsidy || ''}</td>
            <td className={styles['tc']} >预计费用</td>
            <td className={styles['tc']} >{data.estiCost || ''}</td>
           </tr>
           <tr>
            <td className={styles['tc']} colSpan="2">上样产品折扣</td>
            <td className={styles['tc']} colSpan="2">{data.sampleDiscount || ''}</td>
            <td className={styles['tc']} >预计上样金额</td>
            <td className={styles['tc']} >{data.estiSampleAmount || ''}</td>
           </tr>
           <tr>
            <td className={styles['tc']} colSpan="2">其他约定条款</td>
            <td className={styles['tc']} colSpan="4">{data.otherTerms || ''}</td>
           </tr>
           <tr>
            <td className={styles['tc']} colSpan="2" rowSpan="3">活动要求</td>
            <td className={styles['tc']} >试营业时间</td>
            <td className={styles['tc']} colSpan="2">{data.trialHours || ''}</td>
            <td className={styles['tc']} >开业时间</td>
            <td className={styles['tc']} colSpan="2">{data.openTimes || ''}</td>
           </tr>
           <tr>
            <td className={styles['tc']} colSpan="2">开业方案是否有具体要求或描述</td>
            <td className={styles['tc']} colSpan="4">{data.remark1 || ''}</td>
           </tr>
           <tr>
            <td className={styles['tc']} colSpan="3">开业礼品及物料需求(有偿提供)</td>
            <td className={styles['tc']} colSpan="3">{data.remark2 || ''}</td>
           </tr>
           <tr>
            <td className={styles['tc-span5']} rowSpan="3">装修进度时间表</td>
            <td className={styles['tc']} >建店流程</td>
            <td className={styles['tc']} >量尺</td>
            <td className={styles['tc']} >店面设计</td>
            <td className={styles['tc']} >产品选型</td>
            <td className={styles['tc']} >生产制作</td>
            <td className={styles['tc']} >安装服务</td>
            <td className={styles['tc']} >试营业(开业策划)</td>
           </tr>
           <tr>
            <td className={styles['tc']} >时间要求</td>
            <td className={styles['tc']} >{data.metricTime.substr(0,16) || ''}</td>
            <td className={styles['tc']} >{data.shopDesignTime.substr(0,16) || ''}</td>
            <td className={styles['tc']} >{data.productSelectTime.substr(0,16) || ''}</td>
            <td className={styles['tc']} >{data.makingTime.substr(0,16) || ''}</td>
            <td className={styles['tc']} >{data.installTime.substr(0,16) || ''}</td>
            <td className={styles['tc']} >{data.planTrialHours.substr(0,16) || ''}</td>
           </tr>
           <tr>
            <td className={styles['tc']} >关联部门</td>
            <td className={styles['tc']} colSpan="3">品牌部</td>
            <td className={styles['tc']} colSpan="2">生产部</td>
            <td className={styles['tc']} >运营部</td>
           </tr>
           <tr>
            <td className={styles['tc']} colSpan="2">发起人</td>
            <td className={styles['tc']}>{employeeList.realName || ''}</td>
            <td className={styles['tc']} colSpan="2">部门主管</td>
            <td className={styles['tc']}></td>
            <td className={styles['tc']}>品牌部总监</td>
            <td className={styles['tc']}></td>
           </tr>
           <tr>
            <td className={styles['tc']} colSpan="2">招商部总监</td>
            <td className={styles['tc']}></td>
            <td className={styles['tc']} colSpan="2">营销总经理</td>
            <td className={styles['tc']} colSpan="3"></td>
           </tr>
          </tbody>
        </table>
      </div>
      )
  }
}
ShopForm.propTypes = {
}
export default ShopForm
