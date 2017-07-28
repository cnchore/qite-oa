import React from 'react'
import { HtmlEditor } from '../../components'

class Temppage extends React.Component{
	state={
		edContent:'',
	}
	render(){
		const _callback=(ht)=>{
			this.setState({
				edContent:ht,
			})
		}
		const heProps={
			editorStyle:{
				height:'300px',
			},
			content:'<h1>第一个htmleditor</h1>',
			callback(ht){
				_callback(ht);
			},
		}
		const handleGet=()=>{
			alert(this.state.edContent)
		}
		return (
			<div>
				<HtmlEditor {...heProps} />
				<button onClick={e=>handleGet()}>获取html</button>

			</div>
		)
	}
}

export default Temppage