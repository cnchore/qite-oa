import React from 'react'
import PropTypes from 'prop-types'
//import ReactDOM from 'react-dom'
//import styles from './EditCellTable.less'
import { Table, Popconfirm,Col,Icon,Row } from 'antd'
//import moment from 'moment';
import InputCell from '../../../components/InputCell'
import InputCurrencyCell from '../../../components/InputCurrencyCell'
import InputNumberCell from '../../../components/InputNumberCell'
// import DateTimeCell from '../../../components/DateTimeCell'
// import SelectCell from '../../../components/SelectCell'
import {changeMoneyToChinese,findIsEditable} from '../../../utils'

class EditCellTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title:'序号',
      dataIndex:'index',width:60,
      render:(text,record,index)=>index+1,
      },{
      dataIndex:'productName',
      title:'产品系列名称',
      render:(text,record,index)=>this.renderColumns(this.props.dataSource,index,'productName',text,'input'),
      },{
      dataIndex:'width',
      width:80,
      title:'宽(mm)',
      render:(text,record,index)=>this.renderColumns(this.props.dataSource,index,'width',text,'number'),
      },{
      dataIndex:'height',
      width:80,
      title:'高(mm)',
      render:(text,record,index)=>this.renderColumns(this.props.dataSource,index,'height',text,'number'),
      },{
      dataIndex:'num',
      width:90,
      title:'数量(樘/个)',
      render:(text,record,index)=>this.renderColumns(this.props.dataSource,index,'num',text,'number'),
      },{
      dataIndex:'areas',
      width:80,
      title:'面积(m²)',
      render:(text,record,index)=>this.renderColumns(this.props.dataSource,index,'areas',text,'number'),
      },{
      dataIndex:'singlePrice',
      width:100,
      title:'单价(元/m²)',
      render:(text,record,index)=>this.renderColumns(this.props.dataSource,index,'singlePrice',text,'currency'),
      },{
        dataIndex:'amount',
        width:100,
        title:'金额(元)',
        render:(text,record)=>{
          let a=parseFloat(record.num)*parseFloat(record.areas)*parseFloat(record.singlePrice);
          return a.toFixed(2);
        },
      },{
      dataIndex:'thickness',
      width:120,
      title:'型材壁厚(T)',
      render:(text,record,index)=>this.renderColumns(this.props.dataSource,index,'thickness',text,'input'),
      },{
      dataIndex:'color',
      width:120,
      title:'门窗颜色',
      render:(text,record,index)=>this.renderColumns(this.props.dataSource,index,'color',text,'input'),
      },{
      dataIndex:'parts',
      width:120,
      title:'配件厂家',
      render:(text,record,index)=>this.renderColumns(this.props.dataSource,index,'parts',text,'input'),
      },{
      dataIndex:'glassInfo',
      width:120,
      title:'玻璃规格及颜色',
      render:(text,record,index)=>this.renderColumns(this.props.dataSource,index,'glassInfo',text,'input'),
      },{
      dataIndex:'waistLine',
      width:120,
      title:'格条及腰线',
      render:(text,record,index)=>this.renderColumns(this.props.dataSource,index,'waistLine',text,'input'),
      }, {
      title: '操作',
      dataIndex: 'operation',
      fixed:'right',width:120,
      render: (text, record, index) => {
        const { editable } = this.props.dataSource[index].productName;
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
  
  renderColumns(data, index, key, text,colType) {
    const { editable, status } = data[index][key];
    const { dicList } =this.props;
    if (typeof editable === 'undefined') {
      return text;
    }
    switch(colType){
      case 'input':
        return (<InputCell
          editable={editable}
          value={text}
          length={15}
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
      case 'number':
        return (<InputNumberCell
          editable={editable}
          value={text}
          onChange={value => this.handleChange(key, index, value)}
          status={status}
        />);
    }
  }
  add=()=>{
    let data  = this.props.dataSource;
    let count=data.length;
    const newRow={
        key: count+Math.random(),
        productName:{
          editable:true,
          value:'',
        },
        width:{
          editable:true,
          value:0,
        },
        height:{
          editable:true,
          value:0,
        },
        num:{
          editable:true,
          value:0,
        },
        areas:{
          editable:true,
          value:0,
        },
        singlePrice:{
          editable:true,
          value:0,
        },
        thickness:{
          editable:true,
          value:'',
        },
        color:{
          editable:true,
          value:'',
        },
        parts:{
          editable:true,
          value:'',
        },
        glassInfo:{
          editable:true,
          value:'',
        },
        waistLine:{
          editable:true,
          value:'',
        },
      }
    // this.setState({
    //   data:[...data,newRow],
    //   count:count+1,
    // })
    if(this.props.callbackParent)this.props.callbackParent([...data,newRow]);
    this.props.setIsEditable && this.props.setIsEditable(true);
  }
  handleChange(key, index, value) {
    let data  = this.props.dataSource;
    data[index][key].value = value;
    // this.setState({ data });
    delete data[index][key].status;
    if(this.props.callbackParent)this.props.callbackParent(data);
    this.props.setIsEditable && this.props.setIsEditable(findIsEditable(data));
  }
  edit(index) {
    let data  = this.props.dataSource;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = true;
      }
    });
    // this.setState({ data });
    if(this.props.callbackParent)this.props.callbackParent(data);
    this.props.setIsEditable && this.props.setIsEditable(true);
  }
  getTotalAmount(){
    const data =this.props.dataSource;
    let c=0;
    if(data && data[0]){
      data.map(t=>{
        c+=parseFloat(t.num.value)*parseFloat(t.areas.value)*parseFloat(t.singlePrice.value)
      })
    }
    return c.toFixed(2);
  }
  del(_index){
    const data =this.props.dataSource[0]?this.props.dataSource.filter((item,index)=>index!==_index):[];
    if(this.props.callbackParent)this.props.callbackParent(data);
  }
  editDone(index, type) {
    let data  = this.props.dataSource;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = false;
        data[index][item].status=type;
      }
    });
    if(this.props.callbackParent){
      this.props.callbackParent(data);
    }
    this.props.setIsEditable && this.props.setIsEditable(findIsEditable(data));
  }
  render() {
    let data = this.props.dataSource;
    const dataSource = data.map((item) => {
      const obj = {};
      Object.keys(item).forEach((key) => {
        obj[key] = key === 'key' || key === 'id' ? item[key] : item[key].value;
      });
      return obj;
    });
    //this.getActualExpense();
    const columns = this.columns;

    return  (
      <Row gutter={24} className={this.props.className}>

        <Col span={24} className='qite-list-title' style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div><Icon type="credit-card" />样板房明细</div>
            <a onClick={e=>this.add(e)}>添加明细</a>
        </Col>
        <Col span={24}>
            <Table bordered 
              dataSource={dataSource} 
              columns={columns} 
              pagination={false}
              scroll={{ x: 1600 }} 
              rowKey={record=>record.key}
              footer={()=>(
                <div>
                合计金额：{`¥ ${this.getTotalAmount().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                &nbsp;&nbsp;&nbsp;&nbsp;大写：{changeMoneyToChinese(this.getTotalAmount())}
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
}

export default EditCellTable
