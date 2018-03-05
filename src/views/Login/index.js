import React from 'react'
import { Button , Form , Input , Label } from '../../components'

class Login extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	handleSubmit = (fields) =>{
		console.log(fields);
	}

	render(){
		const { handleSubmit } = this
		return(
			<React.Fragment>
				<Form id="login-form" onSubmit={handleSubmit}>
					<Label id="username-label" name="username">Usuario</Label>
					<Input id="username-input" name="username"></Input>
					<Label id="password-label" name="password">Contraseña</Label>
					<Input id="password-input" name="password" type="password"></Input>
					<Button id="submit-button" submit>Ingresar</Button>
				</Form>
			</React.Fragment>
		);
	}
}

export default Login;
