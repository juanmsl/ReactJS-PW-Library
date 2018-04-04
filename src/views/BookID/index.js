import React from 'react'
import { BasePage } from "..";
import { LoadSection } from "../../components";
import { RESTResolver } from "../../resources/RESTResolver";

class BookID extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			id: "",
			titulo: "",
			autores: [],
			isbn: "",
			historial: [],
			gettingBook: "pending",
			gettingHistorial: "pending"
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

		this.restresolver.getHistorial(this.props.bookID, (response) => {
			this.setState({
				historial: response,
				gettingHistorial: "success"
			});
		}, (response) => {
			this.setState({
				gettingHistorial: "error"
			});
		});
	}

	renderAutores = () =>{
		const { autores } = this.state;
		return autores.map((autor,key) => {
			return <li className="pw-book-author" key={key}>{autor.nombre}</li>
		})
	};

	renderHistory = () => {
		return this.state.historial.map((registry, i) => {
			return <li key={i}>{registry.prestamo.fechaprestamo}</li>
		});
	};

	handleEdit = () =>{
		console.log("Placeholder for edit. Please implement.");
	};

	handleDelete = () =>{
		console.log("Placeholder for delete. Please implement.");
	};

	render(){
		const { renderAutores, renderHistory, handleEdit, handleDelete } = this;
		const { data, user } = this.props;
		const { nombre, isbn, gettingBook } = this.state;
		let userType = user? user.tipo : "";
		return(
			<BasePage footer={true} navbar={true} data={data} user={user}>
				<main className="maincontent">
					<LoadSection loading={gettingBook === "pending"} error={gettingBook === "error"}>
						<article className="book">
							<h1 className="wh-title">{nombre}</h1>
							<section className="pw-book-content">
								<section className="pw-book-info">
									<ul className="pw-book-authors">
										{renderAutores()}
									</ul>
									<p className="pw-book-isbn">ISBN <span>{isbn}</span></p>
								</section>
								<LoadSection loading={gettingBook === "pending"} error={gettingBook === "error"}>
									<ul>
										{renderHistory()}
									</ul>
								</LoadSection>
							</section>
							<section className="pw-book-buttons">
								{ userType === "Administrador" &&
									<React.Fragment>
										<button className="wh-button shadow active" onClick={handleEdit}>Editar</button>
										<button className="wh-button shadow alert" onClick={handleDelete}>Borrar</button>
									</React.Fragment>
								}
							</section>
						</article>
					</LoadSection>
				</main>
			</BasePage>
		);
	}
}

export default BookID;
