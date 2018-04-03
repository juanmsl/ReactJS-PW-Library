import React from 'react'
import { BasePage } from "..";
import { Field , Form } from "../../collections";
import { Input , Label , ComboBox , Button } from "../../components";
import {RESTResolver} from "../../resources/RESTResolver";

class Register extends React.Component{
	constructor(props){
		super(props);
		this.state={}
		this.restresolver = new RESTResolver();
	}

	handleSubmit = (e,state) =>{
		this.restresolver.addUser(state, (response) => {
			console.log(response);
		});
	};

	render() {
		const { data, user } = this.props;
		const { handleSubmit } = this;

		const ops = [
			{value: "Administrador", label:"Administrador"},
			{value: "Prestamista", label:"Prestamista"}
		];

		return(
			<BasePage footer={true} navbar={true} data={data} user={user}>
				<main className="maincontent">
					<h1 className="underline">Agregar un usuario</h1>
					<section className="pw-form-container">
						<Form onSubmit={handleSubmit} className="pw-form" autocomplete="off">
							<Field>
								<Input id="nombres-input" name="nombres" placeholder="Nombres" className="pw-input" required={true}/>
								<Label id="nombres-label" htmlFor="nombres-input" className="pw-label pwi pwi-user"/>
							</Field>
							<Field>
								<Input id="apellidos-input" name="apellidos" placeholder="Apellidos" className="pw-input" required={true}/>
								<Label id="apellidos-label" htmlFor="apellidos-input" className="pw-label pwi pwi-key"/>
							</Field>
							<Field>
								<Input id="documento-input" name="documento" placeholder="Documento" className="pw-input" required={true}/>
								<Label id="documento-label" htmlFor="documento-input" className="pw-label pwi pwi-key"/>
							</Field>
							<Field>
								<Input id="username-input" name="usuario" placeholder="Usuario" className="pw-input" required={true}/>
								<Label id="username-label" htmlFor="username-input" className="pw-label pwi pwi-user"/>
							</Field>
							<Field>
								<Input id="password-input" name="password" type="password" placeholder="Contraseña" className="pw-input" required={true}/>
								<Label id="password-label" htmlFor="password-input" className="pw-label pwi pwi-key"/>
							</Field>
							<Field>
								<ComboBox id="type-input" name="tipo" options={ops} className="pw-input" required={true}/>
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
