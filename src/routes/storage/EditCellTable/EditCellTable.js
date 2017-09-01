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
      width: 200,
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'materialName', text,'input'),
    
    }, {
      title: '规格',
      dataIndex: 'spec',
      width: 120,
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'spec', text,'input'),
    }, {
      title: '数量',
      dataIndex: 'num',
      width: 80,
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'num', text,'number'),
    }, {
      title: '单位',
      dataIndex: 'unit',
      width: 80,
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'unit', text,'input'),
    }, {
      title: '单价',
      dataIndex: 'amount',
      width: 120,
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'amount', text,'currency'),
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
      width: 200,
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'useTimeStr', text,'datetime'),
    }, {
      title: '原因和用途',
      dataIndex: 'remark',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'remark', text,'input'),
    }, {
      title: '供应商名称',
      dataIndex: 'supplierName',width:200,
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'supplierName', text,'input'),
    }, {
      title: '采购金额',
      dataIndex: 'purchaseAmount',
      width: 120,
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'purchaseAmount', text,'currency'),
    }, {
      title: '预估到货时间',
      dataIndex: 'estiArrivalTime',
      width: 200,
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'estiArrivalTime', text,'datetime'),
    }, {
      title: '到货/入库时间',
      dataIndex: 'storageTime',
      width: 200,
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'storageTime', text,'datetime'),
    }, {
      title: '是否已入库',
      dataIndex: 'isIn',
      width: 150,
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'isIn', text,'radio'),
    }, {
      title: '操作',
      dataIndex: 'operation',
      fixed:'right',width:120,
      render: (text, record, index) => {
        const { editable } = this.state.data[index].amount;
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
      count:0,
      data:this.props.dataSource || [],
      actualExpense:0,
      // modalVisable:false,
      // applyList:[],
      // actionInfo:userInfo && userInfo.data && userInfo.data.employeeVo || {}
    };
  }
  
  renderColumns(data, index, key, text,colType) {
    const { editable, status } = data[index][key];
    let isCanEdit=false;//data[index].applyId;
    //console.log('isCanEdit:',isCanEdit)
    const { dicList } =this.props;
    if (typeof editable === 'undefined' || (isCanEdit && key!=='amount' && key!=='num')) {
      return text;
    }
    switch(colType){
      case 'input':
        return (<InputCell
          editable={editable}
          value={text}
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
    let { count, data} =this.state;
    // const {applyList} =this.props;
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
          value: '',
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
          editable:true,
          value: '',
        },
        purchaseAmount: {
          editable:true,
          value: '',
        },
        estiArrivalTime: {
          editable:true,
          value: '',
        },
        storageTime: {
          editable:true,
          value: '',
        },
        isIn: {
          editable:true,
          value: '',
        },
      }
    if(keys[0]){
      // let selectedRows=applyList.filter(item=>(keys.findIndex(k=>String(k)===String(item.id)))>-1)
      // const dataSource = selectedRows.map((item) => {
      //   let obj = {};
      //   Object.keys(item).forEach((key) => {
      //     if(key === 'key' || key=== 'id' || key=== 'applyId'){
      //       obj[key]=item[key];
      //     }else if(key==='useTime'){
      //       obj['useTimeStr']={};
      //       obj['useTimeStr'].editable=false;
      //       obj['useTimeStr'].value=item[key];
      //       //console.log('useTimeStr:',item[key])
      //     }else if(key!=='useTimeStr'){
      //       obj[key]={};
      //       obj[key].editable=key==='amount' || key==='num'?true:false;
      //       obj[key].value=item[key];
      //     }
      //   });
      //   return obj;
      // });
      //console.log(dataSource)
      // this.setState({
      //   data:[...data,...dataSource],
      //   count:count+keys.length,
      // })
    }else{
      this.setState({
        data:[...data,newRow],
        count:count+1,
      })
    }
    this.props.setIsEditable && this.props.setIsEditable(true);

  }
  // selectList=()=>{
  //   const { applyList } =this.props;
  //   const {data}=this.state;
  //   let list=applyList.filter(item=>data.findIndex(d=>String(item.id)===String(d.id))===-1);
  //   this.setState({modalVisable:true,applyList:list});
  // }
  handleChange(key, index, value) {
    const { data } = this.state;
    // if(selectedRow && selectedRow[0]){
    //   data[index]['applyDept'].value=selectedRow.orgName;
    // }
    data[index][key].value = value;
    this.setState({ data });
  }
  edit(index) {
    const { data } = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = true;
      }
    });
    this.setState({ data });
    this.props.setIsEditable && this.props.setIsEditable(true);
  }
  getTotalNum(){
    const { data } =this.state;
    let c=0;
    if(data && data[0]){
      data.map(t=>{
        c+=parseFloat(t.num.value);
      })
    }
    return c;
  }
  getTotalAmount(){
    const { data } =this.state;
    let c=0.00;
    if(data && data[0]){
      data.map(t=>{
        c+=parseFloat(t.num.value)*parseFloat(t.amount.value===null||t.amount.value===''|| t.amount.value===undefined?0:t.amount.value);
      })
    }
    return c.toFixed(2);
  }
  del(_index){
    let data =this.state.data;
    data.splice(_index,1);
    this.setState({data});
    if(this.props.callbackParent)this.props.callbackParent(data);
  }
  editDone(index, type) {
    const { data } = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = false;
        data[index][item].status = type;
      }
    });
    this.setState({ data }, () => {
      Object.keys(data[index]).forEach((item) => {
        if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
          delete data[index][item].status;
        }
      });
    });
    if(this.props.callbackParent){
      this.props.callbackParent(data);
    }
    this.props.setIsEditable && this.props.setIsEditable(findIsEditable(this.state.data));
  }
  render() {
    const { data,actualExpense} = this.state;
    const dataSource = data.map((item) => {
      const obj = {};
      Object.keys(item).forEach((key) => {
        obj[key] = key === 'key' || key=== 'id' || key=== 'applyId' ? item[key] : item[key].value;
      });
      return obj;
    });
    const columns = this.columns;
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
    return  (
      <Row gutter={24} className={this.props.className}>

        <Col span={24} className='qite-list-title' style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div><Icon type="credit-card" />物品明细</div>
            <div>
            <a onClick={e=>this.add(e)}>添加物品明细</a>
            </div>
        </Col>
        <Col span={24}>
            <Table bordered 
              dataSource={dataSource} 
              columns={columns} 
              pagination={false}
              scroll={{ x: 2300 }}
              rowKey={record=>record.key} 
              footer={()=>(
                <div className={styles.footer}>
                采购总数量：{this.getTotalNum()}
                <span>采购总金额：{`¥ ${this.getTotalAmount().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</span>
                <span>大写：{changeMoneyToChinese(this.getTotalAmount())}</span>
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
