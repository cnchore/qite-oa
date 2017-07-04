import React from 'react'
import PropTypes from 'prop-types'
//import ReactDOM from 'react-dom'
//import styles from './SelectPurchaseApply.less'
import { Table,Col,Icon,Row,Modal } from 'antd'


class SelectPurchaseApply extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '申购部门',
      dataIndex: 'applyDept',
      key:'applyDept',
    },{
      title: '申购人',
      dataIndex: 'applyName',
      key:'applyName',
    },{
      title: '物料名称',
      dataIndex: 'materialName',
      key:'materialName',
    }, {
      title: '规格',
      dataIndex: 'spec',
      key:'spec',
    }, {
      title: '数量',
      dataIndex: 'num',
      key:'num',
    }, {
      title: '单位',
      dataIndex: 'unit',
      key:'unit',
    }, {
      title: '使用时间',
      dataIndex: 'useTime',
      key:'useTime',
    }, {
      title: '原因和用途',
      dataIndex: 'remark',
      key:'remark',
    }];
    this.state = {
      count:0,
      data:this.props.dataSource || [],
      selectedRowKeys:[],
    };
  }

  

  render() {
    const { data,selectedRowKeys} = this.state;
    const dataSource=data.map(item=>{
      let obj=item;
      obj.key=item.id;
      return obj;
    })
    const { modalProps } = this.props;
    const { onOk } = modalProps;
    const columns = this.columns;
    const handleOk = () => {
      onOk(selectedRowKeys)
    }
    const modalOpts = {
      ...modalProps,
      width:800,
      title:'选择申购物品',
      wrapClassName: 'vertical-center-modal',
      maskClosable: false,
      onOk: handleOk,
    }
    const rowSelection = {
      
      onChange: (selectedRowKeys) => {
        //console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys})
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        let selectedRowKeys=data.map(item=>item.id);
        //console.log('onSelectAll:',selectedRowKeys);
        this.setState({selectedRowKeys})
      },
    
    }
    return  (
      <Modal {...modalOpts}>
        <Row gutter={24}>

          <Col span={24} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              
          </Col>
          <Col span={24}>
              <Table bordered 
                dataSource={dataSource} 
                columns={columns} 
                pagination={false}
                rowSelection={rowSelection}
                />
          </Col>
          
        </Row>
      </Modal>
      )

      
  }
}


SelectPurchaseApply.propTypes = {
  dataSource: PropTypes.array,
  modalProps:PropTypes.object,
}

export default SelectPurchaseApply
