import React from 'react'
import PropTypes from 'prop-types'
import styles from './MaterialSupportForm.less'
// import cs from 'classnames';
import {changeMoneyToChinese,config} from '../../utils'
class MaterialSupportForm extends React.Component {
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
          <td className={styles['tc']} colSpan="3">{item.materialName || ''}</td>
          <td className={styles['tc']} colSpan="3">{item.materialSize && item.materialSize}</td>
          <td className={styles['tc']} colSpan="2">{item.num && item.num}</td>
        </tr>
      )
    })
    if(data && data.detailList && data.detailList.length<10){
        for(var i=0;i<(10-data.detailList.length);i++){
          defaultRows.push(
            <tr key={10+i}>
              <td colSpan="3"></td>
              <td colSpan="3"></td>
              <td colSpan="2"></td>
            </tr>
          )
        }
      }
    return (
      <div >
        <div className={styles['title']}>艾臣物料支持自助申请表</div>
        <table className={styles['table']}>
          <tbody>
            <tr>
              <td className={styles['tc']}>申请部门</td>
              <td className={styles['tc']}>{employeeList.postList&&employeeList.postList[0].orgName || ''}</td>
              <td className={styles['tc']}>申请人</td>
              <td className={styles['tc']}>{employeeList.realName || ''}</td>
              <td className={styles['tc']}>联系电话</td>
              <td className={styles['tc']}>{employeeList.mobilePhone || ''}</td>
              <td className={styles['tc']}>申请日期</td>
              <td className={styles['tc']}>{data.createTime.substr(0,10) || ''}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>物料类型</td>
              <td className={styles['tc']}>{data.materialType || ''}</td>
              <td className={styles['tc']}>物料设计</td>
              <td className={styles['tc']}>{data.materialDesign || ''}</td>
              <td className={styles['tc']}>物料制作</td>
              <td className={styles['tc']}>{data.materialMake || ''}</td>
              <td className={styles['tc']}>物料费用</td>
              <td className={styles['tc']}>{data.materialCost || ''}</td>
            </tr>
            <tr>
              <td className={styles['tc']}>物料用途</td>
              <td className={styles['tc']} colSpan="2">{data.materialUse || ''}</td>
              <td className={styles['tc']}>申请完成时间</td>
              <td className={styles['tc']} colSpan="2">{data.finishTime || ''}</td>
              <td className={styles['tc']}>发货方式</td>
              <td className={styles['tc']}>{data.delivery || ''}</td>
            </tr>
            <tr>
              <td className={styles['tc']} colSpan="8">物料明细及数量</td>
            </tr>
            <tr>
              <td className={styles['tc']} colSpan="3">物料名称</td>
              <td className={styles['tc']} colSpan="3">材质/尺寸</td>
              <td className={styles['tc']} colSpan="2">数量</td>
            </tr>
            {getRows}
            {defaultRows && defaultRows}
            <tr>
              <td className={styles['tc']} colSpan="8">物料要求关键点</td>
            </tr>
            <tr>
              <td className={styles['tc']} colSpan="8">{data.remark || ''}</td>
            </tr>
            <tr>
              
              <td className={styles['tc']} colSpan="2">区域负责人审批</td>
              <td className={styles['tc']} colSpan="10"></td>
            </tr>
            <tr>
              
              <td className={styles['tc']} colSpan="2">运营部总监审批</td>
              <td className={styles['tc']} colSpan="10"></td>
            </tr>
          </tbody>
        </table>
        
      </div>
      )
  }
}
MaterialSupportForm.propTypes = {
}
export default MaterialSupportForm
