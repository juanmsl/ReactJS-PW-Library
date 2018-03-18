import React from 'react'

//FieldWrapper for form inputs etc etc
class Field extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	transformChildren = () =>{
		const { transform=(e)=>(e) } = this.props
		return React.Children.map(this.props.children,(child) => {
			return transform(child)
		})
	}

	render(){
		const { className="pw-field" } = this.props
		return(
			<article className={className}>
				{this.transformChildren()}
			</article>
		)
	}
}

export default Field;
