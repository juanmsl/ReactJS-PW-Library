import React from 'react'
import { BookListItem } from '../../components'

class BookList extends React.Component{
	constructor(props){
		super(props);
		this.state = {};
	}

    handleDelete = (e,obj) =>{
        //For debugging only
        console.log({
            operation:"delete",
            ...obj
        });
        //end of debug
        if( this.props.onDeleteBook ){
            this.props.onDeleteBook(e,obj)
        }
    };

    handleUpdate = (e,obj) =>{
        //For debugging only
        console.log({
            operation:"update",
            ...obj
        });
        //end of debug
        if( this.props.onUpdateBook ){
            this.props.onUpdateBook(e,obj)
        }
    };

    renderRows = () =>{
        const { showButtons, books } = this.props;
        const { handleDelete , handleUpdate } = this;
        return books.map((book, index) => {
            return <BookListItem
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                key={index}
                info={book}
                showButtons={showButtons}/>
        })
    };

	render(){
        const { renderRows } = this;
		return(
            <section className="pw-book-list">
                {renderRows()}
            </section>
        );
	}
}

export default BookList;
