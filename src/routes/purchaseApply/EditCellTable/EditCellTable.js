import React from 'react'
import PropTypes from 'prop-types'
//import ReactDOM from 'react-dom'
//import styles from './EditCellTable.less'
import { Table, Popconfirm,Col,Icon,Row } from 'antd'
//import moment from 'moment';
import InputCell from '../../../components/InputCell'
import InputNumberCell from '../../../components/InputNumberCell'
import DateTimeCell from '../../../components/DateTimeCell'
import SelectCell from '../../../components/SelectCell'
import {findIsEditable} from '../../../utils'

class EditCellTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title:'序号',
      dataIndex:'index',width:60,
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
      width: 120,
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'num', text,'number'),
    }, {
      title: '单位',
      dataIndex: 'unit',
      width: 80,
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'unit', text,'input'),
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
      title: '操作',
      dataIndex: 'operation',
      fixed:'right',width:120,
      render: (text, record, index) => {
        const { editable } = this.state.data[index].materialName;
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
      case 'number':
        return (<InputNumberCell
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
        useTimeStr: {
          editable:true,
          value: '',
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
    }
    this.props.setIsEditable && this.props.setIsEditable(findIsEditable(this.state.data));
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
            <div><Icon type="credit-card" />物品明细</div>
            <a onClick={e=>this.add(e)}>添加物品明细</a>
        </Col>
        <Col span={24}>
            <Table bordered 
              dataSource={dataSource} 
              columns={columns} 
              pagination={false}
              scroll={{ x: 1300 }} 
              rowKey={record=>record.key}
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
