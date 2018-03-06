import React from 'react'
import { BookList , SearchBar } from '../../collections'

var testItems = {
    "0":{
        "id":"12425436",
        "titulo":"Moby Dick",
        "autor":"Herman Melville",
        "isbn":"9781974305032"
    },
    "1":{
        "id":"12425437",
        "titulo":"El Principito",
        "autor":" Antoine de Saint-Exupery",
        "isbn":"9788995317471"
    }
}

class Root extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	render(){
		return(
            <React.Fragment>
                <header>
                    Blah blah libros
                </header>
                <main>
                    <SearchBar />
                    <BookList json={testItems} />
                </main>
            </React.Fragment>
        );
	}
}

export default Root;
