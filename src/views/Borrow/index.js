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
			borrowList: [],
			books: [],
			filteredBooks: [],
			filter: "",
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

	addToBorrowList = () =>{

	}

	removeFromBorrowList = () =>{

	}

	handleBorrow = () =>{
		console.log("Please implement handleBorrow");
	}

	handleChange = (obj) =>{
		this.setState({
			...this.state,
			filter: obj.input
		})
	}

	render() {
		const { data, user } = this.props;
		const { borrowList , books , gettingBooks , filter } = this.state;
		const {
			handleBorrow ,
			addToBorrowList ,
			removeFromBorrowList ,
			handleChange } = this;

		return(
			<BasePage footer={true} navbar={true} data={data} user={user}>
				<SearchBar onChange={handleChange}/>
				<aside>
					<BookList books={borrowList} onBookClick={removeFromBorrowList}/>
				</aside>
				<LoadSection loading={gettingBooks === 'pending'} error={gettingBooks === 'error'}>
					<BookList books={books} onBookClick={addToBorrowList}/>
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
