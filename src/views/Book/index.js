import React from 'react'
import { BasePage } from "..";
import { Button , Input , Label } from '../../components';
import { Field , Form } from '../../collections';

class Book extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	};

	handleSubmit = (e,state) =>{
		console.log(state);
		console.log("Please implement submit method");
	};

	render() {
		const { data, user } = this.props;
		const { handleSubmit , handleCancel } = this;

		return(
			<BasePage footer={true} navbar={true} data={data} user={user}>
				<section className="pw-form-container">
					<Form onSubmit={handleSubmit} className="pw-form" autocomplete="off">
						<Field>
							<Input id="title-input" name="title" placeholder="Titulo" className="pw-input"  required={true} />
							<Label id="title-label" htmlFor="title-input" className="pw-label pwi pwi-user"/>
						</Field>
						<Field>
							<Input id="isbn-input" name="isbn" placeholder="ISBN" className="pw-input"  required={true} />
							<Label id="isbn-label" htmlFor="isbn-input" className="pw-label pwi pwi-user"/>
						</Field>
						<Field>
							<Input name="autores" required={true}/>
							<Label>Autores</Label>
						</Field>
						<Button submit className="pw-submit wh-button active shadow">Agregar libro</Button>
					</Form>
				</section>
			</BasePage>
		);
	}
}

export default Book;
