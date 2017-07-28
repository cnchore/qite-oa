import React from 'react'
import PropTypes from 'prop-types'
import config from '../../utils/config'
import WangEditor from 'wangeditor'

class HtmlEditor extends React.Component {
  
  state = {
    // editorContent: ''
  }
  componentDidMount() {
  	const fileData={bucket:`${config.bucket}`,type:'qtedimg'};
    const elem = this.refs.editorElem
    this.editor = new WangEditor(elem)
    // 上传图片
    this.editor.config.uploadImgUrl = config.api.imgUpload;
    
    // 配置自定义参数
    this.editor.config.uploadParams = fileData;
    
    // 设置 headers
    // editor.config.uploadHeaders = {
    //     'Accept' : 'text/x-json'
    // };
    // 自定义上传事件
    this.editor.config.uploadImgFns.onload = (resultText, xhr)=> {
      // resultText 服务器端返回的text
      // xhr 是 xmlHttpRequest 对象，IE8、9中不支持
      // 上传图片时，已经将图片的名字存在 editor.uploadImgOriginalName
      var originalName = this.editor.uploadImgOriginalName || '';  
      console.log('上传成功，即将插入编辑区域，结果为：',resultText);
      // 如果 resultText 是图片的url地址，可以这样插入图片：
      var resData=JSON.parse(resultText);
      if(resData && resData.success){
        this.editor.command(null, 'insertHtml', '<img src="' + resData.data + '" alt="' + originalName + '" style="max-width:100%;"/>');
      }
      // 如果不想要 img 的 max-width 样式，也可以这样插入：
      // editor.command(null, 'InsertImage', resultText);
    };
    
    //监听值变化
    this.editor.onchange = ()=> {
        // this.setState({
        //   editorContent:this.editor.$txt.html(),
        // })
        this.props.callback && this.props.callback(this.editor.$txt.html());
    }
    this.editor.config.menus = ['source', 'bold', 'underline', 'italic', 'strikethrough', 'eraser', 
    'forecolor', 'bgcolor',  'quote', 'fontfamily', 'fontsize', 'head', 'unorderlist', 'orderlist', 
    'alignleft', 'aligncenter', 'alignright','link', 'unlink', 'table', 'img', 'video', 'insertcode', 
     'undo', 'redo', 'fullscreen']
    this.editor.create();
    // 初始化内容
    this.editor.$txt.html(this.props.content);
  }
  render () {
    
    return (
    	<div ref="editorElem" style={this.props.editorStyle} className="q-htmleditor"></div>
    )
  }
}


HtmlEditor.propTypes = {
 	editorStyle:PropTypes.object,
 	content:PropTypes.string,
 	// callback:PropTypes.fun,
}

export default HtmlEditor
