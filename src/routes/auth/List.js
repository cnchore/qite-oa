import React from 'react'
import PropTypes from 'prop-types'
import { Table,Row, Col,Tree } from 'antd'
import styles from './List.less'
import classnames from 'classnames'

const TreeNode = Tree.TreeNode;

const List = ({ onTreeSelect,location, ...tableProps }) => {
  const { roleList }=tableProps;

  
  const columns = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName',className:'q-left',
    }, {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render:(text)=>(text===1?'菜单':'操作'),
    
    }, {
      title: '菜单地址',
      dataIndex: 'src',
      key: 'src',
    }, {
      title: '说明',
      dataIndex: 'remark',
      key: 'remark',
    },
  ]
  const loop = data => data.map((item) => {
    if (item.children && item.children[0]) {
      return <TreeNode title={item.roleName} key={item.id}>{loop(item.children)}</TreeNode>;
    }
    return <TreeNode title={item.roleName} key={item.id} />;
  });
  const treeNodes = loop(roleList);
  const onSelect = (selectedKeys, info) => {
    onTreeSelect(info.selectedNodes[0].key);
    //console.log('onSelect:', info.selectedNodes[0].key);
  }
  return (
    <Row gutter={24}>
     
      <Col className={styles.tree} xl={{ span: 6 }} md={{ span: 6 }} sm={{ span: 8 }} xs={{span:24}}>
        <h3>系统角色</h3>
        <Tree onSelect={onSelect} showLine>
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
