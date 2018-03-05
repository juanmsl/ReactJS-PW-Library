import React from 'react'

class Input extends React.Component{
	constructor(props){
		super(props);
		this.state={
			value: ""
		}
	}

	handleChange = (e) => {
		this.setState({
			value: e.target.value
		})
		const { id , name } = this.props
		if( this.props.onChange ){
			this.props.onChange(e,{
				id: id,
				name: name,
				value: e.target.value
			})
		}
	}

	render(){
		const { id , name , type="text", placeholder, className } = this.props
		const { value } = this.state
		return(
			<input id={id} value={value} type={type} name={name} onChange={this.handleChange} placeholder={placeholder} className={className}/>
		);
	}
}

export default Input;
