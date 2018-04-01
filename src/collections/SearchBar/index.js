import React from 'react'
import { Input , Label } from '../../components'
import { Field, Form } from '..'
import { Link } from 'react-router-dom'

class SearchBar extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	render(){
		const { showAddButton } = this.props;

		return(
			<Form id="search-form" className="pw-form inline" autocomplete="off">
				{ showAddButton && <Link to="/book" className="pw-button wh-button success shadow">Agregar un libro</Link> }
				{ showAddButton && <Link to="/register" className="pw-button wh-button active shadow">Agregar un usuario</Link> }
				<Field>
					<Input id="input" name="input" placeholder="Titulo del libro" className="pw-input" required={true}/>
					<Label id="input-label" htmlFor="input" name="username" className="pw-label pwi pwi-search"/>
				</Field>
			</Form>
		);
	}
}

export default SearchBar;
