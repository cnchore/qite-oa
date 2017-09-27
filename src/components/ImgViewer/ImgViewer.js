import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImgViewer.less';
import {Icon} from 'antd';
import cs from 'classnames';
import * as $ from '../../utils/utilities.js'
class ImgViewer extends React.Component{
	static defaultProps = {
	  prop: 'value'
	};
	state ={
		index:0,
		imgStyles:{},
		ratio:.5,
		deg:0,
		imgWidth:0,
		imgNaturalWidth:0,
		imgHeight:0,
		imgNaturalHeight:0,
		margin:{marginTop:0,marginLeft:0},
		action:false,
		startX:0,
		startY:0,
	};
	componentWillReceiveProps(nextProps){
		// console.log('componentWillReceiveProps',nextProps)
		let self=this;
		let _src=nextProps.imgs[0].src;
		let _img=new Image();
		_img.src=_src;
		_img.onload=function(){
			self.setState({
				imgWidth:_img.width,
				imgNaturalWidth:_img.naturalWidth,
				imgHeight:_img.height,
				imgNaturalHeight:_img.naturalHeight
			})
			self.zoomTo(.1);
			// console.log('willMount',self.state,_img.naturalHeight,_img.height);
		}
	};
	componentWillMount(){
		// console.log('willMount',this.refs.viewer)
	};
	componentWillUpdate(nextProps,nextState){
		// console.log('WillUpdate',this.props,nextProps,nextState)
	};
	componentDidUpdate(preProps,preState){
		// console.log('DidUpdate',this.props,preProps,preState)
	};
	handerCancel(){
		this.props.onCancel && this.props.onCancel();
	};
	zoomTo(ratio){
		ratio = Number(ratio);
    if (ratio < 0) {
      ratio = 1 / (1 - ratio);
    } else {
      ratio = 1 + ratio;
    }
		let {imgStyles,imgWidth,imgNaturalWidth,imgNaturalHeight} = this.state;
		let _ratio=(imgWidth * ratio) / imgNaturalWidth;
		_ratio=_ratio<.3?.3:_ratio;
		_ratio=_ratio>4?4:_ratio;
		_ratio = Math.max(0, _ratio);
		// console.log('ratio',_ratio)

		if(typeof _ratio==='number' && !isNaN(_ratio) && _ratio>=.3 && _ratio<=4){
			const newWidth = imgNaturalWidth * _ratio;
	    const newHeight = imgNaturalHeight * _ratio;
	    const margin=this.offset(newWidth,newHeight);

			let _imgStyles={
				...imgStyles,
				width:`${newWidth}px`,
				height:`${newHeight}px`,
				marginTop:`${margin.marginTop}px`,
				marginLeft:`${margin.marginLeft}px`,
			}
			this.setState({
				imgStyles:_imgStyles,
				ratio:_ratio,
				imgWidth:newWidth,
				imgHeight:newHeight,
				margin,
			})
		}
    
	};
	offset(width,height){
		// const {imgStyles} = this.state;
		const clientWidth=document.body.clientWidth-100;
		const clientHeight=document.body.clientHeight-100;
		let marginTop,marginLeft;

		marginLeft=clientWidth/2 - width/2;
		marginTop=clientHeight/2 - height/2;
		// console.log(height,clientHeight,marginTop)
		return {marginTop,marginLeft}
	};
	handerEnlarge(){
		this.zoomTo(.1);
	};
	handerNarrow(){
		this.zoomTo(-.1);
	};
	handerRotate(){
		let {deg,imgStyles} = this.state;
		deg+=90;
		this.setState({
			imgStyles:{
				...imgStyles,
				transform:`rotate(${deg}deg)`,
			},deg
		})
	};
	contextmenu(e){
		e.stopPropagation();
		e.preventDefault();
		this.setState({action:false});
	};
	pointerdown(e){
		// console.log('down',e.button)
		
		e.stopPropagation();
		// this.action=true;
		let _e=$.getEvent(e);
		let startX=_e.pageX;
		let startY=_e.pageY;
		this.setState({action:true,startX,startY})
		e.preventDefault();
	};
	pointermove(e){
		e.stopPropagation();
		const pointer=$.getEvent(e);
		const {imgStyles,margin,action,startX,startY}=this.state;
		e.preventDefault();
		if(action){
			let endX=pointer.pageX;
			let endY=pointer.pageY;
			const x=endX-startX;
			const y=endY-startY;
			// console.log('move',$.getEvent(e).pageX,$.getEvent(e).pageY)
			// console.log('move',x,y,startX,startY,endX,endY);
			this.setState({
				imgStyles:{
					...imgStyles,
					marginTop:`${margin.marginTop+y}px`,
					marginLeft:`${margin.marginLeft+x}px`,
				}
			})
		}else{
			// console.log(this.endX,this.endY)
		}

	};
	pointerup(e){
		console.log('up')
		e.stopPropagation();
		this.setState({action:false})
		e.preventDefault();
		// this.action=false;
		// console.log('up',$.getEvent(e).pageX,$.getEvent(e).pageY)
	};
	dragstart(e){
		if (e.target.tagName.toLowerCase() === 'img') {
      e.preventDefault();
    }
	};
	render(){
		const {index,imgStyles,ratio,action} = this.state;
		const {imgs,visible} =this.props;
		// console.log('visible',visible)
		let _title=imgs[index].name,
				_src=imgs[index].src;
		return(
			<div className={cs(styles['img-viewer']:true,visible?styles['show']:'')} ref="viewer">
				<div className={styles['header']}>
					图片查看：{_title}
					<Icon type="close-circle-o" className={styles['close']} onClick={e=>this.handerCancel()}/>
				</div>
				<div className={styles['main-img']}>
					<img  src={_src} alt={_title} style={imgStyles} className={action?'no':'viewer-transition'}
						onDragStart={e=>this.dragstart(e)}
						onMouseDown={e=>this.pointerdown(e)}
						onTouchStart={e=>this.pointerdown(e)}
						onMouseMove={e=>this.pointermove(e)}
						onTouchMove={e=>this.pointermove(e)}
						onMouseUp={e=>this.pointerup(e)}
						onTouchEnd={e=>this.pointerup(e)}
						onTouchCancel={e=>this.pointerup(e)}
						onContextMenu={e=>this.contextmenu(e)}
					/>
				</div>
				<div className={styles['left']}>
					<Icon type="left" className={styles['pre-btn']} />
				</div>
				<div className={styles['right']}>
					<Icon type="right" className={styles['next-btn']} />
				</div>
				<div className={styles['tools']}>
					<Icon type="plus-circle-o" className={ratio===4?styles['disable']:''} onClick={e=>this.handerEnlarge()} />
					<Icon type="minus-circle-o" className={ratio===.3?styles['disable']:''}  onClick={e=>this.handerNarrow()} />
					<Icon type="reload" onClick={e=>this.handerRotate()} />
				</div>
			</div>
		)
	};
	componentDidMount(){
		// console.log('DidMount',this.props)
	};
	componentWillUnmount(){
		// console.log('WillUnmount',this.props)
	};
}
ImgViewer.PropTypes={
	visible:PropTypes.bool,
	onCancel:PropTypes.fun,
	imgs:PropTypes.array.isRequired,
}
export default ImgViewer