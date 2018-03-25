import React from 'react'
import { BasePage } from "..";

class Register extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	render() {
		const { data, user } = this.props;

		return(
			<BasePage footer={true} navbar={true} data={data} user={user}>
				Register
			</BasePage>
		);
	}
}

export default Register;
