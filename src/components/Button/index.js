import React from 'react'

class Button extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	handleClick = (e) =>{
		const { id } = this.props
		if( this.props.onClick ){
			this.props.onClick(e,{
				id:id
			})
		}
	}

	render(){
		const { id , label=this.props.children, className } = this.props
		const { handleClick } = this
		return(
			<button id={id} onClick={handleClick} className={className}>{label}</button>
		);
	}
}

export default Button;
