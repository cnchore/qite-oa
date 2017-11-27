import React from 'react'
import PropTypes from 'prop-types'
import styles from './ShopUpgradeForm.less'
// import cs from 'classnames';
import {changeMoneyToChinese,config,getAuditerName} from '../../utils'
class ShopUpgradeForm extends React.Component {
  render () {
    const { data,employeeList,commentList } = this.props
    const userInfo=JSON.parse(sessionStorage.getItem(`${config.prefix}userInfo`))
    let defaultRows=[],total=0;

    const getCreateDate=()=>{
      let _date=data.createTime && new Date(data.createTime) || new Date();
      return `${_date.getFullYear()}年${_date.getMonth()+1}月${_date.getDate()}日`
    }
    const getRows=()=>data && data.detailList && data.detailList.map((item,index)=>
      <tr key={index}>
        <td className={styles['tc']}>{item.upgradePoint || ''}</td>
        <td className={styles['tc']} colSpan="3">{item.presentSituation || ''}</td>
        <td className={styles['tc']} colSpan="4">{item.upgradeResult || ''}</td>
      </tr>
    )
    if(data && data.detailList && data.detailList.length<8){
      for (var i = 0; i <(8-data.detailList.length); i++) {
        defaultRows.push(
          <tr key={`default${i}`}>
            <td className={styles['tc']}></td>
            <td className={styles['tc']} colSpan="3"></td>
            <td className={styles['tc']} colSpan="4"></td>
          </tr>
        )
      }
    }
    return (
      <div >
        <div className={styles['title']}>店面升级自助申请表</div>
        <table className={styles['table']}>
          <tbody>
            <tr>
              <td className={styles['tc-span15']}>申请区域</td>
              <td className={styles['tc']}>{data.applyArea || '无'}</td>
              <td className={styles['tc']}>申请人</td>
              <td className={styles['tc']}>{employeeList.realName || '无'}</td>
              <td className={styles['tc']}>联系电话</td>
              <td className={styles['span15']}>{employeeList.mobilePhone || '无'}</td>
              <td className={styles['tc']}>申请日期</td>
              <td className={styles['tc']}>{data.createTime.substr(0,10) || '无'}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>店面类型</td>
              <td className={styles['tc']}>{data.shopType || '无'}</td>
              <td className={styles['tc']}>店面面积</td>
              <td className={styles['tc']}>{data.shopAreas || '0'}</td>
              <td className={styles['tc']}>装修年限</td>
              <td className={styles['tc']}>{data.decoYears || '0'}</td>
              <td className={styles['tc']}>升级原因</td>
              <td className={styles['tc']}>{data.upgradeReason || '0'}</td>
            </tr>
            <tr>
              <td className={styles['tc']} colSpan="8">原址店面升级关键诉求点</td>
            </tr>
            <tr>
              <td className={styles['tc']}>升级点</td>
              <td className={styles['tc']} colSpan="3">现状描述</td>
              <td className={styles['tc']} colSpan="4">升级诉求</td>
            </tr>
            {getRows()}
            {defaultRows && defaultRows}
            <tr>
              <td className={styles['tc']}>其它诉求点</td>
              <td className={styles['tc']} colSpan="7">{data.remark || ''}</td>
            </tr>
            <tr>
              <td className={styles['tc']} >发起人</td>
              <td className={styles['tc']} >{employeeList.realName || ''}</td>
              <td className={styles['tc']} colSpan="2">主动营销部总监</td>
              <td className={styles['tc']} >{getAuditerName(commentList,'部门总监')}</td>
              <td className={styles['tc']} >品牌部总监</td>
              <td className={styles['tc']} colSpan="2">{getAuditerName(commentList,'品牌部总监')}</td>
            </tr>
            <tr>
              <td className={styles['tc']} >售后部</td>
              <td className={styles['tc']} >{getAuditerName(commentList,'售后部专员')}</td>
              <td className={styles['tc']} colSpan="2">财务部会计</td>
              <td className={styles['tc']} colSpan="4">{getAuditerName(commentList,'财务部会计')}</td>
             
            </tr>
            
          </tbody>
        </table>
      </div>
      )
  }
}
ShopUpgradeForm.propTypes = {
}
export default ShopUpgradeForm
