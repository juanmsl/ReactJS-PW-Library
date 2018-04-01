import React from 'react'
import { BasePage } from "..";
import { LoadSection } from "../../components";
import { RESTResolver } from "../../resources/RESTResolver";

class BookID extends React.Component {
	constructor(props){
		super(props);
		console.log(props);
		this.state = {
			id: "",
			titulo: "",
			autores: [],
			isbn: "",
			gettingBook: "pending"
		};
		this.restresolver = new RESTResolver();
	}

	componentWillMount() {
		this.restresolver.getBook(this.props.bookID, (response) => {
			this.setState(response);
			this.setState({
				gettingBook: "success"
			});
		}, (response) => {
			this.setState({
				gettingBook: "error"
			});
		});
	}

	renderAutores = () =>{
		const { autores } = this.state;
		return autores.map((autor,key) => {
			return <li key={key}>{autor.nombre}</li>
		})
	};

	renderHistory = () => {
		return <div>Placeholder</div>
	};

	handleEdit = () =>{
		console.log("Placeholder for edit. Please implement.");
	};

	handleDelete = () =>{
		console.log("Placeholder for delete. Please implement.");
	};

	handleBorrow = () =>{
		console.log("Placeholder for borrow. Please implement.");
	};

	render(){
		const { renderAutores, renderHistory, handleEdit, handleDelete, handleBorrow } = this;
		const { data, user } = this.props;
		const { titulo, isbn, gettingBook } = this.state;
		let userType = user? user.type : "";
		return(
			<BasePage footer={true} navbar={true} data={data} user={user}>
				<LoadSection loading={gettingBook === "pending"} error={gettingBook === "error"}>
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
				</LoadSection>
			</BasePage>
		);
	}
}

export default BookID;
