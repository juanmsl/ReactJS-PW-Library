import React from 'react'

class Label extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	render(){
		return(
			<label {...this.props}>{this.props.children }</label>
		);
	}
}

export default Label;
