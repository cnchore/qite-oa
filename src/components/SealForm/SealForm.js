import React from 'react'
import PropTypes from 'prop-types'
import styles from './SealForm.less'
// import cs from 'classnames';
import {changeMoneyToChinese,config,getAuditerName} from '../../utils'
class SealForm extends React.Component {
  render () {
    const { data,employeeList,dicList,commentList } = this.props
    const userInfo=JSON.parse(sessionStorage.getItem(`${config.prefix}userInfo`))
    let defaultRows=[],total=0;

    const getCreateDate=()=>{
      let _date=data.createTime && new Date(data.createTime) || new Date();
      return `${_date.getFullYear()}年${_date.getMonth()+1}月${_date.getDate()}日`
    }
    const getDicType=(value,remark=null)=>{
      let n=dicList.filter(item=>String(item.dicValue)===String(value));
      if(n && n[0]){
        return n[0].dicName;
      }
      return '';
    }
    return (
      <div >
        <div className={styles['title']}>印章使用申请表</div>
        <table className={styles['table']}>
          <tbody>
            <tr>
              <td className={styles['tc-span10']}>印章类别</td>
              <td className={styles['tc']}>{getDicType(data.type) || ''}</td>
              <td className={styles['tc']}>承办人</td>
              <td className={styles['tc']}>{employeeList.realName || ''}</td>
              <td className={styles['tc']}>申请时间</td>
              <td className={styles['tc']}>{data.createTime && data.createTime.substr(0,10) || ''}</td>
            </tr>
            <tr>
              <td className={styles['tc']} rowSpan="5">用章事由（名称、摘要）</td>
              <td className={styles['tc']} rowSpan="4" colSpan="3">{data.reason || ''}</td>
              <td className={styles['tc']}>部门负责人</td>
              <td className={styles['tc']}>{getAuditerName(commentList,'部门总监')}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>财务总监</td>
              <td className={styles['tc']}>{getAuditerName(commentList,'财务部总监')}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>营销总经理</td>
              <td className={styles['tc']}>{getAuditerName(commentList,'营销副总')}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>总经理</td>
              <td className={styles['tc']}>{getAuditerName(commentList,'总经理')}</td>
            </tr>
            <tr>
              <td className={styles['tc']} colSpan="3">
                上述材料共计    式     份
              </td>
              <td className={styles['tc']}>是否外带</td>
              <td className={styles['tc']}>{Boolean(data.isTakeOut)?'是':'否'}</td>
            </tr>
          </tbody>
        </table>
      </div>
      )
  }
}
SealForm.propTypes = {
}
export default SealForm
