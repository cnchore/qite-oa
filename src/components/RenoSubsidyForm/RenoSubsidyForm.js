import React from 'react'
import PropTypes from 'prop-types'
import styles from './RenoSubsidyForm.less'
// import cs from 'classnames';
import {changeMoneyToChinese,config,getAuditerName} from '../../utils'
class RenoSubsidyForm extends React.Component {
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
        <td className={styles['tc']}>{item.imagePoint || ''}</td>
        <td className={styles['tc']} colSpan="6">{item.ratingSelf || ''}</td>
        <td className={styles['tc']} >{item.ratingMarket || ''}</td>
      </tr>
    )
    if(data && data.detailList && data.detailList.length<7){
      for (var i = 0; i <(7-data.detailList.length); i++) {
        defaultRows.push(
          <tr key={`default${i}`}>
            <td className={styles['tc']}></td>
            <td className={styles['tc']} colSpan="6"></td>
            <td className={styles['tc']} ></td>
          </tr>
        )
      }
    }
    return (
      <div >
        <div className={styles['title']}>店面装修补贴费用申请表</div>
        <table className={styles['table']}>
          <tbody>
            <tr>
              <td className={styles['tc-span15']}>申请区域</td>
              <td className={styles['tc']}>{data.applyArea || '无'}</td>
              <td className={styles['tc']}>客户名称</td>
              <td className={styles['tc']}>{data.clientName || '无'}</td>
              <td className={styles['tc']}>联系电话</td>
              <td className={styles['span15']}>{data.clientPhone || '无'}</td>
              <td className={styles['tc']}>申请日期</td>
              <td className={styles['tc']}>{data.createTime.substr(0,10) || '无'}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>店面类型</td>
              <td className={styles['tc']}>{data.shopType || '无'}</td>
              <td className={styles['tc']}>店面面积</td>
              <td className={styles['tc']}>{data.shopAreas || '0'}</td>
              <td className={styles['tc']}>补贴面积</td>
              <td className={styles['tc']}>{data.subsAreas || '0'}</td>
              <td className={styles['tc']}>补贴标准</td>
              <td className={styles['tc']}>{data.subsStandard || '0'}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>立现时间</td>
              <td className={styles['tc']}>{data.projectTime || '无'}</td>
              <td className={styles['tc']}>开业时间</td>
              <td className={styles['tc']}>{data.openTime || '0'}</td>
              <td className={styles['tc']}>申请金额</td>
              <td className={styles['tc']}>{data.applyAmount || '0'}</td>
              <td className={styles['tc']}>补贴金额</td>
              <td className={styles['tc']}>{data.subsAmount || '0'}</td>
            </tr>
            <tr>
              <td className={styles['tc']} colSpan="8">装修评估</td>
            </tr>
            <tr>
              <td className={styles['tc']}>标准形象点(外立面、样品)</td>
              <td className={styles['tc']} colSpan="6">自评</td>
              <td className={styles['tc']} >市场部评估</td>
            </tr>
            {getRows()}
            {defaultRows && defaultRows}
            <tr>
              <td className={styles['tc']}>其它说明</td>
              <td className={styles['tc']} colSpan="7">{data.remark || ''}</td>
            </tr>
            <tr>
              <td className={styles['tc']} >发起人</td>
              <td className={styles['tc']} >{employeeList.realName || ''}</td>
              <td className={styles['tc']} >部门主管</td>
              <td className={styles['tc']} >{getAuditerName(commentList,'当区负责人')}</td>
              <td className={styles['tc']} >招商部总监</td>
              <td className={styles['tc']} >{getAuditerName(commentList,'部门总监')}</td>
              <td className={styles['tc']} >财务</td>
              <td className={styles['tc']} >{getAuditerName(commentList,'财务总监')}</td>
            </tr>
            <tr>
              <td className={styles['tc']} colSpan="2">营销总经理</td>
              <td className={styles['tc']} colSpan="2">{getAuditerName(commentList,'营销副总')}</td>
              <td className={styles['tc']} colSpan="2">总经理</td>
              <td className={styles['tc']} colSpan="2">{getAuditerName(commentList,'总经理')}</td>
             
            </tr>
            
          </tbody>
        </table>
      </div>
      )
  }
}
RenoSubsidyForm.propTypes = {
}
export default RenoSubsidyForm
