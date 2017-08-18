import React from 'react'
import PropTypes from 'prop-types'
import styles from './PurchaseForm.less'
// import cs from 'classnames';
import {config} from '../../utils'
import aylson from '../../../assets/aylson.png'
class PurchaseForm extends React.Component {
  render () {
    const { data,employeeList } = this.props
    const userInfo=JSON.parse(sessionStorage.getItem(`${config.prefix}userInfo`))
    const getTable=()=>{
      let defaultRows=[];
      let rows=data && data.purchaseDetailList && data.purchaseDetailList.map((item,index)=>{
        let t=parseFloat(item.purchaseNum ? item.purchaseNum : item.num)*parseFloat(item.amount!==undefined&&item.amount!==null&&item.amount!==''?item.amount:0);
        return (
          <tr key={item.id}>
            <td>{index+1}</td>
            <td>{item.applyDept && item.applyDept}</td>
            <td>{item.applyName && item.applyName}</td>
            <td>{item.materialName && item.materialName}</td>
            <td>{item.spec && item.spec}</td>
            <td>{item.purchaseNum ? item.purchaseNum : item.num}</td>
            <td>{item.unit && item.unit}</td>
            <td>{item.amount && item.amount}</td>
            <td>{t&&t.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
            <td>{item.useTime && item.useTime.substr(5,5)}</td>
            <td>{item.remark}</td>
          </tr>
        )
        }
      )
      if(data && data.purchaseDetailList && data.purchaseDetailList.length<5){
        for(var i=0;i<(5-data.purchaseDetailList.length);i++){
          defaultRows.push(
            <tr key={5+i}>
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
        <table className={styles['table']}>
          <tr>
            <td className={styles['t1']}>序号</td>
            <td className={styles['t2']}>申购部门</td>
            <td className={styles['t1']}>申购人</td>
            <td className={styles['t2']}>物料名称</td>
            <td className={styles['t1']}>规格</td>
            <td className={styles['t1']}>数量</td>
            <td className={styles['t1']}>单位</td>
            <td className={styles['t1']}>单价</td>
            <td className={styles['t1']}>金额</td>
            <td className={styles['t2']}>需用日期</td>
            <td className={styles['t4']}>请购原因及用途</td>
          </tr>
          {rows}
          {defaultRows && defaultRows}
        </table>
      )
    }
    const getCreateDate=()=>{
      let _date=data.createTime && new Date(data.createTime) || new Date();
      return `${_date.getFullYear()}年${_date.getMonth()}月${_date.getDate()}日`
    }
    return (
      <div className={styles['contanier']}>
        <div className={styles['header']}>
          <img src={aylson}/>
          <div>
            <h1>采购单</h1>
            <p>{getCreateDate()}</p>
          </div>
        </div>
        {getTable()}
        <div className={styles['footer']}>
          <span>批准</span>
          <span>复核</span>
          <span>制单：{userInfo && userInfo.data && userInfo.data.employeeVo && userInfo.data.employeeVo.realName && userInfo.data.employeeVo.realName}</span>
        </div>
      </div>
      )
  }
}
PurchaseForm.propTypes = {
}
export default PurchaseForm
