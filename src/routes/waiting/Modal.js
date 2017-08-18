import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input,Radio,Modal,Row,Col,DatePicker,Button,Icon,Affix } from 'antd'
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

const confirm = Modal.confirm
const FormItem = Form.Item
const RadioGroup = Radio.Group;
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
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
  },
  ...modalProps
}) => {
  const dateTimeFormat='YYYY-MM-DD HH:mm:ss'
  const getFields=()=>{
    let data={};
    validateFields((errors) => {
      if (errors) {
        return {}
      }
      data= {...getFieldsValue()}
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
    }
  }
  const handleActChange=(e)=>{
      var _reasonStr='';
      if(e.target.value==='1' || e.target.value==='2'){
        _reasonStr='同意';
      }
      if(e.target.value==='3' || e.target.value==='4'){
        _reasonStr='不同意，退回修改';
      }
      // 1 同意；3 返回上一步
      if(e.target.value==='1' || e.target.value==='3'){
        setNeedSel(true,_reasonStr);
      }else{
        setNeedSel(false,_reasonStr);
      }
  }
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
        <Row gutter={24} className={styles['q-detail']}>
          
          <Col xs={6} md={4} xl={2} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            审批意见：
          </Col>
          <Col xs={18} md={20} xl={22} style={{ paddingLeft:'0px' }} className={styles['q-detail-conent']}>
            <FormItem >
              {getFieldDecorator('approvalOpinion', {
                initialValue:reasonStr,
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
