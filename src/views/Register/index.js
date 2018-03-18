import React from 'react'
import { BasePage } from "..";

class Register extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	render(){
		return(
			<BasePage footer={true} navbar={true}>
				Register
			</BasePage>
		);
	}
}

export default Register;
