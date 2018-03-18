import React from 'react';

class Footer extends React.Component {
	render() {
		const { data } = this.props;
		const { copyright } = data;

		return (
			<footer className="pw-footer">
				<section className="pw-content">
					<section className="pw-section">

					</section>
				</section>
				<section className="pw-copyright">{copyright}</section>
			</footer>
		);
	}
}

export default Footer;
