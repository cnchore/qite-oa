import React from 'react'
import PropTypes from 'prop-types'
import { Table,Row, Col,Tree,Modal,Tag } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import { DropOption } from '../../components'

const TreeNode = Tree.TreeNode;
const confirm = Modal.confirm

const List = ({ onUserChange,onResetPwd, onEditItem,onTreeSelect,location, ...tableProps }) => {
  const { orgTree,orgList }=tableProps;
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: `你确定${record.isDisable?'启用':'禁用'}该用户么?`,
        onOk () {
          onUserChange(record.userId,!record.isDisable);
        },
      })
    }else if(e.key==='3'){
      confirm({
        title: `你确定对帐号 ${record.mobilePhone} 重置密码么?`,
        onOk () {
          onResetPwd(record.userId)
        },
      })
    }
  }
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
      title: '账号状态',
      render:(text,record)=>(<Tag color={record.isDisable?'#f50':'#2db7f5'}>{record.isDisable?'禁用':'启用'}</Tag>),
    }, {
      title: '入职时间',
      dataIndex: 'inductionTime',
      key: 'inductionTime',
    
    }, {
      title: '职位状态',
      dataIndex: 'positionState',
      key: 'positionState',
   
    }, {
      title: '所属机构',
      render: (text, record, index) =>(record.postList&&record.postList[0]?getOrgName(record.postList[0].orgId):''),
      
    }, {
      title: '操作',
      key: 'operation',
      fixed:'right',
      width: 220,
      render: (text, record) => {
        return (
          <span className={styles['q-operation']}>
            <a onClick={e=>handleMenuClick(record,{key:'1'})}>员工编辑</a>
            <a onClick={e=>handleMenuClick(record,{key:'2'})}>{record.isDisable?'账号启用':'账号禁用'}</a>
            <a onClick={e=>handleMenuClick(record,{key:'3'})}>密码重置</a>
          </span>
        )
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
        <Tree onSelect={onSelect} showLine defaultExpandAll>
          {treeNodes}
        </Tree>
      </Col>
      <Col xl={{ span: 18 }} md={{ span: 18 }} sm={{ span: 16 }} xs={{span:24}}>
        <Table
          {...tableProps}
          className={classnames({ [styles.table]: true })}
          bordered
          scroll={{ x: 967 }}
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
