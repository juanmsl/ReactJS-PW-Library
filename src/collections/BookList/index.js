import React from 'react'
import { BookListItem } from '../../components'

class BookList extends React.Component{
	constructor(props){
		super(props);
        const { json=undefined } = props
        if( !json ){
            console.warn("BookList has no items");
        }
		this.state={
            items: json
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
    }

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
    }

    renderRows = () =>{
        const { items } = this.state
        const { showButtons } = this.props
        const { handleDelete , handleUpdate } = this
        return Object.keys(items).map((item,index) => {
            return <BookListItem
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                key={index}
                info={items[item]}
                showButtons={showButtons}/>
        })
    }

	render(){
        const { renderRows } = this
        const { className } = this.props
		return(
            <section className={className}>
                {renderRows()}
            </section>
        );
	}
}

export default BookList;
