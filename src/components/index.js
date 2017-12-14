import { Link } from 'dva/router';
import DataTable from './DataTable';
import DropOption from './DropOption';
//import Iconfont from './Iconfont';
import Search from './Search';
import FilterItem from './FilterItem';
import FileUpload from './FileUpload';
import FileList from './FileList';
import SelectUser from './SelectUser';
import RevokeApply from './RevokeApply';
import HtmlEditor from './HtmlEditor';
import * as Layout from './Layout/index.js';
import layer from './layer';

const getRecordAction=(linkurl,record,onEditItem,handleSubmit,handleDel,onChange,needSelectUser=false)=>{
  let current=1,pageSize=10;
  return record&&record.state!==undefined?
    (<span className="action-flex">
      <Link to={`/${linkurl}/${record.id}`}>查看</Link>
      { record.state===1?<RevokeApply callBack={e=>onChange({current,pageSize})} busiId={record.id} busiCode={record.code} />:null}
      { record.state===0 || record.state===5?<a onClick={e=>onEditItem(record)}>编辑</a>:null}
      { !needSelectUser && (record.state===0 || record.state===5)?<a onClick={e=>handleSubmit(record,{userId:-1})} >提交</a>:null}
      { needSelectUser && (record.state===0 || record.state===5)?<SelectUser callBack={e=>handleSubmit(record,e)} />:null}
      { record.state===0 || record.state===5?<a onClick={e=>handleDel(record.id)}>删除</a>:null}
    </span>)
    :null;
}
module.exports = {
  Layout,
  DataTable,
  DropOption,
  //Iconfont,
  Search,
  FilterItem,
  layer,
  FileUpload,
  FileList,
  SelectUser,
  HtmlEditor,
  getRecordAction,
 }
