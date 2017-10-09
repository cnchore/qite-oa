import React from 'react'
import PropTypes from 'prop-types'
import { Form,Input,Radio, InputNumber,Modal,Row,Col,Button,Icon,Affix,message,Select } from 'antd'
//import moment from 'moment';
import config from '../../utils/config'
import { FileUpload } from '../../components'
// import uploadImageCallBack from '../../services/uploadImageCallBack'
import styles from './Modal.less'
//import city from '../../utils/chinaCity'
import {changeMoneyToChinese} from '../../utils'
// import EditCellTable from './EditCellTable'
// import CommentTable from '../../components/CommentTable'
import PurchaseDetailPage from '../../components/PurchaseDetailPage'

// const confirm = Modal.confirm
//const { RangePicker } = DatePicker
const RadioGroup = Radio.Group;
const FormItem = Form.Item
const Option =Select.Option;

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
  item = {},
  onOk,
  title,
  onCancel,
  fileList,//附件列表
  // dicList,
  getFileList,//获取附件的方法
  // storeInDetailLoading,
  employeeList,
  defaultFileList=[],//附件控件prop
  storeInDetail,
  ...modalProps
}) => {

  
  const handleOk = (id) => {
    let data={};
    if(fileList && fileList[0]){
        fileList.filter(item=>!item.id).map((f,index)=>{
          if(f.id) data[`attachList[${index}].id`]=f.id;
          data[`attachList[${index}].attachUrl`]=f.url;
          data[`attachList[${index}].attachName`]=f.name;
          data[`attachList[${index}].sourceType`]=20;
        })
      }else if(defaultFileList[0]){
        defaultFileList.filter(item=>!item.id).map((f,index)=>{
          if(f.id) data[`attachList[${index}].id`]=f.id;
          data[`attachList[${index}].attachUrl`]=f.url;
          data[`attachList[${index}].attachName`]=f.name;
          data[`attachList[${index}].sourceType`]=20;
        })
      }
    if(data){
      data.detailId=id;
      if(!fileList[0] && !defaultFileList[0]){
        message.error('请上传附件')
        return;
      }
      // return;
      storeInDetail(data)
    }
  }
  if(fileList[0]){
    defaultFileList=fileList.map((temp)=>{
      if(temp.createTime)
        return {...temp,uid:temp.id,status:'done',url:temp.attachUrl,name:temp.attachName}
      return {...temp}
    })
  }else if(item.attachList&& item.attachList[0]){
    defaultFileList=item.attachList.filter(l=>l.sourceType===20).map((temp)=>{
      return {...temp,uid:temp.id,status:'done',url:temp.attachUrl,name:temp.attachName}
    })
  }else{
    defaultFileList=[];
  }
  
  return (
      <Form layout='horizontal'>
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} style={{display:'flex',justifyContent:'space-between',marginBottom:'24px',paddingBottom:'12px',borderBottom:'1px solid #d9d9d9'}}>
            <div className='qite-title'>
            <Icon type='edit' />{title}</div>
           
            <Affix target={()=>document.getElementById('layout-main')}>
              <div style={{backgroundColor:'#fff'}}>
                <Button  type="ghost" onClick={onCancel} size="large">返回</Button>
              </div>
            </Affix>
          </Col>
        </Row>
        <PurchaseDetailPage data={item} employeeList={employeeList} storeInDetail={handleOk} />
        <Row gutter={24} className={styles['q-detail']}>

          <Col span={24} className='qite-list-title'>
            <Icon type="paper-clip" />入库附件
          </Col>
          <Col span={24}>
            <FormItem >
              <FileUpload defaultFileList={defaultFileList} callbackParent={getFileList} />      
            </FormItem>    
          </Col>
          
        </Row>
      </Form>
  )
}

modal.propTypes = {
  item: PropTypes.object,
}

export default Form.create()(modal)
