import React from 'react'
import PropTypes from 'prop-types'
import styles from './TravelForm.less'
// import cs from 'classnames';
import {changeMoneyToChinese,config,getAuditerName} from '../../utils'
class TravelForm extends React.Component {
  render () {
    const { data,employeeList,dicList,commentList } = this.props
    const userInfo=JSON.parse(sessionStorage.getItem(`${config.prefix}userInfo`))
    let defaultRows=[],total=0,lecturerFeeTotal=0,toolFeeTotal=0,trafficFeeTotal=0,mealsFeeTotal=0,hotelFeeTotal=0,otherFeeTotal=0;

    const getCreateDate=()=>{
      let _date=data.createTime && new Date(data.createTime) || new Date();
      return `${_date.getFullYear()}年${_date.getMonth()+1}月${_date.getDate()}日`
    }
    const getDicType=(value,remark=null)=>{
      let n=dicList.filter(item=>String(item.dicValue)===String(value));
      //console.log(orgList,...n,value);
      if(n && n[0]){
        return remark&&n[0].dicName==='其他'?remark:n[0].dicName;
      }
      return '';
    }
    return (
      <div >
        <div className={styles['title']}>出差申请表</div>
        <div className={styles['header']}>申报日期：{getCreateDate()}</div>
        <table className={styles['table']}>
          <tbody>
            <tr>
              <td className={styles['tc']}>申请人姓名</td>
              <td className={styles['tc']}>{employeeList.realName || ''}</td>
              <td className={styles['tc']}>所属部门</td>
              <td className={styles['tc']}>{employeeList.postList&&employeeList.postList[0].orgName || ''}</td>
              <td className={styles['tc']}>所属岗位</td>
              <td className={styles['tc']}>{employeeList.postList&&employeeList.postList[0].postName || ''}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>同行人员姓名</td>
              <td className={styles['tl']} colSpan="5">{data.colleaguesNames || ''}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>预计出差时间</td>
              <td className={styles['tl']} colSpan="5">
                {data.travelTimeStart || ''}
                至
                {data.travelTimeEnd || ''}
                ，共 {data.travelHours || 0} 天
              </td>
            </tr>
            <tr>
              <td className={styles['tc']}>出差省市与地区</td>
              <td className={styles['tl']} colSpan="5">
                {data.province || ''}
                {data.city || ''}
                {data.area || ''}
                {data.address || ''}
              </td>
            </tr>
            <tr>
              <td className={styles['tc']}>拜访客户名单</td>
              <td className={styles['tl']} colSpan="5">{data.customers || ''}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>出差事由</td>
              <td className={styles['tl']} colSpan="5">{data.remark || ''}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>出行方式</td>
              <td className={styles['tl']} colSpan="5">{getDicType(data.tripMode, data.tripModeRemark) || ''}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>申请出差费用</td>
              <td className={styles['tl']} colSpan="5">
                {changeMoneyToChinese(data.expense)}
                ，¥ {data.expense || ''}元
              </td>
            </tr>
            <tr>
              <td className={styles['tc']}>部门审核</td>
              <td className={styles['tl']} colSpan="5">{getAuditerName(commentList,'中心总监审批')}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>行政人事部审核</td>
              <td className={styles['tl']} colSpan="5"></td>
            </tr>
            <tr>
              <td className={styles['tc']}>审核费用</td>
              <td className={styles['tl']} colSpan="5"></td>
            </tr>
            <tr>
              <td className={styles['tc']}>部门文职签收备案</td>
              <td className={styles['tc']} colSpan="2"></td>
              <td className={styles['tl']}>签收</td>
              <td className={styles['tc']}></td>
              <td className={styles['tl']}>日期</td>
            </tr>
            <tr>
              <td className={styles['flex']} colSpan="6">
                <div>说明：</div>
                <div>
                  <p>1、此申请表作为借款、核销必备凭证。</p>
                  <p>2、如出差途中变更行程计划需及时汇报。</p>
                  <p>3、出差申请表须在接到申请后48小时内批复。</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
      )
  }
}
TravelForm.propTypes = {
}
export default TravelForm
