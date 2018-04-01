import React from 'react';
import { BookList , SearchBar } from '../../collections';
import { BasePage } from "..";
import { LoadSection } from "../../components";
import { RESTResolver } from "../../resources/RESTResolver";

class Root extends React.Component{
	constructor(props){
		super(props);
		this.state={
			books: [],
			gettingBooks: 'pending'
		};
		this.restResolver = new RESTResolver();
	}

	componentDidMount() {
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

	render(){
		const { data, user } = this.props;
		const { books, gettingBooks } = this.state;
		const { app_name } = data;

		return(
            <BasePage footer={true} navbar={true} data={data} user={user}>
                <header className="pw-header">
                    <h1 className="wh-title double-line">{app_name}</h1>
                </header>
                <main className="maincontent">
                    <SearchBar showAddButton={false} />
					<LoadSection loading={gettingBooks === 'pending'} error={gettingBooks === 'error'}>
						<BookList books={books} showButtons={false}/>
					</LoadSection>
                </main>
            </BasePage>
        );
	}
}

export default Root;
