import React from 'react'
import { Input , Button } from '../../components'

class SearchBar extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	render(){
        const { className } = this.props
		return(
            <section className={className}>
                <Input></Input>
                <Button />
            </section>
        );
	}
}

export default SearchBar;
