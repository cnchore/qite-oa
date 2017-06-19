import React from 'react'
import PropTypes from 'prop-types'
import { Table,Row, Col,Tree,Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import { DropOption } from '../../components'

const TreeNode = Tree.TreeNode;
const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem,onTreeSelect,location, ...tableProps }) => {
  const { orgTree }=tableProps;
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: 'Are you sure delete this record?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }
  const columns = [
    {
      title: '姓名',
      dataIndex: 'realName',
      key: 'realName',
    }, {
      title: '手机号码',
      dataIndex: 'mobilePhone',
      key: 'mobilePhone',
    }, {
      title: '用户账号',
      render:(text,record)=>record.mobilePhone,
    }, {
      title: '入职时间',
      dataIndex: 'inductionTime',
      key: 'inductionTime',
    
    }, {
      title: '职位状态',
      dataIndex: 'positionState',
      key: 'positionState',
    }, {
      title: '现居住地',
      dataIndex: 'residentialAddress',
      key: 'residentialAddress',
    }, {
      title: '操作',
      key: 'operation',
      fixed:'right',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '员工编辑' }, { key: '2', name: '账号禁用' },{ key: '3', name: '密码重置' }]} />
      },
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
     
      <Col className={styles.tree} xl={{ span: 6 }} md={{ span: 6 }} sm={{ span: 8 }} xs={{span:24}}>
         <h3>组织机构</h3>
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
