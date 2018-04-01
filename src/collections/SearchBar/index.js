import React from 'react'
import { Input , Label } from '../../components'
import { Field, Form } from '..'
import { Link } from 'react-router-dom'

class SearchBar extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	handleChange = (e,obj) => {
		if( this.props.onChange ){
			this.props.onChange(e,obj);
		}
	};

	render(){
		const { typeUser="prestamista" } = this.props;
		const { handleChange } = this;

		return(
			<Form onChange={handleChange} id="search-form" className="pw-form" autocomplete="off">
				<section className="pw-field">
					{ typeUser === "admin" && <Link to="/book" className="pw-button wh-button success shadow">Agregar un libro</Link> }
					{ typeUser === "admin" && <Link to="/register" className="pw-button wh-button active shadow">Agregar un usuario</Link> }
					{ typeUser === "prestamista" && <Link to="/borrow" className="pw-button wh-button active shadow">Relizar un prestamo</Link> }
				</section>
				<Field>
					<Input id="input" name="input" placeholder="Titulo del libro" className="pw-input" required={true}/>
					<Label id="input-label" htmlFor="input" name="username" className="pw-label pwi pwi-search"/>
				</Field>
			</Form>
		);
	}
}

export default SearchBar;
