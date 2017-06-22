import React from 'react'
import PropTypes from 'prop-types'
import styles from './FileUpload.less'
import { Upload, Icon, message,Progress,Tooltip,Row,Col } from 'antd'
import config from '../../utils/config'
import classNames from 'classnames';
import DOC from '../../../assets/doc.png'
import PDF from '../../../assets/pdf.png'
import TXT from '../../../assets/txt.png'
import XLS from '../../../assets/xls.png'
import ZIP from '../../../assets/zip.png'

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
   
  }
  acceptList=['image/jpeg',
    //xlsx
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    //docx
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'application/pdf',
    'text/plain',
    'application/zip'
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
    if(file.name.length===('.txt').length+file.name.lastIndexOf('.txt')){
      return TXT;
    } else if(file.name.length===('.doc').length+file.name.lastIndexOf('.doc')){
      return DOC;
    } else if(file.name.length===('.docx').length+file.name.lastIndexOf('.docx')){
      return DOC;
    } else if(file.name.length===('.xls').length+file.name.lastIndexOf('.xlx')){
      return XLS;
    } else if(file.name.length===('.xlsx').length+file.name.lastIndexOf('.xlsx')){
      return XLS;
    } else if(file.name.length===('.pdf').length+file.name.lastIndexOf('.pdf')){
      return PDF;
    } else if(file.name.length===('.zip').length+file.name.lastIndexOf('.zip')){
      return ZIP;
    }else{
      return file.url;
    }

  }
  beforeUpload=(file)=> {

    this.setState({fileList:[...this.state.fileList,file]})
    const isJPG = this.acceptList.filter((item)=>item===file.type);
    //console.log('before:',isJPG)
    if (!isJPG[0]) {
      message.error('文件格式不对!');
    }
    const isLt2M = file.size / 1024 / 1024 < 20;
    if (!isLt2M) {
      message.error('上传文件必须小于 20MB!');
    }
    return Boolean(isJPG[0]) && isLt2M;
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
  render () {
    const fileData={bucket:`${config.bucket}`,type:'photo'};

    const { prefixCls,fileList,showPreviewIcon, showRemoveIcon } = this.props
    const _fileList = this.state.fileList.map((file,index)=>{
      let thumbUrl=this.getThumbUrl(file);
      return (
        <Row key={file.uid} gutter={24} className={styles['file-list']} style={{margin:'0px'}} type="flex" justify="space-around" align="middle">
          <Col span={4}>
            { (thumbUrl)?
            <img className={styles.fileImg} src={thumbUrl} alt={file.name} />
            :<Icon type="loading" />
          }
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
            <a href="#" 
              onClick={() => this.handleRemove(file)}
            >
              <Icon type="delete" style={{ fontSize: 18 }} />
            </a>
          </Col>
        </Row>
      );
    });

    return (
     
      <Row gutter={24} style={{marginBottom:'12px'}} className={styles.fileRow}>
        <Col span={3}>
          <Upload
            className={styles['avatar-uploader']}
            name="avatar"
            showUploadList={false}
            data={fileData}
            action={`${config.baseURL}${config.api.imgUpload}`}
            beforeUpload={this.beforeUpload}
            onChange={this.handleChange}
          >
            <Icon type="plus" className={styles['avatar-uploader-trigger']} />
          </Upload>
        </Col>
        <Col span={21}>
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
