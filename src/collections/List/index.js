import React from 'react';
import { ListItem } from '../../components';

class List extends React.Component{
	constructor(props){
		super(props);
		this.state={
			items: props.items
		}
	}

	componentWillReceiveProps = (props) =>{
		this.setState({
			items: props.items
		})
	};

	handleItemClick = (e,obj) =>{
		if(this.props.onClick){
			this.props.onClick(e,obj);
		}
	};

	renderItems = () =>{
		const { handleItemClick } = this;
		const { items } = this.state;
		if( items.length === 0 ){
			const { emptyMessage="-- No hay Items que mostrar --" } = this.props;
			return <span>{emptyMessage}</span>
		}
		return (
			<ul className="pw-list">
				{items.map((item,index) => {
					return (
						<ListItem
							key={index}
							index={index}
							value={item}
							onClick={handleItemClick}
						/>)
				})}
			</ul>
		);
	};

	render(){
		const { renderItems } = this;

		return (
			<section className="pw-list-container">
				{renderItems()}
			</section>
		);
	}
}

export default List;
