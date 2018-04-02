import React from 'react'
import { BasePage } from "..";
import { Field , Form } from "../../collections";
import { Input , Label , ComboBox , Button } from "../../components";

class Register extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	handleSubmit = (e,state) =>{
		console.log(state);
		console.log("Please implement add new user request");
	}

	render() {
		const { data, user } = this.props;
		const { handleSubmit } = this;

		const ops = [
			{value: "admin", label:"Administrador"},
			{value: "prestamista", label:"Prestamista"}
		];

		return(
			<BasePage footer={true} navbar={true} data={data} user={user}>
				<main className="maincontent">
					<h1 className="underline">Agregar un usuario</h1>
					<section className="pw-form-container">
						<Form onSubmit={handleSubmit} className="pw-form" autocomplete="off">
							<Field>
								<Input id="username-input" name="username" placeholder="Usuario" className="pw-input" required={true}/>
								<Label id="username-label" htmlFor="username-input" className="pw-label pwi pwi-user"/>
							</Field>
							<Field>
								<Input id="password-input" name="password" type="password" placeholder="Contraseña" className="pw-input" required={true}/>
								<Label id="password-label" htmlFor="password-input" className="pw-label pwi pwi-key"/>
							</Field>
							<Field>
								<ComboBox id="type-input" name="type" options={ops} className="pw-input" required={true}/>
								<Label id="type-label" htmlFor="type-input" name="password" className="pw-label pwi pwi-users"/>
							</Field>
							<Button submit className="pw-submit wh-button active shadow">Agregar usuario</Button>
						</Form>
					</section>
				</main>
			</BasePage>
		);
	}
}

export default Register;
