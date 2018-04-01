import React from 'react'
import { Input , Label } from '../../components'
import { Field, Form } from '..'

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
		const { handleChange } = this;

		return(
			<Form onChange={handleChange} id="search-form" className="pw-form" autocomplete="off">
				<Field>
					<Input id="input" name="input" placeholder="Titulo del libro" className="pw-input" required={true}/>
					<Label id="input-label" htmlFor="input" name="username" className="pw-label pwi pwi-search"/>
				</Field>
			</Form>
		);
	}
}

export default SearchBar;
