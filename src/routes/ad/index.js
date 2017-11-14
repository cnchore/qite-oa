import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import ListGeneral from '../../components/ListGeneral'
import FilterGeneral from '../../components/FilterGeneral'
import FormGeneral from '../../components/FormGeneral'
// import ModalGeneral from './Modal'
import {getRecordState,getRecordAction} from '../../components/ListAction'

const Ad = ({ location, dispatch, ad, loading }) => {
  const { list,pagination, modalVisible, modalType } = ad
  const { pageSize } = pagination

  const cards=[{
    title:'申请信息',
    rows:[{
      text:'申请人姓名',
      type:'label',
      field:'state.employeeList.realName',
      layout:{lg:8,md:12,sm:24},
      props:{},
      rules:[],
    },{
      text:'申请人部门',
      type:'label',
      field:'state.employeeList.postList[0].orgName',
      layout:{lg:8,md:12,sm:24},
      props:{},
      rules:[],
    },{
      text:'申请人岗位',
      type:'label',
      field:'state.employeeList.postList[0].postName',
      layout:{lg:8,md:12,sm:24},
      props:{},
      rules:[],
    },{
      text:'申请单号',
      type:'label',
      field:'currentItem.code',
      defaultValue:'系统自动生成',
      layout:{lg:8,md:12,sm:24},
      props:{},
      rules:[],
    },{
      text:'申请时间',
      type:'label',
      field:'currentItem.createTime',
      defaultValue:'系统自动生成',
      layout:{lg:8,md:12,sm:24},
      props:{},
      rules:[],
    }]
    },{
      title:'',
      rows:[{
        text:'申请区域',
        type:'input',
        field:'applyArea',
        defaultValue:'currentItem.applyArea',
        layout:{lg:8,md:12,sm:24},
        props:{placeholder:'请输入区域'},
        rules:[{required:true,message:'不能为空'}],
      },{
        text:'城市',
        type:'input',
        field:'city',
        defaultValue:'currentItem.city',
        layout:{lg:8,md:12,sm:24},
        props:{placeholder:'请输入城市'},
        rules:[{required:true,message:'不能为空'}],
      },{
        text:'预计费用',
        type:'InputNumber',
        field:'estiCost',
        defaultValue:'currentItem.estiCost?currentItem.estiCost:0',
        layout:{lg:8,md:12,sm:24},
        addonBefore:'¥',
        props:{placeholder:'请输入预计费用',precision:2,step:1,style:{width:'100%'}},
        rules:[{required:true,message:'不能为空'}],
      },{
        text:'投放开始时间',
        type:'DatePicker',
        field:'deliveryTimeStartStr',
        defaultValue:'currentItem.deliveryTimeStartStr || currentItem.deliveryTimeStart',
        layout:{lg:8,md:12,sm:24},
        props:{placeholder:'请选择',showTime:true,format:'YYYY-MM-DD HH:mm:ss',style:{width:'100%'}},
        rules:[{required:true,message:'不能为空'}],
      },{
        text:'投放结束时间',
        type:'DatePicker',
        field:'deliveryTimeEndStr',
        defaultValue:'currentItem.deliveryTimeEndStr || currentItem.deliveryTimeEnd',
        layout:{lg:8,md:12,sm:24},
        props:{placeholder:'请选择',showTime:true,format:'YYYY-MM-DD HH:mm:ss',style:{width:'100%'}},
        rules:[{required:true,message:'不能为空'}],
      }]
    },{
      title:'',
      rows:[{
        text:'投放目的',
        type:'input',
        field:'goal',
        defaultValue:'currentItem.goal',
        layout:{lg:8,md:12,sm:24},
        props:{placeholder:'请输入投放目的',type:'textarea',autosize:{minRows: 2, maxRows: 5}},
        rules:[{required:true,message:'不能为空'}],
      },{
        text:'广告形式',
        type:'input',
        field:'adForm',
        defaultValue:'currentItem.adForm',
        layout:{lg:8,md:12,sm:24},
        props:{placeholder:'请输入广告形式',type:'textarea',autosize:{minRows: 2, maxRows: 5}},
        rules:[{required:true,message:'不能为空'}],
      },{
        text:'覆盖范围',
        type:'input',
        field:'coverArea',
        defaultValue:'currentItem.coverArea',
        layout:{lg:8,md:12,sm:24},
        props:{placeholder:'请输入覆盖范围',type:'textarea',autosize:{minRows: 2, maxRows: 5}},
        rules:[{required:true,message:'不能为空'}],
      },{
        text:'方案描述',
        type:'input',
        field:'desc',
        defaultValue:'currentItem.desc',
        layout:{lg:8,md:12,sm:24},
        props:{placeholder:'请输入方案描述',type:'textarea',autosize:{minRows: 2, maxRows: 5}},
        rules:[{required:true,message:'不能为空'}],
      },{
        text:'预期效果',
        type:'input',
        field:'estiResult',
        defaultValue:'currentItem.estiResult',
        layout:{lg:8,md:12,sm:24},
        props:{placeholder:'请输入预期效果',type:'textarea',autosize:{minRows: 2, maxRows: 5}},
        rules:[{required:true,message:'不能为空'}],
      },{
        text:'备注说明',
        type:'input',
        field:'remark',
        defaultValue:'currentItem.remark',
        layout:{lg:8,md:12,sm:24},
        props:{placeholder:'请输入备注说明',type:'textarea',autosize:{minRows: 2, maxRows: 5}},
        rules:[{required:true,message:'不能为空'}],
      }]
    }]
  const formatDate=(data)=>{
    data.deliveryTimeStartStr=data.deliveryTimeStartStr?data.deliveryTimeStartStr.format('YYYY-MM-DD HH:mm:ss'):null;
    data.deliveryTimeEndStr=data.deliveryTimeEndStr?data.deliveryTimeEndStr.format('YYYY-MM-DD HH:mm:ss'):null;
    return data;   
  }
  const formProps={
    state:ad,
    title: `${modalType === 'create' ? '新增－广告投放申请' : modalType==='update'?'编辑－广告投放申请':'退回修改－广告投放申请'}`,
    cards,
    formActions:{
      auditText:'确定修改并提交',
      auditLoading:loading.effects['ad/audit'],
      submitLoading:loading.effects['ad/submit'],
      okLoading:loading.effects[`ad/${modalType}`],
      setState(fields){
        dispatch({
          type:'ad/setState',
          payload:fields,
        })
      },
      onOk (data) {
        data=formatDate(data);
        dispatch({
          type: `ad/${modalType}`,
          payload: data,
        })
      },
      onCancel () {
        dispatch({
          type: 'ad/hideModal',
        })
      },
      onSubmit (formItem,nextUser) {
        formItem=formatDate(formItem);
        dispatch({
          type: 'ad/submit',
          payload: {formItem,nextUser},
        })
      },
      onAudit(formItem,taskItem){
        formItem=formatDate(formItem);
        dispatch({
          type: 'ad/audit',
          payload: {formItem,taskItem},
        })
      },
      onGoback(){
        const { query, pathname } = location
        dispatch(routerRedux.push({
          pathname:query.from,
        }))
      },
    }
  }
  const listColumns = [
    {
      title: '申请单号',
      dataIndex: 'code',
      key: 'code',
    }, {
      title: '申请时间',
      dataIndex: 'createTime',width:170,
      key: 'createTime',
    
    }, {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render:(text)=>getRecordState(text),
    }, {
      title: '操作',
      key: 'operation',
      fixed:'right',
      width: 250,
      render: (text, record) => {
        return record.state!==undefined?(getRecordAction(dispatch,'ad',record)):null
      },
    },
    ]
  const listProps = {
    dataSource:list,
    loading: loading.effects['ad/query'],
    pagination,
    location,
    columns:listColumns,
    scroll:{ x: 767 },
    rowKey:(record) => record.id,
    onChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
  }
  const config={
    title:'',
    formItems:[{
      text:'申请单号',
      field:'codeLike',
      type:'Input',
      parentProps:{md:8,sm:24},
      props:{placeholder:'请输入'}
    },{
      text:'申请时间',
      field:'createTime',
      type:'DatePicker',
      parentProps:{md:8,sm:24},
      props:{placeholder:'请输入',style:{width:'100%'},format:'YYYY-MM-DD'}
    }],
    actionsLayout:{md:8,sm:24},
    actions:[{
      text:'查询',
      type:'submit',
      props:{icon:'search',type:'primary',size:'large'}
    },{
      text:'重置',
      type:'reset',
      props:{icon:'reload',size:'large'}
    },{
      text:'新增',
      type:'add',
      props:{icon:'plus',type:'ghost',size:'large',
        onClick:()=>{
          dispatch({
            type: 'ad/showModal',
            payload: {
              modalType: 'create',
              fileList:[],
              detailList:[],
              taskData:{},
              currentItem:{},
            },
          })
        }
      }
    }]
  }
  const filterProps = {
    config,
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
          createTime:value.createTime?value.createTime.format('YYYY-MM-DD'):null,
        },
      }))
    },
    
  }

  return (
    <div className="content-inner">
      {!modalVisible &&<FilterGeneral {...filterProps} />}
      {!modalVisible &&<ListGeneral {...listProps} />}
      {modalVisible && <FormGeneral {...formProps} />}
    </div>
  )
}

Ad.propTypes = {
  ad: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ ad, loading }) => ({ ad, loading }))(Ad)
