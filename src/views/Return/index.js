import React from 'react'
import { BasePage } from '../';
import { Form , Field } from '../../collections';
import { Button , ComboBox , Input , Label , LoadSection } from '../../components';
import { RESTResolver } from "../../resources/RESTResolver";

class Return extends React.Component{
	constructor(props){
		super(props);
		this.state={
			books: [],
			gettingBooks: "pending"
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
		console.log(state);
		console.log("Please implement me handleSubmit");
	};

	render(){
		const { data, user } = this.props;
		const { handleSubmit } = this;
		const { gettingBooks , books } = this.state;

		const bookList = books.map((book) => {
			return {value: book , label: book.nombre }
		});

		return(
			<BasePage footer={true} navbar={true} data={data} user={user}>
				<main className="maincontent">
					<h1 className="underline">Devolver un libro</h1>
					<section className="pw-form-container">
						<Form onSubmit={handleSubmit} className="pw-form" autocomplete="off">
							<LoadSection loading={gettingBooks === 'pending'} error={gettingBooks === 'error'}>
								<Field>
									<ComboBox id="book-input" name="book" options={bookList} className="pw-input" required={true} emptyMessage="-- No hay libros que retornar --"/>
									<Label id="book-label" htmlFor="book-input" className="pw-label pwi pwi-user"/>
								</Field>
							</LoadSection>
							<Field>
								<Input id="document-input" name="document" placeholder="Usuario" className="pw-input" required={true}/>
								<Label id="document-label" htmlFor="document-input" className="pw-label pwi pwi-user"/>
							</Field>
							<Button submit className="pw-button wh-button active shadow">Registrar devolución</Button>
						</Form>
					</section>
				</main>
			</BasePage>
		);
	}
}

export default Return;
