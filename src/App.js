import React from 'react'
import { BrowserRouter , Redirect , Route , Switch } from 'react-router-dom'
import { Book , BookID , Borrow , Home , Login , Register , Return , Root } from './views'

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			user: {type: "admin"},
			data: this.props.data
		}
	}

	renderRoot = () => {
		return <Root {...this.state} />;
	};

	renderLogin = () => {
		return <Login {...this.state} />;
	};

	renderHome = () => {
		return <Home {...this.state} />;
	};

	renderBookId = ({match}) => {
		return <BookID bookID={match.params.id} {...this.state} />;
	};

	renderBorrow = () => {
		return <Borrow {...this.state} />;
	};

	renderBook = () => {
		return <Book {...this.state} />;
	};

	renderRegister = () => {
		return <Register {...this.state} />;
	};

	renderReturn = () =>{
		return <Return {...this.state} />;
	}

	logout = () => {
		this.setState({
			user: null
		});
		return null;
	};

	renderRoutes = () => {
		const { user } = this.state;

		if( user === null ) {
			return (
				<Switch>
					<Route exact path={"/"} render={this.renderRoot} />
					<Route exact path={"/login"} render={this.renderLogin} />
					<Route exact path={"/book/:id"} render={this.renderBookId} />
					<Route render={ () => {return <Redirect to={'/'}/>} }/>
				</Switch>
			)
		} else if ( user.type === "prestamista") {
			return(
				<Switch>
					<Route exact path={"/home"} render={this.renderHome} />
					<Route exact path={"/book/:id"} render={this.renderBookId} />
					<Route exact path={"/borrow"} render={this.renderBorrow} />
					<Route exact path={"/return"} render={this.renderReturn} />
					<Route exact path={"/logout"} render={this.logout} />
					<Route render={ () => {return <Redirect to={'/home'}/>} }/>
				</Switch>
			)
		} else if ( user.type === "admin") {
			return(
				<Switch>
					<Route exact path={"/home"} render={this.renderHome} />
					<Route exact path={"/book/:id"} render={this.renderBookId} />
					<Route exact path={"/book"} render={this.renderBook} />
					<Route exact path={"/register"} render={this.renderRegister} />
					<Route exact path={"/logout"} render={this.logout} />
					<Route render={ () => {return <Redirect to={'/home'}/>} }/>
				</Switch>
			)
		}
	};

	render(){
		return(
			<BrowserRouter>
				{this.renderRoutes()}
			</BrowserRouter>
		);
	}
}

export default App;
