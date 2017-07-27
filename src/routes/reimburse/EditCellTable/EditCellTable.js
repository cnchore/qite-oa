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
import {changeMoneyToChinese,findIsEditable} from '../../../utils'

class EditCellTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title:'序号',
      dataIndex:'index',width:60,
      render:(text,record,index)=>index+1,
    
    },{
      title: '用途',
      dataIndex: 'uses',
      width: 200,
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'uses', text,'input'),
   }, {
      title: '金额',
      dataIndex: 'amount',
      width: 120,
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'amount', text,'currency'),
    }, {
      title: '备注',
      dataIndex: 'remark',
      
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'remark', text,'input'),
    
    }, {
      title: '操作',
      dataIndex: 'operation',
      fixed:'right',width:120,
      render: (text, record, index) => {
        const { editable } = this.state.data[index].uses;
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
        key: count+Math.random(),
        uses: {
          editable: true,
          value: '',
        },
        amount: {
          editable:true,
          value: 0,
        },
        remark: {
          editable:true,
          value: '',
        },
      }
    this.setState({
      data:[...data,newRow],
      count:count+1,
    })
    this.props.setIsEditable && this.props.setIsEditable(true);
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
    this.props.setIsEditable && this.props.setIsEditable(true);
  }
  getTotalAmount(){
    const { data } =this.state;
    let c=0;
    if(data && data[0]){
      data.map(t=>{
        c+=parseFloat(t.amount.value)
      })
    }
    return c.toFixed(2);
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
    this.props.setIsEditable && this.props.setIsEditable(findIsEditable(this.state.data));
  }
  render() {
    const { data} = this.state;
    //console.log(data)
    const dataSource = data.map((item) => {
      const obj = {};
      Object.keys(item).forEach((key) => {
        obj[key] = key === 'key' || key === 'id' ? item[key] : item[key].value;
      });
      return obj;
    });
    //this.getActualExpense();
    //console.log(dataSource)
    const columns = this.columns;
    return  (
      <Row gutter={24} className={this.props.className}>

        <Col span={24} className='qite-list-title' style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div><Icon type="credit-card" />费用明细</div>
            <a onClick={e=>this.add(e)}>添加费用明细</a>
        </Col>
        <Col span={24}>
            <Table bordered 
              dataSource={dataSource} 
              columns={columns} 
              pagination={false}
              scroll={{ x: 767 }} 
              rowKey={record => record.key}
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
