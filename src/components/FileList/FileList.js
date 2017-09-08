import React from 'react'
import PropTypes from 'prop-types'
import styles from './FileList.less'
import { Icon,Progress,Row,Col,Modal } from 'antd'
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

class FileList extends React.Component {
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
    previewVisible:false,
    previewImage:null,
    previewName:''
  }
  componentWillReceiveProps(nextProps){
    // console.log('fileList nextProps:',nextProps)
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
        return file.url+'?imageView2/1/w/320/h/200/format/webp/interlace/0/q/50';
      default :
        return OTHER;

    }
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
    const {previewVisible,previewImage,previewName }= this.state; 
    const { fileList,showRemoveIcon,onRemove } = this.props;
    const handleRemove=(file)=>{
      if(onRemove){
        onRemove(file);
      }
    }
    const _fileList = fileList.map((file,index)=>{
        // 
      let thumbUrl=this.getThumbUrl(file);
      return (
        <Col key={index} md={24} xl={12} className={styles['file-container']}>
          <Row key={file.uid} className={styles['file-list']} style={{margin:'0px'}} type="flex" justify="space-around" align="middle">
            <Col key={index+1+Math.random()} span={4}>
              { thumbUrl?
                <img className={styles.fileImg} src={thumbUrl} alt={file.name} onClick={e=>this.handlePreview(file)} />
                :null
              }
            </Col>
            <Col key={index+2+Math.random()} span={file.createTime?10:16}>
              {file.name}
              {file.status==='done'?null:<Progress type="line" {...this.props.progressAttr} percent={file.percent} />}
            </Col>
            {
              file.createTime?(
              <Col key={index+3+Math.random()} span={8}>{file.createTime}</Col>
              ):null
            }
            <Col key={index+4+Math.random()} span={2}>
              <a
              href={file.url}
              target="_blank"
              >
                <Icon type="download" style={{ fontSize: 18 }} />
              </a>
            </Col>
          </Row>
        </Col>
      );
    });
        // </Row>
    return (
     
      <Row gutter={0} className={styles.fileRow}>
        
        {_fileList[0]?_fileList:<Col span={24}>暂无内容</Col>}
        <Modal visible={previewVisible} footer={null} width={800} onCancel={this.handleCancel}>
          <img alt={previewName} style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Row>
      
    )
  }
}


FileList.propTypes = {
  fileList:PropTypes.array,
  onRemove: PropTypes.func,
}

export default FileList
