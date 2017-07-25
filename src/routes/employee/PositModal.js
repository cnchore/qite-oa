import React from 'react'
import PropTypes from 'prop-types'
import { Input, Modal,Row,Col,Tree,Table } from 'antd'
import styles from './List.less'
const TreeNode = Tree.TreeNode;
const modal = ({
  onOk,
  onTreeSelect,
  orgTree,
  positionList,
  loading,
  orgKey=-1,
  // positionItem={},
  selectedPosition,
  setSelectedPosition,
  ...positSelModalProps
}) => {
  const handleOk = () => {
    // console.log(positionItem);
    onOk(selectedPosition);
  }
  //console.log(positionList);
  const columns = [
    {
      title: '职位名称',
      dataIndex: 'postName',
      key: 'postName',className:'q-left',
    }, {
      title: '职位编码',
      dataIndex: 'postCode',
      key: 'postCode',
    },
  ]
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
     // console.log('selectedRows:',selectedRows[0]);
      // positionItem={id:selectedRows[0].id,postName:selectedRows[0].postName};
      // selectedRowKeys=[selectedRows[0].id];
      setSelectedPosition && setSelectedPosition(selectedRows[0]);
    },
    selectedRowKeys: selectedPosition && selectedPosition.id && [selectedPosition.id] || [],
    type:'radio',
  };
  const tableProps = {
    dataSource: positionList,
    loading,
    pagination:false,
    rowSelection,
    onRowClick(record){
      // selectedRowKeys=[record.id];
      setSelectedPosition && setSelectedPosition(record);
    },
  }
  const loop = data => data.map((item) => {
    if (item.children && item.children[0]) {
      return <TreeNode title={item.orgName} key={item.id}>{loop(item.children)}</TreeNode>;
    }
    return <TreeNode title={item.orgName} key={item.id} />;
  });
  const treeNodes = loop(orgTree);
  const onSelect = (selectedKeys, info) => {
    onTreeSelect(info.selectedNodes[0].key);
    //console.log('onSelect:', info.selectedNodes[0].key);
  }
  const modalOpts = {
    ...positSelModalProps,
    onOk: handleOk,
    width:600,
  }

  return (
    <Modal {...modalOpts}>
      <Row gutter={24}>
     
      <Col className={styles.tree} span={12}>
         <h3>组织机构</h3>
        <Tree onSelect={onSelect} showLine defaultExpandAll>
          {treeNodes}
        </Tree>
      </Col>
      <Col span={12}>
        <Table
          {...tableProps}
          bordered
          columns={columns}
          simple
          rowKey={record => record.id}
        />
      </Col>
    </Row>
    </Modal>
  )
}

modal.propTypes = {
  
  onOk: PropTypes.func,
}

export default modal
