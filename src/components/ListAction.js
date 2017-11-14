import {Link } from 'dva/router'
import SelectUser from './SelectUser'
import { Modal,Tag } from 'antd'
const confirm = Modal.confirm

const getRecordState=(text)=>{
    //状态：0新建  1审核中 2审核通过 3审核不通过
    switch(text){
      case 0:
        return <Tag color=''>新建</Tag>;
      case 1:
        return <Tag color='#87d068'>审核中</Tag>;
      case 2:
        return <Tag color='#2db7f5'>审核通过</Tag>;
      case 3:
        return <Tag color='#f50'>审核不通过</Tag>;
      case -1:
        return <Tag color='#f00'>退回修改</Tag>;
      case -2:
        return <Tag color='#108ee9'>待完善资料</Tag>;
      case 4:
        return <Tag color='#2db7f5'>审核通过并完善资料</Tag>;
    }
  }

const getRecordAction=(dispatch,url,record)=>{
		const onEditItem=(item)=> {
	  	dispatch({
		    type: `${url}/editItem`,
		    payload: {
		      modalType: 'update',
		      currentItem: item,
		    },
		  })
		}
		const handleSubmit = (record,e) => {
		    confirm({
		      title: `你确定提交申请么?`,
		      onOk () {
		        dispatch({
		          type: `${url}/submit`,
		          payload: {record,e},
		        })
		      },
		    })
		}
		const handleDel=(id)=>{
		  confirm({
		    title:'你确定要删除这条申请么？',
		    onOk(){
		      dispatch({
		        type: `${url}/deleteById`,
		        payload: {id},
		      })
		    }
		  })
		}
		return <span className="flex-col">
          <Link to={`/${url}/${record.id}`}>查看</Link>
          { record.state===0?<a onClick={e=>onEditItem(record)}>编辑</a>:null}
          { record.state===0?<SelectUser callBack={e=>handleSubmit(record,e)} />:null}
          { record.state===0?<a onClick={e=>handleDel(record.id)}>删除</a>:null}
        </span>
 }
 module.exports={
 	getRecordState,
 	getRecordAction
 }