import React from 'react'
import { BasePage } from "..";

class BookID extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	render(){
		console.log(this.props);
		return(
			<BasePage footer={true} navbar={true}>
				Book ID
			</BasePage>
		);
	}
}

export default BookID;
