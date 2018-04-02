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

	render(){
		const { data, user } = this.props;
		const { books, gettingBooks, shouldRedirect, to } = this.state;
		const { app_name } = data;
		const { handleBookClick } = this;

		if( shouldRedirect ){
			return <Redirect push to={`book/${to}`}/>
		}
		return(
            <BasePage footer={true} navbar={true} data={data} user={user}>
                <header className="pw-header">
                    <h1 className="wh-title double-line">{app_name}</h1>
                </header>
                <main className="maincontent">
                    <SearchBar showAddButton={false} />
					<LoadSection loading={gettingBooks === 'pending'} error={gettingBooks === 'error'}>
						<BookList onBookClick={handleBookClick} books={books} showButtons={false}/>
					</LoadSection>
                </main>
            </BasePage>
        );
	}
}

export default Root;
