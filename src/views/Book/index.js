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
			gettingAuthors: "pending"
		};
		this.restResolver = new RESTResolver();
	};

	componentWillMount = () => {
		this.restResolver.getAuthors((response) => {
			this.setState({
				autores: response,
				available: response.map((autor) => {return autor.nombre}),
				gettingAuthors: 'success'
			});
		}, (response) => {
			let autores = [
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
			];
			this.setState({
				autores: autores,
				available: autores.map((autor) => {return autor.nombre}),
				gettingAuthors: 'error'
			});
		});
	};

	handleSubmit = (e, state) =>{
		const { newAuthors , selected } = this.state;
		const selectedAuths = newAuthors.length > 0 ? selected.concat(newAuthors) : selected;
		const values = {
			...state,
			autores: selectedAuths
		};
		console.log(values);
		console.log("Please implement submit method");
	};

	getFilteredAvailable = (ids) =>{
		const { autores } = this.state;
		const aval = autores.filter((autor) => {
			return !ids.includes(autor.id)
		});
		return aval.map((item) => {return item.nombre})
	};

	updateLists = (selectedIDs, newAuthors) =>{
		const { autores } = this.state;
		let newSelected = selectedIDs.map((id) => {
			return autores.find((autor) => { return autor.id === id })
		}).map((a) => {return a.nombre});
		this.setState({
			selectedIDs: selectedIDs,
			selected: newSelected,
			available: this.getFilteredAvailable(selectedIDs),
			newAuthors: newAuthors
		})
	};

	addAuthor = (e,autor) =>{
		const { index } = autor;
		const { selectedIDs , available , autores , newAuthors } = this.state;
		const author = autores.find((a) => { return a.nombre === available[index] });
		selectedIDs.push( author.id );
		this.updateLists(selectedIDs,newAuthors);
	};

	removeAuthor = (e,autor) =>{
		const { index } = autor;
		const { autores , selectedIDs , selected , newAuthors } = this.state;
		const auth = selected[index];
		const found = autores.find((autor) => {
			return autor.nombre === auth;
		});
		if( found === undefined ){
			newAuthors.splice(selectedIDs.indexOf(auth),1);
		}else{
			selectedIDs.splice(selectedIDs.indexOf(found.id),1);
		}
		this.updateLists(selectedIDs,newAuthors)
	};

	handleNewAuthor = (e,state) =>{
		let { newAuthor = "" } = state;
		newAuthor = newAuthor.trim();
		if( newAuthor !== "" ){
			const { autores , selectedIDs } = this.state;
			let found = autores.find((autor) => {return autor.nombre === newAuthor });
			if( found === undefined ){
				const { newAuthors } = this.state;
				if( !newAuthors.includes(newAuthor) ){
					newAuthors.push(newAuthor);
					this.updateLists(selectedIDs, newAuthors);
				}
			}
		}
	};

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
						<Label>Autores</Label>
						<List onClick={addAuthor} items={available} emptyMessage={emptyAuthors}/>
						<Label>Selected</Label>
						<List onClick={removeAuthor} items={selectedAuths} emptyMessage={emptySelected}/>
						<Form onSubmit={handleNewAuthor}>
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
