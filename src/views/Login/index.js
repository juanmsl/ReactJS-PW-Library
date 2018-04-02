import React from 'react'
import { BasePage } from "..";
import { Button , Input , Label } from '../../components'
import { Field , Form } from '../../collections'

class Login extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	handleSubmit = (e,state) =>{
		//TODO: Change log for actual login process
        console.log(state);
		//end todo
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
								<Input id="username-input" name="username" placeholder="Usuario" className="pw-input" required={true}/>
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
