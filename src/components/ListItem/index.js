import React from 'react'

class ListItem extends React.Component{
	constructor(props){
		super(props);
		this.state={
			...props
		}
	}

	componentWillReceiveProps = (props) =>{
		this.setState({
			...props
		})
	}

	handleClick=(e)=>{
		if( this.props.onClick ){
			this.props.onClick(e, this.state.value)
		}
	}

	render(){
		return(
			<li onClick={this.handleClick}>{this.state.value}</li>
		);
	}
}

export default ListItem;
