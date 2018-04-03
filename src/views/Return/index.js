import React from 'react'
import { BasePage } from '../';
import { Form , Field } from '../../collections';
import { Button , ComboBox , Input , Label , LoadSection } from '../../components';
import { RESTResolver } from "../../resources/RESTResolver";
import { Redirect } from 'react-router-dom';

class Return extends React.Component{
	constructor(props){
		super(props);
		this.state={
			books: [],
			gettingBooks: "pending",
			shouldRedirect: false
		};
		this.restResolver = new RESTResolver();
	}

	componentWillMount = () => {
		this.restResolver.getBooks((response) => {
			this.setState({
				books: response.filter((book) => { return !book.disponible }),
				gettingBooks: 'success'
			});
		}, (response) => {
			this.setState({
				gettingBooks: 'error'
			});
		});
	};

	handleSubmit = (e,state) =>{
		const data = {
			libroId: state.book.id,
			responsable: state.document
		};
		this.restResolver.returnBook(data, (response) => {
			console.log(response);
			this.setState({
				shouldRedirect: true
			});
		});
	};

	render(){
		const { data, user } = this.props;
		const { handleSubmit } = this;
		const { gettingBooks , books, shouldRedirect } = this.state;

		const bookList = books.map((book) => {
			return {value: book , label: book.nombre }
		});

		if( shouldRedirect ){
			return <Redirect push to="/"/>
		}

		return(
			<BasePage footer={true} navbar={true} data={data} user={user}>
				<main className="maincontent">
					<h1 className="underline">Devolver un libro</h1>
					<section className="pw-form-container">
						<LoadSection loading={gettingBooks === 'pending'} error={gettingBooks === 'error'}>
							<Form onSubmit={handleSubmit} className="pw-form" autocomplete="off">
								<Field>
									<ComboBox id="book-input" name="book" options={bookList} className="pw-input" required={true} emptyMessage="-- No hay libros que retornar --"/>
									<Label id="book-label" htmlFor="book-input" className="pw-label pwi pwi-user"/>
								</Field>
								<Field>
									<Input id="document-input" name="document" placeholder="Usuario" className="pw-input" required={true}/>
									<Label id="document-label" htmlFor="document-input" className="pw-label pwi pwi-user"/>
								</Field>
								<Button submit className="pw-button wh-button active shadow">Registrar devolución</Button>
							</Form>
						</LoadSection>
					</section>
				</main>
			</BasePage>
		);
	}
}

export default Return;
