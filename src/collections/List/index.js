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
	}

	handleItemClick = (e,obj) =>{
		if(this.props.onClick){
			this.props.onClick(e,obj);
		}
	}

	renderItems = () =>{
		const { handleItemClick } = this;
		const { items } = this.state;
		if( items.length === 0 ){
			const { emptyMessage="-- No hay Items que mostrar --" } = this.props;
			return <ListItem value={emptyMessage} />
		}
		return items.map((item,index) => {
			return (
				<ListItem
					key={index}
					index={index}
					value={item}
					onClick={handleItemClick}
				/>)
		})
	}

	render(){
		const { ordered=false } = this.props;
		const { renderItems } = this;

		if( ordered ){
			return <ol>
				{renderItems()}
			</ol>
		}else{
			return <ul>
				{renderItems()}
			</ul>
		}
	}
}

export default List;
