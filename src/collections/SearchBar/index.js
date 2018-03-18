import React from 'react'
import { Input , Label } from '../../components'
import { Field, Form } from '..'

class SearchBar extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	handleSubmit = (e,state) =>{
		//TODO: Change log for actual login process
		console.log(state);
		//end todo
	}

	render(){
		return(
			<Form id="search-form" onSubmit={this.handleSubmit} className="pw-form inline" autocomplete="off">
				<Field>
					<Input id="input" name="input" placeholder="Titulo del libro" className="pw-input" required={true}/>
					<Label id="input-label" htmlFor="input" name="username" className="pw-label pwi pwi-search"/>
				</Field>
            </Form>
        );
	}
}

export default SearchBar;
