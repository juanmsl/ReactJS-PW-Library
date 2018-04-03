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
	};

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
	};

	onDeleteBook = (e, state) => {
		this.restResolver.deleteBook(state, (response) => {
			console.log(response);
		});
	};

	render() {
		const { data, user } = this.props;
		const { filteredBooks, gettingBooks, shouldRedirect, to } = this.state;
		const { tipo } = user;
		const { handleBookClick , handleFilter, onDeleteBook } = this;

		if( shouldRedirect ){
			return <Redirect push to={`book/${to}`}/>
		}
		return(
			<BasePage footer={true} navbar={true} data={data} user={user}>
				<main className="maincontent">
					<section className="pw-button-container">
						{ tipo === "Administrador" && <Link to="/book" className="pw-button wh-button success shadow">Agregar un libro</Link> }
						{ tipo === "Administrador" && <Link to="/register" className="pw-button wh-button active shadow">Agregar un usuario</Link> }
						{ tipo === "Prestamista" && <Link to="/borrow" className="pw-button wh-button success shadow">Relizar un prestamo</Link> }
						{ tipo === "Prestamista" && <Link to="/return" className="pw-button wh-button active shadow">Relizar una devolución</Link> }
					</section>
					<SearchBar typeUser={tipo} onChange={handleFilter} />
					<LoadSection loading={gettingBooks === 'pending'} error={gettingBooks === 'error'}>
						<BookList onBookClick={handleBookClick} onDeleteBook={onDeleteBook} books={filteredBooks} showButtons={tipo === "Administrador"}/>
					</LoadSection>
				</main>
			</BasePage>
		);
	}
}

export default Home;
