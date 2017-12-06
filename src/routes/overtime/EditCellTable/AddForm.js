import { Form, DatePicker, Button,Modal } from 'antd';
import MultiSelectUser from '../../../components/MultiSelectUser'

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const dateTimeFormat='YYYY-MM-DD HH:mm:ss';

class AddForm extends React.Component {
  state={
    modalVisible:false,
    selectedRows:[],
    orgName:''
  }
  handleSubmit=(e)=>{
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const {selectedRows,orgName} =this.state;
      let data={selectedRows,orgName};
      let overTime=fieldsValue['overTime'];
      let realOverTime=fieldsValue['realOverTime'];
      if(overTime){
        data.overTimeStartStr=overTime[0].format(dateTimeFormat);
        data.overTimeEndStr=overTime[1].format(dateTimeFormat);
      }
      if(realOverTime){
        data.realOverTimeStartStr=realOverTime[0].format(dateTimeFormat);
        data.realOverTimeEndStr=realOverTime[1].format(dateTimeFormat);
      }
      this.setState({modalVisible:false});
      this.props.callBack && this.props.callBack(data);
    });
  }
  showModal=()=>{
    this.setState({modalVisible:true});
  }
  handleCancel=()=>{
    this.setState({modalVisible:false});
  }
  render() {
    const { getFieldDecorator,getFieldValue } = this.props.form;
    const {selectedRows,orgName,modalVisible} =this.state;
    const {overTimeType} = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    
    const rangeConfig = {
      rules: [{ type: 'array', required: true, message: '不能为空!' }],
    };
    const getHours=(t=0)=>{
      let a,b;
      if(t && getFieldValue('realOverTime')){
        a=getFieldValue('realOverTime')[0].format(dateTimeFormat);
        b=getFieldValue('realOverTime')[1].format(dateTimeFormat);
      }else if(getFieldValue('overTime')){
        a=getFieldValue('overTime')[0].format(dateTimeFormat);
        b=getFieldValue('overTime')[1].format(dateTimeFormat);
      }
      if(!a||!b){
        return 0;
      }
      let timeA=new Date(a);
      let timeB=new Date(b);
      return ((timeB-timeA)/(3600*1000)).toFixed(2)
    }
    const handleSelectUser=(data)=>{
      if(data){
        this.setState({...data});
      }
    }
    // console.log('selectedRows:',selectedRows);
    const userNames=selectedRows && selectedRows[0]?
      selectedRows.map(f=>f.realName).join()
      :'';
    return (
      <span>
        <a  onClick={e=>this.showModal()}>添加明细</a>
        <Modal
          width={600}
          title='添加加班明细'
          visible={modalVisible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
          <Form>
            <FormItem
              {...formItemLayout}
              label="加班人"
            >
              {userNames}{"   "}
              <MultiSelectUser callBack={handleSelectUser}/>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="部门"
            >
              {orgName || ''}
            </FormItem>
            {
              overTimeType===1?
              <FormItem
                {...formItemLayout}
                label="申请加班时间"
              >
                {getFieldDecorator('overTime', rangeConfig)(
                  <RangePicker showTime format={dateTimeFormat} style={{width:'100%'}}/>
                )}
              </FormItem>
              :null
            }
            {
              overTimeType===1?
              <FormItem
                {...formItemLayout}
                label="加班时长"
              >
                {getHours()}
              </FormItem>
              :null
            }
            {
              overTimeType===2?
              <FormItem
                {...formItemLayout}
                label="实际加班时间"
              >
                {getFieldDecorator('realOverTime', rangeConfig)(
                  <RangePicker showTime format={dateTimeFormat} style={{width:'100%'}}/>
                )}
              </FormItem>
              :null
            }
            {
              overTimeType===2?
              <FormItem
                {...formItemLayout}
                label="加班时长"
              >
                {getHours(1)}
              </FormItem>
              :null
            }
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(AddForm)