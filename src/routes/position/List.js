import React from 'react'
import PropTypes from 'prop-types'
import { Table,Row, Col,Tree } from 'antd'
import styles from './List.less'
import classnames from 'classnames'

const TreeNode = Tree.TreeNode;

const List = ({ onTreeSelect,location, ...tableProps }) => {
  const { orgList,orgTree }=tableProps;

  const getOrgName=(value)=>{
    let n=orgList.filter(item=>String(item.id)===String(value));
    //console.log(orgList,...n,value);
    if(n && n[0]){
      return n[0].orgName;
    }
    return '';
  }
  const columns = [
    {
      title: '职位名称',
      dataIndex: 'postName',
      key: 'postName',className:'q-left',
    }, {
      title: '职位编码',
      dataIndex: 'postCode',
      key: 'postCode',
    /*
    }, {
      title: '所属机构',
      dataIndex: 'orgId',
      key: 'orgId',
      render: (text, record, index) =>(getOrgName(text)),
      */
    }, {
      title: '职位类型',
      dataIndex: 'postTypeName',
      key: 'postTypeName',
    }, {
      title: '是否主管',
      dataIndex: 'isManager',
      key: 'isManager',
      render: (text, record, index) =>{
        return text?'是':'否'
      }
    },
  ]
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
  return (
    <Row gutter={24}>
     
      <Col xl={{ span: 6 }} md={{ span: 6 }} sm={{ span: 8 }} xs={{span:24}}>
        <Tree onSelect={onSelect}>
          {treeNodes}
        </Tree>
      </Col>
      <Col xl={{ span: 18 }} md={{ span: 18 }} sm={{ span: 16 }} xs={{span:24}}>
        <Table
          {...tableProps}
          className={classnames({ [styles.table]: true })}
          bordered
          scroll={{ x: 767 }}
          columns={columns}
          simple
          rowKey={record => record.id}
        />
      </Col>
    </Row>
    
  )
}

List.propTypes = {
  
  location: PropTypes.object,
}

export default List
