import React from 'react'
import { Button } from '../'

class BookListItem extends React.Component{
	constructor(props){
		super(props);
        const { info , showButtons=false } = this.props
        const { id , isbn , titulo , autor } = info
        if( !id ){
            console.warn("No id supplied in info to BookListItem.");
        }
		this.state={
            autor: autor,
            id: id,
            isbn: isbn,
            titulo: titulo,
            showButtons: showButtons
        }
	}

    handleUpdate=(e,obj)=>{
        if( this.props.onUpdate ){
            this.props.onUpdate(e,{
                id: this.state.id,
                isbn: this.state.isbn,
                titulo: this.state.titulo,
            })
        }
    }

    handleDelete=(e,obj)=>{
        if( this.props.onDelete ){
            this.props.onDelete(e,{
                id: this.state.id,
                isbn: this.state.isbn,
                titulo: this.state.titulo,
                autor: this.state.autor
            })
        }
    }

	render(){
        const { titulo , autor , showButtons } = this.state
        const { handleUpdate , handleDelete } = this
        const { className } = this.props
		return(
            <article className={className}>
                <section>
                    <p>{titulo}</p>
                    <h6>{autor}</h6>
                </section>
                { showButtons && <Button onClick={handleUpdate} /> }
                { showButtons && <Button onClick={handleDelete} /> }
            </article>
        );
	}
}

export default BookListItem;
