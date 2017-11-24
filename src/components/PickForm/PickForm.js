import React from 'react'
import PropTypes from 'prop-types'
import styles from './PickForm.less'
// import cs from 'classnames';
import {changeMoneyToChinese,config,getAuditerName} from '../../utils'
class PickForm extends React.Component {
  render () {
    const { data,employeeList,commentList } = this.props
    const userInfo=JSON.parse(sessionStorage.getItem(`${config.prefix}userInfo`))
    let defaultRows=[],total=0;

    const getCreateDate=()=>{
      let _date=data.createTime && new Date(data.createTime) || new Date();
      return `${_date.getFullYear()}年${_date.getMonth()+1}月${_date.getDate()}日`
    }
    const getRows=data && data.detailList && data.detailList.map((item,index)=>{
      total+=parseFloat(item.pickNum) * parseFloat(item.singlePrice);
      return (
        <tr key={item.id}>
          <td className={styles['tc']}>{item.no || ''}</td>
          <td className={styles['tc']}>{item.spec || ''}</td>
          <td className={styles['tc']}>{item.unit || ''}</td>
          <td className={styles['tc']}>{item.applyNum || ''}</td>
          <td className={styles['tc']}>{item.pickNum || ''}</td>
          <td className={styles['tc']}>{item.singlePrice || ''}</td>
          <td className={styles['tc']}>{(parseFloat(item.pickNum) * parseFloat(item.singlePrice)).toFixed(2) || ''}</td>
          <td className={styles['tc']}>{item.use || ''}</td>
        </tr>
      )
    })
    if(data && data.detailList && data.detailList.length<9){
        for(var i=0;i<(9-data.detailList.length);i++){
          defaultRows.push(
            <tr key={9+i}>
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
        <div className={styles['title']}>领料单
          <span>NO：{data.code}</span>
        </div>
        <table className={styles['table']}>
          <tbody>
            <tr>
              <td className={styles['tl']}>领用部门</td>
              <td className={styles['tc']}>{employeeList.postList&&employeeList.postList[0].orgName}</td>
              <td className={styles['tc']} rowSpan="2" colSpan="6">
                {getCreateDate()}
              </td>
            </tr>
            <tr>
              <td className={styles['tl']}>产品项目</td>
              <td className={styles['tc']}></td>
            </tr>
            <tr>
              <td className={styles['tc']} rowSpan="2">编号</td>
              <td className={styles['tc']} rowSpan="2">名称及规格</td>
              <td className={styles['tc']} rowSpan="2">单位</td>
              <td className={styles['tc']} colSpan="2">数量</td>
              <td className={styles['tc']} rowSpan="2">单价</td>
              <td className={styles['tc']} rowSpan="2">总值</td>
              <td className={styles['tc']} rowSpan="2">用途</td>
            </tr>
            <tr>
              <td className={styles['tc']}>请领</td>
              <td className={styles['tc']}>实领</td>
            </tr>
            {getRows}
            {defaultRows && defaultRows}
            <tr>
              <td className={styles['tc']}>合计</td>
              <td className={styles['tc']}>{total.toFixed(2)}</td>
              <td className={styles['tc']}></td>
              <td className={styles['tc']}></td>
              <td className={styles['tc']}></td>
              <td className={styles['tc']}></td>
              <td className={styles['tc']}></td>
              <td className={styles['tc']}></td>
            </tr>
            <tr>
              <td className={styles['flex']} colSpan="8">
                <div>
                  <span>仓库主管：{getAuditerName(commentList,'仓管')}</span>
                  <span>发料：</span>
                  <span>领料部门负责人：{getAuditerName(commentList,'部门总监')}</span>
                  <span>领料人：{employeeList.realName || ''}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
      )
  }
}
PickForm.propTypes = {
}
export default PickForm
