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
		endX:0,
		endY:0,
		scale:{x:1,y:1},
		status:0,
	};
	componentWillReceiveProps(nextProps){
		// console.log('componentWillReceiveProps',nextProps)
		//nextProps.imgs[0].src;
	};
	loadImage(src){
		let self=this;
		let _img=new Image();
		_img.src=src;
		_img.onload=function(){
			self.setState({
				index:0,
				imgStyles:{},
				ratio:.5,
				deg:0,
				margin:{marginTop:0,marginLeft:0},
				action:false,
				startX:0,
				startY:0,
				endX:0,
				endY:0,
				scale:{x:1,y:1},
				imgWidth:_img.width,
				imgNaturalWidth:_img.naturalWidth,
				imgHeight:_img.height,
				imgNaturalHeight:_img.naturalHeight,
				status:2,
			})
			self.zoomTo(0,true);
			// console.log('willMount',self.state,_img.naturalHeight,_img.height);
		}
		_img.error=function(){
			self.setState({
				status:3
			})
		}
	};
	componentWillMount(){
		// 加载中..
		this.setState({status:1});
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
	zoomTo(ratio,init=false){
		ratio = Number(ratio);
    if (ratio < 0) {
      ratio = 1 / (1 - ratio);
    } else {
      ratio = 1 + ratio;
    }
		let {imgStyles,imgWidth,imgHeight,imgNaturalWidth,imgNaturalHeight,margin,deg,scale} = this.state;
		let _ratio=(imgWidth * ratio) / imgNaturalWidth;
		_ratio=_ratio<.3?.3:_ratio;
		_ratio=_ratio>4?4:_ratio;
		_ratio = Math.max(0, _ratio);
    // console.log('ratio:',ratio,_ratio,imgWidth,imgNaturalWidth)
    if(init){
    	_ratio=1;
    }
		if(typeof _ratio==='number' && !isNaN(_ratio) && _ratio>=.3 && _ratio<=4){
			const newWidth = imgNaturalWidth * _ratio;
	    const newHeight = imgNaturalHeight * _ratio;
	    const _margin=this.offset(margin,imgWidth,imgHeight,newWidth,newHeight,init);
	    const marginLeft=_margin.marginLeft;
	    const marginTop=_margin.marginTop;
			let _imgStyles={
				...imgStyles,
				width:`${newWidth}px`,
				height:`${newHeight}px`,
				marginTop:`${marginTop}px`,
				marginLeft:`${marginLeft}px`,
				transform:`rotate(${deg}deg) scale(${scale.x},${scale.y})`,
			}
			this.setState({
				imgStyles:_imgStyles,
				ratio:_ratio,
				imgWidth:newWidth,
				imgHeight:newHeight,
				margin:{
					marginLeft,
					marginTop,
				},
			})
		}
    
	};
	offset(margin,oldWidth,oldHeight,newWidth,newHeight,init){
		// const {imgStyles} = this.state;
		const clientWidth=document.body.clientWidth;
		const clientHeight=document.body.clientHeight;
		let marginTop,marginLeft;
		if(init){
			marginLeft=clientWidth/2 - newWidth/2;
			marginTop=clientHeight/2 - newHeight/2;
		}else{
			const x=newWidth-oldWidth;
			const y=newHeight-oldHeight;
			marginLeft=margin.marginLeft-x/2;
			marginTop=margin.marginTop-y/2;
		}
		// console.log(height,clientHeight,marginTop)
		return {marginTop,marginLeft}
	};
	handerEnlarge(){
		this.zoomTo(.1);
	};
	handerNarrow(){
		this.zoomTo(-.1);
	};
	handerRotate(d){
		let {deg,imgStyles} = this.state;
		deg+=d;
		this.setState({
			imgStyles:{
				...imgStyles,
				transform:`rotate(${deg}deg)`,
			},
			deg
		})
	};
	handerScale(t){
		const { scale,deg,imgStyles} =this.state;
		let x=scale.x,
				y=scale.y;
		if(t==='horizontal'){
			//左右翻转
			x=x===1?-1:1;
		}else{
			//上下翻转
			y=y===1?-1:1;
		}
		this.setState({
			imgStyles:{
				...imgStyles,
				transform:`rotate(${deg}deg) scale(${x},${y})`,
			},
			scale:{x,y}
		})		
	};
	contextmenu(e){
		// e.stopPropagation();
		// e.preventDefault();
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
			const endX=pointer.pageX;
			const endY=pointer.pageY;
			const x=endX-startX;
			const y=endY-startY;
			const marginLeft=margin.marginLeft+x;
			const marginTop=margin.marginTop+y;
			// console.log('1-margin:',marginLeft,marginTop)
			// console.log('2-start:',startX,startY);
			// console.log('3-end:',endX,endY);
			// console.log('4-move:',x,y);
			this.setState({
				imgStyles:{
					...imgStyles,
					marginTop:`${marginTop}px`,
					marginLeft:`${marginLeft}px`,
				},
				endX,
				endY,
			})
		}else{
			// console.log(this.endX,this.endY)
		}

	};
	pointerup(e){
		// console.log('up')
		e.stopPropagation();
		e.preventDefault();
		const {action,margin,startX,startY,endX,endY} =this.state;
		if(action){
			this.setState({
				action:false,
				margin:{
					marginLeft:margin.marginLeft+(endX-startX),
					marginTop:margin.marginTop+(endY-startY)
				}
			})
		}
		
	};
	dragstart(e){
		if (e.target.tagName.toLowerCase() === 'img') {
      e.preventDefault();
    }
	};

	render(){
		const {index,imgStyles,ratio,action,status} = this.state;
		const {imgs,visible} =this.props;
		// console.log('visible',visible)
		let _title=imgs[index].name,
				_src=imgs[index].src;
		if(status!==2 && status!==3){
			this.loadImage(_src);
		}
		return(
			<div className={cs(styles['img-viewer']:true,visible?styles['show']:'')} ref="viewer">
				{
					status===2?
						<div className={styles['main-img']}>
							<img  src={_src} alt={_title} style={imgStyles} className={action?'no':styles['viewer-transition']}
								onDragStart={e=>this.dragstart(e)}
								onMouseDown={e=>this.pointerdown(e)}
								onTouchStart={e=>this.pointerdown(e)}
								onMouseMove={e=>this.pointermove(e)}
								onTouchMove={e=>this.pointermove(e)}
								onMouseOut={e=>this.pointerup(e)}
								onMouseUp={e=>this.pointerup(e)}
								onTouchEnd={e=>this.pointerup(e)}
								onTouchCancel={e=>this.pointerup(e)}
								onContextMenu={e=>this.contextmenu(e)}
							/>
						</div>
					:
						<div className={styles['loading']}>
							{
								status!==3?
									<p>
										<Icon type="loading" />
										图片加载中...
									</p>
								:
									<p>加载图片失败</p>
							}
						</div>
				}
				<div className={styles['close']} onClick={e=>this.handerCancel()}>
					<Icon type="close" />
				</div>
				<div className={styles['tooltips']}>
					{_title && _title}
				</div>
				<div className={styles['tools']}>
					<Icon type="plus" className={ratio===4?styles['disable']:''} onClick={e=>this.handerEnlarge()} />
					<Icon type="minus" className={ratio===.3?styles['disable']:''}  onClick={e=>this.handerNarrow()} />
					<i className={cs('anticon',styles['real-size'])} onClick={e=>this.zoomTo(0,true)}></i>
					<Icon type="reload" className={styles['reverse-rotate']} onClick={e=>this.handerRotate(-90)} />
					<Icon type="reload" className={styles['cis-rotate']} onClick={e=>this.handerRotate(90)} />
					<Icon type="arrows-alt" className={styles['reverse-flip']} onClick={e=>this.handerScale('horizontal')}/>
					<Icon type="arrows-alt" className={styles['cis-flip']} onClick={e=>this.handerScale('vertical')}/>
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