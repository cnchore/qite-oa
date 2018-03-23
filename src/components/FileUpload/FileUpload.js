import React from 'react'
import PropTypes from 'prop-types'
import styles from './FileUpload.less'
import { Upload, Icon, message,Progress,Row,Col,Tooltip } from 'antd'
import config from '../../utils/config'
import classNames from 'classnames';
import DOC from '../../../assets/doc.png'
import DOCX from '../../../assets/docx.png'
import PDF from '../../../assets/pdf.png'
import TXT from '../../../assets/txt.png'
import XLS from '../../../assets/xls.png'
import XLSX from '../../../assets/xlsx.png'
import ZIP from '../../../assets/zip.png'
import PPT from '../../../assets/ppt.png'
import PPTx from '../../../assets/pptx.png'
import RAR from '../../../assets/rar.png'
import OTHER from '../../../assets/other.png'
import ImgViewer from '../ImgViewer'
class FileUpload extends React.Component {
  static defaultProps = {
    progressAttr: {
      strokeWidth: 2,
      showInfo: false,
    },
    prefixCls: 'ant-upload',
    showRemoveIcon: true,
    showPreviewIcon: true,
  };
  componentWillReceiveProps(nextProps){
    // console.info('FileUpload nextProps:',nextProps)
  }
  state = {
    // fileList:this.props.defaultFileList || [],
    previewImage:null,
    previewName:'',
    previewVisible:false,
  }
  acceptList=['image/jpeg',
    'application/vnd.ms-excel',
    //xlsx
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    //docx
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'application/pdf',
    'text/plain',
    'application/zip',
    'application/vnd.ms-powerpoint'
  ]
  handleChange = (info) => {
    const status = info.file.status;

    let defaultList=this.props.defaultFileList.filter(item=>item.uid!==info.file.uid && item.uid!=='invalid')

    if(status==='uploading'){
      // console.log('before:',info.file);
      if(this.props.callbackParent)this.props.callbackParent([...defaultList,info.file]);
    }else if (status === 'done') {
      let f=info.file;
      f.url=info.file.response.data;
      // console.log('done:',f)
      //if(this.props.fileList)this.props.fileList=[...defaultList,f];
      if(this.props.callbackParent)this.props.callbackParent([...defaultList,f]);
      message.success(`${info.file.name} 上传成功.`);

    } else if (status === 'error') {
      if(this.props.callbackParent)this.props.callbackParent([...defaultList,info.file]);
      message.error(`${info.file.name} 上传失败.`);
    }
    
  }
  getThumbUrl=(file,t=false)=>{
    if(file && !file.url){
      return null;
    }
    if(file.type==='image/jpeg'){
      if(t){
        return file.url;
      }
      return file.url+'?imageView2/1/w/320/h/200/format/webp/interlace/0/q/50';
    }
    let l=file.name.lastIndexOf('.');
    switch(file.name.substr(l).toLocaleLowerCase()){
      case '.doc':
        return DOC;
      case '.docx':
        return DOCX;
      case '.pdf':
        return PDF;
      case '.ppt':
        return PPT;
      case '.pptx':
        return PPTX;
      case '.xls':
        return XLS;
      case '.xlsx':
        return XLSX;
      case '.zip':
        return ZIP;
      case '.txt':
        return TXT;
      case '.rar':
        return RAR;
      case '.png':
      case '.jpg':
      case '.jpg':
      case '.gif':
        if(t){
          return file.url;
        }
        return file.url+'?imageView2/1/w/320/h/200/format/webp/interlace/0/q/50';
      default :
        return OTHER;

    }
  }
  beforeUpload=(file)=> {

    // this.setState({fileList:[...this.state.fileList,file]})
    
    const isLt2M = file.size / 1024 / 1024 < 20;
    if (!isLt2M) {
      message.error('上传文件必须小于 20MB!');
    }
    return isLt2M;
  }
  handleRemove=(file)=>{
    let l=this.props.defaultFileList.filter(item=>item.uid!==file.uid);
    // console.log('before:',this.props.defaultFileList,l)
    if(this.props.callbackParent)this.props.callbackParent(l[0]?l:[{uid:"invalid",url:''}]);

    //if(this.props.fileList)this.props.fileList=l;
  }
  handleCancel=()=>{
    this.setState({previewVisible:false});
  }
  handlePreview=(index)=>{
    this.setState({
      // previewImage:this.getThumbUrl(file,true),
      // previewName:file.name,
      previewIndex:index,
      previewVisible:true,
    });
  }
  render () {
    const fileData={bucket:`${config.bucket}`,type:'qiteOa'};
    const {previewVisible,previewIndex }= this.state; 
    // const _imgs=[{src:previewImage,name:previewName}]
    const { prefixCls,fileList,showPreviewIcon, showRemoveIcon,defaultFileList } = this.props
    // console.log('defaultFileList:',defaultFileList);
    let _fileList=[],_imgs=[]; 
    defaultFileList.filter(f=>f.uid!=='invalid').map((file,index)=>{
      let thumbUrl=this.getThumbUrl(file);
      _imgs.push({
        src:thumbUrl,
        name:file.name,
      });
      _fileList.push(
         <Col md={24} xl={12} className={styles['file-col']} key={`file-${index}`}>
          <Row key={file.uid} gutter={0} className={styles['file-list']} style={{margin:'0px'}} type="flex" justify="space-around" align="middle">
            <Col span={4}  className={styles['file-img-div']}>
              { (thumbUrl)?
                <img className={styles.fileImg} src={thumbUrl} alt={file.name} onClick={e=>this.handlePreview(index)}/>
                :<Icon type="loading" />
              }
            </Col>
            <Col span={file.createTime?8:16}>
              {file.name && file.name.length>20?
                <Tooltip title={<div className="tooltip-open">{file.name}</div>}>{file.name.substr(0,17)}...</Tooltip>
                :file.name
              }
            </Col>
            {
              file.createTime?(
              <Col span={8}>{file.createTime}</Col>
              ):null
            }
            <Col span={2}>
              <a
              href={file.url}
              target="_blank"
              download={file.name}
              >
                <Icon type="download" style={{ fontSize: 18 }} />
              </a>
            </Col>
            <Col span={2}>
                <Icon type="delete" style={{ fontSize: 18 }} onClick={() => this.handleRemove(file)}/>
            </Col>
          </Row>
          {file.status==='done'?
            null
            :
            <div className={styles['q-loading']}>
              <div className={styles['close']} onClick={()=>this.handleRemove(file)}><Icon type="close" /></div>
              <Icon type="loading" />
              <p>上传中，请耐心等待...</p>
            </div>
          }
        </Col>
      );
    });
   
    // {file.status==='done'?null:<Progress type="line" {...this.props.progressAttr} percent={file.percent} />}
    return (

      <Row gutter={24} style={{marginBottom:'12px'}} className={styles.fileRow}>
        <Col md={4} xl={3} style={{display:'flex',justifyContent:'center'}}>
          <Upload
            className={styles['avatar-uploader']}
            name="avatar"
            showUploadList={false}
            data={fileData}
            multiple={true}
            //accept={this.acceptList.join()}
            action={`${config.baseURL()}${config.api.imgUpload}`}
            beforeUpload={this.beforeUpload}
            onChange={this.handleChange}
          >
            <Icon type="plus" className={styles['avatar-uploader-trigger']} />
          </Upload>
        </Col>
        <Col md={20} xl={21}>
          <Row gutter={0}>
          {_fileList}
          </Row>
        </Col>
        {
          previewVisible?
           <ImgViewer 
            visible={previewVisible}
            onCancel={this.handleCancel}
            visIndex={previewIndex}
            imgs={_imgs} />
          :null
        }
      </Row>
    )
  }
}


FileUpload.propTypes = {
  fileList: PropTypes.array,
}

export default FileUpload
