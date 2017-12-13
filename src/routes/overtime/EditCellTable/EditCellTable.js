import React from 'react'
import PropTypes from 'prop-types'
//import ReactDOM from 'react-dom'
//import styles from './EditCellTable.less'
import { Table, Popconfirm,Col,Icon,Row } from 'antd'
//import moment from 'moment';
import AddForm from './AddForm';
// import InputCurrencyCell from '../../../components/InputCurrencyCell'
import DateTimeCell from '../../../components/DateTimeCell'
// import SelectCell from '../../../components/SelectCell'
import {findIsEditable} from '../../../utils'

class EditCellTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title:'序号',
      dataIndex:'index',width:60,
      render:(text,record,index)=>index+1,
    },{
      title: '加班人',
      dataIndex: 'realName',
    }, {
      title: '部门',
      dataIndex: 'orgName',
    }, {
      title: '申请加班开始时间',
      dataIndex: 'overTimeStartStr',
      render: (text, record, index) => this.renderColumns(this.props.dataSource, index, 'overTimeStartStr', text,'datetime'),
    }, {
      title: '申请加班结束时间',
      dataIndex: 'overTimeEndStr',
      render: (text, record, index) => this.renderColumns(this.props.dataSource, index, 'overTimeEndStr', text,'datetime'),
    }, {
      title: '加班时长',
      dataIndex: 'otTimes',
      render:(text,record)=>this.getHours(record.overTimeStartStr,record.overTimeEndStr),
    }, {
      title: '实际加班开始时间',
      dataIndex: 'realOverTimeStartStr',
      render: (text, record, index) => this.renderColumns(this.props.dataSource, index, 'realOverTimeStartStr', text,'datetime'),
    }, {
      title: '实际加班结束时间',
      dataIndex: 'realOverTimeEndStr',
      render: (text, record, index) => this.renderColumns(this.props.dataSource, index, 'realOverTimeEndStr', text,'datetime'),
    }, {
      title: '加班时长',
      dataIndex: 'rotTimes',
      render:(text,record)=>this.getHours(record.realOverTimeStartStr,record.realOverTimeEndStr),
    }, {
      title: '操作',
      dataIndex: 'operation',
      fixed:'right',width:120,
      render: (text, record, index) => {
        const { editable } = this.props.dataSource[index].orgName;
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
  getHours(a,b){
    if(!a||!b){
      return 0;
    }
    let timeA=new Date(a);
    let timeB=new Date(b);
    return ((timeB-timeA)/(3600*1000)).toFixed(2)
  }
  renderColumns(data, index, key, text,colType) {
    const { editable, status } = data[index][key];
    const { dicList } =this.props;
    if (typeof editable === 'undefined') {
      return text;
    }
    switch(colType){
      case 'datetime':
        return (<DateTimeCell
          editable={editable}
          value={text}
          onChange={value => this.handleChange(key, index, value)}
          status={status}
        />);
    }
  }
  add=(rows)=>{
    let data  = this.props.dataSource;
    let count=data.length;
    const {selectedRows,orgName,overTimeStartStr,overTimeEndStr,realOverTimeStartStr,realOverTimeEndStr} =rows;
    // console.log('rows:',rows);
    let newRows=[];
    if(selectedRows && selectedRows[0]){
      selectedRows.forEach((item,index)=>{
        newRows.push({
            key: count+index+Math.random(),
            userId:item.userId,
            realName:{
              editable:false,
              value:item.realName,
            },
            orgName:{
              editable:false,
              value:orgName,
            },
            overTimeStartStr:{
              editable:false,
              value:overTimeStartStr,
            },
            overTimeEndStr:{
              editable:false,
              value:overTimeEndStr,
            },
            realOverTimeStartStr:{
              editable:false,
              value:realOverTimeStartStr,
            },
            realOverTimeEndStr:{
              editable:false,
              value:realOverTimeEndStr,
            },
          });
      })
    }
    
    if(this.props.callbackParent)this.props.callbackParent([...data,...newRows]);
    this.props.setIsEditable && this.props.setIsEditable(true);
  }
  handleChange(key, index, value) {
    let data  = this.props.dataSource;
    data[index][key].value = value;
    // this.setState({ data });
    delete data[index][key].status;
    // console.log('handleChange:',data)
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
 
  del(_index){
    const data =this.props.dataSource[0]?this.props.dataSource.filter((item,index)=>index!==_index):[];
    
    // this.setState({data});
    if(this.props.callbackParent)this.props.callbackParent(data);
    //this.getActualExpense(data);
  }
  editDone(index, type) {
    let data  = this.props.dataSource;
    // console.log('data:',data)
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
    const {overTimeType} =this.props;
    //console.log(data)
    const dataSource = data.map((item) => {
      const obj = {};
      Object.keys(item).forEach((key) => {
        obj[key] = key === 'key' || key === 'id' || key==='overTimeId' || key==='userId' ? item[key] : item[key].value;
      });
      return obj;
    });
    //this.getActualExpense();
    const columns = overTimeType===1?
      this.columns.filter(f=>f.dataIndex!=='realOverTimeStartStr' && f.dataIndex!=='realOverTimeEndStr' && f.dataIndex!=='rotTimes')
      :
      this.columns.filter(f=>f.dataIndex!=='overTimeStartStr' && f.dataIndex!=='overTimeEndStr' && f.dataIndex!=='otTimes');
    return  (
      <Row gutter={24} className={this.props.className}>

        <Col span={24} className='qite-list-title' style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div><Icon type="credit-card" />加班明细</div>
            <AddForm overTimeType={overTimeType} callBack={this.add}/>
        </Col>
        <Col span={24}>
            <Table bordered 
              dataSource={dataSource} 
              columns={columns} 
              pagination={false}
              scroll={{ x: 960 }} 
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
