import React from 'react'
import { BasePage } from "..";
import $ from "jquery";
import path from 'path';

class BookID extends React.Component {
	constructor(props){
		super(props);
		this.state = {}
	}

	componentDidMount() {
		this.getBook();
	}

	getBook = () => {
		const { data, bookID } = this.props;
		const { host, getbook } = data;

		let url = path.join(host, getbook);
		url = path.join(url, bookID);

		$.ajax({
			type: "GET",
			url: url,
			success: function(response) {
				this.setState({
					books: response
				});
			}.bind(this),
			error: function(response) { // while the backend is ready, after that, the error function will be removed
				this.setState({
					id: 1,
					titulo: "Moby Dick",
					autor: "Herman Melville",
					isbn: "9781974305032"
				});
			}.bind(this)
		});
	};

	render(){
		const { data, user } = this.props;
		const { titulo, isbn, autor } = this.state;

		return(
			<BasePage footer={true} navbar={true} data={data} user={user}>
				<h1>{titulo}</h1>
				<p>{isbn}</p>
				<p>{autor}</p>
			</BasePage>
		);
	}
}

export default BookID;
