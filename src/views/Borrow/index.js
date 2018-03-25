import React from 'react'
import { BasePage } from "..";

class Borrow extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	render() {
		const { data, user } = this.props;

		return(
			<BasePage footer={true} navbar={true} data={data} user={user}>
				Borrow
			</BasePage>
		);
	}
}

export default Borrow;
