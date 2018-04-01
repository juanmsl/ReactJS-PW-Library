import React from 'react'
import { Button } from '../'

class BookListItem extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			info: {...props.info}
		};
	}

    handleUpdate=(e, obj)=>{
        if( this.props.onUpdate ){
            this.props.onUpdate(e,{
                ...this.state.info
            })
        }
    };

    handleDelete=(e, obj)=>{
        if( this.props.onDelete ){
            this.props.onDelete(e,{
                ...this.state.info
            })
        }
    };

	handleClick=(e, obj)=>{
		if( this.props.onClick ){
			this.props.onClick(e, {
				...this.state.info
			})
		}
	};

	render(){
        const { showButtons } = this.props;
        const { nombre , isbn } = this.state.info;
        const { handleClick, handleUpdate , handleDelete } = this;
		return(
            <section className="item" onClick={handleClick}>
                <section className="item-info">
                    <h4 className="item-title">{nombre}</h4>
                    <h6 className="item-autor">{isbn}</h6>
                </section>
                { showButtons && <Button onClick={handleUpdate} className="item-button wh-button active shadow pwi pwi-refresh" /> }
                { showButtons && <Button onClick={handleDelete} className="item-button wh-button alert shadow pwi pwi-times"/> }
            </section>
        );
	}
}

export default BookListItem;
