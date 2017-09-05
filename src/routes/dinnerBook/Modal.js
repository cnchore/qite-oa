import React from 'react'
import PropTypes from 'prop-types'
import { Form, Radio,Input,Modal,Row,Col,Button,Icon,Affix,message,Table,Tree,Checkbox } from 'antd'
//import moment from 'moment';
import config from '../../utils/config'
import styles from './Modal.less'
//import city from '../../utils/chinaCity'
import SelectEmployee from '../../components/SelectEmployee'

const confirm = Modal.confirm
//const { RangePicker } = DatePicker
const RadioGroup = Radio.Group;
const FormItem = Form.Item
//const Option =Select.Option;
const TreeNode = Tree.TreeNode;

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
  dicList,
  confirmLoading,
  submitLoading,
  onSubmit,
  employeeList,
  rowSelection,
  tableLoading,
  getDinnerInfo,
  setEmployeeList,
  form: {
  },
  ...modalProps
}) => {
  const dateTimeFormat='YYYY-MM-DD HH:mm:ss'
  const getFields=()=>{
    let fields={}
    if(employeeList && employeeList.length>0 && rowSelection && rowSelection.selectedRowKeys){
      employeeList.map((_data,index)=>{
        if(rowSelection.selectedRowKeys.indexOf(_data.dinnerId)>-1){
          if(_data.id)fields[`detailList[${index}].id`]=_data.id;
          fields[`detailList[${index}].dinnerId`]=_data.dinnerId;
          fields[`detailList[${index}].dinnerName`]=_data.dinnerName;
          fields[`detailList[${index}].deptId`]=_data.deptId;
          fields[`detailList[${index}].deptName`]=_data.deptName;
          fields[`detailList[${index}].breakfast`]=_data.breakfast;
          fields[`detailList[${index}].lunch`]=_data.lunch;
          fields[`detailList[${index}].supper`]=_data.supper;
        }
      })
    }
    return fields;
  }
  const handleOk = () => {
      onOk(getFields());
    
  }
  const handleSubmit=()=>{
    onSubmit((item && item.id || null),getFields());
  }
  const handleCheck=(e,index,t)=>{
    // console.log('handleCheck:',e.target.checked,index,t)
    let _list=employeeList;
    if(t===1){
      _list[index].breakfast=e.target.checked;
    }
    if(t===2){
      _list[index].lunch=e.target.checked;
    }
    if(t===3){
      _list[index].supper=e.target.checked;
    }
    setEmployeeList(_list);
  }
  // console.log('employeeList',employeeList);
  const tableProps={
    dataSource: employeeList,
    loading: tableLoading,
    pagination:false,
    rowSelection,
  }
  const columns=[{
    title:'部门',
    dataIndex:'deptName',
    key:'deptName',
  },{
    title: '姓名',
    dataIndex: 'dinnerName',
    key: 'dinnerName',
  },{
    title:'早餐',
    key:'breakfast',
    dataIndex:'breakfast',
    render:(text,record,index)=><Checkbox disabled={!record.editable} defaultChecked={Boolean(text)} onChange={e=>handleCheck(e,index,1)}/>

  },{
    title:'午餐',
    key:'lunch',
    dataIndex:'lunch',
    render:(text,record,index)=><Checkbox disabled={!record.editable} defaultChecked={Boolean(text)} onChange={e=>handleCheck(e,index,2)}/>
  },{
    title:'晚餐',
    key:'supper',
    dataIndex:'supper',
    render:(text,record,index)=><Checkbox disabled={!record.editable} defaultChecked={Boolean(text)} onChange={e=>handleCheck(e,index,3)}/>
  },{
    title:'报餐人',
    key:'createrName',
    dataIndex:'createrName',
  }]
  const selEmCallback=(data)=>{
    let fields={}
    if(data && data.length>0){
      data.map((_data,index)=>{
        fields[`detailList[${index}].dinnerId`]=_data.dinnerId;
        fields[`detailList[${index}].dinnerName`]=_data.dinnerName;
        fields[`detailList[${index}].deptId`]=_data.deptId;
        fields[`detailList[${index}].deptName`]=_data.deptName;
      })
      getDinnerInfo(fields);
    }
  }
  return (
      <Form layout='horizontal' onSubmit={handleOk}>
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} style={{display:'flex',justifyContent:'space-between',marginBottom:'24px',paddingBottom:'12px',borderBottom:'1px solid #d9d9d9'}}>
            <div className='qite-title'>
            <Icon type={item.id?'edit':'plus'} />{title}</div>
           
            <Affix target={()=>document.getElementById('layout-main')}>
               <div style={{backgroundColor:'#fff'}}>
                <SelectEmployee callBack={selEmCallback}></SelectEmployee>
                <Button style={{ marginRight: 12 }} type="primary"  size="large">添加外部人员</Button>
                <Button style={{ marginRight: 12 }} type="primary" loading={submitLoading} onClick={handleSubmit} size="large">提交</Button>
                <Button style={{ marginRight: 12 }} type="primary" loading={confirmLoading} onClick={handleOk} size="large">保存</Button>
                <Button  type="ghost" onClick={onCancel} size="large">取消</Button>
              </div>
            </Affix>

          </Col>
          <Col span={24}>
            <Table
              {...tableProps}
              bordered
              scroll={{ x: 767 }}
              columns={columns}
              simple
              rowKey={record => record.dinnerId}
            />
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
