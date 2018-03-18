import React from 'react';
import { Navbar, Footer } from "../../components";

class BasePage extends React.Component {
	render() {
		const { navbar, footer, data, user, children } = this.props;

		return (
			<React.Fragment>
				{ navbar && <Navbar data={data} user={user} />}
				{ children }
				{ footer && <Footer data={data} />}
			</React.Fragment>
		);
	}
}

export default BasePage;
