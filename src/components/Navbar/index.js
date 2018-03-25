import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
	render() {
		const { data, user } = this.props;
		const { app_name } = data;

		return (
			<nav className="pw-navbar">
				<Link to="/" className="pw-navbar-section">
					{app_name}{user !== null ? ` | ${user.type}` : ""}
				</Link>
				<Link to="/logout" className="pw-navbar-section pwi pwi-sign-out" />
			</nav>
		);
	}
}

export default Navbar;
