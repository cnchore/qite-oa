import React from 'react'
import PropTypes from 'prop-types'
import styles from './CardForm.less'
// import cs from 'classnames';
import {changeMoneyToChinese,config,getAuditerName} from '../../utils'
class CardForm extends React.Component {
  render () {
    const { data,employeeList,commentList } = this.props
    const userInfo=JSON.parse(sessionStorage.getItem(`${config.prefix}userInfo`))
    let defaultRows=[],total=0;

    const getCreateDate=()=>{
      let _date=data.createTime && new Date(data.createTime) || new Date();
      return `${_date.getFullYear()}年${_date.getMonth()+1}月${_date.getDate()}日`
    }
    const getRows=data && data.detailList && data.detailList.map((item,index)=>{
      
      return (
        <tr key={item.id}>
          <td className={styles['tc']}>{index+1 || ''}</td>
          <td className={styles['tc']}>{item.name || ''}</td>
          <td className={styles['tc']}>{item.deptName || ''}</td>
          <td className={styles['tc']}>{item.postName || ''}</td>
          <td className={styles['tc']}>{item.phone || ''}</td>
          <td className={styles['tc']}>{item.qq || ''}</td>
          <td className={styles['tc']}>{item.email || ''}</td>
          <td className={styles['tc']}>{item.edition || ''}</td>
          <td className={styles['tc']}>{item.group || ''}</td>
        </tr>
      )
    })
    if(data && data.detailList && data.detailList.length<6){
        for(var i=0;i<(6-data.detailList.length);i++){
          defaultRows.push(
            <tr key={6+i}>
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
        <div className={styles['title']}>名片制作申请表</div>
        <div className={styles['header']}>申请日期：{getCreateDate()}</div>

        <table className={styles['table']}>
          <tbody>
            
            <tr>
              <td className={styles['tc']} >序号</td>
              <td className={styles['tc']} >姓名</td>
              <td className={styles['tc']} >部门</td>
              <td className={styles['tc']} >职位名称</td>
              <td className={styles['tc']} >联系电话</td>
              <td className={styles['tc']} >微信/QQ</td>
              <td className={styles['tc']} >邮箱</td>
              <td className={styles['tc']} >艾臣/艾厨/通用版本</td>
              <td className={styles['tc']} >战队</td>
            </tr>
            {getRows}
            {defaultRows && defaultRows}
            <tr>
              <td className={styles['tc']} rowSpan="2" colSpan="2">备注</td>
              <td className={styles['tl']} rowSpan="2" colSpan="4">
                座机号：{data.planeNumber || ''}<br/>
                {data.remark || ''}
              </td>
              <td className={styles['tc']} colSpan="3">需要日期</td>
            </tr>
            <tr>
              <td className={styles['tc']} colSpan="3">{data.needTime || ''}</td>
            </tr>
            <tr>
              <td className={styles['tc']} colSpan="2">申请人</td>
              <td className={styles['tc']} colSpan="2">{employeeList.realName  || ''}</td>
              <td className={styles['tc']} colSpan="2">申请人部门负责人签名</td>
              <td className={styles['tc']} colSpan="3">{getAuditerName(commentList,'部门总监')}</td>
              
            </tr>
            <tr>
              <td className={styles['tl']} colSpan="9">注：</td>
            </tr>
          </tbody>
        </table>
        
      </div>
      )
  }
}
CardForm.propTypes = {
}
export default CardForm
