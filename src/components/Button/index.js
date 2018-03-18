import React from 'react'

class Button extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	handleClick = (e) =>{
        e.preventDefault()
		if( this.props.onClick ){
			this.props.onClick(e,{
				...this.props
			})
		}
	}

	render(){
		const { id , label=this.props.children, className="wh-button shadow" } = this.props
		const { handleClick } = this
		return(
			<button id={id} onClick={handleClick} className={className}>{label}</button>
		);
	}
}

export default Button;
