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
		}
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
	}

	handleSubmit = (e,state) =>{
		console.log(state);
		console.log("Please implement me handleSubmit");
	}

	render(){
		const { data, user } = this.props;
		const { handleSubmit } = this;
		const { gettingBooks , books } = this.state;

		const bookList = books.map((book) => {
			return {value: book , label: book.nombre }
		})

		return(
			<BasePage footer={true} navbar={true} data={data} user={user}>
				<LoadSection loading={gettingBooks === 'pending'} error={gettingBooks === 'error'}>
					<Form onSubmit={handleSubmit}>
						<Field>
							<ComboBox name="libro" options={bookList} emptyMessage="-- No hay libros que retornar --"/>
							<Label htmlFor="libro" >Libro</Label>
						</Field>
						<Field>
							<Input name="documento" />
							<Label htmlFor="documento" >Documento</Label>
						</Field>
						<Button submit>Regresar</Button>
					</Form>
				</LoadSection>
			</BasePage>
		);
	}
}

export default Return;
