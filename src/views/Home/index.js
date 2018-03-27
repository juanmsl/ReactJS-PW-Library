import $ from 'jquery';
import path from 'path';
import React from 'react'
import { BookList , SearchBar } from '../../collections';
import { BasePage } from "..";

class Home extends React.Component{
	constructor(props){
		super(props);
		this.state={
			books: [] // This field will be rewrite by ajax, when calling the rest endpoint
		}
	}

	componentWillMount() {
		this.getBooks();
	}

	getBooks = () => {
		const { data } = this.props;
		const { host, getbooks } = data;

		let url = path.join(host, getbooks);

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
					books: [
						{
							id: 1,
							titulo: "Moby Dick",
							autor: "Herman Melville",
							isbn: "9781974305032"
						},
						{
							id: 2,
							titulo: "El Principito",
							autor: "Antoine de Saint-Exupery",
							isbn: "9788995317471"
						}
					]
				});
			}.bind(this)
		});
	};

	render() {
		const { data, user } = this.props;
		const { books } = this.state;
		const { type } = user;

		return(
			<BasePage footer={true} navbar={true} data={data} user={user}>
				<main className="maincontent">
					<SearchBar showAddButton={type === "admin"} />
					<BookList books={books} showButtons={type === "admin"}/>
				</main>
			</BasePage>
		);
	}
}

export default Home;
