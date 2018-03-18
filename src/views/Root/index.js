import React from 'react';
import { BookList , SearchBar } from '../../collections';
import { BasePage } from "..";

let testItems = [
    {
        "id":"12425436",
        "titulo":"Moby Dick",
        "autor":"Herman Melville",
        "isbn":"9781974305032"
    },
    {
        "id":"12425437",
        "titulo":"El Principito",
        "autor":" Antoine de Saint-Exupery",
        "isbn":"9788995317471"
    }
];

class Root extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	render(){
		const { data } = this.props;
		const { app_name } = data;

		return(
            <BasePage footer={true} navbar={false} >
                <header className="pw-header">
                    <h1 className="wh-title double-line">{app_name}</h1>
                </header>
                <main className="maincontent">
                    <SearchBar />
                    <BookList books={testItems} showButtons={true}/>
                </main>
            </BasePage>
        );
	}
}

export default Root;
