import React from 'react';

export default class LoadSection extends React.Component {
	constructor(props){
		super(props);
		this.state = {};
	}

	render() {
		const { loading, error, children } = this.props;

		return (
			<React.Fragment>
					{
						loading && !error &&
						<section className="pw-loading">
							<span className="pw-loading-icon"></span>
						</section>
					}
					{
						error &&
						<section className="pw-loading">
							<span className="pw-error-icon pwi pwi-exclamation-circle"></span>
							<h5>Parece que algo ha salido mal, revisa tu conexión con el servidor</h5>
						</section>
					}
					{
						!loading && !error &&
						<React.Fragment>
							{children}
						</React.Fragment>
					}
			</React.Fragment>
		);
	}
}
