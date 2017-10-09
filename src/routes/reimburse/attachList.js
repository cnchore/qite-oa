import React from 'react'
class AttachList extends React.Component {
  render() {
  	const list=this.props.List;
  	const div=list.map((l,index)=><div key={index}>
  			<div>attachName:{l.attachName}</div>
  			<img src={l.attachUrl} alt={l.attachName}/>
  		</div>)
    return <div>{div}</div>;
  }
}
export default AttachList