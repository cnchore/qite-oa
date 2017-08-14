import React from 'react'
import PropTypes from 'prop-types'
import styles from './PurchaseApplyForm.less'
import cs from 'classnames';
class PurchaseApplyForm extends React.Component {
  render () {
    const { data,employeeList } = this.props
    const getTable=()=>{
      let defaultRows={};
      let rows=data && data.purchaseDetailList && data.purchaseDetailList.map((item,index)=>(
        <tr key={item.id}>
          <td>{index+1}</td>
          <td>{ item.materialName && item.materialName}</td>
          <td>{item.spec && item.spec}</td>
          <td>{item.num && item.num}</td>
          <td>{item.unit && item.unit}</td>
          <td>{item.useTime && item.useTime.substr(5,5)}</td>
          <td>{item.remark}</td>
        </tr>
        )
      )
      // if(data && data.purchaseDetailList && data.purchaseDetailList.length<5){
      //   for(var i=0;i<(5-data.purchaseDetailList.length);i++){
      //     defaultRows.push
      //   }
      // }
      return (
        <table className={styles['table']}>
          <tr>
            <td>序号</td>
            <td>物料名称</td>
            <td>规格</td>
            <td>数量</td>
            <td>单位</td>
            <td>需用日期</td>
            <td>请购原因及用途</td>
          </tr>
          {rows}

        </table>
      )
    }
    return (
      <div className={styles['contanier']}>
        <div className={styles['header']}>
          <h1>请购单</h1>
          <p>2017年8月14日</p>
        </div>
        {getTable()}
        <div className={styles['footer']}>
          <span>批准</span>
          <span>复核</span>
          <span>制单：{employeeList && employeeList.realName && employeeList.realName}</span>
        </div>
      </div>
      )
  }
}
PurchaseApplyForm.propTypes = {
}
export default PurchaseApplyForm
