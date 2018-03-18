import React from 'react'
import { BasePage } from "..";

class Home extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	render() {
		const { data } = this.props;

		return(
			<BasePage footer={true} navbar={true} data={data}>
				Home
			</BasePage>
		);
	}
}

export default Home;
