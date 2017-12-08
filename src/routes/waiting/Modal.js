import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input,Radio,Modal,Row,Col,DatePicker,Button,Icon,Affix,Checkbox } from 'antd'
import moment from 'moment';
import config from '../../utils/config'
import { SelectUser } from '../../components'
import MissClockDetailPage from '../../components/MissClockDetailPage'
import SalaryChangeDetailPage from '../../components/SalaryChangeDetailPage'
import LeaveDetailPage from '../../components/LeaveDetailPage'
import OverTimeDetailPage from '../../components/OverTimeDetailPage'
import TravelDetailPage from '../../components/TravelDetailPage'
import DimissionDetailPage from '../../components/DimissionDetailPage'
import RegularDetailPage from '../../components/RegularDetailPage'
import TravelReimburseDetailPage from '../../components/TravelReimburseDetailPage'
import ContractDetailPage from '../../components/ContractDetailPage'
import UseCarDetailPage from '../../components/UseCarDetailPage'
import PurchaseApplyDetailPage from '../../components/PurchaseApplyDetailPage'
import PurchaseDetailPage from '../../components/PurchaseDetailPage'
import CommentTable from '../../components/CommentTable'
import PaymentDetailPage from '../../components/PaymentDetailPage'
import RecruitDetailPage from '../../components/RecruitDetailPage'
import ReimburseDetailPage from '../../components/ReimburseDetailPage'
import BudgetDetailPage from '../../components/BudgetDetailPage'
import NoticeDetailPage from '../../components/NoticeDetailPage'
import styles from './Modal.less'
import LegworkDetailPage from '../../components/LegworkDetailPage'

import AdReimburseDetailPage from '../../components/AdReimburseDetailPage'
import AdDetailPage from '../../components/AdDetailPage'
import RenoSubsidyDetailPage from '../../components/RenoSubsidyDetailPage'
import ShopUpgradeDetailPage from '../../components/ShopUpgradeDetailPage'
import OpenDetailPage from '../../components/OpenDetailPage'
import ShopDetailPage from '../../components/ShopDetailPage'
import MaterialSupportDetailPage from '../../components/MaterialSupportDetailPage'
import SampleReplaceDetailPage from '../../components/SampleReplaceDetailPage'
import CardDetailPage from '../../components/CardDetailPage'
import SealDetailPage from '../../components/SealDetailPage'
import TrainDetailPage from '../../components/TrainDetailPage'
import PickDetailPage from '../../components/PickDetailPage'
import MaterialGiftDetailPage from '../../components/MaterialGiftDetailPage'
import SampleRoomDetailPage from '../../components/SampleRoomDetailPage'
import PromotionExpenseDetailPage from '../../components/PromotionExpenseDetailPage'
import SalesPromotionDetailPage from '../../components/SalesPromotionDetailPage'
const confirm = Modal.confirm
const FormItem = Form.Item
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: {
    span: 12,
  },
}
const twoFormItemLayout = {
  labelCol: { 
    xs: { span: 12 },
    md: { span: 4 }, 
    xl: { span: 3},
  },
}

