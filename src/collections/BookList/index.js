import React from 'react'
import { BookListItem } from '../../components'

class BookList extends React.Component{
	constructor(props){
		super(props);
        const { books=undefined } = props;
        if( !books ){
            console.warn("BookList has no items");
        }
		this.state={
            items: books
        }
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
        const { items } = this.state;
        const { showButtons } = this.props;
        const { handleDelete , handleUpdate } = this;
        return items.map((item, index) => {
            return <BookListItem
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                key={index}
                info={item}
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
