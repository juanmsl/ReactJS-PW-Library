import React from 'react'
import { BasePage } from "..";

class Borrow extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	render(){
		return(
			<BasePage footer={true} navbar={true}>
				Borrow
			</BasePage>
		);
	}
}

export default Borrow;
