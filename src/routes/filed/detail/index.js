import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import cs from 'classnames'
import styles from './index.less'
import { Row,Col,Icon} from 'antd'
import MissClockDetailPage from '../../../components/MissClockDetailPage'
import SalaryChangeDetailPage from '../../../components/SalaryChangeDetailPage'
import LeaveDetailPage from '../../../components/LeaveDetailPage'
import OverTimeDetailPage from '../../../components/OverTimeDetailPage'
import TravelDetailPage from '../../../components/TravelDetailPage'
import DimissionDetailPage from '../../../components/DimissionDetailPage'
import RegularDetailPage from '../../../components/RegularDetailPage'
import TravelReimburseDetailPage from '../../../components/TravelReimburseDetailPage'
import ContractDetailPage from '../../../components/ContractDetailPage'
import UseCarDetailPage from '../../../components/UseCarDetailPage'
import FlowImg from '../../../components/FlowImg'
import CommentTable from '../../../components/CommentTable'
import PurchaseApplyDetailPage from '../../../components/PurchaseApplyDetailPage'
import PurchaseDetailPage from '../../../components/PurchaseDetailPage'
import PaymentDetailPage from '../../../components/PaymentDetailPage'
import RecruitDetailPage from '../../../components/RecruitDetailPage'
import ReimburseDetailPage from '../../../components/ReimburseDetailPage'
import BudgetDetailPage from '../../../components/BudgetDetailPage'
import NoticeDetailPage from '../../../components/NoticeDetailPage'
import LegworkDetailPage from '../../../components/LegworkDetailPage'
import {setPrintData} from '../../../utils'
import Iconfont from '../../../components/Iconfont'
import audited from '../../../svg/audited.svg'

import AdReimburseDetailPage from '../../../components/AdReimburseDetailPage'
import AdDetailPage from '../../../components/AdDetailPage'
import RenoSubsidyDetailPage from '../../../components/RenoSubsidyDetailPage'
import ShopUpgradeDetailPage from '../../../components/ShopUpgradeDetailPage'
import OpenDetailPage from '../../../components/OpenDetailPage'
import ShopDetailPage from '../../../components/ShopDetailPage'
import MaterialSupportDetailPage from '../../../components/MaterialSupportDetailPage'
import SampleReplaceDetailPage from '../../../components/SampleReplaceDetailPage'
import CardDetailPage from '../../../components/CardDetailPage'
import SealDetailPage from '../../../components/SealDetailPage'
import TrainDetailPage from '../../../components/TrainDetailPage'
import PickDetailPage from '../../../components/PickDetailPage'
import MaterialGiftDetailPage from '../../../components/MaterialGiftDetailPage'
import SampleRoomDetailPage from '../../../components/SampleRoomDetailPage'
import PromotionExpenseDetailPage from '../../../components/PromotionExpenseDetailPage'
import SalesPromotionDetailPage from '../../../components/SalesPromotionDetailPage'
import UrgentOrderDetailPage from '../../../components/UrgentOrderDetailPage'

