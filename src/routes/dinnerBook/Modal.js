import React from 'react'
import PropTypes from 'prop-types'
import { Form, Radio,Input,Modal,Row,Col,Button,Icon,Affix,message,Table,Tree,Checkbox,DatePicker } from 'antd'
import moment from 'moment';
import config from '../../utils/config'
import styles from './Modal.less'
//import city from '../../utils/chinaCity'
import SelectEmployee from '../../components/SelectEmployee'
import AddDinner from '../../components/AddDinner'

const confirm = Modal.confirm
//const { RangePicker } = DatePicker
const RadioGroup = Radio.Group;
const FormItem = Form.Item
//const Option =Select.Option;
const TreeNode = Tree.TreeNode;

const modal = ({
  list,
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
  setEmployeeAndRowKey,
  setBookTime,
  bookTimeStr,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
  ...modalProps
}) => {
  const dateTimeFormat='YYYY-MM-DD'
  const getFields=()=>{
    let fields={},index=0;
    let _data=null;
    validateFieldsAndScroll((err,values) => {
      if (err) {
        return null;
      }
      _data={...values}
      fields.bookTimeStr=bookTimeStr || item.bookTime;
      //_data.bookTimeStr?_data.bookTimeStr.format(dateTimeFormat):null;

    })
    //
    if(employeeList && employeeList.length>0 && rowSelection && rowSelection.selectedRowKeys){
      let _result=[];
      //去重
      employeeList.map(item=>{
        if(!(_result.filter(f=>f.dinnerId===item.dinnerId).length>0)){
          _result.push(item);
        }
      })
      _result.map((_data)=>{
        //&& 
        if(_data.editable && rowSelection.selectedRowKeys.indexOf(_data.dinnerId)>-1){
          if(_data.id)fields[`detailList[${index}].id`]=_data.id;
          if(_data.dinnerId>-1)fields[`detailList[${index}].dinnerId`]=_data.dinnerId;
          fields[`detailList[${index}].dinnerName`]=_data.dinnerName;
          fields[`detailList[${index}].deptId`]=_data.deptId;
          fields[`detailList[${index}].deptName`]=_data.deptName;
          fields[`detailList[${index}].breakfast`]=_data.breakfast;
          fields[`detailList[${index}].lunch`]=_data.lunch;
          fields[`detailList[${index}].supper`]=_data.supper;
          index++;
        }
      })
      if(item.id){
        fields.id=item.id;
      }
      if(item.state!==null && item.state!==undefined){
        fields.state=item.state;
      }
      if(item.bookTime){
        fields.bookTimeStr=item.bookTime;
      }
    }
    // console.log('data:',fields)
    return fields;
  }
  const handleOk = () => {
    let _data=getFields();
    if(!_data){
      message.error('预约报餐时间不能为空');
      return;
    }
    // return;
    onOk(_data);
    
  }
  const handleSubmit=()=>{
    let _data=getFields();
    if(!_data){
      message.error('预约报餐时间不能为空');
      return;
    }
    onSubmit((item && item.id || null),_data);
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
  },{
    title:'人员类型',
    render:(text,record)=>record.dinnerId<0?'外部人员':'内部',
  }]
  const selEmCallback=(data)=>{
    let fields={}
    if(data && data.length>0){
      //合并,然后去重
      let _result=employeeList.length?employeeList:data;
      data.map((item)=>{
        if(_result.filter(f=>f.dinnerId===item.dinnerId).length===0){
          _result.push(item);
        }
      })
      setEmployeeList(_result);
    }
  }
  const handleOutsideDinner=(data)=>{
    // console.log('data:',data)
    let _list=employeeList,dinnerId=-1 * _list.length;
    _list.push({
      ...data,
      dinnerId,
      editable:true,
      breakfast:true,
      lunch:true,
      supper:true,
    })
    setEmployeeAndRowKey(dinnerId,_list);
  }
  const disabledDate=(current)=>{
    // Can not select days before today and today
    let existsBooktime=false;
    if(list && list[0] && current){
      existsBooktime=list.filter(f=>f.bookTime===String(current.format(dateTimeFormat)) && String(f.state)!=='2').length>0;
      // console.log(current.format(dateTimeFormat),existsBooktime)
    }
    return current && current.valueOf() < Date.now() || existsBooktime;
  }
  const handleBookTimeChange=(val)=>{
    // console.log('data:',val?val.format(dateTimeFormat):'0');
    // bookTimeStr=val?val.format(dateTimeFormat):null;
    if(val){
      setBookTime(val.format(dateTimeFormat))
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
                {
                  bookTimeStr || item.id?
                  <SelectEmployee callBack={selEmCallback} bookTimeStr={bookTimeStr}></SelectEmployee>
                  :null
                }
                {
                  bookTimeStr || item.id?
                  <AddDinner style={{ marginRight: 12 }} callBack={handleOutsideDinner}/>
                  :null
                }
                <Button style={{ marginRight: 12 }} type="primary" loading={submitLoading} onClick={handleSubmit} size="large">提交</Button>
                <Button style={{ marginRight: 12 }} type="primary" loading={confirmLoading} onClick={handleOk} size="large">保存</Button>
                <Button  type="ghost" onClick={onCancel} size="large">取消</Button>
              </div>
            </Affix>

          </Col>
          <Col xs={6} md={4} xl={3} style={{ paddingRight:'0px' }} className={styles['q-detail-label-require']}>
            预约报餐时间：
          </Col>
          <Col xs={18} md={20} xl={21} style={{ paddingLeft:'0px' }} className={styles['q-detail-flex-conent']}>
            {
              item.id?
               <FormItem  style={{width:'100%'}} >
                {item.bookTime}
               </FormItem>
              :
              <FormItem  style={{width:'100%'}} >
                {getFieldDecorator('bookTimeStr', {
                  initialValue:undefined,
                  // initialValue:item.bookTime!==undefined && item.bookTime!==null?moment(item.bookTime,dateTimeFormat):null,
                  rules: [
                    {
                      required: true,message:'不能为空',
                    },
                  ],
                  onChange:handleBookTimeChange,
                })(<DatePicker  style={{width:'228px'}} 
                  format={dateTimeFormat}
                  disabledDate={disabledDate}
                  showToday={false}
                  />)}
                
              </FormItem>
            }
          
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
