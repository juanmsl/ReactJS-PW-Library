import React from 'react'
import { BasePage } from "..";
import { Button , Input , Label } from '../../components';
import { Field , Form , List } from '../../collections';
import { RESTResolver } from "../../resources/RESTResolver";
import { LoadSection } from "../../components";
import { Redirect } from 'react-router-dom';

class Book extends React.Component{
	constructor(props){
		super(props);
		this.state={
			authors: [],
			availableAuthors: [],
			selectedAuthors: [],
			gettingAuthors: "pending",
			shouldRedirect: false
		};
		this.restResolver = new RESTResolver();
	};

	componentWillMount = () => {
		this.restResolver.getAuthors((response) => {
			let authors = response.map((author, i) => { return author.nombre });
			this.setState({
				authors: authors,
				availableAuthors: authors,
				gettingAuthors: 'success'
			});
		}, (response) => {
			this.setState({
				gettingAuthors: 'error'
			});
		});
	};

	removeFrom = (list, element) => {
		return list.filter((item, i) => {
			return item !== element;
		});
	};

	addTo = (list, element) => {
		list.push(element);
		return list;
	};

	selectAuthor = (e, author) => {
		let { availableAuthors, selectedAuthors } = this.state;
		availableAuthors = this.removeFrom(availableAuthors, author);
		selectedAuthors = this.addTo(selectedAuthors, author);
		this.setState({
			availableAuthors: availableAuthors,
			selectedAuthors: selectedAuthors
		});
	};

	deselectAuthor = (e, author) => {
		let { authors, availableAuthors, selectedAuthors } = this.state;
		selectedAuthors = this.removeFrom(selectedAuthors, author);
		if(authors.includes(author)) {
			availableAuthors = this.addTo(availableAuthors, author);
		}
		this.setState({
			availableAuthors: availableAuthors,
			selectedAuthors: selectedAuthors
		});
	};

	addAuthor = (e, state) => {
		const { autor } = state;
		let { authors, selectedAuthors } = this.state;
		if(!authors.includes(autor) && !selectedAuthors.includes(autor)) {
			selectedAuthors = this.addTo(selectedAuthors, autor);
		}
		this.setState({
			selectedAuthors: selectedAuthors
		});
	};

	handleSubmit = (e, state) =>{
		let data = {
			...state,
			autores: this.state.selectedAuthors.map((author, i) => {
				return {
					nombre: author
				}
			})
		};
		this.restResolver.addBook(data, (response) => {
			console.log(response);
			this.setState({
				shouldRedirect: true
			});
		});
	};

	render() {
		const { data, user } = this.props;
		const { handleSubmit, selectAuthor, deselectAuthor, addAuthor } = this;
		const { availableAuthors, selectedAuthors, gettingAuthors, shouldRedirect } = this.state;

		const emptyAuthors  = "No hay autores para agregar";
		const emptySelected = "Seleccione o ingrese los autores del libro";

		if( shouldRedirect ){
			return <Redirect push to="/"/>
		}

		return(
			<BasePage footer={true} navbar={true} data={data} user={user}>
				<main className="maincontent">
					<h1 className="underline">Agregar un libro</h1>
					<section className="pw-double-container">
						<section className="pw-form-container">
							<Form onSubmit={handleSubmit} className="pw-form" autocomplete="off">
								<Field>
									<Input id="title-input" name="nombre" placeholder="Titulo" className="pw-input" required={true} />
									<Label id="title-label" htmlFor="title-input" className="pw-label pwi pwi-book"/>
								</Field>
								<Field>
									<Input id="isbn-input" name="isbn" placeholder="ISBN" className="pw-input" required={true} />
									<Label id="isbn-label" htmlFor="isbn-input" className="pw-label pwi pwi-qrcode"/>
								</Field>
								<h6>Autores</h6>
								<List onClick={deselectAuthor} items={selectedAuthors} emptyMessage={emptySelected}/>
								<Button submit className="pw-submit wh-button active shadow">Agregar libro</Button>
							</Form>
						</section>
						<Form onSubmit={addAuthor} className="pw-form" autocomplete="off">
							<LoadSection loading={gettingAuthors === "pending"} error={gettingAuthors === "error"}>
								<h3>Autores en el sistema</h3>
								<List onClick={selectAuthor} items={availableAuthors} emptyMessage={emptyAuthors}/>
							</LoadSection>
							<Field>
								<Input id="autor-input" name="autor" placeholder="Autor" className="pw-input"/>
								<Label id="autor-label" htmlFor="autor-input" className="pw-label pwi pwi-users" />
							</Field>
							<Button submit className="pw-submit wh-button active shadow">Agregar y crear autor</Button>
						</Form>
					</section>
				</main>
			</BasePage>
		);
	}
}

export default Book;
