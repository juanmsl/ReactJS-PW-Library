import React from 'react'
import { BasePage } from "..";
import { SearchBar } from "../../collections";
import { Button } from '../../components';

class Borrow extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	handleBorrow = (booklist) =>{

	}

	render() {
		const { data, user } = this.props;
		const { handleBorrow } = this;

		return(
			<BasePage footer={true} navbar={true} data={data} user={user}>
				<SearchBar />
				<Button onClick={handleBorrow} />
			</BasePage>
		);
	}
}

export default Borrow;
