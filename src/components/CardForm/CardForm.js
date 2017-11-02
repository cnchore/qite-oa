import React from 'react'
import PropTypes from 'prop-types'
import styles from './CardForm.less'
// import cs from 'classnames';
import {changeMoneyToChinese,config} from '../../utils'
class CardForm extends React.Component {
  render () {
    const { data,employeeList } = this.props
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
          <td className={styles['tc']}>{item.num || ''}</td>
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
              <td className={styles['tc']} >QQ</td>
              <td className={styles['tc']} >邮箱</td>
              <td className={styles['tc']} >数量(盒)</td>
            </tr>
            {getRows}
            {defaultRows && defaultRows}
            <tr>
              <td className={styles['tc']} rowSpan="2" colSpan="2">备注</td>
              <td className={styles['tl']} rowSpan="2" colSpan="4">
                座机号：{data.planeNumber || ''}<br/>
                {data.remark || ''}
              </td>
              <td className={styles['tc']} colSpan="2">需要日期</td>
            </tr>
            <tr>
              <td className={styles['tc']} colSpan="2">{data.needTime || ''}</td>
            </tr>
            <tr>
              <td className={styles['tc']} colSpan="2">申请人确认</td>
              <td className={styles['tc']} colSpan="2">{employeeList.realName  || ''}</td>
              <td className={styles['tc']} colSpan="2">设计师签证</td>
              <td className={styles['tc']} colSpan="2"></td>
              
            </tr>
            <tr>
              <td className={styles['tl']} colSpan="8">注：发起人－平面设计师</td>
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
