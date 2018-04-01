import React from 'react'
import { BasePage } from "..";
import { Button , Input , Label } from '../../components';
import { Field , Form , List } from '../../collections';
import { RESTResolver } from "../../resources/RESTResolver";


class Book extends React.Component{
	constructor(props){
		super(props);
		this.state={
			autores: [],
			available: [],
			selectedIDs: [],
			selected: [],
			newAuthors: [],
			gettingBooks: "pending"
		}
		this.restResolver = new RESTResolver();
	};

	getAuthors = (books) =>{
		const authors = [];
		const authIDs = [];
		books.forEach((book)=>{
			const { autores } = book;
			autores.forEach((autor)=>{
				if( !authIDs.includes(autor.id) ){
					authors.push(autor);
					authIDs.push(autor.id);
				}
			})
		})
		return authors;
	}

	componentWillMount = () => {
		this.restResolver.getBooks((response) => {
			this.setState({
				autores: this.getAuthors(response),
				available: this.getAuthors(response).map((autor) => {return autor.nombre}),
				gettingBooks: 'success'
			});
		}, (response) => {
			this.setState({
				gettingBooks: 'error'
			});
		});
	}

	handleSubmit = (e,state) =>{
		const { newAuthors , selected } = this.state;
		const selectedAuths = newAuthors.length > 0 ? selected.concat(newAuthors) : selected;
		const values = {
			...state,
			autores: selectedAuths
		}
		console.log(values);
		console.log("Please implement submit method");
	};

	getFilteredAvailable = (ids) =>{
		const { autores } = this.state;
		const aval = autores.filter((autor) => {
			return !ids.includes(autor.id)
		})
		return aval.map((item) => {return item.nombre})
	}

	updateLists = (selectedIDs,newAuthors) =>{
		const { autores } = this.state;
		let newSelected = selectedIDs.map((id) => {
			return autores.find((autor) => { return autor.id === id })
		}).map((a) => {return a.nombre})
		this.setState({
			selectedIDs: selectedIDs,
			selected: newSelected,
			available: this.getFilteredAvailable(selectedIDs),
			newAuthors: newAuthors
		})
	}

	addAuthor = (e,autor) =>{
		const { index } = autor;
		const { selectedIDs , available , autores , newAuthors } = this.state;
		const author = autores.find((a) => { return a.nombre === available[index] })
		selectedIDs.push( author.id );
		this.updateLists(selectedIDs,newAuthors);
	}

	removeAuthor = (e,autor) =>{
		const { index } = autor;
		const { autores , selectedIDs , selected , newAuthors } = this.state;
		const auth = selected[index];
		const found = autores.find((autor) => {
			return autor.nombre === auth;
		})
		if( found === undefined ){
			newAuthors.splice(selectedIDs.indexOf(auth),1);
		}else{
			selectedIDs.splice(selectedIDs.indexOf(found.id),1);
		}
		this.updateLists(selectedIDs,newAuthors)
	}

	handleNewAuthor = (e,state) =>{
		let { newAuthor="" } = state;
		newAuthor = newAuthor.trim();
		if( newAuthor !== "" ){
			const { autores , selectedIDs } = this.state;
			let found = autores.find((autor) => {return autor.nombre === newAuthor });
			if( found === undefined ){
				const { newAuthors } = this.state;
				if( !newAuthors.includes(newAuthor) ){
					newAuthors.push(newAuthor);
					this.updateLists(selectedIDs,newAuthors);
				}
			}
		}
	}

	render() {
		const { data, user } = this.props;
		const { handleSubmit, removeAuthor, addAuthor, handleNewAuthor } = this;
		const { available , selected , newAuthors } = this.state;

		const selectedAuths = newAuthors.length > 0 ? selected.concat(newAuthors) : selected;
		const emptyAuthors  = "-- No hay autores que mostrar --";
		const emptySelected = "-- No hay autores seleccionados --";


		return(
			<BasePage footer={true} navbar={true} data={data} user={user}>
				<section className="pw-form-container">
					<Form onSubmit={handleSubmit} className="pw-form" autocomplete="off">
						<Field>
							<Input id="title-input" name="title" placeholder="Titulo" className="pw-input"  required={true} />
							<Label id="title-label" htmlFor="title-input" className="pw-label pwi pwi-user"/>
						</Field>
						<Field>
							<Input id="isbn-input" name="isbn" placeholder="ISBN" className="pw-input"  required={true} />
							<Label id="isbn-label" htmlFor="isbn-input" className="pw-label pwi pwi-user"/>
						</Field>
						<Label>Autores</Label>
						<List onClick={addAuthor} items={available} emptyMessage={emptyAuthors}/>
						<Label>Selected</Label>
						<List onClick={removeAuthor} items={selectedAuths} emptyMessage={emptySelected}/>
						<Form onSubmit={handleNewAuthor}>
							<Field>
								<Input name="newAuthor"/>
								<Label>Nuevo</Label>
								<Button submit>Add</Button>
							</Field>
						</Form>
						<Button submit className="pw-submit wh-button active shadow">Agregar libro</Button>
					</Form>
				</section>
			</BasePage>
		);
	}
}

export default Book;
