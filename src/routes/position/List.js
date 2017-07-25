import React from 'react'
import PropTypes from 'prop-types'
import { Table,Row,Modal, Col,Tree } from 'antd'
import styles from './List.less'
import classnames from 'classnames'

const TreeNode = Tree.TreeNode;
const confirm=Modal.confirm;
const List = ({ onTreeSelect,location, ...tableProps }) => {
  const { orgList,orgTree,postLevelList,onDel }=tableProps;
  const handerDel=(id)=>{
    confirm({
      title:'删除该职位，将删除已绑定员工的该职位信息',
      onOk(){
        onDel(id);
      },
    })
  }
  const getOrgName=(value)=>{
    let n=orgList.filter(item=>String(item.id)===String(value));
    //console.log(orgList,...n,value);
    if(n && n[0]){
      return n[0].orgName;
    }
    return '';
  }
  const getPostLevel=(value)=>{
    let n=postLevelList.filter(item=>String(item.dicValue)===String(value));
    //console.log(orgList,...n,value);
    if(n && n[0]){
      return n[0].dicName;
    }
    return '';
  }
  const columns = [
    {
      title: '职位名称',
      dataIndex: 'postName',
      key: 'postName',className:'q-left',
    // }, {
    //   title: '职位编码',
    //   dataIndex: 'postCode',
    //   key: 'postCode',
    
    }, {
      title: '岗位级别',
      dataIndex: 'postLevel',
      key: 'postLevel',
      render: (text) =>getPostLevel(text),
      
    // }, {
    //   title: '职位类型',
    //   dataIndex: 'postTypeName',
    //   key: 'postTypeName',
    // }, {
    //   title: '是否主管',
    //   dataIndex: 'isManager',
    //   key: 'isManager',
    //   render: (text, record, index) =>{
    //     return text?'是':'否'
    //   }
    },{
      title: '操作',
      key: 'operation',
      render:(text,record)=><a onClick={e=>handerDel(record.id)}>删除职位</a>,
    
  }]
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
     
      <Col className={styles.tree} xl={{ span: 6 }} md={{ span: 6 }} sm={{ span: 8 }} xs={{span:24}}>
         <h3>组织机构</h3>
        <Tree onSelect={onSelect} showLine defaultExpandAll>
          {treeNodes}
        </Tree>
      </Col>
      <Col xl={{ span: 18 }} md={{ span: 18 }} sm={{ span: 16 }} xs={{span:24}}>
        <Table
          {...tableProps}
          className={classnames({ [styles.table]: true })}
          bordered
          scroll={{ x: 400 }}
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
