import React from 'react'
import { Button } from '../'
import { Link } from 'react-router-dom';

class BookListItem extends React.Component{
	constructor(props){
		super(props);
		this.state = {};
	}

    handleUpdate=(e, obj)=>{
        if( this.props.onUpdate ){
            this.props.onUpdate(e,{
                id: this.state.id,
                isbn: this.state.isbn,
                titulo: this.state.titulo,
            })
        }
    };

    handleDelete=(e, obj)=>{
        if( this.props.onDelete ){
            this.props.onDelete(e,{
                id: this.state.id,
                isbn: this.state.isbn,
                titulo: this.state.titulo,
                autor: this.state.autor
            })
        }
    };

	handleClick=(e, obj)=>{
		if( this.props.onClick ){
			this.props.onClick(e, {
				id: this.state.id,
				isbn: this.state.isbn,
				titulo: this.state.titulo,
				autor: this.state.autor
			})
		}
	};

	render(){
        const { info , showButtons } = this.props;
        const { id, nombre , isbn } = info;
        const { handleClick, handleUpdate , handleDelete } = this;
		return(
            <Link to={`/book/${id}`} className="item" onClick={handleClick}>
                <section className="item-info">
                    <h4 className="item-title">{nombre}</h4>
                    <h6 className="item-autor">{isbn}</h6>
                </section>
                { showButtons && <Button onClick={handleUpdate} className="item-button wh-button active shadow pwi pwi-refresh" /> }
                { showButtons && <Button onClick={handleDelete} className="item-button wh-button alert shadow pwi pwi-times"/> }
            </Link>
        );
	}
}

export default BookListItem;
