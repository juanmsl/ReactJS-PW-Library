import React from 'react'
import { BookListItem } from '../../components'

class BookList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			books: props.books
		};
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

	handleBookClick = (e,obj)=>{
		//For debugging only
        console.log({
            operation:"click",
            ...obj
        });
        //end of debug
        if( this.props.onBookClick ){
            this.props.onBookClick(e,obj)
        }
	}

    renderRows = () =>{
        const { showButtons } = this.props;
		const { books } = this.state;
        const { handleDelete , handleUpdate , handleBookClick } = this;
        return books.map((book, index) => {
            return <BookListItem
                onDelete={handleDelete}
                onUpdate={handleUpdate}
				onClick={handleBookClick}
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