const Detail = ({ filedDetail }) => {
  let { data,employeeList,dicList } = filedDetail
  if(!dicList){
    dicList=[];
  }
  let detailpage=null,
      printData=false,
      _code='';
  if(data && data.busiData && data.userVo && data.userVo.employeeVo){
    _code=data.busiCode.substr(0,2);
    switch(_code){
      case 'TR':
      case 'PT':
      case 'RE':
      case 'BD':
      case 'PE':
      case 'PA':
      case 'AR'://广告费用报销
      case 'AD'://广告投放
      case 'SP'://促销活动支持
      case 'PX'://促销活动费用报销
      case 'SM'://样板房折扣申请
      case 'MG'://常规物料及礼品制作
      case 'TN'://常规物料及礼品制作
      case 'CD'://名片制作
      case 'SR'://售后问题处理
      case 'MS'://物料支持自助
      case 'OP'://开业支持
      case 'SU'://店面升级自助申请
      case 'RS'://店面装修补贴费用申请
      case 'SH'://建店申请
      case 'TL'://出差申请
      case 'SL'://印章使用申请
      case 'PP'://领料单
      case 'UO'://订单加急
        printData=true;
        setPrintData(data.busiData,data.userVo.employeeVo,dicList,data.commentList)
        break;
      default:
        break;
    }
    switch(_code){
      case 'MC':
        detailpage=<MissClockDetailPage data={data.busiData} employeeList={data.userVo.employeeVo} />
        break
      case 'SC':
        detailpage=<SalaryChangeDetailPage data={data.busiData} employeeList={data.userVo.employeeVo} />
        break
      case 'LE':
        detailpage=<LeaveDetailPage data={data.busiData} employeeList={data.userVo.employeeVo} dicList={dicList}/>
        break
      case 'OT':
        detailpage=<OverTimeDetailPage data={data.busiData} employeeList={data.userVo.employeeVo} dicList={dicList}/>
        break
      case 'TL':
        detailpage=<TravelDetailPage data={data.busiData} employeeList={data.userVo.employeeVo} dicList={dicList}/>
        break
      case 'DN':
        detailpage=<DimissionDetailPage data={data.busiData} employeeList={data.userVo.employeeVo} />
        break
      case 'RR':
        detailpage=<RegularDetailPage data={data.busiData} employeeList={data.userVo.employeeVo} />
        break
      case 'TR':
        detailpage=<TravelReimburseDetailPage data={data.busiData} employeeList={data.userVo.employeeVo} dicList={dicList} />
        break
      case 'CT':
        detailpage=<ContractDetailPage data={data.busiData} employeeList={data.userVo.employeeVo}/>
        break
      case 'UC':
        detailpage=<UseCarDetailPage data={data.busiData} employeeList={data.userVo.employeeVo} dicList={dicList} />
        break
      case 'PA':
        detailpage=<PurchaseApplyDetailPage data={data.busiData} employeeList={data.userVo.employeeVo}/>
        break
      case 'PE':
        detailpage=<PurchaseDetailPage data={data.busiData} employeeList={data.userVo.employeeVo}/>
        break
      case 'PT':
        detailpage=<PaymentDetailPage data={data.busiData} employeeList={data.userVo.employeeVo}/>
        break
      case 'RT':
        detailpage=<RecruitDetailPage data={data.busiData} employeeList={data.userVo.employeeVo}/>
        break
      case 'RE':
        detailpage=<ReimburseDetailPage data={data.busiData} employeeList={data.userVo.employeeVo}/>
        break
      case 'BD':
        detailpage=<BudgetDetailPage data={data.busiData} employeeList={data.userVo.employeeVo}/>
        break
      case 'LW'://外勤
        detailpage=<LegworkDetailPage data={data.busiData} employeeList={data.userVo.employeeVo}/>
        break
      case 'NE':
        detailpage=<NoticeDetailPage data={data.busiData} employeeList={data.userVo.employeeVo} dicList={dicList} />
        break;
      case 'AR'://广告费用报销
        detailpage=<AdReimburseDetailPage data={data.busiData} employeeList={data.userVo.employeeVo} />
        break;
      case 'AD'://广告投放
        detailpage=<AdDetailPage data={data.busiData} employeeList={data.userVo.employeeVo} />
        break;
      case 'SP'://促销活动支持
        detailpage=<SalesPromotionDetailPage data={data.busiData} employeeList={data.userVo.employeeVo} />
        break;
      case 'PX'://促销活动费用报销
        detailpage=<PromotionExpenseDetailPage data={data.busiData} employeeList={data.userVo.employeeVo} />
        break;
      case 'SM'://样板房折扣申请
        detailpage=<SampleRoomDetailPage data={data.busiData} employeeList={data.userVo.employeeVo} />
        break;
      case 'MG'://常规物料及礼品制作
        detailpage=<MaterialGiftDetailPage data={data.busiData} employeeList={data.userVo.employeeVo} />
        break;
      case 'TN'://常规物料及礼品制作
        detailpage=<TrainDetailPage data={data.busiData} employeeList={data.userVo.employeeVo} />
        break;
      case 'CD'://名片制作
        detailpage=<CardDetailPage data={data.busiData} employeeList={data.userVo.employeeVo} />
        break;
      case 'SR'://售后问题处理
        detailpage=<SampleReplaceDetailPage data={data.busiData} employeeList={data.userVo.employeeVo} />
        break;
      case 'MS'://物料支持自助
        detailpage=<MaterialSupportDetailPage data={data.busiData} employeeList={data.userVo.employeeVo} />
        break;
      case 'OP'://开业支持
        detailpage=<OpenDetailPage data={data.busiData} employeeList={data.userVo.employeeVo} />
        break;
      case 'SU'://店面升级自助申请
        detailpage=<ShopUpgradeDetailPage data={data.busiData} employeeList={data.userVo.employeeVo} />
        break;
      case 'RS'://店面装修补贴费用申请
        detailpage=<RenoSubsidyDetailPage data={data.busiData} employeeList={data.userVo.employeeVo} />
        break;
      case 'SH'://建店申请
        detailpage=<ShopDetailPage data={data.busiData} employeeList={data.userVo.employeeVo} />
        break;
      case 'SL'://印章使用申请
        detailpage=<SealDetailPage data={data.busiData} employeeList={data.userVo.employeeVo} dicList={dicList} />
        break;
      case 'PP'://领料单
        detailpage=<PickDetailPage data={data.busiData} employeeList={data.userVo.employeeVo} />
        break;
      case 'UO'://订单加急
        detailpage=<UrgentOrderDetailPage data={data.busiData} employeeList={data.userVo.employeeVo} dicList={dicList} />
        break;
      
    }
  }
  //console.log(data,employeeList)
  return (
    <div className={cs({'content-inner':true,...JSON.parse(`{"audited${data && data.busiData && data.busiData.state}":true}`)})}>
      <Iconfont className="q-icon-audited" colorful type={audited} />
      <div className="q-goback">
          {
            printData?
            <a href={`${location.origin}${location.pathname}#/print`} target="_black" className="q-print-link">
              打印表单
            </a>
            :null
          }
          <a href="javascript:window.history.back();">
            <Icon type="close-circle-o" />
          </a>
        </div>
       {detailpage}
       {
        data.commentList && data.commentList[0]?
        <CommentTable data={data.commentList} />
        :null
      } 
      {
        data && data.flowImgSrc?
        <FlowImg path={data.flowImgSrc+'&_t='+Math.random()} />
        :null
      }
    </div>)
}

Detail.propTypes = {
  filedDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ filedDetail, loading }) => ({ filedDetail, loading: loading.models.filedDetail }))(Detail)
