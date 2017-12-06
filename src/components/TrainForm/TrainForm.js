import React from 'react'
import PropTypes from 'prop-types'
import styles from './TrainForm.less'
// import cs from 'classnames';
import {changeMoneyToChinese,config,getAuditerName} from '../../utils'
class TrainForm extends React.Component {
  render () {
    const { data,employeeList,commentList } = this.props
    const userInfo=JSON.parse(sessionStorage.getItem(`${config.prefix}userInfo`))
    let defaultRows=[],total=0,lecturerFeeTotal=0,toolFeeTotal=0,trafficFeeTotal=0,mealsFeeTotal=0,hotelFeeTotal=0,otherFeeTotal=0;

    const getCreateDate=()=>{
      let _date=data.createTime && new Date(data.createTime) || new Date();
      return `${_date.getFullYear()}年${_date.getMonth()+1}月${_date.getDate()}日`
    }
    const getRows=data && data.detailList && data.detailList.map((item,index)=>{
      lecturerFeeTotal+=parseFloat(item.lecturerFee || 0);
      toolFeeTotal+=parseFloat(item.toolFee || 0);
      trafficFeeTotal+=parseFloat(item.trafficFee || 0);
      mealsFeeTotal+=parseFloat(item.mealsFee || 0);
      hotelFeeTotal+=parseFloat(item.hotelFee || 0);
      otherFeeTotal+=parseFloat(item.otherFee || 0);
      total+=lecturerFeeTotal
            +toolFeeTotal
            +trafficFeeTotal
            +mealsFeeTotal
            +hotelFeeTotal
            +otherFeeTotal;
      return (
        <tr key={item.id}>
          <td className={styles['tc']} colSpan="2">{item.lecturerFee || 0}</td>
          <td className={styles['tc']}>{item.toolFee || 0}</td>
          <td className={styles['tc']}>{item.trafficFee || 0}</td>
          <td className={styles['tc']}>{item.mealsFee || 0}</td>
          <td className={styles['tc']}>{item.hotelFee || 0}</td>
          <td className={styles['tc']}>{item.otherFee || 0}</td>
        </tr>
      )
    })
    if(data && data.detailList && data.detailList.length<3){
        for(var i=0;i<(3-data.detailList.length);i++){
          defaultRows.push(
            <tr key={3+i}>
              <td colSpan="2"></td>
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
        <div className={styles['title']}>培训申请表</div>
        <table className={styles['table']}>
          <tbody>
            <tr>
              <td className={styles['tc']}>申请人</td>
              <td className={styles['tc']} colSpan="2">{employeeList.realName || ''}</td>
              <td className={styles['tc']}>部门</td>
              <td className={styles['tc']}>{employeeList.postList&&employeeList.postList[0].orgName || ''}</td>
              <td className={styles['tc']}>申请时间</td>
              <td className={styles['tc']} colSpan="2">{data.createTime.substr(0,10) || ''}</td>
            </tr>
            <tr>
              <td className={styles['tc']} >培训项目名称</td>
              <td className={styles['tc']} colSpan="7">{data.projectName || ''}</td>
            </tr>
            <tr>
              <td className={styles['tc']} >培训目的</td>
              <td className={styles['tc']} colSpan="7">{data.purpose || ''}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>培训时间</td>
              <td className={styles['tc']} colSpan="2">{data.trainTime || ''}</td>
              <td className={styles['tc']}>培训对象</td>
              <td className={styles['tc']}>{data.trainObj || ''}</td>
              <td className={styles['tc']}>培训方式</td>
              <td className={styles['tc']} colSpan="2">{data.trainWay || ''}</td>
            </tr>
            <tr>
              <td className={styles['tc']} >培训地点</td>
              <td className={styles['tc']} colSpan="7">{data.trainAddress || ''}</td>
            </tr>
            <tr>
              <td className={styles['tc']} rowSpan={data.detailList && data.detailList.length>3?(data.detailList.length+1):4}>培训费用</td>
              <td className={styles['tc']} colSpan="2">本次培训讲师费用</td>
              <td className={styles['tc']} >相关教材/工具费</td>
              <td className={styles['tc']} >相关交通费</td>
              <td className={styles['tc']}>餐饮费</td>
              <td className={styles['tc']}>住宿费</td>
              <td className={styles['tc']}>其他费用</td>
            </tr>
            {getRows}
            {defaultRows && defaultRows}
            <tr>
              <td className={styles['tc']} >小计</td>
              <td className={styles['tc']} colSpan="2">{lecturerFeeTotal.toFixed(2)}</td>
              <td className={styles['tc']} >{toolFeeTotal.toFixed(2)}</td>
              <td className={styles['tc']} >{trafficFeeTotal.toFixed(2)}</td>
              <td className={styles['tc']}>{mealsFeeTotal.toFixed(2)}</td>
              <td className={styles['tc']}>{hotelFeeTotal.toFixed(2)}</td>
              <td className={styles['tc']}>{otherFeeTotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>合计</td>
              <td className={styles['tc']} colSpan="7">{total.toFixed(2)}</td>
            </tr>
            <tr>
              <td className={styles['tc']} >培训提纲</td>
              <td className={styles['tc']} colSpan="7">{data.trainOutline || ''}</td>
            </tr>
            <tr>
              <td className={styles['tc']} >培训评估方式</td>
              <td className={styles['tc']} colSpan="7">{data.evalWay || ''}{data.evalWayRemark?`:${data.evalWayRemark}`:''}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>发起人</td>
              <td className={styles['tc']} colSpan="2">{employeeList.realName  || ''}</td>
              <td className={styles['tc']}>培训讲师</td>
              <td className={styles['tc']}>{getAuditerName(commentList,'培训讲师')}</td>
              <td className={styles['tc']}>招商/主动营销部总监</td>
              <td className={styles['tc']} colSpan="2">{getAuditerName(commentList,'部门总监')}</td>
            </tr>
            
          </tbody>
        </table>
        
      </div>
      )
  }
}
TrainForm.propTypes = {
}
export default TrainForm
