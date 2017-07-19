import React from 'react'
import PropTypes from 'prop-types'
import styles from './FileUpload.less'
import { Upload, Icon, message,Progress,Row,Col,Modal } from 'antd'
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
  state = {
    fileList:this.props.defaultFileList || [],
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

    let defaultList=this.state.fileList.filter(item=>item.uid!==info.file.uid)

    if(status==='uploading'){
      this.setState({fileList:[...defaultList,info.file]})
      //console.log('before:',..._list);
    }else if (status === 'done') {
      let f=info.file;
      f.url=info.file.response.data;
      this.setState({fileList:[...defaultList,f]})
      //if(this.props.fileList)this.props.fileList=[...defaultList,f];
      if(this.props.callbackParent)this.props.callbackParent([...defaultList,f]);
      message.success(`${info.file.name} 上传成功.`);
      //this.setState({ imageUrl:info.file.response.data });

    } else if (status === 'error') {
      this.setState({fileList:defaultList})

      message.error(`${info.file.name} 上传失败.`);
    }
    
  }
  getThumbUrl=(file)=>{
    if(file.type==='image/jpeg'){
      return file.url+'?imageView2/1/w/320/h/200/format/webp/interlace/0/q/50';
    }
    let l=file.name.lastIndexOf('.');
    switch(file.name.substr(l)){
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
        return XlS;
      case '.xlsx':
        return XLSX;
      case '.zip':
        return ZIP;
      case '.txt':
        return TXT;
      case '.rar':
        return RAR;
      case '.jpg':
      case '.jpg':
      case '.gif':
        return file.url+'?imageView2/1/w/320/h/200/format/webp/interlace/0/q/50';
      default :
        return OTHER;

    }
  }
  beforeUpload=(file)=> {

    this.setState({fileList:[...this.state.fileList,file]})
    
    const isLt2M = file.size / 1024 / 1024 < 20;
    if (!isLt2M) {
      message.error('上传文件必须小于 20MB!');
    }
    return isLt2M;
  }
  handleRemove=(file)=>{
    let l=this.state.fileList.filter(item=>item.uid!==file.uid);
    //console.log('before:',l)
    this.setState({
      fileList:l
    });
    if(this.props.callbackParent)this.props.callbackParent(l);

    //if(this.props.fileList)this.props.fileList=l;
  }
  handleCancel=()=>{
    this.setState({previewVisible:false});
  }
  handlePreview=(file)=>{
    this.setState({
      previewImage:this.getThumbUrl(file),
      previewName:file.name,
      previewVisible:true,
    });
  }
  render () {
    const fileData={bucket:`${config.bucket}`,type:'qiteOa'};
    const {previewVisible,previewImage,previewName }= this.state; 
    const { prefixCls,fileList,showPreviewIcon, showRemoveIcon } = this.props
    const _fileList = this.state.fileList.map((file,index)=>{
      let thumbUrl=this.getThumbUrl(file);
      return (
        <Row key={file.uid} gutter={24} className={styles['file-list']} style={{margin:'0px'}} type="flex" justify="space-around" align="middle">
          <Col span={4} style={{paddingLeft:'2px'}} className={styles['file-img-div']}>
            { (thumbUrl)?
              <img className={styles.fileImg} src={thumbUrl} alt={file.name} onClick={e=>this.handlePreview(file)}/>
              :<Icon type="loading" />  
            }
             <Modal visible={previewVisible} footer={null} width={800} onCancel={this.handleCancel}>
              <img alt={previewName} style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Col>
          <Col span={16}>
            {file.name}
            {file.status==='done'?null:<Progress type="line" {...this.props.progressAttr} percent={file.percent} />}
          </Col>
          <Col span={2}>
            <a
            href={file.url}
            target="_blank"
            >
              <Icon type="download" style={{ fontSize: 18 }} />
            </a>
          </Col>
          <Col span={2}>
              <Icon type="delete" style={{ fontSize: 18 }} onClick={() => this.handleRemove(file)}/>
          </Col>
        </Row>
      );
    });

    return (
     
      <Row gutter={24} style={{marginBottom:'12px'}} className={styles.fileRow}>
        <Col md={4} xl={3} style={{display:'flex',justifyContent:'center'}}>
          <Upload
            className={styles['avatar-uploader']}
            name="avatar"
            showUploadList={false}
            data={fileData}
            //accept={this.acceptList.join()}
            action={`${config.baseURL}${config.api.imgUpload}`}
            beforeUpload={this.beforeUpload}
            onChange={this.handleChange}
          >
            <Icon type="plus" className={styles['avatar-uploader-trigger']} />
          </Upload>
        </Col>
        <Col md={20} xl={21}>
          {_fileList}
        </Col>
      </Row>
      
    )
  }
}


FileUpload.propTypes = {
  fileList: PropTypes.array,
}

export default FileUpload
