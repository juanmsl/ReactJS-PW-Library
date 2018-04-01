import React from 'react'
import { BasePage } from "..";
import { BookList , SearchBar } from '../../collections';
import { LoadSection } from "../../components";
import { RESTResolver } from "../../resources/RESTResolver";
import { Redirect } from 'react-router-dom';

class Home extends React.Component{
	constructor(props){
		super(props);
		this.state = {
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

	render() {
		const { data, user } = this.props;
		const { books, gettingBooks, shouldRedirect, to } = this.state;
		const { type } = user;
		const { handleBookClick } = this;

		if( shouldRedirect ){
			return <Redirect push to={`book/${to}`}/>
		}
		return(
			<BasePage footer={true} navbar={true} data={data} user={user}>
				<main className="maincontent">
					<SearchBar showAddButton={type === "admin"} />
					<LoadSection loading={gettingBooks === 'pending'} error={gettingBooks === 'error'}>
						<BookList onBookClick={handleBookClick} books={books} showButtons={type === "admin"}/>
					</LoadSection>
				</main>
			</BasePage>
		);
	}
}

export default Home;
