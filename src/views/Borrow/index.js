import React from 'react'
import { BasePage } from "..";
import { SearchBar } from "../../collections";
import { Button , Input , Label , LoadSection } from '../../components';
import { BookList , Form } from '../../collections';
import { RESTResolver } from "../../resources/RESTResolver";

class Borrow extends React.Component{
	constructor(props){
		super(props);
		this.state={
			borrowIDs: [],
			borrowList: [],
			books: [],
			filteredBooks: [],
			gettingBooks: 'pending'
		}
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
	}

	addToBorrowList = (e,obj) =>{
		const { borrowIDs , books } = this.state;
		const newList = borrowIDs;
		if( !newList.includes(obj.id) )
			newList.push(obj.id);
		const newBorrowList = newList.map((id) => {
			return books.find((book) =>{ return book.id === id });
		})
		this.setState({
			borrowIDs: newList,
			borrowList: newBorrowList,
			filteredBooks: this.state.books.filter((book) => {
				const { id , disponible} = book;
				const { borrowIDs } = this.state;
				return ( !borrowIDs.includes(id) && disponible)
			})
		})
	}

	removeFromBorrowList = (e,obj) =>{
		const { id } = obj;
		const { borrowIDs , books } = this.state;
		console.log(borrowIDs);
		const newBorrowIds = borrowIDs;
		newBorrowIds.splice(borrowIDs.indexOf(id),1);
		console.log(newBorrowIds);
		const newBorrowList = newBorrowIds.map((id) => {
			return books.find((book) =>{ return book.id === id });
		})
		this.setState({
			borrowIDs: newBorrowIds,
			borrowList: newBorrowList,
			filteredBooks: this.state.books.filter((book) => {
				const { id , disponible} = book;
				const { borrowIDs } = this.state;
				return ( !borrowIDs.includes(id) && disponible)
			})
		})
	}

	handleBorrow = () =>{
		console.log("Please implement handleBorrow");
	}

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
	}

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
				<SearchBar onChange={handleFilter}/>
				<aside>
					<BookList books={borrowList} onBookClick={removeFromBorrowList}/>
				</aside>
				<LoadSection loading={gettingBooks === 'pending'} error={gettingBooks === 'error'}>
					<BookList books={filteredBooks} onBookClick={addToBorrowList}/>
				</LoadSection>
				<Form onSubmit={handleBorrow}>
					<Input name="documento" required={true}/>
					<Label htmlFor="documento">ID</Label>
					<Button submit>Prestar</Button>
				</Form>
			</BasePage>
		);
	}
}

export default Borrow;
