import React from 'react'
import { BasePage } from "..";

class BookID extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	render(){
		const { data } = this.props;

		return(
			<BasePage footer={true} navbar={true} data={data}>
				Book ID
			</BasePage>
		);
	}
}

export default BookID;
