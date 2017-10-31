import React from 'react'
import PropTypes from 'prop-types'
// import { parse } from 'qs'
import styles from './index.css'
import PurchaseApplyForm from '../../components/PurchaseApplyForm'
import PaymentForm from '../../components/PaymentForm'
import PurchaseForm from '../../components/PurchaseForm'
import ReimburseForm from '../../components/ReimburseForm'
import TravelReimburseForm from '../../components/TravelReimburseForm'
import BudgetForm from '../../components/BudgetForm'
import AdReimburseForm from '../../components/AdReimburseForm'
import AdForm from '../../components/AdForm'
import SalesPromotionForm from '../../components/SalesPromotionForm'

import cs from 'classnames'
class Print extends React.Component {
  render () {
		window.document.title='表单打印';
		let printData=JSON.parse(sessionStorage.getItem('printData')),
				printForm='',
				isA4=false;
		if(printData && printData.busiData && printData.busiData.code){
			switch(printData.busiData.code.substr(0,2)){
				case 'TR':
					printForm=<TravelReimburseForm data={printData.busiData} employeeList={printData.employeeList} dicList={printData.dicList} commentList={printData.commentList}/>
					isA4=true;
					break;
				case 'PT':
					printForm=<PaymentForm data={printData.busiData} employeeList={printData.employeeList} commentList={printData.commentList}></PaymentForm>
					break;
				case 'RE':
					printForm=<ReimburseForm  data={printData.busiData} employeeList={printData.employeeList} commentList={printData.commentList}></ReimburseForm>
					break;
				case 'BD':
					printForm=<BudgetForm  data={printData.busiData} employeeList={printData.employeeList} commentList={printData.commentList}></BudgetForm>
					isA4=true;
					break;
				case 'PE':
					printForm=<PurchaseForm data={printData.busiData} employeeList={printData.employeeList} commentList={printData.commentList}></PurchaseForm>
					isA4=true;
					break;
				case 'PA':
					printForm=<PurchaseApplyForm data={printData.busiData} employeeList={printData.employeeList} commentList={printData.commentList}></PurchaseApplyForm>
					break;
				case 'AR'://广告费用报销
					printForm=<AdReimburseForm data={printData.busiData} employeeList={printData.employeeList} commentList={printData.commentList}></AdReimburseForm>
					// isA4=true;
					break;
				case 'AD'://广告投放
					printForm=<AdForm data={printData.busiData} employeeList={printData.employeeList} commentList={printData.commentList}></AdForm>
					// isA4=true;
					break;
				case 'SP'://促销活动支持
					printForm=<SalesPromotionForm data={printData.busiData} employeeList={printData.employeeList} commentList={printData.commentList}></SalesPromotionForm>
					// isA4=true;
					break;
					
			}
		}else{
			return <div>错误：无可打印表单</div>
		}
	  ///report?ShowReport.wx&PAGEID=userOrgInfo
	  // const query=parse(location.hash.split('#/report?')[1]);
	  // const iframeHeight=document.body.offsetHeight-47-64-48-24+'px';
	  // const iframeSrc=window.location.origin+'/qite/'+Object.keys(query)[0]+'?'+location.hash.split('ShowReport.wx&')[1];
    return  (
    	<div className={styles[isA4?'print-container-a4':'print-container']}>
    		<header></header>
    		<div className={styles['print-btn']}>
    			<button type="button" className='ant-btn ant-btn-primary ant-btn-lg' onClick={window.print}>打印</button>
    		</div>
    		<div className={styles['print-content']}>
    			{printForm}
    		</div>
    		<footer></footer>
    	</div>
    )
  }
}


Print.propTypes = {
  
}

export default Print
