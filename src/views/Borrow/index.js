import React from 'react'
import { BasePage } from "..";
import { SearchBar } from "../../collections";
import { Button , Input , Label , LoadSection } from '../../components';
import { BookList , Form } from '../../collections';
import { RESTResolver } from "../../resources/RESTResolver";
import { Field } from "../../collections";

class Borrow extends React.Component{
	constructor(props){
		super(props);
		this.state={
			borrowIDs: [],
			borrowList: [],
			books: [],
			filteredBooks: [],
			gettingBooks: 'pending'
		};
		this.restResolver = new RESTResolver();
	}

	componentWillMount = () =>{
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
	};

	addToBorrowList = (e,obj) =>{
		const { borrowIDs , books } = this.state;
		const newList = borrowIDs;
		if( !newList.includes(obj.id) )
			newList.push(obj.id);
		const newBorrowList = newList.map((id) => {
			return books.find((book) =>{ return book.id === id });
		});
		this.setState({
			borrowIDs: newList,
			borrowList: newBorrowList,
			filteredBooks: this.state.books.filter((book) => {
				const { id , disponible} = book;
				const { borrowIDs } = this.state;
				return ( !borrowIDs.includes(id) && disponible)
			})
		})
	};

	removeFromBorrowList = (e,obj) =>{
		const { id } = obj;
		const { borrowIDs , books } = this.state;
		const newBorrowIds = borrowIDs;
		newBorrowIds.splice(borrowIDs.indexOf(id),1);
		const newBorrowList = newBorrowIds.map((id) => {
			return books.find((book) =>{ return book.id === id });
		});
		this.setState({
			borrowIDs: newBorrowIds,
			borrowList: newBorrowList,
			filteredBooks: this.state.books.filter((book) => {
				const { id , disponible} = book;
				const { borrowIDs } = this.state;
				return ( !borrowIDs.includes(id) && disponible)
			})
		})
	};

	handleBorrow = () =>{
		console.log("Please implement handleBorrow");
	};

	handleFilter = (obj) =>{
		this.setState({
			...this.state,
			filteredBooks: this.state.books.filter((book) => {
				const { nombre , id , disponible } = book;
				const { borrowIDs } = this.state;
				let name = nombre.toLowerCase();
				let filter = obj.input.toLowerCase();
				return (name.includes(filter) && !borrowIDs.includes(id) && disponible)
			})
		})
	};

	render() {
		const { data, user } = this.props;
		const { borrowList , filteredBooks , gettingBooks } = this.state;
		const {
			handleBorrow ,
			addToBorrowList ,
			removeFromBorrowList ,
			handleFilter } = this;

		return(
			<BasePage footer={true} navbar={true} data={data} user={user}>
				<main className="maincontent pw-borrow">
					<section className="pw-borrow-content">
						<section className="pw-borrow-section">
							<h1 className="underline">Libros a prestar</h1>
							<Form className="pw-form" autocomplete="off">
								<Field className="pw-field">
									<Input id="document-input" name="documento" placeholder="Documento del solicitante" className="pw-input" required={true}/>
									<Label id="document-label" htmlFor="document-input" className="pw-label pwi pwi-user" />
								</Field>
							</Form>
							<BookList books={borrowList} onBookClick={removeFromBorrowList}/>
						</section>
						<section>
							<h1 className="underline">Libros disponibles</h1>
							<SearchBar onChange={handleFilter}/>
							<LoadSection loading={gettingBooks === 'pending'} error={gettingBooks === 'error'}>
								<BookList books={filteredBooks} onBookClick={addToBorrowList}/>
							</LoadSection>
						</section>
					</section>
					<section className="pw-borrow-footer">
						<Button submit onClick={handleBorrow}  className="pw-button wh-button active shadow">Realizar prestamo</Button>
					</section>
				</main>
			</BasePage>
		);
	}
}

export default Borrow;