const modal = ({
  onOk,
  title,
  onCancel,
  confirmLoading,
  employeeList,
  dicList,
  taskData={},
  isNeedSel,
  setNeedSel,
  reasonStr,
  needEvalRemark,
  setNeedEvalRemark,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
  },
  ...modalProps
}) => {
  const dateTimeFormat='YYYY-MM-DD HH:mm:ss';
  const taskDefinitionKey=taskData.taskVo && taskData.taskVo.taskDefinitionKey || null;
  const _use=taskDefinitionKey?taskDefinitionKey.split('_')[0]:'';
  const isTrainer=_use==='trainer'?true:false;

  const getFields=()=>{
    let data={};
    validateFields((errors) => {
      if (errors) {
        return {}
      }
      data= {...getFieldsValue()}
      if(isTrainer){
        data.isNeedSave=true;
        data.id=taskData.busiData.id;
        data.code=taskData.busiData.code;
        data.projectName=taskData.busiData.projectName;                 //培训项目名称
        data.purpose=taskData.busiData.purpose;                    //培训目的
        data.trainTimeStr=taskData.busiData.trainTime;                //培训时间
        data.trainObj=taskData.busiData.trainObj;                 //培训对象
        data.trainWay=taskData.busiData.trainWay;                 //培训方式
        data.trainAddress=taskData.busiData.trainAddress;                //培训地点
        data.userId=taskData.busiData.userId;
        taskData.busiData.attachList.filter(fl=>fl.uid!=='invalid').map((f,index)=>{
          if(f.id) data[`attachList[${index}].id`]=f.id;
          data[`attachList[${index}].attachUrl`]=f.url;
          data[`attachList[${index}].attachName`]=f.name;
        })
        taskData.busiData.detailList.map((f,index)=>{
          if(f.id) data[`detailList[${index}].id`]=f.id;
          data[`detailList[${index}].lecturerFee`]=f.lecturerFee;
          data[`detailList[${index}].toolFee`]=f.toolFee;
          data[`detailList[${index}].trafficFee`]=f.trafficFee;
          data[`detailList[${index}].mealsFee`]=f.mealsFee;
          data[`detailList[${index}].hotelFee`]=f.hotelFee;
          data[`detailList[${index}].otherFee`]=f.otherFee;
        })
        data.evalWay=data.evalWay?data.evalWay.join():null;
      }
      data.taskId=taskData.taskId;
      data.busiCode=taskData.busiCode;
      data.busiId=taskData.busiId;
    })
    return data;
  }
  const handleSubmit=(data)=>{
    const fields=getFields();
    if(fields && fields.taskId){
      onOk({...fields,auditUserId:data.userId})
    }
  }
  const handleOK=()=>{
    const fields=getFields();
    if(fields && fields.taskId){
      onOk(fields)
    }
  }
  let actionRadio=[];
  // console.log("actionMap:",taskData.actionMap,Object.keys(taskData.actionMap)[0])
  if(taskData.actionMap){
    actionRadio=Object.keys(taskData.actionMap).map(act=>{
       // console.log("key:",act)
      // if(act==='1'){isNeedSel=true}
      return <Radio value={act} key={act}>{ taskData.actionMap[act]}</Radio>
    })
  }
  let detailpage=null;
  if(taskData && taskData.busiData && taskData.userVo && taskData.userVo.employeeVo){
    switch(taskData.busiCode.substr(0,2)){
      case 'MC':
        detailpage=<MissClockDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} />
        break;
      case 'SC':
        detailpage=<SalaryChangeDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} />
        break;
      case 'LE':
        detailpage=<LeaveDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} dicList={taskData.dicList?taskData.dicList:[]}/>
        break;
      case 'OT':
        detailpage=<OverTimeDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} dicList={taskData.dicList?taskData.dicList:[]}/>
        break;
      case 'TL':
        detailpage=<TravelDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} dicList={taskData.dicList?taskData.dicList:[]}/>
        break;
      case 'DN':
        detailpage=<DimissionDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} />
        break;
      case 'RR':
        detailpage=<RegularDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} />
        break;
      case 'TR':
        detailpage=<TravelReimburseDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} dicList={taskData.dicList?taskData.dicList:[]}/>
        break;
      case 'CT':
        detailpage=<ContractDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} />
        break;
      case 'UC':
        detailpage=<UseCarDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} dicList={taskData.dicList?taskData.dicList:[]}/>
        break;
      case 'PA':
        detailpage=<PurchaseApplyDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} />
        break;
      case 'PE':
        detailpage=<PurchaseDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} />
        break;
      case 'PT':
        detailpage=<PaymentDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} />
        break;
      case 'RT':
        detailpage=<RecruitDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} />
        break;
      case 'RE':
        detailpage=<ReimburseDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} />
        break;
      case 'BD':
        detailpage=<BudgetDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} />
        break;
      case 'LW':
        detailpage=<LegworkDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} />
        break;
      case 'NE':
        detailpage=<NoticeDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} dicList={taskData.dicList?taskData.dicList:[]}/>
        break;
      case 'AR'://广告费用报销
        detailpage=<AdReimburseDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} />
        break;
      case 'AD'://广告投放
        detailpage=<AdDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} />
        break;
      case 'SP'://促销活动支持
        detailpage=<SalesPromotionDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} />
        break;
      case 'PX'://促销活动费用报销
        detailpage=<PromotionExpenseDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} />
        break;
      case 'SM'://样板房折扣申请
        detailpage=<SampleRoomDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} />
        break;
      case 'MG'://常规物料及礼品制作
        detailpage=<MaterialGiftDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} />
        break;
      case 'TN'://培训申请
        detailpage=<TrainDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} />
        break;
      case 'CD'://名片制作
        detailpage=<CardDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} />
        break;
      case 'SR'://售后问题处理
        detailpage=<SampleReplaceDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} />
        break;
      case 'MS'://物料支持自助
        detailpage=<MaterialSupportDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} />
        break;
      case 'OP'://开业支持
        detailpage=<OpenDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} />
        break;
      case 'SU'://店面升级自助申请
        detailpage=<ShopUpgradeDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} />
        break;
      case 'RS'://店面装修补贴费用申请
        detailpage=<RenoSubsidyDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} />
        break;
      case 'SH'://建店申请
        detailpage=<ShopDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} />
        break;
      case 'SL'://印章使用申请
        detailpage=<SealDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} dicList={taskData.dicList || []} />
        break;
      case 'PP'://领料单
        detailpage=<PickDetailPage data={taskData.busiData} employeeList={taskData.userVo.employeeVo} />
        break;
    }
  }
  const handleActChange=(e)=>{
      var _reasonStr='';
      switch(e.target.value){
        case '0'://结束
          _reasonStr='不同意，流程终止';
          break;
        case '1'://同意
        case '2'://同意并办结
          _reasonStr='同意';
          break;
        case '3'://退回上一步
          _reasonStr='不同意，退回修改';
          break;
        case '4'://退回申请人修改
          _reasonStr='不同意，退回申请人修改';
          break;
        case '5'://重新申请
          break;
        case '6'://同意，待完善资料
          break;
        case '7'://完善资料并办结
          break;
        case '8'://转办
          break;
        case '9'://同意
          _reasonStr='同意';
          break;
        case '10'://不同意
          _reasonStr='不同意';
          break;
        case '11'://协同
          _reasonStr='已协同处理';
          break;
        case '12'://知会
          _reasonStr='已阅';
          break;
      }
      
      // 1 同意；3 返回上一步
      if(e.target.value==='1' || e.target.value==='3'){
        setNeedSel(true,_reasonStr);
      }else{
        setNeedSel(false,_reasonStr);
      }
  }
  const evalWayOptions=['考试方式','内部分享','其他'];
  const handleEvalWayChange=(checkedValues)=>{
    if(checkedValues && checkedValues.filter(f=>f==='其他').length){
      setNeedEvalRemark(true);
    }else{
      setNeedEvalRemark(false);
    }
  }
  const handleReasonChange=(e)=>{
    if(e.target&&e.target.value){
      setNeedSel(false,e.target.value);
    }
  }
  const reasonRadio=['已知悉，并跟进处理','已阅'];
  return (
      <Form layout='horizontal'>
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} style={{display:'flex',justifyContent:'space-between',marginBottom:'24px',paddingBottom:'12px',borderBottom:'1px solid #d9d9d9'}}>
            <div className='qite-title'><Icon type="schedule" />{title}</div>
            <Affix target={()=>document.getElementById('layout-main')} style={{minWidth:'300px',textAlign:'right'}}>
              <div style={{backgroundColor:'#fff'}}>
                { isNeedSel?
                <SelectUser type="button" callBack={handleSubmit}  loading={confirmLoading}/>
                  :
                <Button type="primary" onClick={handleOK} size="large">提交</Button>
                }
                <Button style={{ marginLeft: 12 }}  type="ghost" onClick={onCancel} size="large">取消</Button>
              </div>
            </Affix>
          </Col>
        </Row>

        {detailpage}
        <Row gutter={24} className={styles['q-detail']}>
        {
          isTrainer?
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            培训提纲：
          </Col>
          :null
        }
        {
          isTrainer?
          <Col xs={18} md={20} xl={21} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {getFieldDecorator('trainOutline', {
                initialValue: taskData.busiData.trainOutline || '',
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
              })(<Input type="textarea" autosize={{ minRows: 2, maxRows: 5 }} />)}
            </FormItem>
          </Col>
          :null
        }
        {
          isTrainer?
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label']}>
            评估方式：
          </Col>
          :null
        }
        {
          isTrainer?
          <Col xs={18} md={20} xl={21} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            <FormItem >
              {getFieldDecorator('evalWay', {
                initialValue: taskData.busiData.evalWay&& !(taskData.busiData.evalWay instanceof Array)?taskData.busiData.evalWay.split(','):[],
                rules: [
                  {
                    required: true,message:'不能为空',
                  },
                ],
                onChange:handleEvalWayChange,
              })(<CheckboxGroup options={evalWayOptions} />)}
            </FormItem>
            {
              needEvalRemark?
                <FormItem>
                  {getFieldDecorator('evalWayRemark',{
                      initialValue: taskData.busiData.evalWayRemark || '',
                      rules:[{required:true,message:'不能为空'}],
                    })(<Input />)
                  }
                </FormItem>
              :null
            }
          </Col>
          :null
        }
        </Row>
        {
          taskData && taskData.commentList && taskData.commentList[0]?
            <CommentTable data={taskData.commentList} />
          :null
        }
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} className='qite-list-title'>
            <Icon type="edit" />流程办理
          </Col>
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            操&nbsp;&nbsp;&nbsp;&nbsp;作：
          </Col>
          <Col xs={18} md={20} xl={22} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {getFieldDecorator('action', {
                initialValue:null,
                rules: [ { required: true,message:'不能为空',},],
                onChange:handleActChange
              })(<RadioGroup>{actionRadio}</RadioGroup>)}
            </FormItem>
          </Col>
        </Row>
        {
          reasonStr==='已知悉，并跟进处理' || reasonStr==='已阅'?
            <Row gutter={24} className={styles['q-detail']}>
              <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
                默认意见：
              </Col>
              <Col xs={18} md={20} xl={22} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
                <FormItem >
                  {getFieldDecorator('reasonStr', {
                    initialValue:reasonStr,
                    rules: [ { required: true,message:'不能为空',},],
                    onChange:handleReasonChange
                  })(<RadioGroup options={reasonRadio} />)}
                </FormItem>
              </Col>
            </Row>
          :null
        }
        <Row gutter={24} className={styles['q-detail']}>
          
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            审批意见：
          </Col>
          <Col xs={18} md={20} xl={22} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {getFieldDecorator('approvalOpinion', {
                initialValue:reasonStr || '',
                rules: [{required: true,message:'不能为空',},],
              })(<Input type="textarea" autosize={{ minRows: 2, maxRows: 5 }} />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
  )
}
modal.propTypes = {
  form: PropTypes.object.isRequired,
  item: PropTypes.object,
  onOk: PropTypes.func,
}
export default Form.create()(modal)
