import React from 'react'
import PropTypes from 'prop-types'
import styles from './FileList.less'
import { Icon,Progress,Row,Col,Tooltip } from 'antd'
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
    previewName:'',
    previewIndex:0,
  }
  componentWillReceiveProps(nextProps){
    // console.log('fileList nextProps:',nextProps)
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
    const {previewVisible,previewIndex }= this.state; 
    const { fileList,showRemoveIcon,onRemove } = this.props;
    // const _imgs=[{src:previewImage,name:previewName}]
    const handleRemove=(file)=>{
      if(onRemove){
        onRemove(file);
      }
    }
    let _fileList=[],_imgs=[];
    fileList.map((file,index)=>{
        // 
      let thumbUrl=this.getThumbUrl(file);
      _imgs.push({
        src:this.getThumbUrl(file,true),
        name:file.name,
      });
      _fileList.push(
        <Col key={index} md={24} xl={12} className={styles['file-container']}>
          <Row key={file.uid} className={styles['file-list']} style={{margin:'0px'}} type="flex" justify="space-around" align="middle">
            <Col key={index+1+Math.random()} span={4}>
              { thumbUrl?
                <img className={styles.fileImg} src={thumbUrl} alt={file.name} onClick={e=>this.handlePreview(index)} />
                :null
              }
            </Col>
            <Col key={index+2+Math.random()} span={file.createTime?10:16}>
              {
                file.name && file.name.length>20?
                <Tooltip title={<div className="tooltip-open">{file.name}</div>}>{file.name.substr(0,17)}...</Tooltip>
                :<span>{file.name && file.name}</span>
              }
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
              download={file.name}
              >
                <Icon type="download" style={{ fontSize: 18 }} />
              </a>
            </Col>
          </Row>
        </Col>
      );
    });

    return (
     
      <Row gutter={0} className={styles.fileRow}>
        
        {_fileList[0]?_fileList:<Col span={24}>暂无内容</Col>}
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


FileList.propTypes = {
  fileList:PropTypes.array,
  onRemove: PropTypes.func,
}

export default FileList
