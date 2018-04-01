import React from 'react'

class ComboBox extends React.Component{
	constructor(props){
		super(props);
		const { options } = props
		this.state={
			value: options[0].value
		}
		const { id , name } = props
		if( props.onChange ){
			props.onChange(null,{
				id: id,
				name: name,
				value: options[0].value
			})
		}
	}

	renderOptions = () =>{
		const { options } = this.props;
		return options.map((op,key) => {
			return <option key={key} value={op.value}>{op.label}</option>
		})
	}

	handleChange = (e) =>{
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
		const { id, name, className, required } = this.props;
		const { renderOptions } = this;

		return(
			<select id={id} name={name} onChange={this.handleChange} className={className} required={required}>
				{renderOptions()}
			</select>
		);
	}
}

export default ComboBox;
