import React from 'react'
import { BasePage } from "..";
import { Button , Input , Label } from '../../components';
import { Field , Form } from '../../collections';

class Book extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	handleCancel = () =>{
		console.log("Please implement cancel method");
	}

	handleSubmit = (e,state) =>{
		console.log(state);
		console.log("Please implement submit method");
	}

	render() {
		const { data, user } = this.props;
		const { handleSubmit , handleCancel } = this;

		return(
			<BasePage footer={true} navbar={true} data={data} user={user}>
				<Form onSubmit={handleSubmit}>
					<Field>
						<Input name="titulo" required={true} />
						<Label>Titulo</Label>
					</Field>
					<Field>
						<Input name="isbn" required={true} />
						<Label>ISBN</Label>
					</Field>
					<Field>
						<Input name="autores" required={true}/>
						<Label>Autores</Label>
					</Field>
					<Field>
						<Button submit >Aceptar</Button>
						<Button onClick={handleCancel}>Cancelar</Button>
					</Field>
				</Form>
			</BasePage>
		);
	}
}

export default Book;
