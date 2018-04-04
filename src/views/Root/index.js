import React from 'react';
import { BookList , SearchBar } from '../../collections';
import { BasePage } from "..";
import { LoadSection } from "../../components";
import { RESTResolver } from "../../resources/RESTResolver";
import { Redirect } from "react-router-dom";

class Root extends React.Component{
	constructor(props){
		super(props);
		this.state={
			books: [],
			filteredBooks: [],
			gettingBooks: 'pending',
			shouldRedirect: false,
			to: null
		};
		this.restResolver = new RESTResolver();
	}

	componentWillMount() {
		this.restResolver.getBooks((response) => {
			this.setState({
				books: response,
				filteredBooks: response,
				gettingBooks: 'success'
			});
		}, (response) => {
			this.setState({
				gettingBooks: 'error'
			});
		});
	}

	handleBookClick = (e,obj) =>{
		this.setState({
			...this.state,
			shouldRedirect: true,
			to: obj.id
		})
	}

	handleFilter = (obj) => {
		this.setState({
			...this.state,
			filteredBooks: this.state.books.filter((book) => {
				const { nombre } = book;
				let name = nombre.toLowerCase();
				let filter = obj.input.toLowerCase();
				return (name.includes(filter) )
			})
		})
	}

	render(){
		const { data, user } = this.props;
		const { filteredBooks, gettingBooks, shouldRedirect, to } = this.state;
		const { app_name } = data;
		const { handleBookClick , handleFilter } = this;

		if( shouldRedirect ){
			return <Redirect push to={`book/${to}`}/>
		}
		return(
            <BasePage footer={true} navbar={true} data={data} user={user}>
                <header className="pw-header">
                    <h1 className="wh-title double-line">{app_name}</h1>
                </header>
                <main className="maincontent">
                    <SearchBar showAddButton={false} onChange={handleFilter}/>
					<LoadSection loading={gettingBooks === 'pending'} error={gettingBooks === 'error'}>
						<BookList onBookClick={handleBookClick} books={filteredBooks} showButtons={false}/>
					</LoadSection>
                </main>
            </BasePage>
        );
	}
}

export default Root;
