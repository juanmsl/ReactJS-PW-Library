import React from 'react'
import { BasePage } from "..";

class Book extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	render(){
		return(
			<BasePage footer={true} navbar={true}>
				Book
			</BasePage>
		);
	}
}

export default Book;
