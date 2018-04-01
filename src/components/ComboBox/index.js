import React from 'react'

class ComboBox extends React.Component{
	constructor(props){
		super(props);
		let { options } = props
		if( options.length === 0 ){
			options=[{value:null}]
		}
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
		const { options , emptyMessage="-- No hay nada que mostrar --"} = this.props;
		if( options.length === 0){
			return <option value={null}>{emptyMessage}</option>
		}
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
