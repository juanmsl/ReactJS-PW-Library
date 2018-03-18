import React from 'react'
import { BasePage } from "..";

class Home extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	render(){
		return(
			<BasePage footer={true} navbar={true}>
				Home
			</BasePage>
		);
	}
}

export default Home;
