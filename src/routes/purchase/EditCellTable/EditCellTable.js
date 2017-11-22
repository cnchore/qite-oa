import React from 'react'
import PropTypes from 'prop-types'
//import ReactDOM from 'react-dom'
import styles from './EditCellTable.less'
import { Table, Popconfirm,Col,Icon,Row } from 'antd'
//import moment from 'moment';
import InputCell from '../../../components/InputCell'
import InputNumberCell from '../../../components/InputNumberCell'
import InputCurrencyCell from '../../../components/InputCurrencyCell'
import DateTimeCell from '../../../components/DateTimeCell'
import SelectCell from '../../../components/SelectCell'
import RadioCell from '../../../components/RadioCell'
// import EmployeeCell from '../../../components/EmployeeCell'
import {changeMoneyToChinese,config,findIsEditable} from '../../../utils'
// import SelectPurchaseApply from '../SelectPurchaseApply'
const { prefix } =config;
// const userInfo = JSON.parse(sessionStorage.getItem(`${prefix}userInfo`));
class EditCellTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title:'序号',
      dataIndex:'index',width:50,
      render:(text,record,index)=>index+1,
    },{
      title: '物料名称',
      dataIndex: 'materialName',
      width: 120,
      render: (text, record, index) => this.renderColumns(this.props.dataSource, index, 'materialName', text,'input',12),
    
    }, {
      title: '规格',
      dataIndex: 'spec',
      width: 120,
      render: (text, record, index) => this.renderColumns(this.props.dataSource, index, 'spec', text,'input',12),
    }, {
      title: '数量',
      dataIndex: 'num',
      width: 80,
      render: (text, record, index) => this.renderColumns(this.props.dataSource, index, 'num', text,'number'),
    }, {
      title: '单位',
      dataIndex: 'unit',
      width: 80,
      render: (text, record, index) => this.renderColumns(this.props.dataSource, index, 'unit', text,'input',8),
    }, {
      title: '单价',
      dataIndex: 'amount',
      width: 120,
      render: (text, record, index) => this.renderColumns(this.props.dataSource, index, 'amount', text,'currency'),
    }, {
      title: '预估金额',
      dataIndex: 'totalAmount',
      width: 120,
      render: (text, record, index) =>{
        let t=parseFloat(record.num)*parseFloat(record.amount);
        return `¥ ${t?t.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):'0.00'}` || '¥ 0.00'
      },
    }, {
      title: '使用时间',
      dataIndex: 'useTimeStr',
     
      render: (text, record, index) => this.renderColumns(this.props.dataSource, index, 'useTimeStr', text,'datetime'),
    }, {
      title: '原因和用途',
      dataIndex: 'remark',
      render: (text, record, index) => this.renderColumns(this.props.dataSource, index, 'remark', text,'input',20),
    }, {
      title: '供应商名称',
      dataIndex: 'supplierName',width:120,
      render: (text, record, index) => this.renderColumns(this.props.dataSource, index, 'supplierName', text,'input',15),
    }, {
      title: '采购金额',
      dataIndex: 'purchaseAmount',
      width: 120,
      render: (text, record, index) => this.renderColumns(this.props.dataSource, index, 'purchaseAmount', text,'currency'),
    }, {
      title: '预估到货时间',
      dataIndex: 'estiArrivalTime',
      render: (text, record, index) => this.renderColumns(this.props.dataSource, index, 'estiArrivalTime', text,'datetime'),
    
    }, {
      title: '操作',
      dataIndex: 'operation',
      fixed:'right',width:120,
      render: (text, record, index) => {
        const { editable } = this.props.dataSource[index].amount;
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.editDone(index, 'save')}>保存</a>
                  <Popconfirm title="确定取消么?" onConfirm={() => this.editDone(index, 'cancel')}>
                    <a>取消</a>
                  </Popconfirm>
                </span>
                :
                <span>
                  <a onClick={() => this.edit(index)}>编辑</a>
                  <Popconfirm title="确定删除么?" onConfirm={() => this.del(index)}>
                    <a>删除</a>
                  </Popconfirm>
                 
                </span>
            }
          </div>
        );
      },
    }];
    this.state = {
      
    };
  }
  static defaultProps = {
      dataSource:[]
  }
  componentWillReceiveProps(nextProps){
    // console.log('nextProps:',nextProps)
  }
  renderColumns(data, index, key, text,colType,length) {
    const { editable, status } = data[index][key];
    const { dicList,taskDo,useDesc,isCanAdd } =this.props;
    //taskDo=true:任务办理中，供应商等信息可编辑，申请信息不可编辑
    let isCanEdit;
    if(!taskDo){
      if(key==='supplierName' || key==='purchaseAmount' || key==='estiArrivalTime' || key==='storageTime')
      {
        isCanEdit=false;//不可编辑
      }else{
        isCanEdit=true;
      }
    }else if(taskDo && (useDesc==='purInquiry' || useDesc==='purConfirm')){
      if(key!=='supplierName' && key!=='purchaseAmount' && key!=='estiArrivalTime' && key!=='storageTime')
      {
        isCanEdit=false;
      }else{
        isCanEdit=true;
      }
    }
    //可添加明细
    if(isCanAdd){
      if(key!=='supplierName' && key!=='purchaseAmount' && key!=='estiArrivalTime' && key!=='storageTime')
      {
        isCanEdit=true;
      }else{
        isCanEdit=false;
      }
    }
    // console.log(key+' isCanEdit:',isCanEdit)
    if (typeof editable === 'undefined' || !isCanEdit || key==='isIn') {
      return text;
    }
    switch(colType){
      case 'input':
        return (<InputCell
          editable={editable}
          value={text}
          length={length}
          onChange={value => this.handleChange(key, index, value)}
          status={status}
        />);
      case 'radio':
        return (<RadioCell
          editable={editable}
          value={text}
          onChange={value => this.handleChange(key, index, value)}
          status={status}
        />);
      case 'number':
        return (<InputNumberCell
          editable={editable}
          value={text}
          onChange={value => this.handleChange(key, index, value)}
          status={status}
        />);
      case 'currency':
        return (<InputCurrencyCell
          editable={editable}
          value={text}
          onChange={value => this.handleChange(key, index, value)}
          status={status}
        />);
      case 'datetime':
        return (<DateTimeCell
          editable={editable}
          value={text} 
          dateFormat="YYYY-MM-DD" showTime={false}
          onChange={value => this.handleChange(key, index, value)}
          status={status}
        />);
      case 'select':
        return (<SelectCell
          editable={editable}
          value={text}
          selectOptions={dicList}
          onChange={value => this.handleChange(key, index, value)}
          status={status}
        />);
    }
  }
  add=(keys=[])=>{
    let data =this.props.dataSource;
    let count=data.length;
    const {taskDo} =this.props;
    // console.log('taskDo:',taskDo)
    const newRow={
        key: count+Math.random(),
        materialName: {
          editable: true,
          value: '',
        },
        spec: {
          editable: true,
          value:'',
        },
        num: {
          editable:true,
          value: 1,
        },
        unit: {
          editable:true,
          value: '',
        },
        amount: {
          editable:true,
          value: 0,
        },
        useTimeStr: {
          editable:true,
          value: '',
        },
        remark: {
          editable:true,
          value: '',
        },
        supplierName: {
          editable:false,
          value: '',
        },
        purchaseAmount: {
          editable:false,
          value: 0,
        },
        estiArrivalTime: {
          editable:false,
          value: '',
        },
        storageTime: {
          editable:false,
          value: '',
        },
        isIn: {
          editable:false,
          value: '',
        },
      }
    
    if(this.props.callbackParent)this.props.callbackParent([...data,newRow]);

    this.props.setIsEditable && this.props.setIsEditable(true);

  }
  
  handleChange(key, index, value) {
    let data = this.props.dataSource;
    // if(selectedRow && selectedRow[0]){
    //   data[index]['applyDept'].value=selectedRow.orgName;
    // }
    data[index][key].value = value;
    delete data[index][key].status;
    // this.setState({ data });
    this.props.callbackParent && this.props.callbackParent(data);
    this.props.setIsEditable && this.props.setIsEditable(findIsEditable(data));

  }
  edit(index) {
    let data = this.props.dataSource;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = true;
      }
    });
    this.props.callbackParent && this.props.callbackParent(data);
    this.props.setIsEditable && this.props.setIsEditable(true);
  }
  getTotalNum(){
    let data = this.props.dataSource;
    let c=0;
    if(data && data[0]){
      data.map(t=>{
        c+=parseFloat(t.num.value);
      })
    }
    return c;
  }
  getTotalAmount(){
    let data = this.props.dataSource;
    let c=0.00;
    if(data && data[0]){
      data.map(t=>{
        c+=parseFloat(t.num.value)*parseFloat(t.amount.value===null||t.amount.value===''|| t.amount.value===undefined?0:t.amount.value);
      })
    }
    return c.toFixed(2);
  }
  getTotalPurchaseAmount(){
    let data = this.props.dataSource;
    let c=0.00;
    if(data && data[0]){
      data.map(t=>{
        c+=parseFloat(t.purchaseAmount.value);
      })
    }
    return c.toFixed(2);
  }
  del(_index){
    let data = this.props.dataSource;
    data.splice(_index,1);
    // this.setState({data});
    if(this.props.callbackParent)this.props.callbackParent(data);
  }
  editDone(index, type) {
    let data = this.props.dataSource;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = false;
        data[index][item].status = type;
      }
    });
   
    if(this.props.callbackParent){
      this.props.callbackParent(data);
    }
    this.props.setIsEditable && this.props.setIsEditable(findIsEditable(data));
  }
  render() {
    let data = this.props.dataSource;
    const {taskDo,isCanAdd,useDesc} =this.props;
    const dataSource = data.map((item) => {
      const obj = {};
      Object.keys(item).forEach((key) => {
        obj[key] = key === 'key' || key=== 'id' || key=== 'applyId' ? item[key] : item[key].value;
      });
      return obj;
    });
    let columns =[],scrollX=2100;

    if(!taskDo || isCanAdd){
      columns=this.columns.filter(f=>f.dataIndex!=='supplierName' && f.dataIndex!=='purchaseAmount' 
      && f.dataIndex!=='estiArrivalTime' && f.dataIndex!=='storageTime' && f.dataIndex!=='isIn');
      scrollX=1400;
    }else if(taskDo && useDesc!=='purInquiry' && useDesc!=='purConfirm'){
      columns=this.columns.filter(f=>f.dataIndex!=='operation' && f.dataIndex!=='storageTime');
      scrollX=2000;
    }else if(useDesc==='purConfirm' || useDesc==='purInquiry'){
      columns=this.columns.filter(f=>f.dataIndex!=='storageTime');
      scrollX=2100;
    }else{
      columns=this.columns;
    }

    // const onCancel =()=> {
    //     this.setState({modalVisable:false});
    // }
    // const handleOk=(_data)=>{
    //   this.add(_data)
    //   this.setState({modalVisable:false});
    // }
    // const modalProps={
    //   visible:modalVisable,
    //   onOk:handleOk,
    //   onCancel,
    // }
    //_use==='purInquiry' || _use==='purConfirm'
    return  (
      <Row gutter={24} className={this.props.className}>

        <Col span={24} className='qite-list-title' style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div><Icon type="credit-card" />物品明细</div>
            { !taskDo || isCanAdd?
              <div>
                <a onClick={e=>this.add(e)}>添加物品明细</a>
              </div>
            :null}
        </Col>
        <Col span={24}>
            <Table bordered 
              dataSource={dataSource} 
              columns={columns} 
              pagination={false}
              scroll={{ x: (scrollX - 160 - 150) }}
              rowKey={record=>record.key} 
              footer={()=>(
                <div className={styles.footer}>
                采购总数量：{this.getTotalNum()}
                <span>预估总金额：{`¥ ${this.getTotalAmount().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</span>
                <span>大写：{changeMoneyToChinese(this.getTotalAmount())}</span>
                <span>采购总金额：{`¥ ${this.getTotalPurchaseAmount().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</span>
                <span>大写：{changeMoneyToChinese(this.getTotalPurchaseAmount())}</span>
                </div>
                )}
              />
        </Col>
      </Row>
      )

      
  }
}


EditCellTable.propTypes = {
  dataSource: PropTypes.array,
  dicList:PropTypes.array,
  // applyList:PropTypes.array,
}

export default EditCellTable
