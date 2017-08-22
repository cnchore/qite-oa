import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input,InputNumber,Button,DatePicker, Modal,Select,Switch,Row,Col,message,Icon,Upload } from 'antd'
import moment from 'moment';
import config from '../../utils/config'

const FormItem = Form.Item
const Option = Select.Option;
const InputGroup = Input.Group;
const formItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 14,
  },
}
const twoFormItemLayout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 19,
  },
}
const threeFormItemLayout={
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 20,
  },
}


function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}
const modal = ({
  orgList,
  positSelList,
  item = {},
  orgKey=null,
  onOk,
  onSel,
  expand,
  toggle,
  modalType,
  onSetUserRole,
  confirmLoading,
  setUserRoleLoading,
  onCancel,
  photoUrl,
  dicList,
  setPhoto,
  roleList,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    getFieldsValue,
    setFieldsValue,
  },
  ...modalProps
}) => {
  if(orgKey!==undefined && orgKey!==null){
    item.orgId=orgKey;
  }
  const handleOk = () => {
    validateFieldsAndScroll((errors,values) => {
      if (errors) {
        return
      }
      const data = values;//{...getFieldsValue()}
      //let _ls=orgList.filter(item=>String(item.id)===data.orgId);
      //console.log('orgParentId:',_ls[0].parentId)

      data.postIds=data.postIds.join();
      data.birthdayStr=data.birthdayStr?data.birthdayStr.format('YYYY-MM-DD'):null;
      data.departureTimeStr=data.departureTimeStr?data.departureTimeStr.format('YYYY-MM-DD HH:mm:ss'):null;
      data.inductionTimeStr=data.inductionTimeStr?data.inductionTimeStr.format('YYYY-MM-DD HH:mm:ss'):null;
      if(photoUrl){
        data.photo=photoUrl;
      }else{
        data.photo=null;
      }
      if(item.id){
        data.id=item.id
      }
      data.roleIds=data.roleIds.join();
      // handleSetUserRole();
      onOk(data);
    })
  }
  const handleSetUserRole=()=>{
    if(item.userId){
      const fields={...getFieldsValue()}
      let roleData={userId:item.userId,roleIds:fields.roleIds.join()}
      onSetUserRole(roleData);
    }
  }
  if(item.postList && item.postList[0]){
      positSelList=[...positSelList,...item.postList];
  }
  const getPositRows=()=>{
    if(positSelList[0]){
      let rows=positSelList.map((item)=>String(item.id)); 
      rows=Array.from(new Set(rows));//去重复

      return rows
    }
    return []
  }
  const getRolesRows=()=>{
    if(item.roleList && item.roleList[0]){
      let _ls=[];
       item.roleList.map((item)=>{
          if(item.isUserRole){
            _ls.push(String(item.id))
          }
       });
       return _ls;
    }
    return []
  }
  const modalOpts = {
    ...modalProps,
    width:1000,
    onCancel,
    onOk: handleOk
    
  }
  const orgOptions = orgList.map(org => <Option key={org.id}>{org.orgName}</Option>);
  
  const postOptions=positSelList.map(dic=><Option key={dic.id}>{dic.postName}</Option>);
  const dateFormat = 'YYYY-MM-DD';
  const dateTimeFormat='YYYY-MM-DD HH:mm:ss'

  const fileData={bucket:`${config.bucket}`,type:'photo'};
  
  const handleChange = (info) => {
    if (info.file.status === 'done') {
      //setFieldsValue({photo:info.file.response.data})
      //item.photo=info.file.response.data;
      setPhoto(info.file.response.data);
    }
  }
  const roleOptions=roleList&&roleList[0]?roleList.map(role=><Option key={role.id}>{role.roleName}</Option>):null;
  const dicOptions=dicList.map(dic=><Option key={dic.dicValue}>{dic.dicName}</Option>)
  return (
    <Modal {...modalOpts}
      footer={[
        <Button key="back" size="large" onClick={onCancel}>取消</Button>,
        // <Button key="setUserRole" disabled={item.id?false:true} size="large" loading={setUserRoleLoading} onClick={handleSetUserRole}>设置用户角色</Button>,
        <Button key="submit" type="primary" size="large" loading={confirmLoading} onClick={handleOk}>
          确定
        </Button>
    ]}
    >
      <Form layout="horizontal">
        <Row gutter={24}  type="flex" justify="space-between" align="bottom">
          <Col span={8}>
              <FormItem label="姓名" hasFeedback {...formItemLayout}>
                {getFieldDecorator('realName', {
                  initialValue: item.realName,
                  rules: [
                    {
                      required: true,message:'不能为空',
                    },
                  ],
                })(<Input />)}
              </FormItem>
              <FormItem label="性别" {...formItemLayout}>
                {getFieldDecorator('sex', {
                  initialValue: Boolean(item.sex),
                  
                })(<Switch defaultChecked={item.sex} checkedChildren={'男'} unCheckedChildren={'女'} />)}
              </FormItem>
              
         
          </Col>
          <Col span={8}>
              <FormItem label="手机号码" hasFeedback {...formItemLayout}>
                {getFieldDecorator('mobilePhone', {
                  initialValue: item.mobilePhone,
                  rules: [
                    {
                      required: true,
                      pattern: /^1[34578]\d{9}$/,
                      message: '请输入正确的手机号码!',
                    },
                  ],
                })(<Input />)}
              </FormItem>
              <FormItem label="工号" hasFeedback {...formItemLayout}>
                {getFieldDecorator('empNum', {
                  initialValue: item.empNum,
                  
                })(<Input />)}
              </FormItem>
            </Col>
          <Col span={8}>
            <FormItem label="照片"  {...formItemLayout}>
              {getFieldDecorator('photo', {
                initialValue: item.photo,
                
              })(
                <Upload
                  className="avatar-uploader"
                  name="avatar"
                  showUploadList={false}
                  data={fileData}
                  action={`${config.baseURL()}${config.api.imgUpload}`}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {
                    photoUrl || item.photo ?
                      <img src={photoUrl || item.photo} alt="" className="avatar" /> :
                      <Icon type="plus" className="avatar-uploader-trigger" />
                  }
                </Upload>
              )}
            </FormItem>
          </Col>
         <Col span={16}>
              <FormItem label="职位" {...twoFormItemLayout}>
                <Row gutter={8}>
                  <Col span={21}>
                    {getFieldDecorator('postIds', {
                      initialValue:getPositRows(),
                      rules: [
                        {
                          required: true,message:'不能为空',
                          
                        },
                      ],
                    })(<Select mode="multiple">{postOptions}</Select>)}
                  </Col>
                  <Col span={3} style={{marginTop:'-2px'}}>
                    <Button  onClick={onSel} type="ghost">选择</Button>
                  </Col>
                </Row>
              </FormItem>
          </Col>
          
          <Col span={8}>
              <FormItem label="职位状态" hasFeedback {...formItemLayout}>
                {getFieldDecorator('positionState', {
                  initialValue: item.positionState!==undefined?item.positionState:null,
                  
                })(<Select style={{width:'100%'}}>{dicOptions}</Select>)}
              </FormItem>
          </Col>
          
          {expand?(
          <Col span={8}>
              <FormItem label="婚姻状况" hasFeedback {...formItemLayout}>
                {getFieldDecorator('marriages', {
                  initialValue: item.marriages,
                  
                })(<Input />)}
              </FormItem>
          </Col>
          ):null}
          {expand?(
          <Col span={8}>
              <FormItem label="民族" hasFeedback {...formItemLayout}>
                {getFieldDecorator('nation', {
                  initialValue: item.nation,
                  
                })(<Input />)}
              </FormItem>
          </Col>
          ):null}
         
          <Col span={8}>
              <FormItem label="户籍" hasFeedback {...formItemLayout}>
                {getFieldDecorator('householdRegister', {
                  initialValue: item.householdRegister,
                  
                })(<Input />)}
              </FormItem>
          </Col>
          
          {expand?(
            <Col span={8}>
          <FormItem label="健康状况" hasFeedback {...formItemLayout}>
            {getFieldDecorator('health', {
              initialValue: item.health,
              
            })(<Input />)}
          </FormItem>
          </Col>
          ):null}
          {expand?(
            <Col span={8}>
          <FormItem label="子女数量" hasFeedback {...formItemLayout}>
            {getFieldDecorator('childrenNum', {
              initialValue: item.childrenNum,
             
            })(<InputNumber step={1} />)}
          </FormItem>
          </Col>
          ):null}
          {expand?(
            <Col span={8}>
          <FormItem label="学历" hasFeedback {...formItemLayout}>
            {getFieldDecorator('education', {
              initialValue: item.education,
              
            })(<Input />)}
          </FormItem>
          </Col>
          ):null}
          {expand?(
            <Col span={8}>
          <FormItem label="身高" hasFeedback {...formItemLayout}>
            {getFieldDecorator('height', {
              initialValue: item.height,
              
            })(<InputNumber step={1} formatter={value => `${value}cm`}
                parser={value => value.replace('cm', '')} />
               )}
          </FormItem>
          </Col>
          ):null}
          
          {expand?(
            <Col span={16}>
              <FormItem label="现居住地" hasFeedback {...twoFormItemLayout}>
                {getFieldDecorator('residentialAddress', {
                  initialValue: item.residentialAddress,
                  
                })(<Input />)}
              </FormItem>
            </Col>
          ):null}
          {expand?(
            <Col span={8}>
              <FormItem label="体重" hasFeedback {...formItemLayout}>
                {getFieldDecorator('weight', {
                  initialValue: item.weight,
                  
                })(<InputNumber step={1} formatter={value => `${value}kg`}
                    parser={value => value.replace('kg', '')} />)}
              </FormItem>
            </Col>
          ):null}
          {expand?(
            <Col span={8}>
          <FormItem label="联系电话" hasFeedback {...formItemLayout}>
            {getFieldDecorator('contactPhone', {
              initialValue: item.contactPhone,
              
            })(<Input />)}
          </FormItem>
          </Col>
          ):null}
          {expand?(
            <Col span={8}>
          <FormItem label="专业" hasFeedback {...formItemLayout}>
            {getFieldDecorator('major', {
              initialValue: item.major,
              
            })(<Input />)}
          </FormItem>
          </Col>
          ):null}
          {expand?(
            <Col span={8}>
          <FormItem label="血型" hasFeedback {...formItemLayout}>
            {getFieldDecorator('bloodType', {
              initialValue: item.bloodType,
              
            })(<Input />)}
          </FormItem>
          </Col>
          ):null}
          {expand?(
            <Col span={8}>
          <FormItem label="身份证号" hasFeedback {...formItemLayout}>
            {getFieldDecorator('idNumber', {
              initialValue: item.idNumber,
              
            })(<Input />)}
          </FormItem>
          </Col>
          ):null}
          {expand?(
            <Col span={8}>
          <FormItem label="用工形式" hasFeedback {...formItemLayout}>
            {getFieldDecorator('hireType', {
              initialValue: item.hireType,
              
            })(<Input />)}
          </FormItem>
          </Col>
          ):null}
          {expand?(
            <Col span={8}>
          <FormItem label="驾驶证号" hasFeedback {...formItemLayout}>
            {getFieldDecorator('driveLicense', {
              initialValue: item.driveLicense,
              
            })(<Input />)}
          </FormItem>
          </Col>
          ):null}
          {expand?(
            <Col span={8}>
          <FormItem label="语言技能" hasFeedback {...formItemLayout}>
            {getFieldDecorator('languageSkills', {
              initialValue: item.languageSkills,
              
            })(<Input />)}
          </FormItem>
          </Col>
          ):null}
          {expand?(
            <Col span={8}>
              <FormItem label="犯罪记录" hasFeedback {...formItemLayout}>
                {getFieldDecorator('criminalRecord', {
                  initialValue: item.criminalRecord,
                  
                })(<Input />)}
              </FormItem>
            </Col>
            ):null}
          {expand?(
          <Col span={8}>
            <FormItem label="紧急联系人" hasFeedback {...formItemLayout}>
              {getFieldDecorator('emergencyContactName', {
                initialValue: item.emergencyContactName,
                
              })(<Input />)}
            </FormItem>
          </Col>
          ):null}
          {expand?(
            <Col span={8}>
          <FormItem label="联系人电话" hasFeedback {...formItemLayout}>
            {getFieldDecorator('emergencyContactPhone', {
              initialValue: item.emergencyContactPhone,
              
            })(<Input />)}
          </FormItem>
          </Col>
          ):null}
          
          <Col span={8}>
            <FormItem label="生日"  {...formItemLayout}>
              {getFieldDecorator('birthdayStr', {
                initialValue: (item.birthdayStr || item.birthday)?moment(item.birthdayStr || item.birthday, dateFormat):null,
                
              })(<DatePicker format={dateFormat} style={{width:'100%'}}/>)}
            </FormItem>
          </Col>
         
          {expand||modalType!=='update'?(
          <Col span={8}>
            <FormItem label="入职时间"  {...formItemLayout} >
              {getFieldDecorator('inductionTimeStr', {
                initialValue:(item.inductionTimeStr || item.inductionTime)? moment(item.inductionTimeStr || item.inductionTime,dateTimeFormat):null,
                
              })(<DatePicker showTime format={dateTimeFormat} style={{width:'100%'}}/>)}
            </FormItem>
          </Col>
           ):null}
          {expand?(
          <Col span={8}>
            <FormItem label="离职时间"  {...formItemLayout}>
              {getFieldDecorator('departureTimeStr', {
                initialValue:(item.departureTimeStr || item.departureTime)? moment(item.departureTimeStr || item.departureTime,dateTimeFormat):null,
                
              })(<DatePicker showTime format={dateTimeFormat} style={{width:'100%'}}/>)}
            </FormItem>
          </Col>
          ):null}
          
          <Col span={16}>
            <FormItem label="角色"  {...twoFormItemLayout}>
            {getFieldDecorator('roleIds', {
              initialValue:getRolesRows(),
              rules:[{required: true,message:'不能为空',}]
            })(<Select mode="multiple">{roleOptions}</Select>)}
            </FormItem>
          </Col>
        
          <Col span={8} style={{textAlign:'right'}}>
            <FormItem {...threeFormItemLayout}>
              <a  onClick={toggle} >
                折叠 <Icon type={expand ? 'up' : 'down'} />
              </a>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
  orgList:PropTypes.array,
  onSel:PropTypes.func,
}

export default Form.create()(modal)
