import React from 'react'
import { Link } from 'react-router-dom';
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
					<section className="pw-button-container">
						{ type === "admin" && <Link to="/book" className="pw-button wh-button success shadow">Agregar un libro</Link> }
						{ type === "admin" && <Link to="/register" className="pw-button wh-button active shadow">Agregar un usuario</Link> }
						{ type === "prestamista" && <Link to="/borrow" className="pw-button wh-button active shadow">Relizar un prestamo</Link> }
					</section>
					<SearchBar typeUser={type} />
					<LoadSection loading={gettingBooks === 'pending'} error={gettingBooks === 'error'}>
						<BookList onBookClick={handleBookClick} books={books} showButtons={type === "admin"}/>
					</LoadSection>
				</main>
			</BasePage>
		);
	}
}

export default Home;
