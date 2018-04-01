import React from 'react'
import { BookList , SearchBar } from '../../collections';
import { LoadSection } from "../../components";
import { BasePage } from "..";
import { RESTResolver } from "../../resources/RESTResolver";

class Home extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			books: [],
			gettingBooks: 'pending'
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
		console.log(obj);
	}

	render() {
		const { data, user } = this.props;
		const { books, gettingBooks } = this.state;
		const { type , handleBookClick } = user;

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
