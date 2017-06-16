import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input,InputNumber, Modal,Select,Switch,Row,Col } from 'antd'

const FormItem = Form.Item
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  orgList=[],
  positionList=[],
  item = {},
  orgKey=null,
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
  },
  ...modalProps
}) => {
  if(orgKey!==undefined && orgKey!==null){
    item.orgId=orgKey;
  }
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {...getFieldsValue()}
      //let _ls=orgList.filter(item=>String(item.id)===data.orgId);
      //console.log('orgParentId:',_ls[0].parentId)
      
      if(item.id){
        data.id=item.id
      }
      onOk(data)
    })
  }
 

  const modalOpts = {
    ...modalProps,
    width:'1000',
    onOk: handleOk,
  }
  const orgOptions = orgList.map(org => <Option key={org.id}>{org.orgName}</Option>);
  const handleSelectChange = (value,name) => {
    
    setFieldsValue({
      name: value
    });
  }
  const postOptions=positionList.map(dic=><Option key={dic.id}>{dic.postName}</Option>);

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <Row gutter={24} marginLeft={'0px'} marginRight={'0px'} type="flex" justify="space-between" align="bottom">
          <Col span={8}>
              <FormItem label="姓名" hasFeedback {...formItemLayout}>
                {getFieldDecorator('realName', {
                  initialValue: item.realName,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input />)}
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
                      message: 'The input is not valid phone!',
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
          <Col span={8}>
            <FormItem label="照片" hasFeedback {...formItemLayout}>
              {getFieldDecorator('photo', {
                initialValue: item.photo,
                
              })(<Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }}/>)}
            </FormItem>
          </Col>
          <Col span={8}>
              <FormItem label="职位" hasFeedback {...formItemLayout}>
                {getFieldDecorator('postIds', {
                  initialValue:String(item.postIds===undefined?'':item.postIds),
                  rules: [
                    {
                      required: true,
                      
                    },
                  ],
                })(<Select onChange={e=>handleSelectChange(e.value,'postIds')}>{postOptions}</Select>)}
              </FormItem>
          </Col>
          <Col span={8}>
              <FormItem label="职位状态" hasFeedback {...formItemLayout}>
                {getFieldDecorator('positionState', {
                  initialValue: item.positionState,
                  
                })(<Input />)}
              </FormItem>
          </Col>

          <Col span={8}>
              <FormItem label="工号" hasFeedback {...formItemLayout}>
                {getFieldDecorator('empNum', {
                  initialValue: item.empNum,
                  
                })(<Input />)}
              </FormItem>
          </Col>
          
          <Col span={8}>
              <FormItem label="性别" hasFeedback {...formItemLayout}>
                {getFieldDecorator('sex', {
                  initialValue: item.sex,
                  
                })(<Input />)}
              </FormItem>
          </Col>
          <Col span={8}>
              <FormItem label="婚姻状况" hasFeedback {...formItemLayout}>
                {getFieldDecorator('marriages', {
                  initialValue: item.marriages,
                  
                })(<Input />)}
              </FormItem>
          </Col>
          <Col span={8}>
              <FormItem label="民族" hasFeedback {...formItemLayout}>
                {getFieldDecorator('nation', {
                  initialValue: item.nation,
                  
                })(<Input />)}
              </FormItem>
          </Col>
          <Col span={8}>
              <FormItem label="户籍" hasFeedback {...formItemLayout}>
                {getFieldDecorator('householdRegister', {
                  initialValue: item.householdRegister,
                  
                })(<Input />)}
              </FormItem>
          </Col>
            <Col span={8}>
          <FormItem label="健康状况" hasFeedback {...formItemLayout}>
            {getFieldDecorator('health', {
              initialValue: item.health,
              
            })(<Input />)}
          </FormItem>
          </Col>
            <Col span={8}>
          <FormItem label="子女数量" hasFeedback {...formItemLayout}>
            {getFieldDecorator('childrenNum', {
              initialValue: item.childrenNum,
             
            })(<InputNumber step={1} />)}
          </FormItem>
          </Col>
            <Col span={8}>
          <FormItem label="学历" hasFeedback {...formItemLayout}>
            {getFieldDecorator('education', {
              initialValue: item.education,
              
            })(<Input />)}
          </FormItem>
          </Col>
            <Col span={8}>
          <FormItem label="身高" hasFeedback {...formItemLayout}>
            {getFieldDecorator('height', {
              initialValue: item.height,
              
            })(<InputNumber step={1} />)}
          </FormItem>
          </Col>
            <Col span={8}>
          <FormItem label="体重" hasFeedback {...formItemLayout}>
            {getFieldDecorator('weight', {
              initialValue: item.weight,
              
            })(<InputNumber step={1} />)}
          </FormItem>
          </Col>
            <Col span={8}>
          <FormItem label="联系电话" hasFeedback {...formItemLayout}>
            {getFieldDecorator('contactPhone', {
              initialValue: item.contactPhone,
              
            })(<Input />)}
          </FormItem>
          </Col>
            <Col span={8}>
          <FormItem label="专业" hasFeedback {...formItemLayout}>
            {getFieldDecorator('major', {
              initialValue: item.major,
              
            })(<Input />)}
          </FormItem>
          </Col>
            <Col span={8}>
          <FormItem label="血型" hasFeedback {...formItemLayout}>
            {getFieldDecorator('bloodType', {
              initialValue: item.bloodType,
              
            })(<Input />)}
          </FormItem>
          </Col>
            <Col span={8}>
          <FormItem label="身份证号" hasFeedback {...formItemLayout}>
            {getFieldDecorator('idNumber', {
              initialValue: item.idNumber,
              
            })(<Input />)}
          </FormItem>
          </Col>
            <Col span={8}>
          <FormItem label="用工形式" hasFeedback {...formItemLayout}>
            {getFieldDecorator('hireType', {
              initialValue: item.hireType,
              
            })(<Input />)}
          </FormItem>
          </Col>
            <Col span={8}>
          <FormItem label="驾驶证号" hasFeedback {...formItemLayout}>
            {getFieldDecorator('driveLicense', {
              initialValue: item.driveLicense,
              
            })(<Input />)}
          </FormItem>
          </Col>
            <Col span={8}>
          <FormItem label="语言技能" hasFeedback {...formItemLayout}>
            {getFieldDecorator('languageSkills', {
              initialValue: item.languageSkills,
              
            })(<Input />)}
          </FormItem>
          </Col>
            <Col span={8}>
          <FormItem label="现居住地" hasFeedback {...formItemLayout}>
            {getFieldDecorator('residentialAddress', {
              initialValue: item.residentialAddress,
              
            })(<Input />)}
          </FormItem>
          </Col>
            <Col span={8}>
          <FormItem label="犯罪记录" hasFeedback {...formItemLayout}>
            {getFieldDecorator('criminalRecord', {
              initialValue: item.criminalRecord,
              
            })(<Input />)}
          </FormItem>
          </Col>
            <Col span={8}>
          <FormItem label="紧急联系人" hasFeedback {...formItemLayout}>
            {getFieldDecorator('emergencyContactName', {
              initialValue: item.emergencyContactName,
              
            })(<Input />)}
          </FormItem>
          </Col>
            <Col span={8}>
          <FormItem label="联系人电话" hasFeedback {...formItemLayout}>
            {getFieldDecorator('emergencyContactPhone', {
              initialValue: item.emergencyContactPhone,
              
            })(<Input />)}
          </FormItem>
          </Col>
            <Col span={8}>
          <FormItem label="生日" hasFeedback {...formItemLayout}>
            {getFieldDecorator('birthdayStr', {
              initialValue: item.birthdayStr,
              
            })(<Input />)}
          </FormItem>
          </Col>
            <Col span={8}>
          <FormItem label="入职时间" hasFeedback {...formItemLayout}>
            {getFieldDecorator('birthdayStr', {
              initialValue: item.birthdayStr,
              
            })(<Input />)}
          </FormItem>
          </Col>
            <Col span={8}>
          <FormItem label="离职时间" hasFeedback {...formItemLayout}>
            {getFieldDecorator('departureTimeStr', {
              initialValue: item.departureTimeStr,
              
            })(<Input />)}
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
}

export default Form.create()(modal)
