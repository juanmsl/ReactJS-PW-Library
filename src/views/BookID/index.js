import $ from "jquery";
import React from 'react'
import { BasePage } from "..";
import path from 'path';

class BookID extends React.Component {
	constructor(props){
		super(props);
		console.log(props);
		this.state = {
			id: "",
			titulo: "",
			autores: [],
			isbn: ""
		}
	}

	componentWillMount() {
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
					response
				});
			}.bind(this),
			error: function(response) { // while the backend is ready, after that, the error function will be removed
				this.setState({
					id: 1,
					titulo: "Moby Dick",
					autores: [{nombre:"Herman Melville"}],
					isbn: "9781974305032"
				});
			}.bind(this)
		});
	};

	renderAutores = () =>{
		const { autores } = this.state;
		return autores.map((autor,key) => {
			return <li key={key}>{autor.nombre}</li>
		})
	}

	renderHistory = () => {
		return <div>Placeholder</div>
	}

	handleEdit = () =>{
		console.log("Placeholder for edit. Please implement.");
	}

	handleDelete = () =>{
		console.log("Placeholder for delete. Please implement.");
	}

	handleBorrow = () =>{
		console.log("Placeholder for borrow. Please implement.");
	}

	render(){
		const { renderAutores, renderHistory, handleEdit, handleDelete, handleBorrow } = this;
		const { data, user } = this.props;
		const { titulo, isbn } = this.state;
		let userType = user? user.type : "";
		return(
			<BasePage footer={true} navbar={true} data={data} user={user}>
				<article>
					<header>
						<h1>{titulo}</h1>
					</header>
					<main>
						<p>{`ISBN: ${isbn}`}</p>
						<h3>Autores:</h3>
						<ul>
							{renderAutores()}
						</ul>
					</main>
					<aside>
						{renderHistory()}
					</aside>
					{ userType === "prestamista" &&
						<div>
							<button onClick={handleBorrow}>Prestar</button>
						</div>
					}
					{ userType === "admin" &&
						<div>
							<button onClick={handleEdit}>Editar</button>
							<button onClick={handleDelete}>Borrar</button>
						</div>
					}
				</article>
			</BasePage>
		);
	}
}

export default BookID;
