import React from 'react'
import { BasePage } from "..";
import { Button , Input , Label } from '../../components'
import { Field , Form } from '../../collections'
import {RESTResolver} from "../../resources/RESTResolver";

class Login extends React.Component{
	constructor(props){
		super(props);
		this.state={}
		this.restresolver = new RESTResolver();
	}

	handleSubmit = (e,state) =>{
		this.restresolver.login(state, (response) => {
			console.log(response);
			if(response.status !== "404") {
				this.props.login(response);
			}
		});
	};

	render(){
		const { handleSubmit } = this;
		const { data, user} = this.props;

		return(
			<BasePage footer={true} navbar={true} data={data} user={user}>
				<main className="maincontent">
					<h1 className="underline">Ingresar al sistema</h1>
					<section className="pw-form-container">
						<Form id="login-form" onSubmit={handleSubmit} className="pw-form" autocomplete="off">
							<Field>
								<Input id="username-input" name="usuario" placeholder="Usuario" className="pw-input" required={true}/>
								<Label id="username-label" htmlFor="username-input" className="pw-label pwi pwi-user"/>
							</Field>
							<Field>
								<Input id="password-input" name="password" type="password" placeholder="Contraseña" className="pw-input" required={true}/>
								<Label id="password-label" htmlFor="password-input" className="pw-label pwi pwi-key"/>
							</Field>
							<Button submit id="submit-button" className="pw-submit wh-button active shadow">Ingresar</Button>
						</Form>
					</section>
				</main>
			</BasePage>
		);
	}
}

export default Login;
