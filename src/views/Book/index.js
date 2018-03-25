import React from 'react'
import { BasePage } from "..";

class Book extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	render() {
		const { data, user } = this.props;

		return(
			<BasePage footer={true} navbar={true} data={data} user={user}>
				Book
			</BasePage>
		);
	}
}

export default Book;
