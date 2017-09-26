import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImgViewer.less';
import {Icon} from 'antd';
import cs from 'classnames';
class ImgViewer extends React.Component{
	static defaultProps = {
	  prop: 'value'
	};
	state ={
		index:0,
		imgStyles:{},
		size:.5,
		deg:0,
	};
	componentWillMount(){

	};
	handerCancel(){
		this.props.onCancel && this.props.onCancel();
	};
	handerEnlarge(){
		let {deg,size} = this.state;
		size+=.1;
		if(size<4.1){
			let imgStyles={
				transform:`rotate(${deg}deg) translate(-50%,-50%)`,
				width:`${size*100}%`
			}
			this.setState({imgStyles,size})
		}
	};
	handerNarrow(){
		let {deg,size} = this.state;
		size-=.1;
		if(size>=.2){
			let imgStyles={
				transform:`rotate(${deg}deg) translate(-50%,-50%)`,
				width:`${size*100}%`
			}
			this.setState({imgStyles,size})
		}
	};
	handerRotate(){
		let {deg,size} = this.state;
		deg+=90;
		let imgStyles={
			transform:`rotate(${deg}deg) translate(-50%,-50%)`,
			width:`${size*100}%`
		}
		this.setState({imgStyles,deg})
	};
	render(){
		const {index,imgStyles,size} = this.state;
		const {imgs,visible} =this.props;
		// console.log('visible',visible)
		let _title=imgs[index].name,
				_src=imgs[index].src;
		return(
			<div className={cs(styles['img-viewer']:true,visible?styles['show']:'')}>
				<div className={styles['header']}>
					图片查看：{_title}
					<Icon type="close-circle-o" className={styles['close']} onClick={e=>this.handerCancel()}/>
				</div>
				<div className={styles['main-img']}>
					<img  src={_src} alt={_title} style={imgStyles} />
				</div>
				<div className={styles['left']}>
					<Icon type="left" className={styles['pre-btn']} />
				</div>
				<div className={styles['right']}>
					<Icon type="right" className={styles['next-btn']} />
				</div>
				<div className={styles['tools']}>
					<Icon type="plus-circle-o" className={size>3.9?styles['disable']:''} onClick={e=>this.handerEnlarge()} />
					<Icon type="minus-circle-o" className={size<.3?styles['disable']:''}  onClick={e=>this.handerNarrow()} />
					<Icon type="reload" onClick={e=>this.handerRotate()} />
				</div>
			</div>
		)
	};
	componentDidMount(){

	};
	componentWillUnmount(){

	};
}
ImgViewer.PropTypes={
	visible:PropTypes.bool,
	onCancel:PropTypes.fun,
	imgs:PropTypes.array.isRequired,
}
export default ImgViewer