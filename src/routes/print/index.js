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
import RenoSubsidyForm from '../../components/RenoSubsidyForm'
import ShopUpgradeForm from '../../components/ShopUpgradeForm'
import OpenForm from '../../components/OpenForm'
import ShopForm from '../../components/ShopForm'
import MaterialSupportForm from '../../components/MaterialSupportForm'
import SampleReplaceForm from '../../components/SampleReplaceForm'
import CardForm from '../../components/CardForm'
import SealForm from '../../components/SealForm'
import TrainForm from '../../components/TrainForm'
import TravelForm from '../../components/TravelForm'
import PickForm from '../../components/PickForm'
import MaterialGiftForm from '../../components/MaterialGiftForm'
import SampleRoomForm from '../../components/SampleRoomForm'
import PromotionExpenseForm from '../../components/PromotionExpenseForm'
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
				case 'TR'://差旅费报销
					printForm=<TravelReimburseForm data={printData.busiData} employeeList={printData.employeeList} dicList={printData.dicList} commentList={printData.commentList}/>
					// isA4=true;
					break;
				case 'PT'://付款申请
					printForm=<PaymentForm data={printData.busiData} employeeList={printData.employeeList} commentList={printData.commentList}></PaymentForm>
					break;
				case 'RE'://报销申请
					printForm=<ReimburseForm  data={printData.busiData} employeeList={printData.employeeList} commentList={printData.commentList}></ReimburseForm>
					break;
				case 'BD'://预算
					printForm=<BudgetForm  data={printData.busiData} employeeList={printData.employeeList} commentList={printData.commentList}></BudgetForm>
					// isA4=true;
					break;
				case 'PE'://采购申请
					printForm=<PurchaseForm data={printData.busiData} employeeList={printData.employeeList} commentList={printData.commentList}></PurchaseForm>
					isA4=true;
					break;
				case 'PA'://申购
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
				case 'PX'://促销活动费用报销
					printForm=<PromotionExpenseForm data={printData.busiData} employeeList={printData.employeeList} commentList={printData.commentList}></PromotionExpenseForm>
					// isA4=true;
					break;
				case 'SM'://样板房折扣申请
					printForm=<SampleRoomForm data={printData.busiData} employeeList={printData.employeeList} commentList={printData.commentList}></SampleRoomForm>
					isA4=true;
					break;
				case 'MG'://常规物料及礼品制作
					printForm=<MaterialGiftForm data={printData.busiData} employeeList={printData.employeeList} commentList={printData.commentList}></MaterialGiftForm>
					// isA4=true;
					break;
				case 'TN'://常规物料及礼品制作
					printForm=<TrainForm data={printData.busiData} employeeList={printData.employeeList} commentList={printData.commentList}></TrainForm>
					// isA4=true;
					break;
				case 'CD'://名片制作
					printForm=<CardForm data={printData.busiData} employeeList={printData.employeeList} commentList={printData.commentList}></CardForm>
					isA4=true;
					break;
				case 'SR'://售后问题处理
					printForm=<SampleReplaceForm data={printData.busiData} employeeList={printData.employeeList} commentList={printData.commentList}></SampleReplaceForm>
					isA4=true;
					break;
				case 'MS'://物料支持自助
					printForm=<MaterialSupportForm data={printData.busiData} employeeList={printData.employeeList} commentList={printData.commentList}></MaterialSupportForm>
					// isA4=true;
					break;
				case 'OP'://开业支持
					printForm=<OpenForm data={printData.busiData} employeeList={printData.employeeList} commentList={printData.commentList}></OpenForm>
					// isA4=true;
					break;
				case 'SU'://店面升级自助申请
					printForm=<ShopUpgradeForm data={printData.busiData} employeeList={printData.employeeList} commentList={printData.commentList}></ShopUpgradeForm>
					// isA4=true;
					break;
				case 'RS'://店面装修补贴费用申请
					printForm=<RenoSubsidyForm data={printData.busiData} employeeList={printData.employeeList} commentList={printData.commentList}></RenoSubsidyForm>
					// isA4=true;
					break;
				case 'SH'://建店申请
					printForm=<ShopForm data={printData.busiData} employeeList={printData.employeeList} commentList={printData.commentList}></ShopForm>
					isA4=true;
					break;
				case 'TL'://出差申请
					printForm=<TravelForm data={printData.busiData} employeeList={printData.employeeList} dicList={printData.dicList} commentList={printData.commentList}/>
					// isA4=true;
					break;
				case 'SL'://印章使用申请
					printForm=<SealForm data={printData.busiData} employeeList={printData.employeeList} commentList={printData.commentList} dicList={printData.dicList}></SealForm>
					// isA4=true;
					break;
				case 'PP'://领料单
					printForm=<PickForm data={printData.busiData} employeeList={printData.employeeList} commentList={printData.commentList}></PickForm>
					isA4=true;
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
