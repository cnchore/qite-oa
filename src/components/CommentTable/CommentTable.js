import React from 'react'
import PropTypes from 'prop-types'
import styles from './CommentTable.less'
import { Icon,Row,Col,Table,Tooltip } from 'antd'

class CommentTable extends React.Component {
  
  render () {

    const { data } = this.props
    
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        render:(text,record,index)=>index+1,
      }, {
        title: '发送环节',
        dataIndex: 'nodeName',
        key: 'nodeName',
      
      }, {
        title: '办理人',
        dataIndex: 'auditerName',
        key: 'auditerName',
      }, {
        title: '审批意见',width:250,
        dataIndex: 'approvalOpinion',
        key: 'approvalOpinion',
        render:(text)=><Tooltip title={text}><span className={styles['text-overflow']} >{text}</span></Tooltip>
      }, {
        title: '接收时间',
        dataIndex: 'receiveTime',
        key: 'receiveTime',
      }, {
        title: '完成时间',
        dataIndex: 'finishTime',
        key: 'finishTime',
      }, {
        title: '完成耗时',
        dataIndex: 'duration',
        key: 'duration',
        render:(text)=>{
          var t=text?parseFloat(text)/1000:0,
              h=Math.floor(t/3600),
              m=Math.floor((t%3600)/60),
              s=Math.ceil((t%3600)%60);
          return `${h}时${m}分${s}秒`
        },
      },
    ]

    return (
        <Row gutter={24} className={styles['q-detail']}>
          <Col span={24} className='qite-list-title'>
              <Icon type="credit-card" />审批信息
          </Col>
          <Col span={24}>
            <Table
              pagination={false}
              dataSource={data}
              bordered
              scroll={{ x: 967 }}
              columns={columns}
              simple
              rowKey={record => record.taskId}
            />
          </Col>
          
        </Row>
    )
  }
}


CommentTable.propTypes = {
  
}

export default CommentTable
