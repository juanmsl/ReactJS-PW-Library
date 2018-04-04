import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
	render() {
		const { data, user } = this.props;
		const { app_name } = data;

		return (
			<nav className="pw-navbar">
				<Link to="/" className="pw-navbar-header">
					<section className="pw-navbar-section">{app_name}</section>
					{
						user !== null &&
						<React.Fragment>
							{ user.tipo !== undefined && <section className="pw-navbar-section">{user.tipo}</section> }
							{ user.nombres !== undefined && <section className="pw-navbar-section">{user.nombres}</section> }
						</React.Fragment>
					}
				</Link>
				{
					user === null ?
					<Link to="/login" className="pw-navbar-section pwi pwi-sign-in" />
						:
					<Link to="/logout" className="pw-navbar-section pwi pwi-sign-out" />
				}
			</nav>
		);
	}
}

export default Navbar;
