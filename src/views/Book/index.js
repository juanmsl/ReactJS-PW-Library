import React from 'react'
import { BasePage } from "..";
import { Button , Input , Label } from '../../components';
import { Field , Form , List } from '../../collections';
import { RESTResolver } from "../../resources/RESTResolver";


class Book extends React.Component{
	constructor(props){
		super(props);
		this.state={
			authors: [],
			availableAuthors: [],
			selectedAuthors: [],
			gettingAuthors: "pending"
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
			let authors = [
				{
					id: 1,
					nombre: "Juan"
				},
				{
					id: 2,
					nombre: "Luis"
				},
				{
					id: 3,
					nombre: "Carlos"
				}
			].map((author, i) => { return author.nombre });
			this.setState({
				authors: authors,
				availableAuthors: authors,
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
			autores: this.state.selectedAuthors
		};
		console.log(data);
		console.log("Please implement submit method");
	};

	render() {
		const { data, user } = this.props;
		const { handleSubmit, selectAuthor, deselectAuthor, addAuthor } = this;
		const { availableAuthors, selectedAuthors } = this.state;

		const emptyAuthors  = "-- No hay autores que mostrar --";
		const emptySelected = "-- No hay autores seleccionados --";

		return(
			<BasePage footer={true} navbar={true} data={data} user={user}>
				<section className="pw-form-container">
					<Form onSubmit={handleSubmit} className="pw-form" autocomplete="off">
						<Field>
							<Input id="title-input" name="title" placeholder="Titulo" className="pw-input" required={true} />
							<Label id="title-label" htmlFor="title-input" className="pw-label pwi pwi-book"/>
						</Field>
						<Field>
							<Input id="isbn-input" name="isbn" placeholder="ISBN" className="pw-input" required={true} />
							<Label id="isbn-label" htmlFor="isbn-input" className="pw-label pwi pwi-qrcode"/>
						</Field>
						<section>
							<h3>Autores</h3>
						</section>
						<List onClick={selectAuthor} items={availableAuthors} emptyMessage={emptyAuthors}/>
						<Label>Selected</Label>
						<List onClick={deselectAuthor} items={selectedAuthors} emptyMessage={emptySelected}/>
						<Form onSubmit={addAuthor}>
							<Field>
								<Input id="autor-input" name="autor" placeholder="Autor" className="pw-input"/>
								<Label id="autor-label" htmlFor="autor-input" className="pw-label pwi pwi-users" />
							</Field>
							<Button submit>Add</Button>
						</Form>
						<Button submit className="pw-submit wh-button active shadow">Agregar libro</Button>
					</Form>
				</section>
			</BasePage>
		);
	}
}

export default Book;
