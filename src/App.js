import React from 'react'
import { BrowserRouter , Redirect , Route , Switch } from 'react-router-dom'
import { Book , BookID , Borrow , Home , Login , Register , Root } from './views'

class App extends React.Component{
	constructor(props){
		super(props);
		this.state={
			userType:"prestamista"
		}
	}

	renderRoutes=()=>{
		//TODO: this funk shall return route components defined in Views depending
		//on if logged in or not and user type
		const { userType } = this.state
		if( userType === null ){
			//return routes that unregistered user can use
			console.log("not logged in");
			return(
				<Switch>
					<Route exact path={"/"} render={(props)=>{return <Root {...props} />}} />
					<Route exact path={"/login"} render={(props)=>{return <Login {...props} />}} />
					<Route render={ () => {return <Redirect to={'/'}/>} }/>
				</Switch>
			)
		}else if( userType === "prestamista"){
			//return routes that lender can use
			console.log("logged in as prest");
			return(
				<Switch>
					<Route exact path={"/"} render={(props)=>{return <Root {...props} />}} />
					<Route exact path={"/login"} render={(props)=>{return <Login {...props} />}} />
					<Route exact path={"/home"} render={(props)=>{return <Home {...props} userType={userType}/>}} />
					<Route exact path={"/book/:id"} render={(props)=>{return <BookID {...props} bookID={props.match.params.id} userType={userType}/>}} />
					<Route exact path={"/borrow"} render={(props)=>{return <Borrow {...props} />}} />
					<Route render={ () => {return <Redirect to={'/home'}/>} }/>
				</Switch>
			)
		}else if( userType === "admin"){
			//return routes that admin can use
			console.log("logged in as admin");
			return(
				<Switch>
					<Route exact path={"/"} render={(props)=>{return <Root {...props} />}} />
					<Route exact path={"/login"} render={(props)=>{return <Login {...props} />}} />
					<Route exact path={"/home"} render={(props)=>{return <Home {...props} userType={userType}/>}} />
					<Route exact path={"/book/:id"} render={(props)=>{return <BookID {...props} bookID={props.match.params.id} userType={userType}/>}} />
					<Route exact path={"/book"} render={(props)=>{return <Book {...props} userType={userType}/>}} />
					<Route exact path={"/borrow"} render={(props)=>{return <Borrow {...props} />}} />
					<Route exact path={"/register"} render={(props)=>{return <Register {...props} />}} />
					<Route render={ () => {return <Redirect to={'/home'}/>} }/>
				</Switch>
			)
		}
	}

	render(){
		return(
			<BrowserRouter>
				{this.renderRoutes()}
			</BrowserRouter>
		);
	}
}

export default App;
