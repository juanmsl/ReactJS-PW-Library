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
			return <li className="pw-book-author" key={key}>{autor.nombre}</li>
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
		const { nombre, isbn, gettingBook } = this.state;
		let userType = user? user.type : "";
		return(
			<BasePage footer={true} navbar={true} data={data} user={user}>
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
							<aside>
								{renderHistory()}
							</aside>
						</section>
						<section className="pw-book-buttons">
							{ userType === "prestamista" &&
								<React.Fragment>
									<button className="wh-button shadow active" onClick={handleBorrow}>Prestar</button>
								</React.Fragment>
							}
							{ userType === "admin" &&
								<React.Fragment>
									<button className="wh-button shadow active" onClick={handleEdit}>Editar</button>
									<button className="wh-button shadow alert" onClick={handleDelete}>Borrar</button>
								</React.Fragment>
							}
						</section>
					</article>
				</LoadSection>
			</BasePage>
		);
	}
}

export default BookID;
