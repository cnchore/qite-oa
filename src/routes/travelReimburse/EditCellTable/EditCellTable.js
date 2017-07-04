import React from 'react'
import PropTypes from 'prop-types'
//import ReactDOM from 'react-dom'
//import styles from './EditCellTable.less'
import { Table, Popconfirm,Col,Icon,Row } from 'antd'
//import moment from 'moment';
import InputCell from '../../../components/InputCell'
import InputCurrencyCell from '../../../components/InputCurrencyCell'
import DateTimeCell from '../../../components/DateTimeCell'
import SelectCell from '../../../components/SelectCell'
import {changeMoneyToChinese} from '../../../utils'

class EditCellTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title:'序号',
      dataIndex:'index',width:60,
      render:(text,record,index)=>index+1,
    
    },{
      title: '出发时间',
      dataIndex: 'departureTimeStr',
      width: 200,
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'departureTimeStr', text,'datetime'),
    
    }, {
      title: '出发地点',
      dataIndex: 'departurePlace',
      width: 200,
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'departurePlace', text,'input'),
    }, {
      title: '到达时间',
      dataIndex: 'arrivalTimeStr',
      width: 200,
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'arrivalTimeStr', text,'datetime'),
    }, {
      title: '到达地点',
      dataIndex: 'arrivalPlace',
      width: 200,
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'arrivalPlace', text,'input'),
    }, {
      title: '交通工具',
      dataIndex: 'vehicle',
      width: 200,
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'vehicle', text,'select'),
    }, {
      title: '交通费用',
      dataIndex: 'vehicleCost',
      width: 120,
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'vehicleCost', text,'currency'),
    }, {
      title: '住宿费',
      dataIndex: 'livingCost',
      width: 120,
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'livingCost', text,'currency'),
    }, {
      title: '其他费用',
      dataIndex: 'otherCost',
      width: 120,
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'otherCost', text,'currency'),
    }, {
      title: '合计金额',
      dataIndex: 'total',
      
      render: (text, record, index) =>{
        let t=parseFloat(record.vehicleCost)+parseFloat(record.livingCost)+parseFloat(record.otherCost);
        return `¥ ${t?t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):'0.00'}` || '¥ 0.00'
      },
    
    }, {
      title: '操作',
      dataIndex: 'operation',
      fixed:'right',width:120,
      render: (text, record, index) => {
        const { editable } = this.state.data[index].departureTimeStr;
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
  add=()=>{
    const { count, data} =this.state;
    const newRow={
        key: count,
        departureTimeStr: {
          editable: true,
          value: '',
        },
        departurePlace: {
          editable: true,
          value: '',
        },
        arrivalTimeStr: {
          editable:true,
          value: '',
        },
        arrivalPlace: {
          editable:true,
          value: '',
        },
        vehicle: {
          editable:true,
          value: '1',
        },
        vehicleCost: {
          editable:true,
          value: 0,
        },
        livingCost: {
          editable:true,
          value: 0,
        },
        otherCost: {
          editable:true,
          value: 0,
        },
      }
    this.setState({
      data:[...data,newRow],
      count:count+1,
    })
  }
  handleChange(key, index, value) {
    const { data } = this.state;
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
  }
  getActualExpense(){
    const { data } =this.state;
    let c=0;
    if(data && data[0]){
      data.map(t=>{
        c+=parseFloat(t.vehicleCost.value)+parseFloat(t.livingCost.value)+parseFloat(t.otherCost.value)
      })
    }
    return c;
  }
  del(_index){
    const data =this.state.data[0]?this.state.data.filter((item,index)=>index!==_index):[];
    
    this.setState({data});
    if(this.props.callbackParent)this.props.callbackParent(data);
    //this.getActualExpense(data);
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
      //this.getActualExpense(data);
    }
  }
  render() {
    const { data, actualExpense} = this.state;
    //console.log(data)
    const dataSource = data.map((item) => {
      const obj = {};
      Object.keys(item).forEach((key) => {
        obj[key] = key === 'key' ? item[key] : item[key].value;
      });
      return obj;
    });
    //this.getActualExpense();
    //console.log(dataSource)
    const columns = this.columns;
    return  (
      <Row gutter={24} className={this.props.className}>

        <Col span={24} className='qite-list-title' style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div><Icon type="credit-card" />差旅费明细</div>
            <a onClick={e=>this.add(e)}>添加差旅明细</a>
        </Col>
        <Col span={24}>
            <Table bordered 
              dataSource={dataSource} 
              columns={columns} 
              pagination={false}
              scroll={{ x: 1800 }} 
              footer={()=>(
                <div>
                报销总额：{`¥ ${this.getActualExpense().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                &nbsp;&nbsp;&nbsp;&nbsp;大写：{changeMoneyToChinese(this.getActualExpense())}
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
