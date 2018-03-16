import React from 'react'
import { Button , Input } from '../../components'
import { Field } from '../'

class Form extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	handleInputChange = (e,obj) =>{
		let {id,name,value} = obj
		if( name !== undefined ){
			this.setState({
				[name]: value
			})
		}else{
			this.setState({
				[id]: value
			})
		}
	}

	handlePasswordChange = (e,obj) =>{
		//TODO: Handle password change: how should I store it in front end
		this.handleInputChange(e,obj)
	}

	handleSubmit = (e) =>{
		e.preventDefault()
		if( this.props.onSubmit ){
			this.props.onSubmit(e,this.state)
		}
	}

	transform = (child) =>{
		if( child.type === Input ){
			if( child.props.type === "password" ){
				return React.cloneElement(child,{
					onChange: this.handlePasswordChange
				})
			}else{
				return React.cloneElement(child,{
					onChange: this.handleInputChange
				})
			}
		}else if( child.type === Button ){
			if( child.props.submit ){
				return React.cloneElement(child,{
					onClick: this.handleSubmit
				})
			}else{
				return child
			}
		}else{
			return child
		}
	}

	transformChildren = () =>{
		return React.Children.map(this.props.children,(child) => {
			if( child.type === Field ){
				return React.cloneElement(child,{
					transform: this.transform
				})
			}else{
				return this.transform(child)
			}
		})
	}

	render(){
		const { id, className, autocomplete } = this.props
		const { handleSubmit } = this
		return(
			<form id={id} className={className} autoComplete={autocomplete} onSubmit={handleSubmit}>
				{this.transformChildren()}
			</form>
		);
	}
}

export default Form;