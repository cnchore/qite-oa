
import React from 'react'
import PropTypes from 'prop-types'
import styles from './UrgentOrderForm.less'
// import cs from 'classnames';
import {config,getAuditerName} from '../../utils'
class UrgentOrderForm extends React.Component {
  render () {
    const { data,employeeList,commentList,dicList } = this.props
    const userInfo=JSON.parse(sessionStorage.getItem(`${config.prefix}userInfo`))
    let defaultRows=[],total=0;

    const getCreateDate=()=>{
      let _date=data.createTime && new Date(data.createTime) || new Date();
      return `${_date.getFullYear()}年${_date.getMonth()+1}月${_date.getDate()}日`
    }
    const getCodeTypeName=(text)=>{
      let _list=dicList && dicList[0]?dicList.filter(f=>String(f.dicValue)===String(text)):null;
      return _list?_list[0].dicName:'无';
    }
    return (
      <div >
        <div className={styles['title']}>订单加急申请表</div>
        <table className={styles['table']}>
          <tbody>
            <tr>
              <td className={styles['tc']}>订单类型</td>
              <td className={styles['tl']} colSpan="5">{getCodeTypeName(data.codeType) || '无'}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>经销商区域</td>
              <td className={styles['tc']} colSpan="3">{data.agentArea || '无'}</td>
              <td className={styles['tc']} >经销商姓名</td>
              <td className={styles['tc']}>{data.agentName || '无'}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>申请日期</td>
              <td className={styles['tc']}>{data.createTime&&data.createTime.substr(0,10) || '无'}</td>
              <td className={styles['tc']}>厂交货日期</td>
              <td className={styles['tc']}>{data.deliveryDate && data.deliveryDate.substr(0,10) || '无'}</td>
              <td className={styles['tc']}>提前天数</td>
              <td className={styles['tc']}>{data.aheadDay || '无'}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>订单单号</td>
              <td className={styles['tl']} colSpan="5">{data.urgentCode || '无'}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>加急原因</td>
              <td className={styles['tl']} colSpan="5">{data.urgentReason || '无'}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>申请类别</td>
              <td className={styles['tl']} colSpan="5">{data.applyType==='2'?'特急':'加急'}</td>
            </tr>
            
            <tr>
              <td className={styles['tc']} >申请人</td>
              <td className={styles['tc']} >{employeeList.realName || '无'}</td>
              <td className={styles['tc']} >部门负责人</td>
              <td className={styles['tc']} >{getAuditerName(commentList,'部门总监')}</td>
              <td className={styles['tc']} >订单中心经理</td>
              <td className={styles['tc']} >{getAuditerName(commentList,'订单中心经理')}</td>
            </tr>
            <tr>
              <td  className={styles['tc']}>营销中心副经理</td>
              <td className={styles['tc']} colSpan="5">{getAuditerName(commentList,'营销副总')}</td>
            </tr>
            <tr>
              <td  className={styles['tc']}>PMC经理</td>
              <td className={styles['tc']} colSpan="5">{getAuditerName(commentList,'PMC经理')}</td>
            </tr>
             <tr>
              <td  className={styles['tc']}>制造中心总监</td>
              <td className={styles['tc']} colSpan="5">{getAuditerName(commentList,'制造中心总监')}</td>
            </tr>
          </tbody>
        </table>
      </div>
      )
  }
}
UrgentOrderForm.propTypes = {
}
export default UrgentOrderForm
