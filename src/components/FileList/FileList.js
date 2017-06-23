import React from 'react'
import PropTypes from 'prop-types'
import styles from './FileList.less'
import { Icon,Progress,Row,Col } from 'antd'
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
  
  render () {

    const { fileList,showRemoveIcon,onRemove } = this.props
    const handleRemove=(file)=>{
      if(onRemove){
        onRemove(file);
      }
    }
    const _fileList = fileList.map((file,index)=>{
      let thumbUrl=this.getThumbUrl(file);
      return (
        <Row key={file.uid} gutter={12} className={styles['file-list']} style={{margin:'0px'}} type="flex" justify="space-around" align="middle">
          <Col span={4}>
            { (thumbUrl)?
            <img className={styles.fileImg} src={thumbUrl} alt={file.name} />
            :<Icon type="loading" />
          }
          </Col>
          <Col span={showRemoveIcon?16:18}>
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
          {
            showRemoveIcon?(
            <Col span={2}>
                <Icon type="delete" style={{ fontSize: 18 }} onClick={() => handleRemove(file)}/>
            </Col>
            ):null
          }
        </Row>
      );
    });

    return (
     
      <Row gutter={24} style={{margin:0,marginBottom:'12px'}} className={styles.fileRow}>
        
          {_fileList}
        
      </Row>
      
    )
  }
}


FileList.propTypes = {
  fileList:PropTypes.array,
  onRemove: PropTypes.func,
}

export default FileList
