import React from 'react'
import PropTypes from 'prop-types'
import styles from './SampleReplaceForm.less'
// import cs from 'classnames';
import {changeMoneyToChinese,config,getAuditerName} from '../../utils'
class SampleReplaceForm extends React.Component {
  render () {
    const { data,employeeList,commentList } = this.props
    const userInfo=JSON.parse(sessionStorage.getItem(`${config.prefix}userInfo`))
    let defaultRows=[],total=0,discountAmount=0;

    const getCreateDate=()=>{
      let _date=data.createTime && new Date(data.createTime) || new Date();
      return `${_date.getFullYear()}年${_date.getMonth()+1}月${_date.getDate()}日`
    }
    const getTable=()=>data && data.detailList && data.detailList.map((item,index)=>{
      let amount=parseFloat(item.num)*parseFloat(item.areas)*parseFloat(item.singlePrice);
      total+=amount;
      // discountAmount=total*parseFloat(data.applyDiscount);
    return  <tr key={index}>
        <td className={styles['tc']}>{item.productName || ''}</td>
        <td className={styles['tc']}>{item.width || ''}</td>
        <td className={styles['tc']}>{item.height || ''}</td>
        <td className={styles['tc']}>{item.num || ''}</td>
        <td className={styles['tc']}>{item.areas || ''}</td>
        <td className={styles['tc']}>{item.singlePrice || ''}</td>
        <td className={styles['tc']}>{amount.toFixed(2) || ''}</td>
        <td className={styles['tc']}>{item.thickness || ''}</td>
        <td className={styles['tc']}>{item.color || ''}</td>
        <td className={styles['tc']}>{item.parts || ''}</td>
        <td className={styles['tc']}>{item.glassInfo || ''}</td>
        <td className={styles['tc']}>{item.waistLine || ''}</td>
      </tr>
    }
    )
    if(data && data.detailList && data.detailList.length<10){
      for (var i = 0; i <(10-data.detailList.length); i++) {
        defaultRows.push(
          <tr key={`detailrow${i}`}>
            <td></td>
            <td></td>
            <td></td>
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
        <div className={styles['title']}>样品更换申请表（质量问题）</div>
        <div className={styles['header']}>时间：{getCreateDate()}</div>
        <table className={styles['table']}>
          <tbody>
            <tr>
              <td className={styles['tc-span15']}>部门</td>
              <td className={styles['tc']} colSpan="2">{employeeList.postList&&employeeList.postList[0].orgName || '无'}</td>
              <td className={styles['tc']} colSpan="2">申请人</td>
              <td className={styles['tc']} colSpan="3">{employeeList.realName || '无'}</td>
              <td className={styles['tc']} colSpan="2">联系电话</td>
              <td className={styles['tc']} colSpan="2">{employeeList.mobilePhone || '无'}</td>
            </tr>
            <tr>
              <td className={styles['tc-span15']}>专卖店</td>
              <td className={styles['tc']} colSpan="2">{data.shopName || '无'}</td>
              <td className={styles['tc']} colSpan="2">联系人</td>
              <td className={styles['tc']} colSpan="3">{data.clientName || '无'}</td>
              <td className={styles['tc']} colSpan="2">联系电话</td>
              <td className={styles['tc']} colSpan="2">{data.clientPhone || '无'}</td>
            </tr>
            
            <tr>
              <td className={styles['tc']}>样品更换原由</td>
              <td colSpan='11' className={styles['tc']}>{data.applyReason || '无'}</td>
            </tr>
            <tr>
              <td className={styles['tc']} >产品系列名称</td>
              <td className={styles['tc']} >宽（mm）</td>
              <td className={styles['tc']} >高（mm）</td>
              <td className={styles['tc']} >数量樘/个 </td>
              <td className={styles['tc']} >面积（㎡）</td>
              <td className={styles['tc']} >单价（元/㎡）</td>
              <td className={styles['tc']} >金额</td>
              <td className={styles['tc']} >型材壁厚（T）</td>
              <td className={styles['tc']} >门窗颜色</td>
              <td className={styles['tc']} >配件厂家</td>
              <td className={styles['tc']} >玻璃规格及颜色</td>
              <td className={styles['tc']} >格条及腰线</td>
            </tr>
            {getTable()}
            {defaultRows && defaultRows}
            <tr>
              <td colSpan='6' className={styles['tc']}>金额总计（RMB）</td>
              <td colSpan='6' className={styles['tc']}>¥ {total.toFixed(2) || '0'}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>备注</td>
              <td colSpan='11' className={styles['tc']}>{data.remark || '无'}</td>
            </tr>
            
            <tr>
              <td className={styles['tc']} >发起人</td>
              <td className={styles['tc']} colSpan="2">{employeeList.realName || '无'}</td>
              <td className={styles['tc']} colSpan="2">部门主管</td>
              <td className={styles['tc']} colSpan="2">{getAuditerName(commentList,'当区负责人')}</td>
              <td className={styles['tc']} colSpan="3">售后部</td>
              <td className={styles['tc']} colSpan="2">{getAuditerName(commentList,'售后部专员')}</td>
            </tr>
            <tr>
              <td className={styles['tc']} >品质部</td>
              <td className={styles['tc']} colSpan="2">{getAuditerName(commentList,'品质部经理')}</td>
              <td className={styles['tc']} colSpan="2">制造部</td>
              <td className={styles['tc']} colSpan="2">{getAuditerName(commentList,'制造中心总监')}</td>
              <td className={styles['tc']} colSpan="3">客服部</td>
              <td className={styles['tc']} colSpan="2">{getAuditerName(commentList,'订单中心经理')}</td>
            </tr>
            <tr>
              <td className={styles['tc']} >研发部</td>
              <td className={styles['tc']} colSpan="2">{getAuditerName(commentList,'技术服务中心经理')}</td>
              <td className={styles['tc']} colSpan="2">主动营销部</td>
              <td className={styles['tc']} colSpan="2">{getAuditerName(commentList,'部门总监')}</td>
              <td className={styles['tc']} colSpan="3">营销总经理</td>
              <td className={styles['tc']} colSpan="2">{getAuditerName(commentList,'营销副总')}</td>
            </tr>
            <tr>
              <td className={styles['tc']} >总经理</td>
              <td className={styles['tc']} colSpan="11">{getAuditerName(commentList,'总经理')}</td>
            </tr>
            
          </tbody>
        </table>
      </div>
      )
  }
}
SampleReplaceForm.propTypes = {
}
export default SampleReplaceForm
