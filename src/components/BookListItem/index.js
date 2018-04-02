import React from 'react'
import { Button } from '../'

class BookListItem extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			info: {...props.info}
		};
	}

	componentWillReceiveProps = (nextProps) =>{
		this.setState({
			info: {...nextProps.info}
		})
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

	renderAuthors = () => {
		return this.state.info.autores.map((autor, i) => {
			return <span className="item-author" key={i}>{autor.nombre}</span>
		});
	};

	render(){
        const { showButtons } = this.props;
        const { nombre } = this.state.info;
        const { handleClick, handleUpdate , handleDelete, renderAuthors } = this;

		return(
            <section className="item" onClick={handleClick}>
                <section className="item-info">
                    <h4 className="item-title">{nombre}</h4>
                    <section className="item-authors">{renderAuthors()}</section>
                </section>
                { showButtons && <Button onClick={handleUpdate} className="item-button wh-button active shadow pwi pwi-refresh" /> }
                { showButtons && <Button onClick={handleDelete} className="item-button wh-button alert shadow pwi pwi-times"/> }
            </section>
        );
	}
}

export default BookListItem;
