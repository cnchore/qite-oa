import React from 'react'
import PropTypes from 'prop-types'
//import ReactDOM from 'react-dom'
//import styles from './EditCellTable.less'
import { Table, Popconfirm,Col,Icon,Row } from 'antd'
//import moment from 'moment';
import InputCell from '../../../components/InputCell'
// import InputCurrencyCell from '../../../components/InputCurrencyCell'
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
      title: '升级点',
      dataIndex: 'upgradePoint',
      render: (text, record, index) => this.renderColumns(this.props.dataSource, index, 'upgradePoint', text,'input'),
    
    }, {
      title: '现状说明',
      dataIndex: 'presentSituation',
      render: (text, record, index) => this.renderColumns(this.props.dataSource, index, 'presentSituation', text,'input'),
    }, {
      title: '升级述求',
      dataIndex: 'upgradeResult',
      render: (text, record, index) => this.renderColumns(this.props.dataSource, index, 'upgradeResult', text,'input'),
    
    }, {
      title: '操作',
      dataIndex: 'operation',
      fixed:'right',width:120,
      render: (text, record, index) => {
        const { editable } = this.props.dataSource[index].upgradePoint;
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
          length={20}
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
        upgradePoint: {
          editable: true,
          value: '',
        },
        presentSituation: {
          editable: true,
          value: '',
        },
        upgradeResult: {
          editable:true,
          value: '',
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
        c+=parseFloat(t.amount.value)
      })
    }
    return c.toFixed(2);
  }
  del(_index){
    const data =this.props.dataSource[0]?this.props.dataSource.filter((item,index)=>index!==_index):[];
    
    // this.setState({data});
    if(this.props.callbackParent)this.props.callbackParent(data);
    //this.getActualExpense(data);
  }
  editDone(index, type) {
    let data  = this.props.dataSource;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = false;
        data[index][item].status=type;
      }
    });
    // this.setState({ data }, () => {
    //   Object.keys(data[index]).forEach((item) => {
    //     if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
    //       delete data[index][item].status;
    //     }
    //   });
    // });
    if(this.props.callbackParent){
      this.props.callbackParent(data);
      //this.getActualExpense(data);
    }
    this.props.setIsEditable && this.props.setIsEditable(findIsEditable(data));
  }
  render() {
    let data = this.props.dataSource;
    //console.log(data)
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
            <div><Icon type="credit-card" />升级明细</div>
            <a onClick={e=>this.add(e)}>添加明细</a>
        </Col>
        <Col span={24}>
            <Table bordered 
              dataSource={dataSource} 
              columns={columns} 
              pagination={false}
              scroll={{ x: 767 }} 
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
