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
				<Form id="login-form" onSubmit={handleSubmit} className="pw-form" autocomplete="off">
                    <article className="pw-field">
                        <Input id="username-input" name="username" placeholder="Usuario" className="pw-input"/>
                        <Label id="username-label" htmlFor="username-input" name="username" className="pw-label pw pw-user"/>
                    </article>
                    <article className="pw-field">
                        <Input id="password-input" name="password" type="password" placeholder="Contraseña" className="pw-input"/>
                        <Label id="password-label" htmlFor="password-input" name="password" className="pw-label pw pw-key"/>
                    </article>
					<Button id="submit-button" className="pw-submit" submit>Ingresar</Button>
				</Form>
			</React.Fragment>
		);
	}
}

export default Login;
