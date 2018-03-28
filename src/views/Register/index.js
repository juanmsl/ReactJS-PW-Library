import React from 'react'
import { BasePage } from "..";
import { Field , Form } from "../../collections";
import { Input , Label , ComboBox , Button } from "../../components";

class Register extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	handleSubmit = () =>{
		console.log("Please implement add new user request");
	}

	render() {
		const { data, user } = this.props;
		const { handleSubmit } = this;

		const ops = [
			{value: "admin", label:"administrador"},
			{value: "prest", label:"prestamista"}
		]

		return(
			<BasePage footer={true} navbar={true} data={data} user={user}>
				<Form onSubmit={handleSubmit}>
					<Field>
						<Input name={"usuario"} placeholder={"Usuario"}/>
						<Label name={"usuario"}/>
					</Field>
					<Field>
						<Input name={"contraseña"} placeholder={"Contraseña"}/>
						<Label name={"contraseña"}/>
					</Field>
					<Field>
						<ComboBox name={"tipo"} options={ops} />
					</Field>
					<Button submit>Registrar</Button>
				</Form>
			</BasePage>
		);
	}
}

export default Register;
